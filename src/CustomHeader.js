import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
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
      <View style={{ flexDirection: 'row', height: 55, backgroundColor: bgcolor, borderBottomColor: bdcolor, borderBottomWidth: 1 }} >


        <View style={{ flex: 1, justifyContent: 'center' }}>
          {
            isHome ?
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}
                onPress={() => this.props.navigation.openDrawer()}
              >
                <Icon
                  // raised
                  name='bars'
                  type='font-awesome'
                  color='white'
                  iconStyle={{ fontSize: 30,fontWeight:'normal' }}
                  onPress={() => navigation.openDrawer()} />
                {/* <Image style={{ width: 28, height: 28, marginLeft: 0,padding:4 }}
                  source={IMAGE.ICON_MENU_ICON}
                  resizeMode="contain"

                /> */}
              </TouchableOpacity>

              :
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 18 }}
                onPress={() => this.props.navigation.goBack()}
              >

                <Icon
                  // raised
                  name='angle-left'
                  type='font-awesome'
                  color='black'
                  iconStyle={{ fontSize: 34, }}
                  onPress={() => this.props.navigation.goBack()} />

                {/* <Image style={{ width: 20, height: 20, marginLeft: 10 }}
                  source={IMAGE.ICON_BACK}
                  resizeMode="contain"
                /> */}
                {/* <Text>Back</Text> */}
              </TouchableOpacity>

          }

        </View>



        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>{title}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
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