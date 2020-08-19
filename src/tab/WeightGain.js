import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Image, ImageBackground, Dimensions, FlatList, ScrollView } from 'react-native';
import { IMAGE } from '../constants/image';

import { CustomHeader } from '../index';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { LineChart, } from "react-native-chart-kit";
import * as Progress from 'react-native-progress';
import Database from '../Database';
// import Icon from 'react-native-vector-icons/Fontisto';
import { List, ListItem, Left, Body, Right } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements'
import *as Animatable from 'react-native-animatable';
const w = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;


const db = new Database();
export class WeightGain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _list_wgData: [],

      dataSource: 10,
      data: {
        labels: ["j"],

        datasets: [
          {
            data: [1],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`, // optional
          },
          // {
          //   data: [1],
          //   strokeWidth: 2,
          //   color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
          // },
          //  {
          //   data: [1],
          //   strokeWidth: 2,
          //   color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
          // },
        ]
      }
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const self = this;
    db.listWeightGain().then((data) => {

      result = data;
      if (result == 0) {
        db.addItemOfWeightGain().then((result) => {
        }).catch((err) => {
          console.log(err);
        })
      } else {
        var temp2 = [];
        var temp3 = [];
        // var temp4 = [];
        // var temp5 = [];
        var _monthDate;

        const dataClone = { ...self.state.data }
        for (var i = 0; i < result.length; i++) {
          _monthDate = result[i].wgDate;

          console.log(">>>>>>>>>>>>>>>>>> : " + _monthDate);

          temp2.push([result[i].wgValue]);
          temp3.push([_monthDate]);
          // temp4.push([result[i].bpmin]);
          // temp5.push([result[i].bpmax]);

        }
        dataClone.labels = temp3;
        dataClone.datasets[0].data = temp2;
        // dataClone.datasets[1].data = temp4;
        // dataClone.datasets[2].data = temp5;

        self.setState({
          isLoading: false,
          data: dataClone,
          _list_wgData: data,
        });

      }
    }).catch((err) => {
      console.log(err);
    })
  }
  saveWeight(){
    this.props.navigation.navigate('AddWeight')
  }
  keyExtractor = (item, index) => index.toString()
  render() {
    const chartConfig = {
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientFromOpacity: 10,
      backgroundGradientTo: "#FFFFFF",
      backgroundGradientToOpacity: 0.8,
      color: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader bgcolor='#f2f2f2' title="Home detail" navigation={this.props.navigation} bdcolor='#f2f2f2' />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{ flex: 1 }}>
            {/* <View style={styles.backgroundImage} > */}
            {/* <Card  style={styles.cardHorizontal}> */}
            <LineChart
              data={this.state.data}

              width={Dimensions.get("window").width - 20}
              // yAxisLabel={"$"}
              height={175}
              bezier
              verticalLabelRotation={-10}
              chartConfig={chartConfig}
              style={{
                marginVertical: 0,
                borderRadius: 16,
                elevation: 4,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.7,
                shadowRadius: 8,
                // alignItems: 'center',
                backgroundColor: '#FFFFFF',
                marginHorizontal: 10
              }}
            />
            {/* </Card> */}
            <Animatable.View animation="zoomInUp" style={{ flex: 1, alignItems: 'center', }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 60, fontWeight: "bold", marginTop: 0 }}>62.5</Text>
                <Text style={{ marginTop: 40, fontSize: 20, }}>kg</Text>
              </View>

              <Progress.Bar progress={0.8} width={screenWidth - 20} color={'#f78a2c'} style={{ marginTop: 0 }} borderRadius={5} />
            </Animatable.View >
          
            <Animatable.View animation="fadeInUp" style={{ flex: 1, marginTop: 10, paddingHorizontal: 10 }}>
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
                data={this.state._list_wgData}

                // renderItem={this.renderItem}

                renderItem={({ item }) => <ListItem
                  style={{
                    height: 50, paddingTop: 15,

                  }}

                >
                  <Left>
                    <View style={styles.iconMore}>
                      {/* <Icon name="rightsquare" color="gray" /> */}
                      <Icon

                        name='line-chart'
                        type='font-awesome'
                        color='gray'
                        iconStyle={{ fontSize: 18 }}
                        onPress={() => console.log('hello')} />
                    </View>
                  </Left>
                  <Body style={{ marginLeft: -160 }}>
                    <Text style={{ color: 'gray', fontSize: 12 }}>{item.wgDate}</Text>
                    <Text style={styles.dateText}>{item.wgValue} kg</Text>
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


              <TouchableOpacity   onPress={() => this.saveWeight()}  style={{
                backgroundColor: '#f78a2c', padding: 10,
                borderRadius: 25,
                marginTop:20,
                
              }}>
                <Text style={styles.buttonText}>Period Start ?</Text>


              </TouchableOpacity>
            </Animatable.View>
            {/* </View> */}
          </View>
          {/* <View style={styles.footer}>
          <View style={{ paddingLeft: 18, paddingTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Most Popular Exercises</Text>
            <Text style={{ color: 'gray' }}>Keeps your waist in shape</Text>
          </View>
          <ScrollView

            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.container}>
             
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG1}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG2}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG3}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG4}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG5}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
              <Card style={styles.card}>
                <Image source={IMAGE.ICON_EX_IMG6}
                  style={{ height: 140, width: 190 }}>
                </Image>
              </Card>
            </View>

         
        </View> */}
        </ScrollView>
      </SafeAreaView>
    );
  }
} const styles = StyleSheet.create({

  button: {
    backgroundColor: "#6a1b9a",
    padding: 10,
    borderRadius: 25,
    // width:'200',
    width: (Dimensions.get("window").width - 50),
    marginTop: 15,
    marginLeft: 18,
    marginVertical: 5
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  }, dateText: {
    fontSize: 15,
    color: '#000',
  }, insText: {
    color: "grey",
    fontSize: 12,
    marginLeft: 19,

  }, footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingVertical: 30,
    //  paddingHorizontal: 20
  }, header: {
    flex: 1,
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
  }, card: {
    height: 185,
    // width: (Dimensions.get("window").width / 2) - 20,
    // width: "45%",
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
  }, cardHorizontal: {
    height: 175,
    backgroundColor: 'white',
    // width: 300,
    width: (Dimensions.get("window").width - 20),
    // width: "90%",
    // backgroundColor: "white",
    borderRadius: 16,
    // padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    // alignItems: 'center',
    marginHorizontal: 10
  }
});