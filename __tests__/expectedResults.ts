export const Example1Expected = [
    {
        name: '__root',
        pins: {
            '1': 'net_0.5V',
        },
    },
    {
        name: 'gnd',
        pins: {
            '1': 'gnd',
        },
    },
    {
        name: 'V5V',
        pins: {
            '1': 'net_0.5V',
        },
    },
    {
        name: 'R1',
        pins: {
            '1': 'net_0.5V',
            '2': 'NET_1',
        },
    },
    {
        name: 'R2',
        pins: {
            '1': 'NET_1',
            '2': 'NET_2',
        },
    },
    {
        name: 'R3',
        pins: {
            '1': 'NET_2',
            '2': 'gnd',
        },
    },
    {
        name: 'res_3.COMP_1_20k',
        pins: {
            '1': 'net_0.5V',
            '2': 'gnd',
        },
    },
];

export const Example2Expected = [
    {
        name: '__root',
        pins: {
            '1': 'NET_1',
        },
    },
    {
        name: 'gnd',
        pins: {
            '1': 'gnd',
        },
    },
    {
        name: 'R1',
        pins: {
            '1': 'NET_1',
            '2': 'NET_2',
        },
    },
    {
        name: 'R2',
        pins: {
            '1': 'NET_2',
            '2': 'NO_NET',
        },
    },
    {
        name: 'R3',
        pins: {
            '1': 'NET_2',
            '2': 'NET_3',
        },
    },
    {
        name: 'R4',
        pins: {
            '1': 'NET_3',
            '2': 'NET_5',
        },
    },
    {
        name: 'R5',
        pins: {
            '1': 'NET_2',
            '2': 'NET_4',
        },
    },
    {
        name: 'R6',
        pins: {
            '1': 'NET_4',
            '2': 'NO_NET',
        },
    },
    {
        name: 'R7',
        pins: {
            '1': 'NET_5',
            '2': 'NET_6',
        },
    },
    {
        name: 'R8',
        pins: {
            '1': 'NET_6',
            '2': 'gnd',
        },
    },
    {
        name: 'R9',
        pins: {
            '1': 'NET_6',
            '2': 'gnd',
        },
    },
];

export const Example3Expected = [
    {
        name: '__root',
        pins: {
            '1': 'NET_1',
        },
    },
    {
        name: 'gnd',
        pins: {
            '1': 'gnd',
        },
    },
    {
        name: 'R1',
        pins: {
            '1': 'NET_1',
            '2': 'NET_2',
        },
    },
    {
        name: 'R2',
        pins: {
            '1': 'NET_2',
            '2': 'NET_3',
        },
    },
    {
        name: 'R3',
        pins: {
            '1': 'NET_3',
            '2': 'NET_4',
        },
    },
    {
        name: 'R4',
        pins: {
            '1': 'NET_4',
            '2': 'NET_5',
        },
    },
    {
        name: 'R5',
        pins: {
            '1': 'NET_5',
            '2': 'NET_7',
        },
    },
    {
        name: 'R6',
        pins: {
            '1': 'NET_4',
            '2': 'NET_6',
        },
    },
    {
        name: 'R7',
        pins: {
            '1': 'NET_6',
            '2': 'NET_7',
        },
    },
    {
        name: 'res_7.COMP_1_0',
        pins: {
            '1': 'NET_7',
            '2': 'gnd',
        },
    },
    {
        name: 'res_8.COMP_1_0',
        pins: {
            '1': 'NET_2',
            '2': 'gnd',
        },
    },
];

export const Example4PreELKExpected = {
    "id": "root",
    "layoutOptions": {
      "algorithm": "layered",
      "portLabels.placement": "[INSIDE]",
      "portConstraints": "FIXED_ORDER"
    },
    "children": [
      {
        "id": "V5V@0",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "V5V@0",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "priority": 12
        },
        "ports": [
          {
            "id": "V5V@0.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "1",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      },
      {
        "id": "U1",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "U1",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "portConstraints": "FIXED_ORDER",
          "priority": 11
        },
        "ports": [
          {
            "id": "U1.2",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "2",
                "width": 10,
                "height": 12
              },
              {
                "text": "GND",
                "width": 10,
                "height": 12
              }
            ]
          },
          {
            "id": "U1.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "VCC",
                "width": 10,
                "height": 12
              }
            ]
          },
          {
            "id": "U1.3",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "EAST"
            },
            "labels": [
              {
                "text": "3",
                "width": 10,
                "height": 12
              },
              {
                "text": "I2C_SCL",
                "width": 10,
                "height": 12
              }
            ]
          },
          {
            "id": "U1.4",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "EAST"
            },
            "labels": [
              {
                "text": "4",
                "width": 10,
                "height": 12
              },
              {
                "text": "I2C_SDA",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      },
      {
        "id": "gnd@0",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "gnd@0",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "priority": 9
        },
        "ports": [
          {
            "id": "gnd@0.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "1",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      },
      {
        "id": "res_0.COMP_1_4k",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "res_0.COMP_1_4k",
            "width": 50,
            "height": 12
          },
          {
            "text": "4k",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "portConstraints": "FIXED_ORDER",
          "priority": 7
        },
        "ports": [
          {
            "id": "res_0.COMP_1_4k.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "1",
                "width": 10,
                "height": 12
              }
            ]
          },
          {
            "id": "res_0.COMP_1_4k.2",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "EAST"
            },
            "labels": [
              {
                "text": "2",
                "width": 10,
                "height": 12
              },
              {
                "text": "2",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      },
      {
        "id": "V5V@1",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "V5V@1",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "priority": 5
        },
        "ports": [
          {
            "id": "V5V@1.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "1",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      },
      {
        "id": "res_1.COMP_1_4k",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "res_1.COMP_1_4k",
            "width": 50,
            "height": 12
          },
          {
            "text": "4k",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "portConstraints": "FIXED_ORDER",
          "priority": 3
        },
        "ports": [
          {
            "id": "res_1.COMP_1_4k.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "1",
                "width": 10,
                "height": 12
              }
            ]
          },
          {
            "id": "res_1.COMP_1_4k.2",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "EAST"
            },
            "labels": [
              {
                "text": "2",
                "width": 10,
                "height": 12
              },
              {
                "text": "2",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      },
      {
        "id": "V5V@2",
        "width": 100,
        "height": 100,
        "labels": [
          {
            "text": "V5V@2",
            "width": 50,
            "height": 12
          }
        ],
        "layoutOptions": {
          "nodeLabels.placement": "[OUTSIDE H_LEFT V_TOP]",
          "portLabels.placement": "INSIDE",
          "priority": 1
        },
        "ports": [
          {
            "id": "V5V@2.1",
            "width": 10,
            "height": 1,
            "properties": {
              "port.side": "WEST"
            },
            "labels": [
              {
                "text": "1",
                "width": 10,
                "height": 12
              },
              {
                "text": "1",
                "width": 10,
                "height": 12
              }
            ]
          }
        ]
      }
    ],
    "edges": [
      {
        "id": "edge_0",
        "sources": [
          "V5V@0.1"
        ],
        "targets": [
          "U1.1"
        ]
      },
      {
        "id": "edge_1",
        "sources": [
          "U1.2"
        ],
        "targets": [
          "gnd@0.1"
        ]
      },
      {
        "id": "edge_2",
        "sources": [
          "U1.3"
        ],
        "targets": [
          "res_0.COMP_1_4k.1"
        ]
      },
      {
        "id": "edge_3",
        "sources": [
          "res_0.COMP_1_4k.2"
        ],
        "targets": [
          "V5V@1.1"
        ]
      },
      {
        "id": "edge_4",
        "sources": [
          "U1.4"
        ],
        "targets": [
          "res_1.COMP_1_4k.1"
        ]
      },
      {
        "id": "edge_5",
        "sources": [
          "res_1.COMP_1_4k.2"
        ],
        "targets": [
          "V5V@2.1"
        ]
      }
    ]
  }