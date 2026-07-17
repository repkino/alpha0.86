const events = {
  "is-c3-clipboard-data": true,
  "type": "events",
  "items": [
    {
      "eventType": "comment",
      "text": "Респаун черепа-стража на месте погибшего (невидимого) воздушного стража",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "eventType": "block",
      "conditions": [
        {
          "id": "every-tick",
          "objectClass": "System"
        }
      ],
      "actions": [],
      "children": [
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "is-boolean-instance-variable-set",
              "objectClass": "guard",
              "parameters": {
                "instance-variable": "air"
              }
            },
            {
              "id": "is-boolean-instance-variable-set",
              "objectClass": "guard",
              "parameters": {
                "instance-variable": "destroed"
              }
            },
            {
              "id": "is-boolean-instance-variable-set",
              "objectClass": "guard",
              "parameters": {
                "instance-variable": "on"
              }
            },
            {
              "id": "for-each",
              "objectClass": "System",
              "parameters": {
                "object": "guard"
              }
            }
          ],
          "actions": [
            {
              "id": "set-boolean-instvar",
              "objectClass": "guard",
              "parameters": {
                "instance-variable": "on",
                "value": "false"
              }
            },
            {
              "id": "spawn-another-object",
              "objectClass": "guard",
              "parameters": {
                "object": "guardBase",
                "layer": "\"iso\"",
                "image-point": "0",
                "create-hierarchy": true,
                "template-name": "\"\""
              }
            },
            {
              "id": "set-boolean-instvar",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "onU",
                "value": "true"
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "guardUID",
                "value": "guard.UID"
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "hi",
                "value": "40"
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "explodeDist",
                "value": "120"
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "closeRange",
                "value": "300"
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "fsm",
                "value": "\"idle\""
              }
            },
            {
              "id": "spawn-another-object",
              "objectClass": "guardBase",
              "parameters": {
                "object": "guardScull",
                "layer": "\"fx\"",
                "image-point": "0",
                "create-hierarchy": true,
                "template-name": "\"\""
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardScull",
              "parameters": {
                "instance-variable": "baseUID",
                "value": "guardBase.UID"
              }
            },
            {
              "id": "set-position",
              "objectClass": "guardScull",
              "parameters": {
                "x": "guardBase.X",
                "y": "guardBase.Y-guardBase.hi-Self.Simplex.Value"
              }
            }
          ]
        }
      ]
    },
    {
      "eventType": "comment",
      "text": "Синхронизация высоты и позиции черепа",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "eventType": "block",
      "conditions": [
        {
          "id": "is-boolean-instance-variable-set",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU"
          }
        }
      ],
      "actions": [
        {
          "id": "set-position",
          "objectClass": "guardScull",
          "parameters": {
            "x": "guardBase.X",
            "y": "guardBase.Y-guardBase.hi-Self.Simplex.Value"
          }
        },
        {
          "id": "move-to-object",
          "objectClass": "guardScull",
          "parameters": {
            "where": "in-front",
            "object": "guardBase"
          }
        }
      ]
    },
    {
      "eventType": "comment",
      "text": "Обнаружение Бита и преследование. Если потерян - взлет и патруль",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "eventType": "block",
      "conditions": [
        {
          "id": "every-x-seconds",
          "objectClass": "System",
          "parameters": {
            "interval-seconds": "0.2"
          }
        },
        {
          "id": "is-boolean-instance-variable-set",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU"
          }
        },
        {
          "id": "for-each",
          "objectClass": "System",
          "parameters": {
            "object": "guardBase"
          }
        }
      ],
      "actions": [],
      "children": [
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "pick-all",
              "objectClass": "System",
              "parameters": {
                "object": "base"
              }
            },
            {
              "id": "compare-instance-variable",
              "objectClass": "base",
              "parameters": {
                "instance-variable": "name",
                "comparison": 0,
                "value": "\"aBook.hero\""
              }
            },
            {
              "id": "is-moving",
              "objectClass": "base",
              "behaviorType": "mt"
            },
            {
              "id": "compare-two-values",
              "objectClass": "System",
              "parameters": {
                "first-value": "Functions.getIsoDist(guardBase.X, guardBase.Y, base.X, base.Y)",
                "comparison": 3,
                "second-value": "guardBase.closeRange * (1 + guardBase.hi/100)"
              }
            }
          ],
          "actions": [
            {
              "id": "set-boolean-instvar",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "alert",
                "value": "true"
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "fsm",
                "value": "\"chase\""
              }
            },
            {
              "id": "set-instvar-value",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "targUID",
                "value": "base.UID"
              }
            },
            {
              "callFunction": "smt",
              "parameters": [
                "guardBase.UID",
                "base.X",
                "base.Y"
              ]
            }
          ],
          "children": [
            {
              "eventType": "block",
              "conditions": [
                {
                  "id": "trigger-once-while-true",
                  "objectClass": "System"
                }
              ],
              "actions": [
                {
                  "id": "set-instvar-value",
                  "objectClass": "guardBase",
                  "parameters": {
                    "instance-variable": "hi",
                    "value": "max(40, guardBase.hi - 50)"
                  }
                }
              ]
            }
          ]
        },
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "else",
              "objectClass": "System"
            }
          ],
          "actions": [
            {
              "id": "set-boolean-instvar",
              "objectClass": "guardBase",
              "parameters": {
                "instance-variable": "alert",
                "value": "false"
              }
            }
          ],
          "children": [
            {
              "eventType": "block",
              "conditions": [
                {
                  "id": "compare-two-values",
                  "objectClass": "System",
                  "parameters": {
                    "first-value": "guardBase.hi",
                    "comparison": 2,
                    "second-value": "200"
                  }
                }
              ],
              "actions": [
                {
                  "type": "comment",
                  "text": "Взлет при потере цели",
                  "background-color": [
                    0.49,
                    0.7,
                    0.38,
                    1
                  ]
                },
                {
                  "id": "set-instvar-value",
                  "objectClass": "guardBase",
                  "parameters": {
                    "instance-variable": "hi",
                    "value": "guardBase.hi + 8"
                  }
                },
                {
                  "id": "stop",
                  "objectClass": "guardBase",
                  "behaviorType": "mt"
                },
                {
                  "id": "set-instvar-value",
                  "objectClass": "guardBase",
                  "parameters": {
                    "instance-variable": "fsm",
                    "value": "\"up\""
                  }
                }
              ]
            },
            {
              "eventType": "block",
              "conditions": [
                {
                  "id": "else",
                  "objectClass": "System"
                },
                {
                  "id": "is-moving",
                  "objectClass": "guardBase",
                  "behaviorType": "mt",
                  "isInverted": true
                }
              ],
              "actions": [
                {
                  "type": "comment",
                  "text": "Патрулирование",
                  "background-color": [
                    0.49,
                    0.7,
                    0.38,
                    1
                  ]
                },
                {
                  "id": "set-instvar-value",
                  "objectClass": "guardBase",
                  "parameters": {
                    "instance-variable": "fsm",
                    "value": "\"patrol\""
                  }
                },
                {
                  "id": "set-eventvar-value",
                  "objectClass": "System",
                  "parameters": {
                    "variable": "tempX",
                    "value": "guardBase.X + random(-400, 400)"
                  }
                },
                {
                  "id": "set-eventvar-value",
                  "objectClass": "System",
                  "parameters": {
                    "variable": "tempY",
                    "value": "guardBase.Y + random(-400, 400)"
                  }
                },
                {
                  "callFunction": "smt",
                  "parameters": [
                    "guardBase.UID",
                    "tempX",
                    "tempY"
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "eventType": "comment",
      "text": "Запуск и остановка таймера взрыва (дистанция explodeDist)",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "eventType": "block",
      "conditions": [
        {
          "id": "every-tick",
          "objectClass": "System"
        },
        {
          "id": "is-boolean-instance-variable-set",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU"
          }
        },
        {
          "id": "compare-instance-variable",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "fsm",
            "comparison": 0,
            "value": "\"chase\""
          }
        },
        {
          "id": "for-each",
          "objectClass": "System",
          "parameters": {
            "object": "guardBase"
          }
        }
      ],
      "actions": [],
      "children": [
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "pick-by-unique-id",
              "objectClass": "base",
              "parameters": {
                "unique-id": "guardBase.targUID"
              }
            },
            {
              "id": "compare-two-values",
              "objectClass": "System",
              "parameters": {
                "first-value": "Functions.getIsoDist(guardBase.X, guardBase.Y, base.X, base.Y)",
                "comparison": 3,
                "second-value": "guardBase.explodeDist * (1 + guardBase.hi/100)"
              }
            }
          ],
          "actions": [],
          "children": [
            {
              "eventType": "block",
              "conditions": [
                {
                  "id": "is-timer-running",
                  "objectClass": "guardBase",
                  "behaviorType": "Timer",
                  "parameters": {
                    "tag": "\"boom\""
                  },
                  "isInverted": true
                }
              ],
              "actions": [
                {
                  "type": "comment",
                  "text": "Запуск таймера на 1-4 сек",
                  "background-color": [
                    0.49,
                    0.7,
                    0.38,
                    1
                  ]
                },
                {
                  "id": "start-timer",
                  "objectClass": "guardBase",
                  "behaviorType": "Timer",
                  "parameters": {
                    "duration": "random(1, 4)",
                    "type": "once",
                    "tag": "\"boom\""
                  }
                }
              ]
            }
          ]
        },
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "else",
              "objectClass": "System"
            }
          ],
          "actions": [
            {
              "type": "comment",
              "text": "Отмена таймера при выходе из радиуса",
              "background-color": [
                0.49,
                0.7,
                0.38,
                1
              ]
            },
            {
              "id": "stop-timer",
              "objectClass": "guardBase",
              "behaviorType": "Timer",
              "parameters": {
                "tag": "\"boom\""
              }
            }
          ]
        }
      ]
    },
    {
      "eventType": "comment",
      "text": "Коллизия баз ИЛИ взрыв по таймеру",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "eventType": "block",
      "conditions": [
        {
          "id": "is-boolean-instance-variable-set",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU"
          }
        }
      ],
      "actions": [],
      "children": [
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "on-timer",
              "objectClass": "guardBase",
              "behaviorType": "Timer",
              "parameters": {
                "tag": "\"boom\""
              }
            }
          ],
          "actions": [
            {
              "callFunction": "skullBoom",
              "parameters": [
                "guardBase.UID",
                "0"
              ]
            }
          ]
        },
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "is-overlapping-another-object",
              "objectClass": "guardBase",
              "parameters": {
                "object": "base"
              }
            }
          ],
          "actions": [
            {
              "callFunction": "skullBoom",
              "parameters": [
                "guardBase.UID",
                "base.UID"
              ]
            }
          ]
        }
      ]
    },
    {
      "eventType": "comment",
      "text": "Функция взрыва черепа-стража",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "functionName": "skullBoom",
      "functionDescription": "",
      "functionCategory": "",
      "functionReturnType": "none",
      "functionCopyPicked": false,
      "functionIsAsync": false,
      "functionParameters": [
        {
          "name": "uid",
          "type": "number",
          "initialValue": "0",
          "comment": "UID guardBase"
        },
        {
          "name": "targUID",
          "type": "number",
          "initialValue": "0",
          "comment": "UID base коллизии (0 если таймер)"
        }
      ],
      "eventType": "function-block",
      "conditions": [
        {
          "id": "pick-by-unique-id",
          "objectClass": "guardBase",
          "parameters": {
            "unique-id": "uid"
          }
        }
      ],
      "actions": [
        {
          "type": "comment",
          "text": "Деактивация",
          "background-color": [
            0.49,
            0.7,
            0.38,
            1
          ]
        },
        {
          "id": "stop",
          "objectClass": "guardBase",
          "behaviorType": "mt"
        },
        {
          "id": "set-boolean-instvar",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU",
            "value": "false"
          }
        },
        {
          "id": "set-position",
          "objectClass": "guardBase",
          "parameters": {
            "x": "-4444",
            "y": "-4444"
          }
        },
        {
          "id": "set-position",
          "objectClass": "guardScull",
          "parameters": {
            "x": "-4444",
            "y": "-4444"
          }
        },
        {
          "type": "comment",
          "text": "Взрыв черепа: анимация/партиклы",
          "background-color": [
            0.49,
            0.7,
            0.38,
            1
          ]
        },
        {
          "id": "spawn-another-object",
          "objectClass": "guardBase",
          "parameters": {
            "object": "tFX",
            "layer": "\"fx\"",
            "image-point": "0",
            "create-hierarchy": true,
            "template-name": "\"\""
          }
        },
        {
          "id": "set-eventvar-value",
          "objectClass": "System",
          "parameters": {
            "variable": "tempX",
            "value": "guardBase.hi"
          }
        }
      ],
      "children": [
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "compare-two-values",
              "objectClass": "System",
              "parameters": {
                "first-value": "targUID",
                "comparison": 1,
                "second-value": "0"
              }
            },
            {
              "id": "pick-by-unique-id",
              "objectClass": "base",
              "parameters": {
                "unique-id": "targUID"
              }
            },
            {
              "id": "compare-instance-variable",
              "objectClass": "base",
              "parameters": {
                "instance-variable": "name",
                "comparison": 0,
                "value": "\"aBook.hero\""
              }
            }
          ],
          "actions": [
            {
              "type": "comment",
              "text": "Прямая коллизия с Битом - мгновенный респаун",
              "background-color": [
                0.49,
                0.7,
                0.38,
                1
              ]
            },
            {
              "id": "set-instvar-value",
              "objectClass": "aBit",
              "parameters": {
                "instance-variable": "energo",
                "value": "0"
              }
            },
            {
              "id": "set-boolean-instvar",
              "objectClass": "aBit",
              "parameters": {
                "instance-variable": "respawn",
                "value": "true"
              }
            }
          ]
        },
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "else",
              "objectClass": "System"
            }
          ],
          "actions": [],
          "children": [
            {
              "eventType": "block",
              "conditions": [
                {
                  "id": "compare-two-values",
                  "objectClass": "System",
                  "parameters": {
                    "first-value": "targUID",
                    "comparison": 0,
                    "second-value": "0"
                  }
                },
                {
                  "id": "pick-by-unique-id",
                  "objectClass": "base",
                  "parameters": {
                    "unique-id": "guardBase.targUID"
                  }
                }
              ],
              "actions": [
                {
                  "type": "comment",
                  "text": "Взрыв вокруг Бита. 3D Дистанция для уровня ущерба",
                  "background-color": [
                    0.49,
                    0.7,
                    0.38,
                    1
                  ]
                },
                {
                  "id": "set-eventvar-value",
                  "objectClass": "System",
                  "parameters": {
                    "variable": "dist3D",
                    "value": "sqrt((Functions.getIsoDist(guardBase.X, guardBase.Y, base.X, base.Y)^2) + (guardBase.hi^2))"
                  }
                },
                {
                  "id": "set-instvar-value",
                  "objectClass": "aBit",
                  "parameters": {
                    "instance-variable": "energo",
                    "value": "max(0, aBit.energo - (200 - min(200, dist3D)))"
                  }
                },
                {
                  "type": "comment",
                  "text": "Бит сплющивается и отпочковывается (флаги + таймер 1-3с)",
                  "background-color": [
                    0.49,
                    0.7,
                    0.38,
                    1
                  ]
                },
                {
                  "id": "set-boolean-instvar",
                  "objectClass": "aMico",
                  "parameters": {
                    "instance-variable": "BitHide",
                    "value": "true"
                  }
                },
                {
                  "id": "start-timer",
                  "objectClass": "aIns",
                  "behaviorType": "Timer",
                  "parameters": {
                    "duration": "random(1, 3)",
                    "type": "once",
                    "tag": "\"unhide\""
                  }
                }
              ]
            }
          ]
        },
        {
          "eventType": "comment",
          "text": "Респаун черепа у родительского стража через 2с",
          "background-color": [
            0.49,
            0.7,
            0.38,
            1
          ]
        },
        {
          "eventType": "block",
          "conditions": [
            {
              "id": "pick-by-unique-id",
              "objectClass": "guard",
              "parameters": {
                "unique-id": "guardBase.guardUID"
              }
            }
          ],
          "actions": [
            {
              "id": "set-boolean-instvar",
              "objectClass": "guard",
              "parameters": {
                "instance-variable": "scullSpawned",
                "value": "false"
              }
            }
          ]
        }
      ]
    },
    {
      "eventType": "comment",
      "text": "Трансформация в шпиона при уничтожении кластера",
      "background-color": [
        0.49,
        0.7,
        0.38,
        1
      ]
    },
    {
      "eventType": "block",
      "conditions": [
        {
          "id": "compare-eventvar",
          "objectClass": "System",
          "parameters": {
            "variable": "clusterAchievements",
            "comparison": 0,
            "value": "0"
          }
        },
        {
          "id": "every-tick",
          "objectClass": "System"
        },
        {
          "id": "is-boolean-instance-variable-set",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU"
          }
        }
      ],
      "actions": [
        {
          "type": "comment",
          "text": "Здесь включается шпион spy.on = true",
          "background-color": [
            0.49,
            0.7,
            0.38,
            1
          ]
        },
        {
          "id": "set-boolean-instvar",
          "objectClass": "guardBase",
          "parameters": {
            "instance-variable": "onU",
            "value": "false"
          }
        },
        {
          "id": "set-boolean-instvar",
          "objectClass": "spy",
          "parameters": {
            "instance-variable": "on",
            "value": "true"
          }
        }
      ]
    }
  ]
};
const fs = require('fs');
const getObj = (items) => ({ "is-c3-clipboard-data": true, "type": "events", "items": items });
fs.writeFileSync("d:/git/alpha0.86/files/temp1.json", JSON.stringify(getObj(events.items.slice(0, 4)), null, 2));
fs.writeFileSync("d:/git/alpha0.86/files/temp2.json", JSON.stringify(getObj(events.items.slice(4, 8)), null, 2));

// Splitting temp3 into 3 pieces
const temp3Items = events.items.slice(8, 14);
fs.writeFileSync("d:/git/alpha0.86/files/temp3_1.json", JSON.stringify(getObj(temp3Items.slice(0, 2)), null, 2)); // Collision block
fs.writeFileSync("d:/git/alpha0.86/files/temp3_2.json", JSON.stringify(getObj(temp3Items.slice(2, 4)), null, 2)); // Function block
fs.writeFileSync("d:/git/alpha0.86/files/temp3_3.json", JSON.stringify(getObj(temp3Items.slice(4, 6)), null, 2)); // Spy block

console.log("JSON generated in 5 parts");
