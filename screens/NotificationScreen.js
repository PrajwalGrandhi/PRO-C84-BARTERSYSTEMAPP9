import React from 'react';
import {Text,View,FlatList,ScrollView} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class NotificationScreen extends React.Component{
    constructor(){
        super();
this.state={
    allNotifications:[],
}
    }

    componentDidMount(){
        this.getNotification()
    }
    getNotification=()=>{
        db.collection('Notifications').where('userid','==',firebase.auth().currentUser.email).get().then(
            snapshot=>{snapshot.forEach(doc=>{
                this.setState({
                    allNotifications:[...this.state.allNotifications,doc.data()]
                })
                
            })}
        )
        
    }

    render(){
        return(
            <View>
            <ScrollView>
    <FlatList  data={this.state.allNotifications}
         renderItem={({item,index})=>(
            <View key={index} style={{backgroundColor:'red',borderWidth:2,marginTop:10,width:800,alignSelf:'center',alignItems:'center'}}>
                  <Text>{"Reciever: "+item.userid}</Text>
                  <Text>{"Donor: "+item.donorid}</Text>
                  <Text>{"Item Name: "+item.item}</Text>
                  <Text>{"Date: "+item.date}</Text>
                  </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         //onEndReached={this.loadMore()}
         onEndReachedThreshold={0.6}/>
            </ScrollView>                
            </View>
        )
    }
}