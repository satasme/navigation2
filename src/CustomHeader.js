import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

import { IMAGE } from './constants/image';

const styles = StyleSheet.create({
  text: {
    height: 40, backgroundColor: 'white', borderRadius: 5, padding: 10,
  },
  textvalid: {
    backgroundColor: 'red',
  },
  textinvalid: {
    backgroundColor: 'green',
  },
});


export class CustomHeader extends Component {
  render() {
    let { navigation, isHome, title, bgcolor, bdcolor, isPost } = this.props
    return (
      <View style={{ flexDirection: 'row', height: 50, backgroundColor: bgcolor, borderBottomColor: bdcolor, borderBottomWidth: 1 }} >


        <View style={{ flex: 1, justifyContent: 'center' }}>
          {
            isHome ?
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image style={{ width: 20, height: 20, marginLeft: 10 }}
                  source={IMAGE.ICON_MENU}
                  resizeMode="contain"

                />
              </TouchableOpacity>

              :
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Image style={{ width: 20, height: 20, marginLeft: 10 }}
                  source={IMAGE.ICON_BACK}
                  resizeMode="contain"
                />
                {/* <Text>Back</Text> */}
              </TouchableOpacity>

          }

        </View>



        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'left' }}>{title}</Text>
        </View>
        <View style={{ flex: 0, justifyContent: 'center' }}>
          {
            isPost ? <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image style={{ width: 20, height: 20, marginRight: 10 }}
                source={IMAGE.ICON_SAVE_POST}
                resizeMode="contain"

              />
            </TouchableOpacity>
              : null

          }

        </View>
      </View>
    )
  }
}