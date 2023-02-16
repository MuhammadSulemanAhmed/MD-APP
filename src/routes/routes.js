import { Navigation } from "react-native-navigation"
import { ADMIN_EMPLOYEES, ADMIN_HOME, ADMIN_TASK, ADMIN_USER, LOGIN, LOGOUT, MAIN, PROFILE, TASK } from './payloads.routes';

export const _pushTo = (componentName) => {

  Navigation.push("Initial", {
    component: {
      id: componentName,
      name: componentName,
      options: {
        topBar: {
          visible: false,
          popStackOnPress: false
        },
        hardwareBackButton: false
      }
    }
  })
}
export const _pushToRoot = (componentName) => {
  Navigation.popToRoot("Initial", {
    component: {
      id: componentName,
      name: componentName,
      options: {
        topBar: {
          visible: false,
          popStackOnPress: false
        },
        hardwareBackButton: false
      }
    }
  })
  // Navigation.push("Initial", {
  //   component: {
  //     id: componentName,
  //     name: componentName,
  //     options: {
  //       topBar: {
  //         visible: false,
  //         popStackOnPress: false
  //       },
  //       hardwareBackButton: false
  //     }
  //   }
  // })
}
export const _ToLogin = () => {
  Navigation.push("Initial", {
      component:{
          name: LOGIN,
          options:{
              topBar:{
                  visible:false,
                  popStackOnPress: false
              },
              hardwareBackButton:{
                popStackOnPress: false
              },
            }
      },
  })
}
export const _rootTo = (componentName) => {
  Navigation.setStackRoot("STACKID", {
    component: {
      id: componentName,
      name: componentName,
    }
  })
}

export const _toHome = () => {

  Navigation.setStackRoot("Initial", {

    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT',
      currentTabIndex: 1,
      options: {
        bottomTab: {
          backgroundColor: '#011627',
          animate: false,
          animateTabSelection: false,
          iconHeight: 1,
          iconWidth: 1
        }
      },
      children: [
        {
          component: {
            id: MAIN,
            name: MAIN,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/homei.png"),
                iconColor: "white"

              },

            }
          }
        },
        {
          component: {
            id: TASK,
            name: TASK,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/checklist.png"),
                iconColor: "white"
              }
            }
          }
        },
        {
          component: {
            id: PROFILE,
            name: PROFILE,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/account.png"),
                iconColor: "white"
              }
            }
          }
        },
        {
          component: {
            id: LOGOUT,
            name: LOGOUT,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/settings.png"),
                iconColor: "white"

                // iconInsets: false,
                // animateTabSelection: false
              }
            }
          }
        },
      ]
    }


  })
}
export const _toAdmin = () => {

  Navigation.setStackRoot("Initial", {
    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT_ADMIN',
      currentTabIndex: 1,
      options: {
        bottomTabs: {
          backgroundColor: '#011627',
          animate: false,
          animateTabSelection: false,
        },
      },
      children: [
        {
          component: {
            id: ADMIN_HOME,
            name: ADMIN_HOME,
            text: "Home",
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/homei.png"),
                // iconColor: "white"
              }
            }
          }
        },
        {
          component: {
            id: ADMIN_TASK,
            name: ADMIN_TASK,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/checklist.png"),
                iconColor: "white"
              }
            }
          }
        },
        {
          component: {
            id: ADMIN_EMPLOYEES,
            name: ADMIN_EMPLOYEES,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/employees.png"),
                iconColor: "white"
              }
            }
          }
        },
        {
          component: {
            id: ADMIN_USER,
            name: ADMIN_USER,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/account.png"),
                iconColor: "white"
              }
            }
          }
        },
        {
          component: {
            id: LOGOUT,
            name: LOGOUT,
            options: {
              topBar: {
                visible: false
              },
              bottomTab: {
                icon: require("../../images/settings.png"),
                iconColor: "white"
              }
            }
          }
        },
      ]
    }
  })
}
export const _pushToNoBack = (componentName,params={}) => {
  Navigation.push("Initial", {
      component:{
          name: componentName,
          options:{
              topBar:{
                  visible:false,
                  popStackOnPress: false
              },
              hardwareBackButton:{
                popStackOnPress: false
              },
            },
          passProps:params,
      },
  })
}