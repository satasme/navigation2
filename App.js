import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { CustomHeader, CustomDrawerContent } from './src';
import { HomeScreen, HomeScreenDetail, SettingsScreen, SettingsScreenDetail, CreatePost, NewPost, NotificationScreen,MemberProfile,MenuScreen } from './src/tab';
import { NotificationsScreen } from './src/drawer';
import { RegisterScreen, LoginScreen, Login2Screen } from './src/auth';
import { FlatList } from 'react-native-gesture-handler';
import { IMAGE } from './src/constants/image';


const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: 'center',
    height: 38,
    borderWidth: 0.5,
    borderColor: '#aaaaaa',
    borderRadius: 20,
    backgroundColor: "#FFFFFF"
  }
});

function HomeScreen4() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <CustomHeader bgcolor='white' title="Home" isHome={true} navigation={this.props.navigation} /> */}

      <View style={{ flexDirection: 'row', height: 60, borderBottomColor: '#cccccc', borderBottomWidth: 1, paddingBottom: 10 }} >
        <View style={{ height: 50, padding: 12 }}>
          <Image source={IMAGE.ICON_Profile}
            style={{ height: 35, width: 35, borderRadius: 60 }}
          >
          </Image>
        </View>

        <View style={{ flex: 2, justifyContent: 'center', paddingTop: 10, paddingEnd: 10, }}>
          {/* <Text style={{ textAlign: 'center' }}>zczczxc</Text> */}
          <TextInput placeholder="What's on your mind" underlineColorAndroid='transparent' style={styles.TextInputStyleClass} />

        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


        <Text>Home!xx</Text>
        <TouchableOpacity style={{ marginTop: 20 }}
          onPress={() => this.props.navigation.navigate('SettingsScreen')}
        >
          <Text>Go Home Details</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

function SettingsScreen4() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

// const Tab = createBottomTabNavigator();

const Tab = createMaterialTopTabNavigator();



const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator()
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}
const StackSetting = createStackNavigator()

function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingsScreen} options={navOptionHandler} />
      <StackSetting.Screen name="SettingDetail" component={SettingsScreenDetail} options={navOptionHandler} />
    </StackSetting.Navigator>
  )
}

function TabNavigator() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
    // screenOptions={({ route }) => ({
    // tabBarLabel: ({ focused, color, size }) => {
    //           let iconName;

    //           if (route.name === 'Home') {
    //             iconName = focused
    //               ? IMAGE.ICON_HOME
    //               : IMAGE.ICON_HOME_BLACK;
    //           } else if (route.name === 'Settings') {
    //             iconName = focused
    //               ? IMAGE.ICON_SETTING
    //               : IMAGE.ICON_SETTING_BLACK;
    //           }

    //           // You can return any component that you like here!
    //           return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
    //         },
    //       })}
    //       tabBarOptions={{
    //         activeTintColor: 'red',
    //         inactiveTintColor: 'gray',
    //       }}

    // tabBarOptions={{
    //     showIcon: false, 

    //     showLabel: true,
    //     activeTintColor: '#8e0000',
    //     labelStyle: {},
    //   }}
    >
      <Tab.Screen
        name="Post"
        component={CreatePost}


        options={navOptionHandler, {
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_HOME_BLACK
              : IMAGE.ICON_HOME;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingStack}
        options={{
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_SETTING_BLACK
              : IMAGE.ICON_SETTING;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}

      />

      <Tab.Screen
        name="Notification"
        component={NotificationScreen}


        options={navOptionHandler, {
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_BELL_BLACK
              : IMAGE.ICON_BELL_WHITE;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}
      />
      <Tab.Screen
        name="member"
        component={MemberProfile}
        options={{
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_USER_BLACK
              : IMAGE.ICON_USER_WHITE;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}

      />
       <Tab.Screen
        name="menu"
        component={MenuScreen}
        options={{
          tabBarLabel: ({ focused, color, size }) => {

            iconName = focused
              ? IMAGE.ICON_MENU_ORRANGE
              : IMAGE.ICON_MENU;

            return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
          }
        }}

      />


    </Tab.Navigator>
    // {/* // </NavigationContainer> */}
  )
}
// function TabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused
//               ? IMAGE.ICON_HOME
//               : IMAGE.ICON_HOME_BLACK;
//           } else if (route.name === 'Settings') {
//             iconName = focused
//               ? IMAGE.ICON_SETTING
//               : IMAGE.ICON_SETTING_BLACK;
//           }

//           // You can return any component that you like here!
//           return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'red',
//         inactiveTintColor: 'gray',
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeStack} />
//       <Tab.Screen name="Settings" component={SettingStack} />
//     </Tab.Navigator>

//   )
// }

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab" drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Login">
        <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler} />
        <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
        <StackApp.Screen name="Login2" component={Login2Screen} options={navOptionHandler} />
        <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
        <StackApp.Screen name="NewPost" component={NewPost} options={navOptionHandler} />
        {/* <StackApp.Screen name="NotificationScreen" component={NotificationScreen} options={navOptionHandler} /> */}
      </StackApp.Navigator>
    </NavigationContainer>
  );
}