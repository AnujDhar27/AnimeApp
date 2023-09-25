
import React from "react";
import {useState,useEffect} from 'react';
import {View,Image,FlatList} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator,Card} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const List=(props)=>{
    const db=firestore();
    const [data,setData]=useState([])
    const [ldata,setldata]=useState([])
    const [ret,setRet]=useState([])
    const ListData=(id)=>{
    const url=`https://api.jikan.moe/v4/anime/${id}`
    fetch(url)
    .then(response=>response.json())
    .then((json)=>{setRet(json)})
    .catch((error)=>{
    console.log(error)
    })
    }
    useEffect(()=>{
        const user=auth().currentUser;
        const sub=firestore()
        .collection('users')
        .doc(user?.uid)
        .onSnapshot(documentSnapshot=>{
        setData(documentSnapshot.data()?.list);
  })
  data.map((id)=>ListData(id))
  return()=>sub();
    },[])
    return(
        <View style={{flex:1,paddingHorizontal:20}}>
            <Text>hi</Text>
            {/* {
        ret?
          <FlatList
          data={ret}
         // keyExtractor={(item)=>item.mal_id.toString()}
          renderItem={({item})=>(
            <View>
              <Card style={{marginBottom:20,}}>
                <Card.Content>
                        <Text variant="bodyLarge" style={{textAlign:'center',paddingBottom:10,}}> {item.title}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:120}}> Rank: #{item.rank}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:140}}> Popularity: #{item.popularity}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:160}}> Episodes: {item.episodes}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:180}}> Score: {item.score}</Text> 
                         <Image source={{uri:item.images.jpg.large_image_url}} style={{height:300,width:200,resizeMode:'contain',borderRadius:20,}}/>
                         <Card.Actions>
                         <Button style={{right:35,position:'absolute',bottom:50,}} onPress={()=>props.navigation.navigate('Details',{title:item.title,yid:item.trailer.youtube_id,synopsis:item.synopsis,background:item.background})} mode='contained-tonal'>View</Button>
                         </Card.Actions>              
                </Card.Content>
              </Card>
            </View>
            )}
               />
               :null
          } */}
        </View>
    )
}
export default List;
