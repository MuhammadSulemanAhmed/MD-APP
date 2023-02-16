/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Login from './src/auth/login';
import Verify from './src/auth/verify';
import Verified from './src/auth/verified';
import Register from './src/auth/register';
import Main from './src/dashboard/main';
import Profile from './src/dashboard/profile';
import task from './src/dashboard/task';
import AdminHome from './src/admin/main';
import AdminProfile from './src/admin/profile';
import Admintask from './src/admin/task';
import AdminEmployees from './src/admin/employees';
import AdminAddEmployee from './src/admin/addEmployee';
import { name as appName } from './app.json';
import { Navigation } from 'react-native-navigation';
import {
  HOME, LOGIN,MAIN,PROFILE, TASK,LOGOUT,REGISTER,ADMIN_HOME, VERIFY, VERIFIED, ADMIN_TASK, ADMIN_EMPLOYEES, ADMIN_ADD_EMPLOYEE, ADMIN_USER
} from './src/routes/payloads.routes';
import Logout from './src/auth/logout';
AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent(HOME, () => App);
Navigation.registerComponent(LOGIN, () => Login);
Navigation.registerComponent(MAIN, () => Main);
Navigation.registerComponent(PROFILE, () => Profile);
Navigation.registerComponent(TASK, () => task);
Navigation.registerComponent(LOGOUT, () => Logout);
Navigation.registerComponent(REGISTER, () => Register);
Navigation.registerComponent(VERIFY, () => Verify);
Navigation.registerComponent(VERIFIED, () => Verified);
//Admin Side

Navigation.registerComponent(ADMIN_HOME, () => AdminHome);
Navigation.registerComponent(ADMIN_TASK, () => Admintask);
Navigation.registerComponent(ADMIN_EMPLOYEES, () => AdminEmployees);
Navigation.registerComponent(ADMIN_ADD_EMPLOYEE, () => AdminAddEmployee);
Navigation.registerComponent(ADMIN_USER, () => AdminProfile);
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Initial',
        children: [
          {
            component: {
              name: HOME,
              setRoot: true,
              options: {
                topBar: {
                  visible: false
                }
              },
            },
          }
        ]
      },
    },
  });
});
Navigation.setDefaultOptions({
  bottomTabs: {
    backgroundColor: '#011627',
    animate: false,
    animateTabSelection: false,
  },
  bottomTab: {
    selectedFontSize: 11,
    // textColor: '#f2f2f2',
    selectedTextColor: 'white',
    iconHeight:1,
    iconWidth:1
    // iconInsets: false,
    // animateTabSelection: false
  },
});