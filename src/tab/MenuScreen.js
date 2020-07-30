import React, { Component } from 'react';
import { Text, ScrollView, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import { Avatar, Caption, Title, Paragraph } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

import { CustomHeader } from '../index';

import AsyncStorage from '@react-native-community/async-storage';
import { CardViewWithIcon } from "react-native-simple-card-view";

import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { IMAGE } from '../constants/image';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1





const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)

const styles = StyleSheet.create({
    overview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingHorizontal: 25,
    },
    // card: {
    //     borderWidth: 1,
    //     padding: 25,
    //     marginTop: 25,
    //     shadowColor: "#000",
    //     shadowOffset: {
    //         width: 0,
    //         height: 0,
    //     },
    //     shadowOpacity:1,
    //     shadowRadius: 10,

    //     elevation: 11,
    // }
    card: {
        height: 120,
        width: (Dimensions.get("window").width / 2) - 20,
        // width: "50%",
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        alignItems: 'center',


        margin: 5
    }, scrollContainer: {
        flex: 1,
    }, container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
});


const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };
export class MenuScreen extends Component {

    initialState = {
        [_today]: { disabled: false }
    }

    constructor() {
        super();

        this.state = {
            _markedDates: this.initialState
        }
    }

    onDaySelect = (day) => {

        const _selectedDay = moment(day.dateString).format(_format);
        console.log("ssssssssssssssssss : " + _selectedDay);

        let marked = true;
        let markedDates = {}
        if (this.state._markedDates[_selectedDay]) {
            // Already in marked dates, so reverse current marked state
            marked = !this.state._markedDates[_selectedDay].marked;
            markedDates = this.state._markedDates[_selectedDay];
        }

        markedDates = { ...markedDates, ...{ marked } };

        // Create a new object using object property spread since it should be immutable
        // Reading: https://davidwalsh.name/merge-objects
        const updatedMarkedDates = { ...this.state._markedDates, ...{ [_selectedDay]: markedDates } }

        // Triggers component to render again, picking up the new state
        this.setState({ _markedDates: updatedMarkedDates });
    }

    render() {
        const miniCardStyle = {
            padding: 5, margin: 5, elevation: 3,
        };
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, paddingLeft: 15, paddingTop: 15 }}>Menu</Text>

                        <View style={styles.container}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                                <Card style={styles.card} >
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_MENU_PERIOD1}
                                                style={{ height: 55, width: 55 }}
                                            >
                                            </Image>
                                        </View>

                                        <Text style={{ marginTop: 5 }}>Calandar</Text>

                                    </View>

                                </Card>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('PeriodCalandar')}>
                                <Card style={styles.card} >
                                    <View style={{ alignItems: "center" }} >
                                        <View style={{ height: 70, padding: 10 }}>
                                            <Image source={IMAGE.ICON_MENU_METER}
                                                style={{ height: 55, width: 55 }}
                                            >
                                            </Image>
                                        </View>
                                        <Text style={{ marginTop: 5 }}>Period Meter</Text>

                                    </View>

                                </Card>
                            </TouchableOpacity>
                            {/* <Card style={styles.card}>
                                <View >
                                    <View style={{ height: 70, padding: 10 }}>
                                        <Image source={IMAGE.ICON_MENU_METER}
                                            style={{ height: 55, width: 55 }}
                                        >
                                        </Image>
                                    </View>
                                    <Text style={{ marginTop: 5 }}>Period Meter</Text>
                                </View>
                            </Card> */}

                        </View>
                        <View style={styles.container}>

                            <Card style={styles.card}>
                                <View >
                                    <View style={{ height: 70, padding: 10 }}>
                                        {/* <Image source={IMAGE.ICON_MENU_METER}
                                            style={{ height: 55, width: 55}}
                                        >
                                        </Image> */}
                                    </View>
                                    <Text >gg</Text>
                                </View>
                            </Card>
                            <Card style={styles.card}>
                                <View >
                                    <View style={{ height: 70, padding: 10 }}>
                                        {/* <Image source={IMAGE.ICON_MENU_METER1}
                                            style={{ height: 55, width: 55}}
                                        >
                                        </Image> */}
                                    </View>
                                    <Text >gg</Text>
                                </View>
                            </Card>

                        </View>
                        <View style={{ alignItems: "center", flexDirection: "row", flexWrap: 'wrap', }}>
                            {/* <CardViewWithIcon
                                // withBackground={ false }
                                androidIcon={'logo-github'}
                                iosIcon={'logo-github'}
                                iconHeight={30}
                                iconColor={'#333'}
                                title={'GITHUB'}
                                contentFontSize={20}
                                titleFontSize={12}



                            />
                            <CardViewWithIcon
                                withBackground={false}
                                androidIcon={'logo-youtube'}
                                iosIcon={'logo-youtube'}
                                iconHeight={30}
                                iconColor={'#ff0000'}
                                title={'YOUTUBE'}
                                contentFontSize={10}
                                titleFontSize={12}

                                style={miniCardStyle}
                            />
                            <CardViewWithIcon
                                withBackground={false}
                                androidIcon={'logo-youtube'}
                                iosIcon={'logo-youtube'}
                                iconHeight={30}
                                iconColor={'#ff0000'}
                                title={'YOUTUBE'}
                                contentFontSize={10}
                                titleFontSize={12}
                                style={miniCardStyle}
                            /> */}


                        </View>



                    </View>


                    <View style={{ flex: 1 }}>
                        <Calendar
                            theme={{
                                dotColor: 'pink',
                            }}

                            // we use moment.js to give the minimum and maximum dates.
                            minDate={_today}
                            // maxDate={_maxDate}

                            // hideArrows={true}

                            onDayPress={this.onDaySelect}
                            markedDates={this.state._markedDates}
                        />
                       
                    </View>
                </ScrollView>


            </SafeAreaView>


        );
    }
}
