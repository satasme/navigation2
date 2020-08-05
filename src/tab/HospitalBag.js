import React, { Component, useState } from 'react';
import { Modal, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch } from 'react-native';

import { CustomHeader } from '../index';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment' // 2.20.1

import RBSheet from "react-native-raw-bottom-sheet";
import { TextInput, Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-elements';
import { List, ListItem, Left, Body, Right } from 'native-base';

import Database from '../Database';

const db = new Database();

export class HospitalBag extends Component {


    toggleSwitch = (value) => {
        this.setState({ switchValue: value })
    }

    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            isLoading: true,
            mother_bag: [],
            notFound: 'mother bag not found.\nPlease click (+) button to add it.',
            switchValue: true,



        }
    }
    componentDidMount() {

        // db.loadDB();
        // const data = new FormData();
        // data.append("get_about", "true");

        // fetch('https://cyrenaic-pounds.000webhostapp.com/tr_reactnative/getHospitalBagMother.php', {
        //     method: 'post',
        //     body: data,
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {

        //         this.setState({
        //             isLoading: false,
        //             dataSource: responseJson
        //         }, function () {

        //         });
        //         id = "";
        //         hName = "";


        //         for (var i = 0; i < responseJson.length; i++) {

        //             id = responseJson[i].id
        //             hName = responseJson[i].hName

        //             console.log('source eke value eka @@@@@@@@  : ' + hName);


        //         }



        //     }).catch((error) => {
        //         console.error(error)
        //     }),


        let result;
        db.listBag().then((data) => {
            result = data;
            console.log("@@@@@@@@@@@@@@fff : " + result);
            if (result == 0) {
                db.addItemOfMother_bag().then((result) => {
                    console.log(result);

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                let mother_bag = [];
                let _hstatus;
                db.listMotherBagItems().then((data) => {
                    mother_bag = data;

                  
                      
                    this.setState({
                        mother_bag,
                        isLoading: false,
                     
                    });
                }).catch((err) => {
                    console.log(err);
                    this.setState = {
                        isLoading: false
                    }
                })

            }
        }).catch((err) => {
            console.log(err);

        })
    }
    keyExtractor = (item, index) => index.toString()

    // renderItem = ({ item }) => (


       

        // <ListItem

        // titleStyle={{fontSize:14}}
        //     title={item.hName}
        //     //   leftAvatar={{
        //     //     source: item.prodImage && { uri: item.prodImage },
        //     //     title: item.prodName[0]
        //     //   }}
        //       onPress={() => {
        //         this.props.navigation.navigate('ProductDetails', {
        //           prodId: `${item.hId}`,
        //         });
        //       }}

        //     switch

        //     // switched={1}


        //     bottomDivider

        // >

        // </ListItem>
    // )
    render() {
       
        // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
        let value=0;

        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>

                    {/* <ActivityIndicator size="large" color="#0000ff"/> */}
                </View>
            )
        }
        if (this.state.mother_bag.length === 0) {
            return (
                <View>
                    <Text style={styles.message}>{this.state.notFound}</Text>
                </View>
            )
        }
        return (
            
            <SafeAreaView style={{ flex: 1, }}>
                {/* <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}> */}
                <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
                <View style={{ flex: 1, padding: 0 }}>
                    <FlatList

                        keyExtractor={this.keyExtractor}
                        data={this.state.mother_bag}
                        // renderItem={this.renderItem}

                        renderItem={({ item }) => <ListItem >
                            

                            <Body>
                                <Text>{item.hName}</Text>
                                <Text>{item.hStatus}</Text>
                            </Body>
                            <Right>
              
                                <Switch
                                    style={{ marginTop: 0 }}
                                    // onValueChange={this.toggleSwitch}
                                    
                                    value={isEnabled} />
                            </Right>
                        </ListItem>



                        } />
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>
        );
        // <SafeAreaView style={{ flex: 1, }}>
        //     <ScrollView
        //         contentInsetAdjustmentBehavior="automatic"
        //         style={styles.scrollView}>
        //         <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
        //         <View style={{ flex: 1, padding: 10 }}>

        //             <TouchableOpacity onPress={() => this.savePeriod()} style={styles.button}>
        //                 <Text style={styles.buttonText}>Period Start ?</Text>


        //             </TouchableOpacity>
        //         </View>

        //         <View style={{ flex: 1 }}>


        //         </View>
        //     </ScrollView>
        // </SafeAreaView>

    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 25,
        // width:'200',
        width: 300,

        marginTop: 20
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    },
});