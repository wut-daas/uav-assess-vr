# Assessment functions

Assessment functions run in a completely separate process from the UE4 visualisation.

## Communication

All data is exchanged in tthe same format, following these features:

- Data is compliant with the [project's JSON schema](https://github.com/wut-daas/uav-assess-vr/blob/master/external-assessment/uav-assessment.schema.json)
- UTF-8 encoded JSON **terminated with null byte (`\x00`) after JSON text**
- Sent in TCP/IP packet

A most basic example of simulation message, with some whitespace added for legibility:

```json
{
  "simulationMessage": {
    "meta": {
      "profile": "Operator 1",
      "level": "BasicFlight"
    },
    "frames": [
      {
        "time": 0,
        "position": { "x": 1.248, "y": 2.137, "z": 4.213 },
        "velocity": { "x": 3.388, "y": 0.0, "z": 1.449 },
        "attitude": { "x": 1.05, "y": -15.0, "z": 0.0 },
        "reference": 0.5
      }
    ]
  }
}
```

And a corresponding response:

```json
{
  "assessmentMessage": {
    "meta": {
      "info": "Assessing reference only"
    },
    "frames": [
      {
        "time": 0,
        "score": [0.8]
      }
    ]
  }
}
```

**The assessment server simply has to fill the `score` array for every received frame, using received data**. The `score` array contains a measure of operator performance. The mandatory first item is overall operator rating from 0 to 1.

For more detailed examples of messages and assessment servers, see the [`external-assessment`](https://github.com/wut-daas/uav-assess-vr/tree/master/external-assessment) directory in the repository.

## Requirements to write an assessment function

Separation into a different process allows the assessment server to be written in any programming language or framework as long as it can provide the following:

- Receiving and sending TCP/IP
- Decoding and encoding UTF-8
- Decoding and encoding JSON
