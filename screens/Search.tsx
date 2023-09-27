import React from "react";
import {useState,useEffect} from 'react';
import {View,Image, FlatList} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import {Text,TextInput,Button,ActivityIndicator, Searchbar,Card} from 'react-native-paper';
import { Colors } from "react-native/Libraries/NewAppScreen";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
function Search(props)
{
    const db=firestore();
    const [input,setInput]=useState('');
    const [searchData,setSearchData]=useState(null);
    const [noSearchData,setNoSearchData]=useState(null);
    const handleList=(id)=>{
      console.log(id)
      const user=auth().currentUser;
      const ref=db.collection('users').doc(user?.uid)
      ref.update({'list':firebase.firestore.FieldValue.arrayUnion(id)})
      // const recDocRef=db.collection('recruit').doc(jobId);
      // recDocRef.update({"appllicants":firebase.firestore.FieldValue.arrayUnion(user.uid)})
    
    }
    useEffect(()=>{
      const url=`https://api.jikan.moe/v4/top/anime?filter=airing`
      fetch(url)
      .then(response=>response.json())
      .then((json)=>{setNoSearchData(json)})
      .catch((error)=>{
        console.log(error)
      })
    },[])

    const handleSearch=async(input)=>{
      if(input==='')
      {
        setSearchData(noSearchData);
      }
      else{
        const url=`https://api.jikan.moe/v4/anime?q=${input}&_limit=10`
        await fetch(url)
        .then(response=>response.json())
        .then(json=>{setSearchData(json)})
        
        .catch((error)=>{
            console.log(error);
        })
      }
        
    }
    // console.log(searchData.data[0].trailer.youtube_id)

  return (
    <View style={{flex:1,paddingHorizontal:20,backgroundColor:'white'}}>
      
      <Text style={{textAlign:'center',paddingTop:30,fontSize:18}}>Search for Anime</Text>
      <Searchbar
      placeholder="Enter Anime Name"
      value={input}
      onChangeText={(input)=>{handleSearch(input);setInput(input)}}
      style={{margin:10,marginBottom:20,}}
      />
      {
        searchData?
          <FlatList
          data={searchData.data}
          keyExtractor={(item)=>item.mal_id.toString()}
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
                         <Button style={{right:30,position:'absolute',bottom:70,}} icon='eye' onPress={()=>props.navigation.navigate('Details',{title:item.title,yid:item.trailer.youtube_id,synopsis:item.synopsis,background:item.background})} mode='contained-tonal'>View</Button>
                         <Button style={{right:35,position:'absolute',bottom:20,}} mode='contained-tonal' icon='view-list' onPress={()=>handleList(item.mal_id)} >Add</Button>
                         </Card.Actions>              
                </Card.Content>
              </Card>
            </View>
            )}
               />
        :noSearchData?
        <FlatList
          data={noSearchData.data}
          keyExtractor={(item)=>item.mal_id.toString()}
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
                         <Button style={{right:30,position:'absolute',bottom:70,}} icon='eye' onPress={()=>props.navigation.navigate('Details',{title:item.title,yid:item.trailer.youtube_id,synopsis:item.synopsis,background:item.background})} mode='contained-tonal'>View</Button>
                         <Button style={{right:35,position:'absolute',bottom:20,}} mode='contained-tonal' icon='view-list' onPress={()=>handleList(item.mal_id)} >Add</Button>
                         </Card.Actions>              
                </Card.Content>
              </Card>
            </View>
            )}
               />
        :null
      }
    </View>
  )
}
export default  Search;