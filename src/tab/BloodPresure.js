import React, { Component } from 'react';
import { Text, LogBox, View, SafeAreaView, Button, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native';
import PureChart from 'react-native-pure-chart';
import { CustomHeader } from '../index';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// console.disableYellowBox=true;
LogBox.ignoreAllLogs(true);

import { LineChart, } from "react-native-chart-kit";
import Database from '../Database';
import ActionButton from 'react-native-action-button';

import DialogInput from 'react-native-dialog-input';
import Modal, { ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

// import DateTimePicker from '@react-native-community/datetimepicker';

import {
  MaterialDialog,
  MultiPickerMaterialDialog,
  SinglePickerMaterialDialog
} from "react-native-material-dialog";

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
      basicOkCancelVisible: false,


      visible: true,
      isLoading: true,
      dataSource: 10,
      data: {
        labels: ["january", "feb"],

        datasets: [
          {
            data: [1],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(255,0,0,${opacity})`, // optional
          },
          {
            data: [80, 80, 80],
            strokeWidth: 2,
            color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
          }, {
            data: [120, 120, 120],
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
        const dataClone = { ...self.state.data }
        for (var i = 0; i < result.length; i++) {

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
          temp3.push([result[i].bpDate]);
          temp4.push([result[i].bpId]);

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

        self.setState({
          isLoading: false,
          data: dataClone,
        });

        console.log("$$$$ : " + temp3);
        // console.log("@@@@ >>>> dasdadasdasd:fff " + this.state.dataSource);

        //  this.viewListData();
      }
    }).catch((err) => {
      console.log(err);
    })
  }




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
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <CustomHeader bgcolor='white' title="Home detail" navigation={this.props.navigation} bdcolor='white' />


          {/* <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linerGradient}
          colors={['#fff', '#fff', '#fff']}
        >
          <View style={styles.line}></View>
          <View style={[styles.line,{top:120,left:-100}]}></View>
          <View style={[styles.line,{top:140,left:0}]}></View>
        </LinearGradient> */}


          {/* <CustomHeader bgcolor='white' title="Settinfgs" isHome={true} navigation={this.props.navigation}  bdcolor='#f2f2f2'/> */}


          <View style={{ flex: 1, }}>


            <Card style={styles.cardHorizontal} >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('')}>
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

              </TouchableOpacity>
            </Card>

            {/* <PureChart
              data={[
                {
                  x: '2020-07-25',
                  y: 50
                }
              ]}

              type='line' width={'100%'} height={200} /> */}
            {/* <PureChart data={sampleData} type="line" /> */}

            {/* 
          <Text>Setting!</Text>
          <TouchableOpacity style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate('SettingDetail')}

          >
            <Text>Go Settings Details</Text>
          </TouchableOpacity> */}
            <Text>Previous data</Text>
            <Card style={styles.cardHorizontal1} >
              <Text>dasdasda</Text>
            </Card>

          </View>



















        </ScrollView>
        <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
          {/* Rest of the app comes ABOVE the action button component !*/}
          <ActionButton buttonColor="#f78a2c" onPress={() =>
            this.setState({ basicOkCancelVisible: true, })
          }>
            {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}

          </ActionButton>
          {/* <DialogInput
          dialogIsVisible={this.state.dialogIsVisible}
          closeDialogInput={() => this.setState({ dialogIsVisible: false })}
          submitInput={(textValue) => console.warn(textValue)}
          outerContainerStyle={{ backgroundColor: 'rgba(0,0,0, 0.75)' }}
          containerStyle={{ backgroundColor: 'rgba(255,0,0, 0.2)', borderColor: 'red', borderWidth: 5 }}
          titleStyle={{ color: 'white' }}
          title="This is the title"
          subTitleStyle={{ color: 'white' }}
          subtitle="This is the subtitle"
          placeholderInput="This is the text inside placeholder..."
          placeholderTextColor="black"
          textInputStyle={{ borderColor: 'black', borderWidth: 2 }}
          secureTextEntry={false}
          buttonsStyle={{ borderColor: 'white' }}
          textCancelStyle={{ color: 'white' }}
          submitTextStyle={{ color: 'white', fontStyle: 'italic' }}
          cancelButtonText="CANCEL"
          submitButtonText="CONFIRM" */}
          {/* /> */}

          {/* <MaterialDialog
            title="Use Google's Location Service?"
            visible={this.state.visible}
            onOk={() => this.setState({ visible: false })}
            onCancel={() => this.setState({ visible: false })}>
   
          </MaterialDialog>; */}

          {/* 
<Modal
    visible={this.state.visible}
    swipeDirection={['up', 'down']} // can be string or an array
    swipeThreshold={200} // default 100
    onSwipeOut={(event) => {
      this.setState({ visible: false });
    }}
  >
    <ModalContent>
     <Text>sdfsdfsdf

     </Text>
    </ModalContent>
  </Modal> */}



          <MaterialDialog
            title={"Use Google's Location Service?"}
            visible={this.state.basicOkCancelVisible}
            onOk={() => {
              this.setState({ basicOkCancelVisible: false });
            }}
            onCancel={() => {
              this.setState({ basicOkCancelVisible: false });
            }}
          >
            <Text >
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
          </Text>
          </MaterialDialog>


        </View>

        {/* <View>
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View> */}
      </SafeAreaView>


    );
  }
}


const LONG_LIST = [
  "List element 1",
  "List element 2",
  "List element 3",
  "List element 4",
  "List element 5",
  "List element 6",
  "List element 7",
  "List element 8",
  "List element 9",
  "List element 10",
  "List element 12",
  "List element 13",
  "List element 14",
  "List element 15",
  "List element 16",
  "List element 17",
  "List element 18",
  "List element 19"
];

const SHORT_LIST = ["List element 1", "List element 2", "List element 3"];
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
  }, header: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
  },

});
