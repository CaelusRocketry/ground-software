
import Nitrouspid from "../images/nitrouspid.png";
import Ethanolpid from "../images/ethanolpid.png";
import Fullpid from "../images/fullpid.png";

// CONSTANTS
export const VALVE_MAP = { 
    1: "OPEN", 
    0: "CLOSED" 
  };
  
export const PADDING = {
  
    "NITROUS" : {
      "IMAGE" : {
        "SRC" : Nitrouspid,
        "ALT" : "nitrouspid",
      },
      "SENSOR" : {
        "PT-5": {
          x: (420/784), 
          y: (22/850)
        }, 
        "PT-P": {
          x: (635/784), 
          y: (262/850)
        }, 
        "PT-7": {
          x: (101/784), 
          y: (385/850)
        }, 
        "PT-8": {
          x: (548/784), 
          y: (757/850)
        }
      },
      "VALVE" : {
        "pressurization_valve": {
          x: (404/784), 
          y: (210/850)
        }, 
        "vent_valve": {
          x: (33/784), 
          y: (95/850)
        }, 
        "remote_drain_valve": {
          x: (19/784), 
          y: (598/850)
        }, 
        "main_propellant_valve": {
          x: (317/784), 
          y: (736/850)
        }
      }
    },
    "ETHANOL" : {
      "IMAGE" : {
        "SRC" : Ethanolpid,
        "ALT" : "ethanolpid",
      },
      "SENSOR" : {
        "PT-1": {
          x: (885/1971), 
          y: (224/1522)
        }, 
        "PT-2": {
          x: (779/1971), 
          y: (331/1522)
        }, 
        "PT-3": {
          x: (166/1971), 
          y: (991/1522)
        }, 
        "PT-4": {
          x: (714/1971), 
          y: (1147/1522)
        }
      },
      "VALVE" : {
        "NCSV-1": {
          x: (274/1971), 
          y: (91/1522)
        }, 
        "NOSV-2": {
          x: (347/1971), 
          y: (517/1522)
        }, 
        "pressurization_valve": {
          x: (52/1971), 
          y: (1375/1522)
        }
      }
    },
    "FULL" : {
      "IMAGE" : {
        "SRC" : Fullpid,
        "ALT" : "fullpid",
      },
      "SENSOR" : {
        "PT-1": {
          x: (1613/3200), 
          y: (201/1595)
        }, 
        "PT-2": {
          x: (2412/3200), 
          y: (460/1595)
        }, 
        "PT-3": {
          x: (2201/3200), 
          y: (926/1595)
        }, 
        "PT-4": {
          x: (1771/3200), 
          y: (1427/1595)
        },
        "PT-5": {
          x: (1012/3200), 
          y: (172/1595)
        }, 
        "PT-6": {
          x: (1445/3200), 
          y: (379/1595)
        }, 
        "PT-7": {
          x: (1041/3200), 
          y: (852/1595)
        }, 
        "PT-8": {
          x: (1086/3200), 
          y: (1255/1595)
        },
        "PT-9": {
          x: (1613/3200), 
          y: (1109/1595)
        },
        "PT-10": {
          x: (1249/3200), 
          y: (1110/1595)
        }
      },
      "VALVE" : {
        "vent_valve": {
          x: (136/3200), 
          y: (104/1595)
        }, 
        "pressurization_valve": {
          x: (619/3200), 
          y: (716/1595)
        }, 
        "remote_drain_valve": {
          x: (669/3200), 
          y: (1163/1595)
        }, 
        "main_propellant_valve": {
          x: (447/3200), 
          y: (1385/1595)
        },
        "NCSV-1": {
          x: (2187/3200), 
          y: (133/1595)
        }, 
        "NOSV-1": {
          x: (2756/3200), 
          y: (571/1595)
        }, 
        "NCSV-2": {
          x: (2269/3200), 
          y: (1478/1595)
        }, 
        "NOSV-2": {
          x: (1969/3200), 
          y: (1152/1595)
        }
      }
    }
  };
  