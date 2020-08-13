import React,{Component} from 'react';
import { Text,LogBox, View, SafeAreaView, TouchableOpacity } from 'react-native';
import PureChart from 'react-native-pure-chart';
import {CustomHeader} from '../index';
// console.disableYellowBox=true;
LogBox.ignoreAllLogs(true);
 
export class BloodPresure extends Component{
    componentDidUpdate(){
       
    }
    render(){
        let sampleData = [
            {
              seriesName: 'series1',
              data: [

               
                {x: '2018-02-01', y: 30},
                {x: '2018-02-02', y: 200},
                {x: '2018-02-03', y: 170},
                {x: '2018-02-04', y: 250},
                {x: '2018-02-05', y: 10}
              ],
              color: '#297AB1'
            },
            // {
            //   seriesName: 'series2',
            //   data: [
            //     {x: '2018-02-01', y: 20},
            //     {x: '2018-02-02', y: 100},
            //     {x: '2018-02-03', y: 140},
            //     {x: '2018-02-04', y: 550},
            //     {x: '2018-02-05', y: 40}
            //   ],
            //   color: 'red'
            // }
          ]
        return (
            <SafeAreaView style={{ flex: 1 }}>
          
              {/* <CustomHeader bgcolor='white' title="Settinfgs" isHome={true} navigation={this.props.navigation}  bdcolor='#f2f2f2'/> */}
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <PureChart data={sampleData} type='line' />
                <Text>Setting!</Text>
                <TouchableOpacity style={{ marginTop: 20 }}
                  onPress={() => this.props.navigation.navigate('SettingDetail')}
        
                >
                  <Text>Go Settings Details</Text>
                </TouchableOpacity>
              </View>
        
            </SafeAreaView>
          );
    }
}