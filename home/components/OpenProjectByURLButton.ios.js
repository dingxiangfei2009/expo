/* @flow */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { AlertIOS, Linking, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import ExponentKernel from '../universal/ExponentKernel';
import UrlUtils from '../utils/UrlUtils';

export default class OpenProjectByURLButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.buttonContainer} onPress={this._handlePress}>
        <Ionicons size={37} name="ios-add" color={Colors.tintColor} />
      </TouchableOpacity>
    );
  }

  _handlePress = () => {
    AlertIOS.prompt('Enter a project URL to open it', 'Must be a valid Expo project', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open',
        onPress: text => {
          if (text) {
            if (ExponentKernel && text.toLowerCase() === '^dm') {
              ExponentKernel.addDevMenu();
            } else {
              let url = UrlUtils.normalizeUrl(text);
              Linking.canOpenURL(url) && Linking.openURL(url);
            }
          }
        },
      },
    ]);
  };
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 15,
  },
});
