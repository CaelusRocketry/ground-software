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
        "HEADER": {
          "TEXT" : {
            x1: (0/width) * 100 + '%',
            y1: (0/height) * 100 + '%',
            x2: (0/width) * 100 + '%',
            y2: ((height-160)/height) * 100 + '%'
          },
          "TOP" : "",
          "FONTSIZE" : "",
        },
        "NITROUS": {
          "TEXT" : {
            x1: (96/width) * 100 + '%',
            y1: (246/height) * 100 + '%',
            x2: ((width-1015)/width) * 100 + '%',
            y2: ((height-349)/height) * 100 + '%'
          },
          "TOP" : "",
          "FONTSIZE" : "45px",
        },
        "APHLEX": {
          "TEXT" : {
            x1: (1775/width) * 100 + '%',
            y1: (246/height) * 100 + '%',
            x2: ((width-2694)/width) * 100 + '%',
            y2: ((height-349)/height) * 100 + '%'
          },
          "TOP" : "",
          "FONTSIZE" : "45px",
        },
        "VENT": {
          "TEXT" : {
            x1: (375/width) * 100 + '%',
            y1: (438/height) * 100 + '%',
            x2: ((width-503)/width) * 100 + '%',
            y2: ((height-466)/height) * 100 + '%'
          },
          "TOP" : "100px",
          "FONTSIZE" : "20px",
        },
        "N2OFLIGHT": {
          "TEXT" : {
            x1: (642/width) * 100 + '%',
            y1: (614/height) * 100 + '%',
            x2: ((width-874)/width) * 100 + '%',
            y2: ((height-1184)/height) * 100 + '%'
          },
          "TOP" : "110px",
          "FONTSIZE" : "28px",
        },
        "N2OSTORAGE": {
          "TEXT" : {
            x1: (134/width) * 100 + '%',
            y1: (827/height) * 100 + '%',
            x2: ((width-373)/width) * 100 + '%',
            y2: ((height-1486)/height) * 100 + '%'
          },
          "TOP" : "140px",
          "FONTSIZE" : "26px",
        },
      },
      "SENSOR" : {
        "PRESSURE" : {
          "PT-6": {
            "TEXT" : {
              x1: (132/width) * 100 + '%',
              y1: (711/height) * 100 + '%',
              x2: ((width-401)/width) * 100 + '%',
              y2: ((height-812)/height) * 100 + '%'
            },
            "TOP" : "8px",
            "FONTSIZE" : "26px",
          },
          "PT-5": {
            "TEXT" : {
              x1: (633/width) * 100 + '%',
              y1: (492/height) * 100 + '%',
              x2: ((width-904)/width) * 100 + '%',
              y2: ((height-595)/height) * 100 + '%'
            },
            "TOP" : "",
            "FONTSIZE" : "26px",
          },
          "PT-7": {
            "TEXT" : {
              x1: (614/width) * 100 + '%',
              y1: (1273/height) * 100 + '%',
              x2: ((width-886)/width) * 100 + '%',
              y2: ((height-1319)/height) * 100 + '%'
            },
            "TOP" : "8px",
            "FONTSIZE" : "26px",
          },
          "PT-8": {
            "TEXT" : {
              x1: (1727/width) * 100 + '%',
              y1: (1300/height) * 100 + '%',
              x2: ((width-2091)/width) * 100 + '%',
              y2: ((height-1400)/height) * 100 + '%'
            },
            "TOP" : "10px",
            "FONTSIZE" : "26px",
          },
          "PT-10": {
            "TEXT" : {
              x1: (1639/width) * 100 + '%',
              y1: (688/height) * 100 + '%',
              x2: ((width-2000)/width) * 100 + '%',
              y2: ((height-787)/height) * 100 + '%'
            },
            "TOP" : "10px",
            "FONTSIZE" : "26px",
          },
        },
        "THRUST" : {
          "ENGINE": {
            "TEXT" : {
              x1: (2067/width) * 100 + '%',
              y1: (707/height) * 100 + '%',
              x2: ((width-2517)/width) * 100 + '%',
              y2: ((height-817)/height) * 100 + '%'
            },
            "TOP" : "",
            "FONTSIZE" : "",
          }
        }
      },
      "VALVES" : {
        "main_propellant_valve": {
          "TEXT" : {
            x1: (410/width) * 100 + '%',
            y1: (722/height) * 100 + '%',
            x2: ((width-531)/width) * 100 + '%',
            y2: ((height-842)/height) * 100 + '%'
          }
        },
        "NOSV-1": {
          "TEXT" : {
            x1: (500/width) * 100 + '%',
            y1: (448/height) * 100 + '%',
            x2: ((width-621)/width) * 100 + '%',
            y2: ((height-570)/height) * 100 + '%'
          }
        },
        "NCSV-5": {
          "TEXT" : {
            x1: (885/width) * 100 + '%',
            y1: (1323/height) * 100 + '%',
            x2: ((width-1004)/width) * 100 + '%',
            y2: ((height-1445)/height) * 100 + '%'
          }
        },
      }
    }
  },
  "ETHANOL": {
    "IMAGE": {
      "SRC": Ethanolpid,
      "ALT": "ethanolpid",
    },
    "COORDINATES" : {
      "LABELS" : {
        "HEADER": {
          "TEXT" : {
            x1: (0/width) * 100 + '%',
            y1: (0/height) * 100 + '%',
            x2: (0/width) * 100 + '%',
            y2: ((height-160)/height) * 100 + '%'
          },
          "TOP" : "",
          "FONTSIZE" : "",
        },
        "APHLEX": {
          "TEXT" : {
            x1: (96/width) * 100 + '%',
            y1: (245/height) * 100 + '%',
            x2: (1015/width) * 100 + '%',
            y2: (348/height) * 100 + '%'
          },
          "TOP" : "",
          "FONTSIZE" : "45px",
        },
        "ETHANOL": {
          "TEXT" : {
            x1: (1774/width) * 100 + '%',
            y1: (246/height) * 100 + '%',
            x2: (2693/width) * 100 + '%',
            y2: (348/height) * 100 + '%'
          },
          "TOP" : "",
          "FONTSIZE" : "45px",
        },
        "VENT": {
          "TEXT" : {
            x1: (2292/width) * 100 + '%',
            y1: (434/height) * 100 + '%',
            x2: (2420/width) * 100 + '%',
            y2: (482/height) * 100 + '%'
          },
          "TOP" : "100px",
          "FONTSIZE" : "20px",
        },
        "ETHANOLFLIGHT": {
          "TEXT" : {
            x1: (1921/width) * 100 + '%',
            y1: (610/height) * 100 + '%',
            x2: (2156/width) * 100 + '%',
            y2: (1184/height) * 100 + '%'
          },
          "TOP" : "110px",
          "FONTSIZE" : "28px",
        },
        "KBOTTLE": {
          "TEXT" : {
            x1: (2414/width) * 100 + '%',
            y1: (753/height) * 100 + '%',
            x2: (2691/width) * 100 + '%',
            y2: (1486/height) * 100 + '%'
          },
          "TOP" : "140px",
          "FONTSIZE" : "26px",
        },
      },
      "SENSORS" : {
        "PRESSURE" : {
          "ISOLATED_SECTION": {
            "TEXT" : {
              x1: (2448/width) * 100 + '%',
              y1: (642/height) * 100 + '%',
              x2: (2700/width) * 100 + '%',
              y2: (733/height) * 100 + '%'
            },
            "TOP" : "8px",
            "FONTSIZE" : "26px",
          },
          "TOP_PLATE": {
            "TEXT" : {
              x1: (1872/width) * 100 + '%',
              y1: (464/height) * 100 + '%',
              x2: (2150/width) * 100 + '%',
              y2: (585/height) * 100 + '%'
            },
            "TOP" : "",
            "FONTSIZE" : "26px",
          },
          "BOTTOM_PLATE": {
            "TEXT" : {
              x1: (1900/width) * 100 + '%',
              y1: (1219/height) * 100 + '%',
              x2: (2200/width) * 100 + '%',
              y2: (1313/height) * 100 + '%'
            },
            "TOP" : "8px",
            "FONTSIZE" : "26px",
          },
          "DOWNSTREAM": {
            "TEXT" : {
              x1: (710/width) * 100 + '%',
              y1: (1300/height) * 100 + '%',
              x2: (1074/width) * 100 + '%',
              y2: (1400/height) * 100 + '%'
            },
            "TOP" : "10px",
            "FONTSIZE" : "26px",
          },
          "INJECTOR": {
            "TEXT" : {
              x1: (797/width) * 100 + '%',
              y1: (685/height) * 100 + '%',
              x2: (1161/width) * 100 + '%',
              y2: (787/height) * 100 + '%'
            },
            "TOP" : "10px",
            "FONTSIZE" : "26px",
          },
        },
        "THRUST" : {
          "ENGINE": {
            "TEXT" : {
              x1: (285/width) * 100 + '%',
              y1: (707/height) * 100 + '%',
              x2: (735/width) * 100 + '%',
              y2: (814/height) * 100 + '%'
            },
            "TOP" : "",
            "FONTSIZE" : "",
          }
        }
      },
      "VALVES" : {
        "main_propellant_valve": {
          "TEXT" : {
            x1: (1802/width) * 100 + '%',
            y1: (1321/height) * 100 + '%',
            x2: (1922/width) * 100 + '%',
            y2: (1441/height) * 100 + '%'
          }
        },
        "vent_valve": {
          "TEXT" : {
            x1: (2173/width) * 100 + '%',
            y1: (458/height) * 100 + '%',
            x2: (2294/width) * 100 + '%',
            y2: (579/height) * 100 + '%'
          }
        },
        "fill_valve": {
          "TEXT" : {
            x1: (2311/width) * 100 + '%',
            y1: (624/height) * 100 + '%',
            x2: (2432/width) * 100 + '%',
            y2: (745/height) * 100 + '%'
          }
        },
      }
    }
  },
  "FULL": {

  }
}