import React from "react";
import {useState,useEffect} from 'react';
import {View,Image,FlatList} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator,Card,Checkbox} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const Episodes=()=>{
    const handleCheck=(status)=>{
        console.log('pressed')
        console.log(status);
    }
return(
    <View style={{flex:1,paddingHorizontal:20,}}>
        <Text variant="headlineLarge">Episodes</Text>
        <Checkbox.Item label="Item" status='unchecked' onPress={(status)=>handleCheck(status)}/>
    </View>
)
}
export default Episodes;