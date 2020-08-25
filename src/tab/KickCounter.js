import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, ScrollView, TouchableWithoutFeedback, TouchableNativeFeedback, Alert, FlatList } from 'react-native';
import { IMAGE } from '../constants/image';

import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Icon } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Database from '../Database';
import moment from 'moment' // 2.20.1
import { List, ListItem, Left, Body, Right } from 'native-base';
import *as Animatable from 'react-native-animatable';
import { BarChart, Grid } from 'react-native-svg-charts'
const db = new Database();
var j = 0;

const _format = 'YYYY-MM-DD'

const _today = moment().format(_format)

export class KickCounter extends Component {

    constructor(props) {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        super(props);


        this.state = {
            _current_date: date,
            _list_kcData: [],

            _kick_count: 0,
            increment: 0,


        }


    }
    componentDidMount() {

        this.getData();
        this.getaAllClickData();
    }

    saveData() {
        j = 1;
        this.setState({
            increment: j,
        });

        this.getData();

    }
    getaAllClickData() {

        db.listAllKickCount().then((results) => {
            result = results;
            this.setState({
                isLoading: false,
                _list_kcData: results,
            });


        }).catch((err) => {
            console.log(err);
        })
    }
    getData() {
        var temp;
        let data = {
            kcDate: this.state._current_date.toString(),
            kcValue: this.state._kick_count,
        }
        db.listKickCount(data).then((results) => {
            result = results;

            if (result == 0) {
                db.addKickCount(data).then((results) => {

                }).catch((err) => {
                    console.log(err);
                })


            } else {
                var _clickValue;
                for (var i = 0; i < result.length; i++) {
                    _clickValue = result[i].kcCount;
                    temp = _clickValue + this.state.increment;
                }

                this.setState({
                    isLoading: false,
                    _kick_count: temp,

                });

                let data = {
                    kcDate: this.state._current_date.toString(),
                    kcValue: this.state._kick_count,
                }

                db.updateClickCount(data).then((result) => {
                    // console.log(result);
                    this.setState({
                        // isLoading: false,
                    });

                }).catch((err) => {
                    console.log(err);
                    this.setState({
                        // isLoading: false,
                    });
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    keyExtractor = (item, index) => index.toString()
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
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>Kick counter</Text>
                        <Text style={{ color: 'white' }}>press on foot after kick</Text>
                    </View>
                    {/* <View style={styles.backgroundImage} >

                        <ImageBackground
                            source={IMAGE.ICON_BABY_KICK1}
                            style={{ width: 420, height: 280, marginLeft: 0, marginTop: -65, alignItems: 'flex-start', resizeMode: 'cover', position: 'absolute' }}>
                            <View style={{ marginTop: 65, marginLeft: 20 }}>
                                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Kick counter</Text>
                                <Text>press on foot after kick</Text>
                            </View>
                        </ImageBackground>
                    </View> */}
                </View>
                <View style={styles.footer}>
                    {/* <View style={{ paddingLeft: 18, paddingTop: 15 }}>
                        // <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Constraction timer</Text>
                        // <Text style={{ color: 'gray' }}>press on foot after kick</Text>
                    </View> */}
                    {/* <ScrollView

                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                         */}
                    {/* <ScrollView
                        contentInsetAdjustmentBehavior="automatic"
                        style={styles.scrollView}

                    > */}
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon

                                name='calendar'
                                type='font-awesome'
                                color='gray'
                                iconStyle={{ fontSize: 13,paddingTop:3 }}
                                onPress={() => console.log('hello')} />
                            <Text style={{paddingLeft:10}}>Kicks on {this.state._current_date}</Text>
                        </View>



                        <Text style={{ fontSize: 22, paddingBottom: 10 }}>{this.state._kick_count}</Text>
                        <AnimatedCircularProgress
                            size={152}
                            rotation={0}
                            width={8}
                            fill={(this.state._kick_count / 10) * 100}
                            tintColor="#f78a2c"
                            backgroundColor="#cfd8dc">
                            {
                                (fill) => (
                                    <TouchableOpacity style={styles.button5}
                                        // onPress={() => console.log('hello')}

                                        onPress={() => this.saveData()}

                                    >
                                        <Image style={{ width: 75, height: 75, marginLeft: 0, marginTop: 0 }}
                                            source={IMAGE.ICON_BABY_FOOT2}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </AnimatedCircularProgress>
                        {/* <Text>sdasd: {this.state._list_kcData}</Text> */}


                    </View>
                    <View style={{ flex: 1, marginTop: 10, paddingHorizontal: 10, }}>
                        <Text style={{ paddingBottom: 5, fontSize: 18, fontWeight: 'bold' }}>History</Text>
                        <FlatList

                            style={{
                                backgroundColor: 'white', marginVertical: 0,
                                //  borderRadius: 16,
                                elevation: 2,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.7,
                                shadowRadius: 8,

                            }}
                            keyExtractor={this.keyExtractor}
                            data={this.state._list_kcData}

                            // renderItem={this.renderItem}

                            renderItem={({ item }) => <ListItem
                                style={{
                                    height: 50, paddingTop: 15,

                                }}
                            >
                                <Left>
                                    <View style={styles.iconMore}>

                                        <Icon
                                            name='calendar'
                                            type='font-awesome'
                                            color='gray'
                                            iconStyle={{ fontSize: 18 }}
                                            onPress={() => console.log('hello')} />
                                    </View>
                                </Left>
                                <Body style={{ marginLeft: -160 }}>
                                    <Text style={{ color: 'gray', fontSize: 12 }}>{item.kcDate}</Text>
                                    <Text style={styles.dateText}><Text style={{ color: 'gray', fontSize: 12 }}>Kick count is :</Text> {item.kcCount} </Text>
                                </Body>
                                <Right>
                                    <View style={styles.iconMore}>
                                        <Icon
                                            type='font-awesome'
                                            color='gray'
                                            iconStyle={{ fontSize: 18 }}
                                            name="trash-o" color="gray" />
                                    </View>
                                </Right>
                            </ListItem>
                            }
                        />
                    </View>
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
        borderRadius: 55,
        elevation: 5, // Android
        height: 120,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor: '#ef5d9a',
        // borderWidth: 4,
    }
});