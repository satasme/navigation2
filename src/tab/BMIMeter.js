import React, { Component } from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Avatar, Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

import { CustomHeader } from '../index';
import { IMAGE } from '../constants/image';

import AsyncStorage from '@react-native-community/async-storage';
import RNSpeedometer from 'react-native-speedometer';

import *as Animatable from 'react-native-animatable';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import * as Progress from 'react-native-progress';
// import FusionCharts from "react-native-fusioncharts";

export class BMIMeter extends Component {
    state = {
        value: 0,
        _bmiVal: 0
    };
    // componentDidMount = () => AsyncStorage.getItem('name').then((value) => this.setState({ 'name': value }))
    componentDidMount = async () => {

        this.setState({
            value: 20,
            _bmiVal: await AsyncStorage.getItem('bmi_value'),
        });


        // console.log("<<<<<<<<<<<< >>>>>>>>>>>>>>>  : " + this.state._bmiVal);
    }

    // onChange = (value) => this.setState({ value: 20});
    render() {
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <CustomHeader bgcolor='white' title="BMI Meter" navigation={this.props.navigation} bdcolor='white' />
                <View style={{ flex: 1 }}>

                    <View style={styles.innerCircle} />
                    <View style={styles.innerCircle2} />
                    <View style={styles.innerCircle3} />

                    <Image style={{ width: 160, height: 380, alignSelf: "center", }}
                        source={IMAGE.ICON_FEMALE}
                        resizeMode="stretch"
                    />

                </View>
                <Animatable.View style={styles.footer} animation="fadeInUpBig">
                    <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}

                    >
                        {/* <View style={{ padding: 30 }}> */}
                        <Card style={styles.card} >
                            <View style={{ alignItems: "center" }} >
                                {/* <View style={{ }}> */}
                                <Text style={{ fontSize: 70, fontWeight: "bold", marginTop: -10, }}>{this.state._bmiVal}</Text>
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: -10 }}>
                                    <Text style={{ paddingEnd: 20, color: 'grey' }}>Height:25.25</Text>
                                    <Text style={{ color: 'grey' }}>Weight:25.25</Text>
                                </View>
                                {/* </View> */}
                                <Text>Perfect weigth  </Text>
                                <Progress.Bar style={{ marginTop: 5 }} progress={0.9} height={18} color={'#00796b'} borderRadius={20} width={250} />
                            </View>
                        </Card>
                        {/* </View> */}

                        {/* <TextInput placeholder="Speedometer Value" style={styles.textInput} onChangeText={this.onChange} /> */}
                        <RNSpeedometer
                            value={Number.parseInt(this.state._bmiVal)}
                            //value for Speedometer
                            size={300}
                            //Size of Speedometer
                            minValue={0}
                            //Min value for Speedometer
                            maxValue={40}
                            //Max value for Speedometer
                            // allowedDecimals={0}
                            //Decimals value allowed or not
                            labels={[
                                {
                                    name: 'Low Risk',
                                    labelColor: '#ff2900',
                                    activeBarColor: '#ffd600',
                                
                                    
                                },
                                {
                                    name: 'Medium Risk',
                                    labelColor: '#f4ab44',
                                    activeBarColor: '#1faa00',
                                },
                                {
                                    name: 'High Risk',
                                    labelColor: '#00ff6b',
                                    activeBarColor: '#ff6d00',
                                },
                                {
                                    name: 'Observe Risk',
                                    labelColor: '#00ff6b',
                                    activeBarColor: '#d50000',
                                
                                },
                            ]}
                        //Labels for the different steps of Speedometer
                        />
                        <View style={{ marginTop: 40, padding: 10 }}>
                           

                        </View>
                    </ScrollView>
                </Animatable.View>


            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInput: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'black',
        height: 25,
        fontSize: 16,
        marginVertical: 50,
        marginHorizontal: 20,
    }, footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    innerCircle: {
        borderRadius: 35,
        width: 60,
        height: 60,
        marginLeft: 215,
        backgroundColor: 'pink',
        position: 'absolute',
    },
    innerCircle2: {
        borderRadius: 35,
        width: 60,
        height: 60,
        marginLeft: 70,
        marginTop: 40,
        backgroundColor: '#bbdefb',
        position: 'absolute',
    },
    innerCircle3: {
        borderRadius: 35,
        width: 50,
        height: 50,
        marginLeft: 105,
        marginTop: 120,
        backgroundColor: '#c8e6c9',
        position: 'absolute',
    }, card: {
        // height: 250,
        // width: (Dimensions.get("window").width / 2) - 20,
        // width: "45%",
        backgroundColor: "white",
        borderRadius: 25,

        padding: 10,
        elevation: 4,
        shadowColor: '#000',
        // shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',


        margin: 20
    }
});