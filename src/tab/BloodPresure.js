import React, { Component } from 'react';
import { Text, LogBox, View, SafeAreaView, Button, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Alert, FlatList } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// console.disableYellowBox=true;
LogBox.ignoreAllLogs(true);

import { List, ListItem, Left, Body, Right } from 'native-base';

import { LineChart, } from "react-native-chart-kit";
import Database from '../Database';
import ActionButton from 'react-native-action-button';

import RBSheet from "react-native-raw-bottom-sheet";

import CalendarStrip from 'react-native-slideable-calendar-strip';
import { TextInput } from 'react-native-paper';
import moment from 'moment' // 2.20.1

const db = new Database();

const w = Dimensions.get("window").width;
const screenWidth = Dimensions.get("window").width;

// const [date, setDate] = useState(new Date(1598051730000));
// const [mode, setMode] = useState('date');
// const [show, setShow] = useState(false);

// const onChange = (event, selectedDate) => {
//   const currentDate = selectedDate || date;
//   setShow(Platform.OS === 'ios');
//   setDate(currentDate);
// };

// const showMode = (currentMode) => {
//   setShow(true);
//   setMode(currentMode);
// };

// const showDatepicker = () => {
//   showMode('date');
// };

// const showTimepicker = () => {
//   showMode('time');
// };
export class BloodPresure extends Component {


  constructor(props) {
    super(props);
    this.state = {
      _list_bpData: [],
      selectedDate: new Date(),

      basicOkCancelVisible: false,
      TextInpuPbValue: '',

      visible: true,
      isLoading: true,
      dataSource: 10,
      data: {
        labels: ["january", "feb"],

        datasets: [
          {
            data: [1],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(230,230,230,${opacity})`, // optional
          },
          {
            data: [1],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255,0,0, ${opacity})`, // optional
          }, {
            data: [1],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
          },
        ]
      }
    }
  }

  FloatingButtonEvent = () => {
    Alert.alert("dasdasdasd");
  }
  componentDidMount() {
    this.getData();
    // const self = this;
    // return fetch('https://api.mockaroo.com/api/12a7ead0?count=20&key=8ba88000')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     const dataClone = { ...self.state.data }
    //     const values = responseJson.map(value => value.Weight);

    //     dataClone.datasets[0].data = values;

    //     console.log("))))))))) : "+values);

    //     self.setState({
    //       //isLoading: false,
    //       data: dataClone,
    //     });


    //     console.log(JSON.stringify(responseJson))
    //     var temp = [];
    //     for (var i = 0; i < responseJson.length; i++) {
    //       console.log(responseJson[i].Weight)
    //       temp.push(responseJson[i].Weight)
    //       temp.push(responseJson[i].Weight)
    //     }

    //     this.setState({
    //       dataSource: temp
    //     })
    //     console.log("^^^^^^ :" + this.state.data);

    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  // componentDidMount() {
  // this.getData();
  // }
  getData() {
    const self = this;
    db.listBloodPresure().then((data) => {
      console.log(">>>> : " + data);
      result = data;
      if (result == 0) {
        db.addItemOfBloodPresure().then((result) => {
          // console.log(">>>> : " + data);

        }).catch((err) => {
          console.log(err);
        })
      } else {
        //  const dataClone = {...self.state.data}


        console.log(">>>>k : " + data);
        var temp2 = [];
        var temp3 = [];
        var temp4 = [];
        var temp5 = [];
        var _monthDate;
        const dataClone = { ...self.state.data }
        for (var i = 0; i < result.length; i++) {
          _monthDate = result[i].bpDate.substring(5, 10);
          // dataClone.datasets[0].data = result[i].bpValue;
          // const values = responseJson.map(value =>result[i].bpValue);

          //  dataClone.datasets[0].data = parseInt(result[i].bpValue);
          // console.log(">>>> ()()() ### : " + result[i].bpValue)
          // {
          //   x: xValue,
          //   y: yValue1
          // }


          // console.log(">>>>((((())))) ### : " + this.state.data)

          temp2.push([result[i].bpValue]);
          temp3.push([_monthDate]);
          temp4.push([result[i].bpmin]);
          temp5.push([result[i].bpmax]);

          // temp2.push("{" + result[i].x + ":'" + result[i].bpDate + "'," + result[i].y + ":" + result[i].bpValue + "}")

          // this.setState({
          //   dataSource: temp2,
          //   //  data: dataClone.datasets[0].data,
          // })
          // console.log("@@@@ : " + result[i].x);
        }
        dataClone.labels = temp3;
        dataClone.datasets[0].data = temp2;
        dataClone.datasets[1].data = temp4;
        dataClone.datasets[2].data = temp5;

        self.setState({
          isLoading: false,
          data: dataClone,
          _list_bpData: data,
        });

        console.log("$$$$ : " + temp3);
        // console.log("@@@@ >>>> dasdadasdasd:fff " + this.state.dataSource);

        //  this.viewListData();
      }
    }).catch((err) => {
      console.log(err);
    })
  }


  saveData() {
    this.RBSheet.close();
    const _format = 'YYYY-MM-DD'
    const _selectedDay = moment(this.state.selectedDate).format(_format);

    console.log("selected date >>>>>>>>>>> " + this.state.TextInpuPbValue);


    this.setState({
      isLoading: true,


    });
    let data = {
      // pId: this.state.pId,
      bpDate: _selectedDay.toString(),
      bpValue: parseInt(this.state.TextInpuPbValue)
    }
    db.addPBvalue(data).then((result) => {
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
  keyExtractor = (item, index) => index.toString()
  render() {
    const data = {
      labels: ["feasdasdasdasdb"],
      datasets: [
        {
          data: [50],
          // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          // strokeWidth: 2 // optional
        }
      ],
      legend: ["Rainy Days"] // optional
    };
    const chartConfig = {
      backgroundGradientFrom: "#F57C00",
      backgroundGradientFromOpacity: 10,
      backgroundGradientTo: "#F57C00",
      backgroundGradientToOpacity: 0.8,
      color: (opacity = 5) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
    // let sampleData = [

    //   {
    //     seriesName: 'series2',
    //     data= [
    //       {
    //         x: '2020-10-20',
    //         y: [50]
    //       },


    //     ],
    //     color: 'red'
    //   }
    // ]
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='white' />

        <View style={styles.header}>

          <Card style={styles.cardHorizontal} >
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('')}> */}
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
                borderRadius: 16
              }}
            />

            {/* </TouchableOpacity> */}
          </Card>

        </View>

        <View style={{flex:2}}>


        <Text>Previous data</Text>
          {/* <Card style={styles.cardHorizontal1} >
              <Text>dasdasda</Text>


            </Card> */}
          <FlatList


            keyExtractor={this.keyExtractor}
            data={this.state._list_bpData}
            // renderItem={this.renderItem}

            renderItem={({ item }) => <ListItem
              style={{ height: 20, paddingTop: 30 }}

            >

              <Body>

                <Text>{item.bpDate}</Text>
                {/* <Text style={styles.dateText}>{item.hDate}</Text> */}
              </Body>
              <Right>



              </Right>
            </ListItem>



            } />


        </View>

       




   





        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="#f78a2c" onPress={() =>
            this.RBSheet.open()
          }>
            {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

          </ActionButton>

        </View>



        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnDragDown={true}
          // closeOnPressMask={false}
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{ flex: 1 }}>
              <CalendarStrip

                selectedDate={this.state.selectedDate}
                onPressDate={(date) => {
                  this.setState({ selectedDate: date });

                }}
                onPressGoToday={(today) => {
                  this.setState({ selectedDate: today });
                }}
                onSwipeDown={() => {
                  // alert('onSwipeDown');
                }}
                markedDate={['2020-08-04', '2018-05-15', '2018-06-04', '2018-05-01',]}
              />


              <Text>ssfsfsdxxxx</Text>
              {/* <TextInput /> */}
              <TextInput onChangeText={TextInputValue => this.setState({ TextInpuPbValue: TextInputValue })} style={{ backgroundColor: '#f2f2f2', marginTop: 0 }} label="PB value" />
              <TouchableOpacity onPress={() => this.saveData()} style={styles.button}>
                <Text style={styles.buttonText}>Period Start ?</Text>


              </TouchableOpacity>

            </View>
          </ScrollView>
        </RBSheet>

      </SafeAreaView>


    );
  }
}

const styles = StyleSheet.create({
  linerGradient: {
    height: (screenWidth * 3) / 8,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60
  },
  line: {
    position: 'absolute',
    width: screenWidth,
    top: 100,
    left: -200,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: [
      {
        rotate: '-35deg',
      }
    ],
    borderRadius: 60
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
  }, cardHorizontal1: {
    height: 175,
    backgroundColor: 'white',
    // width: 300,
    width: (Dimensions.get("window").width - 20),
    // width: "90%",
    // backgroundColor: "white",
    borderRadius: 8,
    // padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    // alignItems: 'center',
    marginHorizontal: 10
  }, button: {
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
  }, header: {
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    height: 180
  }, footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    paddingVertical: 20,
    //  paddingHorizontal: 20
  },

});