import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

import { CustomHeader } from '../index';

import Tab1 from '../tab/Tab1';
import Tab2 from '../tab/tab2';
export class HomeScreen extends Component {
  render() {
    return (
   
      <SafeAreaView style={{ flex: 1 }}>
        
        <CustomHeader bgcolor='white' title="Home" isHome={true} navigation={this.props.navigation}   bdcolor='#f2f2f2'/>

       

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
        
            renderItem={({ item }) => <ListItem >
       
              <Body>
                <Text>Mobile Number</Text>
                <Text note></Text>
              </Body>
              <Right>
                <Text note>edit</Text>
              </Right>
            </ListItem>
            }>
          </FlatList>

          <Text>Home!</Text>
          <Text>Home!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('HomeDetail')}
          >
            <Text>Go Home Detailssccccsss</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}