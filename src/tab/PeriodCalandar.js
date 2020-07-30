import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1

// import SwipeablePanel from 'rn-swipeable-panel';
import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-elements';

import Database from '../Database';



const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(31, 'days').format(_format)

const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
const workout = { key: 'workout', color: 'green' };


const db = new Database();
export class PeriodCalandar extends Component {


    initialState = {
        [_today]: { disabled: false }
    }

    constructor(props) {
        super(props);

        this.state = {
            _markedDates: this.initialState,

            // abc: '',


            pId: '',
            pName: '',
            isLoading: false,
        }
    }
    componentDidMount() {
        db.loadDB();
    }
    savePeriod() {
        this.setState({
            isLoading: true,
        });
        let data = {
            pId: this.state.pId,
            pName: this.state.pName,
        }
        db.adderiod(data).then((result) => {
            console.log(result);
            this.setState({
                isLoading: false,
            });
            //   this.props.navigation.state.params.onNavigateBack;
            //   this.props.navigation.goBack();
        }).catch((err) => {
            console.log(err);
            this.setState({
                isLoading: false,
            });
        })
    }
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }
    geteriods() {
        // console.log("lllllllllllllllllllllllllllllllll...");
        let products = [];
        db.listProduct().then((data) => {
          products = data;
          console.log("period tttttrrrrrrrrrrrrrrrrrrrrrrrrrrrr :  "+data);
          this.setState({
            products,
            isLoading: false,
          });
        }).catch((err) => {
          console.log(err);
          this.setState = {
            isLoading: false
          }
        })
      }

    onDaySelect = (day) => {
        this.RBSheet.open();
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
        this.setState({
            _markedDates: updatedMarkedDates,
            pName: _selectedDay
        });

    }


    renderContent = () => { }

    renderHeader = () => { }
    render() {
        console.log("set sate eke value eka  : " + this.state.pName);
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fce4ec' }}>
                <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
                <View style={{ flex: 1, }}>
                    <Calendar
                        theme={{
                            dotColor: 'pink',
                            backgroundColor: '#ccc'
                        }}

                        // we use moment.js to give the minimum and maximum dates.
                        minDate={_today}
                        // maxDate={_maxDate}

                        // hideArrows={true}

                        // onDayPress={this.onDaySelect}
                        // onPress={() => this.RBSheet.open()}
                        onDayPress={this.onDaySelect}

                        // onDaySelect={()=>this.RBSheet.open()}
                        markedDates={this.state._markedDates}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                        <Text style={{ color: 'grey' }}>Period</Text>
                        <Text style={{ fontSize: 40, }}>3 Days left</Text>
                        <Text style={{ color: 'grey' }}>Ovulation 12 days left</Text>


                        <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('TestScreeen')} >
                            <Text>dsdsdsd</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 30 }} onPress={() => this.props.navigation.navigate('ProductScreen2')} >
                            <Text>View</Text>
                        </TouchableOpacity>
                    </View>


                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={300}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopRightRadius: 20,
                                borderTopLeftRadius: 20
                            }
                        }}

                    >
                        <View style={{ flex: 1 }}>

                            <Text >  </Text>
                            {/* onPress={() => alert('Hello, world!')} */}
                            <TouchableOpacity     onPress={() => this.savePeriod()}  style={styles.button}>
                                <Text style={styles.buttonText}>Pick a photo</Text>


                            </TouchableOpacity>
                            <TouchableOpacity     onPress={() => this.geteriods()}  style={styles.button}>
                                <Text style={styles.buttonText}>Pick a photo</Text>


                            </TouchableOpacity>
                            

                            {/* <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 24 }}>


                            </View> */}

                            <TextInput value={this.state.pId} onChangeText={(text) => this.updateTextInput(text, 'pId')} style={{ height: 50, width: 250 }} />

                            <TextInput value={this.state.pName} onChangeText={(text) => this.updateTextInput(text, 'pName')} style={{ height: 50, width: 250 }} />


                        </View>
                    </RBSheet>
                </View>

                <View style={{ flex: 1 }}>


                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "pink",
        padding: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    },
});