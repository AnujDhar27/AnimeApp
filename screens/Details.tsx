import { useRoute } from "@react-navigation/native";
import React from "react";
import {useState,useEffect} from 'react';
import {ScrollView,Image} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator, Searchbar,Card} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
function Details(props)
{
  const route=useRoute();
  const {title,yid,synopsis,background}=route.params;
  console.log(yid);
  console.log(title);
  return (
    <ScrollView style={{flex:1,paddingHorizontal:20}}>
        <Text style={{textAlign:'center',paddingTop:50,paddingBottom:20,}} variant="headlineLarge">{title}</Text>

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
  )
}
export default  Details;