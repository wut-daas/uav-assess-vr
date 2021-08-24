#!/usr/bin/env python3

import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--silent', help='do not respond to messages, only print frame count to stdout', action='store_true')
parser.add_argument('--verbose', help='print received message contents to stdout', action='store_true')
args = parser.parse_args()

import socketserver
import json

HOST = 'localhost'
PORT = 54003


def score_reference_dist(sim_frame: dict) -> dict:
    """Simplest example of score assignment. Gives points from zero to one simply by (10-d)/10, where d is distance from reference track in meters.

    Parameters
    ----------
    sim_frame : dict
        A single object from simulationMessage.frames compliant with project JSON schema

    Returns
    -------
    dict
        A single object from assessmentMessage.frames compliant with project JSON schema
    """
    result = dict()
    result['time'] = sim_frame['time']
    result['score'] = [
        # max and min clamp the result to be in 0 to 1 range to comply with schema
        max(0, min(1, (10.0 - sim_frame['reference']) / 10.0))
    ]  # The score needs to be an array of numbers, even if only one number is sent
    return result


class MyJSONEncoder(json.JSONEncoder):
    """
    Overrides float serialization to limit number of decimal places
    """
    PLACES = 3

    def iterencode(self, obj, _one_shot=False):
        if isinstance(obj, float):
            yield format(obj, '.{}f'.format(MyJSONEncoder.PLACES))
        elif isinstance(obj, dict):
            last_index = len(obj) - 1
            yield '{'
            i = 0
            for key, value in obj.items():
                yield '"' + key + '": '
                for chunk in MyJSONEncoder.iterencode(self, value):
                    yield chunk
                if i != last_index:
                    yield ", "
                i+=1
            yield '}'
        elif isinstance(obj, list):
            last_index = len(obj) - 1
            yield "["
            for i, o in enumerate(obj):
                for chunk in MyJSONEncoder.iterencode(self, o):
                    yield chunk
                if i != last_index: 
                    yield ", "
            yield "]"
        else:
            for chunk in json.JSONEncoder.iterencode(self, obj, _one_shot=_one_shot):
                yield chunk


class AssessmentHandler(socketserver.StreamRequestHandler):
    """
    TCP server class based on example from socketserver documentation
    """

    def handle(self):
        # self.request is the TCP socket connected to the client
        print('Client connected on', self.client_address)
        while True:
            self.data = self.request.recv(2048)
            if not self.data:
                print('Disconnected client', self.client_address)
                break

            response_frames = []
            try: 
                message = json.loads(self.data[:-1].decode('utf-8', 'strict'))
                if args.verbose:
                    print(message)
                for frame in message['simulationMessage']['frames']:
                    # This is where the response array is filled based on scoring function
                    response_frames.append(score_reference_dist(frame))
            except (KeyError, json.JSONDecodeError) as e:
                print('Error handling message:', e)

            if args.silent:
                print('Received {} frames'.format(len(response_frames)))
            else:
                if len(response_frames) > 0:
                    response = {'assessmentMessage': {'frames': response_frames}}
                    # Add null termination to make parsing possible even if buffer is reused
                    data = json.dumps(response, cls=MyJSONEncoder).encode('utf-8') + b'\x00'
                    self.request.sendall(data)

if __name__ == "__main__":
    # Create the server, binding to HOST on PORT
    with socketserver.TCPServer((HOST, PORT), AssessmentHandler) as server:
        # Activate the server; this will keep running until you
        # interrupt the program with Ctrl-C
        server.serve_forever()
