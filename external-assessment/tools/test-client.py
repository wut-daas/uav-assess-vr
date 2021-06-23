#!/usr/bin/env python3

import socket
import json

HOST = 'localhost'
PORT = 54003

sim_message = {
    'simulationMessage': {
        'meta': {
        'profile': 'No operator',
        'level': 'PythonTest'
        },
        'frames': [
            { 'time': 0, 'reference': 2 },
            { 'time': 0.1, 'reference': 3.5 },
            { 'time': 0.2, 'reference': 2.34 },
            { 'time': 0.3, 'reference': 3.1 },
        ]
    }
}

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(json.dumps(sim_message).encode('utf-8'))
    data = s.recv(1024)

try:
    response = json.loads(data.decode('utf-8'))
    print('Time\tScore')
    for frame in response['assessmentMessage']['frames']:
        print('{time}\t{score}'.format(**frame))


except (KeyError, json.JSONDecodeError) as e:
    print('Error handling message:', e)
