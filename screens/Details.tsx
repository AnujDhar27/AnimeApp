import { useFocusEffect, useRoute } from "@react-navigation/native";
import React from "react";
import {useState,useEffect} from 'react';
import {ScrollView,Image, ImageBackground} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator, Searchbar,Card,IconButton} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
function Details(props)
{
  const route=useRoute();
  const {title,yid,synopsis,background,id}=route.params;
  console.log(yid);
  console.log(title);
  console.log(id);
  const [imageUrl,setImageUrl]=useState('https://www.nicepng.com/ourpic/u2w7w7o0t4r5y3q8_white-background-url/')

  useEffect(()=>{
  const url=`https://api.jikan.moe/v4/anime/${id}/pictures`
  fetch(url)
  .then(response=>response.json())
  .then((json)=>setImageUrl(json.data[0].jpg.large_image_url))
  .catch((error)=>{
    console.log(error)
  })
  },[])

  return (
    <ImageBackground source={{uri:imageUrl}} resizeMode="cover" style={{flex:1,justifyContent:'center',}} imageStyle={{opacity:0.3,}}>

    <ScrollView style={{flex:1,paddingHorizontal:20}}>
       <IconButton
        icon='keyboard-backspace'
        size={30}
        style={{position:'absolute',marginLeft:-5,zIndex:1}}
        onPress={()=>props.navigation.goBack()}
        />
             
        <Text style={{textAlign:'center',paddingTop:50,paddingBottom:20,fontWeight:'bold'}} variant="titleLarge">{title}</Text>

        <YoutubePlayer
        height={280}
        play={true}
        videoId={yid}
        />
        <Text style={{textAlign:'center'}} variant="bodyLarge">Synopsis</Text>
        <Text variant='bodySmall'> {synopsis}</Text>
        <Text style={{textAlign:'center',marginTop:20,}} variant="bodyLarge">Background</Text>
        <Text style={{paddingBottom:20,}} variant='bodySmall'> {background}</Text>

    </ScrollView>
    </ImageBackground>

  )
}
export default  Details;