import React from "react";
import {useState,useEffect} from 'react';
import {View,Image,FlatList} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator,Card} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
function Home(props)
{
  const db=firestore();
const [load,isLoad]=useState(false);
const [data,setData]=useState(null);
const [upcoming,setUpcoming]=useState(null);
const [name,setName]=useState('');
const [list,setList]=useState([])
    const [comp,setComp]=useState([])
    useEffect(()=>{
      const user=auth().currentUser;
      const sub=firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot=>{
        if(documentSnapshot.data()?.list)
        setList(documentSnapshot.data()?.list)
      
        if(documentSnapshot.data()?.completed)
        setComp(documentSnapshot.data()?.completed)
      })
    },[])
useEffect(()=>{
  const url=`https://api.jikan.moe/v4/top/anime?filter=favorite`
  fetch(url)
  .then(response=>response.json())
  .then((json)=>{setUpcoming(json)})
  .catch((error)=>{
    console.log(error)
  })
},[])
useEffect(()=>{
  const user=auth().currentUser;
  const sub=firestore()
  .collection('users')
  .doc(user?.uid)
  .onSnapshot(documentSnapshot=>{
    setName(documentSnapshot.data()?.Name);
  })
  return()=>sub();
},[])
const handleGet=()=>{
    isLoad(true);
    const url=`https://api.jikan.moe/v4/top/characters`
    fetch(url)
    .then(response=>
      response.json()
      )
      .then((json)=>{setData(json);})
    .catch((error)=>{
      console.log(error);
    })
}
const handleList=(id)=>{
  console.log(id)
  const user=auth().currentUser;
  const ref=db.collection('users').doc(user?.uid)
  ref.update({'list':firebase.firestore.FieldValue.arrayUnion(id)})
  // const recDocRef=db.collection('recruit').doc(jobId);
  // recDocRef.update({"appllicants":firebase.firestore.FieldValue.arrayUnion(user.uid)})

}

  return (
    <View style={{flex:1,paddingHorizontal:20,backgroundColor:'white'}}>
      
      <Text style={{textAlign:'center',paddingTop:50,fontSize:18}}>Hello {name}</Text>
      <Text style={{textAlign:'center',paddingTop:10,fontSize:18}}>Welcome to Animeverse</Text>
      <Text style={{textAlign:'center',paddingTop:50,paddingBottom:20,}} variant="titleLarge">Favourite Anime of all time</Text>
      {upcoming?
        <FlatList
          data={upcoming.data}
          keyExtractor={(item)=>item.mal_id.toString()}
          renderItem={({item})=>(
            <View>
              <Card style={{marginBottom:20,}}>
                <Card.Content>
                        <Text variant="bodyLarge" style={{textAlign:'center',paddingBottom:10,}}> {item.title}</Text>
                        <Text variant="bodyLarge" style={{position:'absolute',left:230,top:120}}> Rank: #{item.rank}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:140}}> Popularity: #{item.popularity}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:160}}> Episodes: {item.episodes}</Text>
                         
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,paddingTop:180}}> Score: {item.score}</Text> 
                         {/* <Text variant="bodyLarge" style={{position:'absolute',left:230,top:200}}> Studio: {item.studios[0].name}</Text> */}
                         {/* <Text variant="bodySmall" style={{position:'absolute',right:75,top:230}}> Score</Text> */}
                         <Image source={{uri:item.images.jpg.large_image_url}} style={{height:300,width:200,resizeMode:'contain',borderRadius:20,}}/>
                         <Card.Actions>
                         <Button style={{right:30,position:'absolute',bottom:70,}} icon='eye' onPress={()=>props.navigation.navigate('Details',{title:item.title,yid:item.trailer.youtube_id,synopsis:item.synopsis,background:item.background,id:item.mal_id})} mode='contained-tonal'>View</Button>
                         <Button style={{right:35,position:'absolute',bottom:20,}} mode='contained-tonal' icon='view-list' onPress={()=>handleList(item.mal_id)} disabled={list.includes(item.mal_id)||comp.includes(item.mal_id)?true:false}>Add</Button>
                         </Card.Actions>              
                </Card.Content>
              </Card>
            </View>
            )}
               />:null
          }
      {/* <Text style={{textAlign:'center',paddingTop:50,fontSize:15}}>
        API Calls
      </Text>
      <Button mode='contained' onPress={()=>handleGet()}>Get Top 4 Anime characters of all time</Button> */}
       
        {
          data?(
            <View>
          <Text style={{textAlign:'left',paddingTop:40,fontSize:13}}>Top 5 Anime Characters:</Text>
          <Image source={{uri:data.data[0].images.jpg.image_url}}style={{width:60,height:60,marginTop:30,}}/>
          <Text style={{textAlign:'left',paddingTop:40,fontSize:13,left:100,top:-80}}>1. {data.data[0].name}</Text>
           <Image source={{uri:data.data[1].images.jpg.image_url}} style={{width:60,height:60,marginTop:20}}/>
          <Text style={{textAlign:'left',paddingTop:40,fontSize:13,left:100,top:-80}}>2. {data.data[1].name}</Text>
          <Image source={{uri:data.data[2].images.jpg.image_url}}style={{width:60,height:60,marginTop:30}}/>
          <Text style={{textAlign:'left',paddingTop:40,fontSize:13,left:100,top:-80,}}>3. {data.data[2].name}</Text>
          <Image source={{uri:data.data[3].images.jpg.image_url}}style={{width:60,height:60,marginTop:30}}/>
          <Text style={{textAlign:'left',paddingTop:40,fontSize:13,left:100,top:-80,}}>4. {data.data[3].name}</Text>

          </View>
          )
          :null
          // :null <ActivityIndicator size='large' animating={true} color={Colors.red800}/> 
        }
    
    </View>
  )
}
export default  Home;