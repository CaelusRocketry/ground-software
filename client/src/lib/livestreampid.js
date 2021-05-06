import Nitrouspid from "../images/livestream/LivestreamBaseNitrous.png";
import Ethanolpid from "../images/livestream/LivestreamBaseEthanol.png";
//import Fullpid from "../images/livestream/LivestreamBaseFull.png";

// CONSTANTS
export const VALVE_MAP = {
  1: "OPEN", //Green
  0: "CLOSED", //Red
};

var width = 2800;
var height = 1600;

export const PADDING = {
  "NITROUS": {
    "IMAGE": {
      "SRC": Nitrouspid,
      "ALT": "nitrouspid",
    },
    "COORDINATES" : {
      "LABELS" : {
        // "HEADER": {
        //   "TEXT" : {
        //     x1: (0/width) * 100 + '%',
        //     y1: (0/height) * 100 + '%',
        //     x2: (width/width) * 100 + '%',
        //     y2: (160/height) * 100 + '%'
        //   }
        // },
        "NITROUS": {
          "TEXT" : {
            x1: (96/width) * 100 + '%',
            y1: (246/height) * 100 + '%',
            x2: ((width-1015)/width) * 100 + '%',
            y2: ((height-349)/height) * 100 + '%'
          }
        },
        "APHLEX": {
          "TEXT" : {
            x1: (1775/width) * 100 + '%',
            y1: (246/height) * 100 + '%',
            x2: ((width-2694)/width) * 100 + '%',
            y2: ((height-349)/height) * 100 + '%'
          }
        },
        "VENT": {
          "TEXT" : {
            x1: (375/width) * 100 + '%',
            y1: (418/height) * 100 + '%',
            x2: ((width-503)/width) * 100 + '%',
            y2: ((height-466)/height) * 100 + '%'
          }
        },
        "N2OFLIGHT": {
          "TEXT" : {
            x1: (642/width) * 100 + '%',
            y1: (614/height) * 100 + '%',
            x2: ((width-874)/width) * 100 + '%',
            y2: ((height-1184)/height) * 100 + '%'
          }
        },
        "N2OSTORAGE": {
          "TEXT" : {
            x1: (134/width) * 100 + '%',
            y1: (827/height) * 100 + '%',
            x2: ((width-373)/width) * 100 + '%',
            y2: ((height-1486)/height) * 100 + '%'
          }
        },
      },
      "SENSOR" : {
        "PRESSURE" : {
          "NITROUS_ISOLATED": {
            "TEXT" : {
              x1: (132/width) * 100 + '%',
              y1: (711/height) * 100 + '%',
              x2: ((width-401)/width) * 100 + '%',
              y2: ((height-812)/height) * 100 + '%'
            }
          },
          "NITROUS_TOP": {
            "TEXT" : {
              x1: (633/width) * 100 + '%',
              y1: (492/height) * 100 + '%',
              x2: ((width-904)/width) * 100 + '%',
              y2: ((height-595)/height) * 100 + '%'
            }
          },
          "NITROUS_BOTTOM": {
            "TEXT" : {
              x1: (594/width) * 100 + '%',
              y1: (1233/height) * 100 + '%',
              x2: ((width-886)/width) * 100 + '%',
              y2: ((height-1319)/height) * 100 + '%'
            }
          },
          "TUBE": {
            "TEXT" : {
              x1: (1727/width) * 100 + '%',
              y1: (1300/height) * 100 + '%',
              x2: ((width-2091)/width) * 100 + '%',
              y2: ((height-1400)/height) * 100 + '%'
            }
          },
          "INJECTOR": {
            "TEXT" : {
              x1: (1639/width) * 100 + '%',
              y1: (688/height) * 100 + '%',
              x2: ((width-2000)/width) * 100 + '%',
              y2: ((height-787)/height) * 100 + '%'
            }
          },
        },
        "THRUST" : {
          "ENGINE": {
            "TEXT" : {
              x1: (2067/width) * 100 + '%',
              y1: (707/height) * 100 + '%',
              x2: ((width-2517)/width) * 100 + '%',
              y2: ((height-817)/height) * 100 + '%'
            }
          }
        }
      },
      "VALVES" : {
        "NITROUS_ISOLATED": {
          "TEXT" : {
            x1: (410/width) * 100 + '%',
            y1: (722/height) * 100 + '%',
            x2: ((width-531)/width) * 100 + '%',
            y2: ((height-842)/height) * 100 + '%'
          }
        },
        "NITROUS_TOP": {
          "TEXT" : {
            x1: (500/width) * 100 + '%',
            y1: (448/height) * 100 + '%',
            x2: ((width-621)/width) * 100 + '%',
            y2: ((height-570)/height) * 100 + '%'
          }
        },
        "NITROUS_BOTTOM": {
          "TEXT" : {
            x1: (885/width) * 100 + '%',
            y1: (1323/height) * 100 + '%',
            x2: ((width-1004)/width) * 100 + '%',
            y2: ((height-1445)/height) * 100 + '%'
          }
        },
      }
    }
  }
}