import React from "react";
import {useState,useEffect} from 'react';
import { useRoute } from "@react-navigation/native";
import {View,Image,FlatList,ImageBackground} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator,Card,Checkbox} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const Episodes=(props)=>{
    const route=useRoute();
    const db=firestore();
    const {ID}=route.params;
    const [ep,setEp]=useState(null);
    const [img,setImg]=useState(null);
    const [check,setCheck]=useState([]);
    const handleCheck=(epId)=>{
        console.log('pressed')
        const user=auth().currentUser;
        console.log(epId);
        const updateObject = {};
        updateObject[ID] = firebase.firestore.FieldValue.arrayUnion(epId);
        const ref=db.collection('users').doc(user?.uid);
        ref.update(updateObject);
    //   ref.update({ID:firebase.firestore.FieldValue.arrayUnion(epId)})
    }
    useEffect(()=>{
        const user=auth().currentUser;
        const sub=firestore()    
        .collection('users')
        .doc(user?.uid)
        .onSnapshot(documentSnapshot=>{
            // console.log(documentSnapshot.data()[ID])
            if(documentSnapshot.data()[ID])
            setCheck(documentSnapshot.data()[ID])
        })
    },[])

    useEffect(()=>{
        const url=`https://api.jikan.moe/v4/anime/${ID}/episodes`
        fetch(url)
        .then(response=>response.json())
        .then(json=>setEp(json))
        .catch((error)=>{
            console.log(error);
        })
    },[])
return(
    <View style={{flex:1,paddingHorizontal:20,}}>

              <Text style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 20 }} variant="titleLarge">Episodes</Text>
        {ep?(
            <FlatList
            data={ep.data}
            keyExtractor={(item)=>item.mal_id.toString()}
            
            renderItem={({item})=>(
                <Checkbox.Item label={`${item.mal_id}. ${item.title}` } labelStyle={{}} style={{margin:10}} status={check.length>0?(check.includes(item.mal_id)?'checked':'unchecked'):'unchecked'} onPress={()=>handleCheck(item.mal_id)}/>
           )}
            />
        ):null}

    </View>
)
}
export default Episodes;