#!/usr/bin/env python3

import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--verbose', help='print received message contents to stdout', action='store_true')
args = parser.parse_args()

import sys
import os
import socketserver
import json
import re
from math import nan, atan2, degrees

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from assessment_server import MyJSONEncoder, HOST, PORT

class ThesisHandler(socketserver.StreamRequestHandler):
    """
    Assessment server specifically for tests made in master thesis of @Maarrk
    """

    def handle(self):
        # self.request is the TCP socket connected to the client
        print('Client connected on', self.client_address)
        while True:
            self.data = self.request.recv(2048)
            if not self.data:
                print('Disconnected client', self.client_address)
                break

            response = {}
            try: 
                message = json.loads(self.data[:-1].decode('utf-8', 'strict'))
                if args.verbose:
                    print(message)
                response = self.handle_message(message)
            except (KeyError, json.JSONDecodeError) as e:
                print('Error handling message:', e)

            if 'assessmentMessage' in response:
                # Add null termination to make parsing possible even if buffer is reused
                data = json.dumps(response, cls=MyJSONEncoder).encode('utf-8') + b'\x00'
                self.request.sendall(data)

    def handle_message(self, message: dict) -> dict:
        level = message['simulationMessage']['meta']['level']

        weight_pos = 0.8
        weight_yaw = 0.2

        ass_frames = []
        for sim_frame in  message['simulationMessage']['frames']:
            if sim_frame['velocity']['y'] ** 2 + sim_frame['velocity']['x'] ** 2 > 0.0625:
                # Horizontal velocity is bigger than 0.25 m/s
                yaw_reference = degrees(atan2(sim_frame['velocity']['y'], sim_frame['velocity']['x']))
            else:
                yaw_reference = sim_frame['attitude']['z']

            if level == 'ExamHover':
                match = re.search(r'(^|\s)refYaw=([\d\.]+)', message['simulationMessage']['meta']['info'])
                if match:
                    yaw_reference = float(match.group(2))

            penalty_pos = sim_frame['reference']
            yaw_delta = abs(sim_frame['attitude']['z'] - yaw_reference)
            if yaw_delta > 180.0:
                yaw_delta = 360.0 - yaw_delta
            penalty_yaw = yaw_delta

            score_pos = (max(4.0 - sim_frame['reference'], 0.0)) / 4.0
            score_yaw = (max(90.0 - yaw_delta, 0.0)) / 90.0

            ass_frame = dict()
            ass_frame['time'] = sim_frame['time']
            ass_frame['score'] = [
                score_pos * weight_pos + score_yaw * weight_yaw,
                penalty_pos,
                penalty_yaw
            ]
            ass_frames.append(ass_frame)

        return {'assessmentMessage': {'frames': ass_frames, 'info': 'ThesisServer'}}

if __name__ == "__main__":
    with socketserver.TCPServer((HOST, PORT), ThesisHandler) as server:
        server.serve_forever()
