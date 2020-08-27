import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { IMAGE } from '../constants/image';

import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import StepIndicator from 'react-native-step-indicator';


import Database from '../Database';
import *as Animatable from 'react-native-animatable';
const db = new Database();



const labels = ["1st month", , "3rd month ", "5thmonth", "7th month", "9th month"];
const customStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 10,
    currentStepLabelColor: 'gray'
}
export class EDDCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0
        }
    }
    componentDidMount() {
        db.loadDB();
        let edd = [];
        let _plastdate = "";
        db.getEddDate().then((datat) => {
            edd = datat;
            for (var i = 0; i < edd.length; i++) {
                _plastdate = edd[i].pName

                console.log("dsdssd : " + _plastdate);

            }

        });
    }
    onPageChange(position) {
        this.setState({ currentPosition: position });
    }
    render() {
        const data = [10, 5, 25, 15, 20]

        const CUT_OFF = 20
        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={index}
                    x={x(index) + (bandwidth / 2)}
                    y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                    fontSize={14}
                    fill={value >= CUT_OFF ? 'white' : 'black'}
                    alignmentBaseline={'middle'}
                    textAnchor={'middle'}
                >
                    {value}
                </Text>
            ))
        )
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fbb146' }}>
                <CustomHeader bgcolor='#fbb146' title="Home detail" navigation={this.props.navigation} bdcolor='#fbb146' />

                <View style={styles.header}>
                    <View style={{ marginTop: 0, marginLeft: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>EDD calculation</Text>
                        <Text style={{ color: 'white' }}>Expected date of delivery</Text>
                    </View>

                </View>
                <View style={styles.footer}>

                    <View style={{ justifyContent: 'center', padding: 10, paddingTop: 30 }}>



                        <StepIndicator
                            customStyles={customStyles}
                            currentPosition={5}
                            stepCount={9}
                            labels={labels}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center',marginTop:20 }}>
                            <AnimatedCircularProgress
                                size={200}
                                rotation={0}
                                width={8}
                                fill={50}
                                tintColor="#f78a2c"
                                backgroundColor="#cfd8dc">
                                {
                                    (fill) => (

                                        <TouchableOpacity style={styles.button5}

                                        // onPress={() => console.log('hello')}

                                        // onPress={() => this.saveData()}

                                        >
                                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 70, fontWeight: 'bold' }}>25</Text>
                                                <Text style={{ fontSize: 20, }}>days left</Text>
                                            </View>

                                            {/* <Image style={{ width: 75, height: 75, marginLeft: 0, marginTop: 0 }}
                                            source={IMAGE.ICON_BABY_FOOT2}
                                            resizeMode="contain"
                                        /> */}
                                        </TouchableOpacity>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>


                    </View>
                    {/* <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
                        <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>

                    </View> */}
                    {/* </ScrollView> */}

                </View>

            </SafeAreaView>
        );
    }
} const styles = StyleSheet.create({

    button6: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    }, footer: {
        flex: 6,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // paddingVertical: 30,
        //  paddingHorizontal: 20
    }, header: {
        flex: 1,
        backgroundColor: '#fbb146'
        // justifyContent: 'center',
        // alignItems: 'center',
    }, backgroundImage: {
        // height: height,
        position: "absolute",

        resizeMode: 'cover',

        // resizeMode: 'cover', // or 'stretch'
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }, button5: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        borderRadius: 105,
        elevation: 5, // Android
        height: 170,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }
});