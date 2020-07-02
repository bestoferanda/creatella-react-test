/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => App);
YellowBox.ignoreWarnings(['Deprecation warning: value provided is not in a recognized RFC2822 ']);
