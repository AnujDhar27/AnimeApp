import React from "react";
import {useState,useEffect} from 'react';
import { useRoute } from "@react-navigation/native";
import {View,Image,FlatList,ImageBackground} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator,Card,Checkbox,IconButton} from 'react-native-paper';
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
    const [pgno,setPgno]=useState(1);
    const [imageUrl,setImageUrl]=useState('https://www.nicepng.com/ourpic/u2w7w7o0t4r5y3q8_white-background-url/')

    useEffect(()=>{
        const url=`https://api.jikan.moe/v4/anime/${ID}/pictures`
        fetch(url)
        .then(response=>response.json())
        .then((json)=>setImageUrl(json.data[2].jpg.large_image_url))
        .catch((error)=>{
          console.log(error)
        })
        },[])

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
    const handleNext=()=>{
        setPgno(prevCount=>prevCount+1);
    }
    const handleBack=()=>{
        setPgno(prevCount=>prevCount-1);
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
         return()=>sub();
    },[])

    useEffect(()=>{
        const url=`https://api.jikan.moe/v4/anime/${ID}/episodes?page=${pgno}`
        fetch(url)
        .then(response=>response.json())
        .then(json=>setEp(json))
        .catch((error)=>{
            console.log(error);
        })
    },[pgno])
return(
    <ImageBackground source={{uri:imageUrl}} resizeMode="cover" style={{flex:1,justifyContent:'center',}} imageStyle={{opacity:0.3,}}> 
    {/* add opacity to imagestyle prop in imagebackground so that only the opcaity of parent component gets changed*/}

    <View style={{flex:1,paddingHorizontal:20,}}>
        <IconButton
        icon='keyboard-backspace'
        size={30}
        style={{position:'absolute',marginTop:45,marginLeft:30,zIndex:1}}
        onPress={()=>props.navigation.navigate('List')}
        />
        
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
        
         {ep?(<Button disabled={pgno===1?true:false} style={{marginRight:220,top:40,}} mode='contained-tonal' icon='arrow-left-bold' onPress={handleBack}>Back</Button>):null}
        {ep?(<Button disabled={!ep.pagination.has_next_page} style={{marginLeft:220,marginBottom:20,}} mode='contained-tonal' icon='arrow-right-bold' onPress={handleNext}>Next</Button>):null}
    </View>
    </ImageBackground>
)
}
export default Episodes;