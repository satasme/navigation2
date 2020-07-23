import React, { Component } from 'react';
import { Text, ScrollView, Image, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGE } from '../constants/image';
import LinearGradient from 'react-native-linear-gradient';


export class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <CustomHeader title="Login" isHome={true} navigation={navigation} /> */}
          <View style={{ flex:1, justifyContent: 'center' , alignItems: 'center'}}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginTop:50}}> Welcome To 
            
            <Text  style={{color:'#ff9100',}}>  App</Text>
            </Text>
            <Text style={{fontSize:14}}>Enjoy the experience</Text>
         
            <Image style={{ width: 210, height: 320, marginLeft: 0 }}
              source={IMAGE.ICON_LOGIN}
              resizeMode="contain"

            />
            {/* <Text >Login!</Text>
            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => this.props.navigation.navigate('Login2')}

            >
              <Text>Login</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => this.props.navigation.navigate('Login2')}

            >
              <LinearGradient colors={['#fbb146', '#f78a2c']}
                // '#ffd600',
                // locations={[1,0.3,0.5]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0.9 }}
                // locations={[0.3, 0.6,1]} 
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                  Sign in
  </Text>
              </LinearGradient>
            </TouchableOpacity>

            

            <Text style={{marginTop:20}}>Don't have account? <Text  onPress={() => this.props.navigation.navigate('Register')} style={{color:'#ff9100'}}>create new Account</Text> </Text>

            {/* <TouchableOpacity style={{ marginTop: 20 }}
              onPress={() => this.props.navigation.navigate('Register')}

            >
              <LinearGradient colors={['#fbb146', '#f78a2c']}
                // '#ffd600',
                // locations={[1,0.3,0.5]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0.9 }}
                // locations={[0.3, 0.6,1]} 
                style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                  Sign in
  </Text>
              </LinearGradient>
            </TouchableOpacity> */}
            
            

            
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    width: 280,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },circleGradient: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  },
});
