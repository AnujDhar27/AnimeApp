import React from "react";
import {useState,useEffect} from 'react';
import {View,Image,FlatList, Dimensions} from 'react-native';
import {Text,TextInput,Button,ActivityIndicator,Card} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import Svg,{Path} from 'react-native-svg';

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
  const url=`https://api.jikan.moe/v4/top/anime?filter=favorite&limit=10`
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


const handleList=(id)=>{
  console.log(id)
  const user=auth().currentUser;
  const ref=db.collection('users').doc(user?.uid)
  ref.update({'list':firebase.firestore.FieldValue.arrayUnion(id)})
  // const recDocRef=db.collection('recruit').doc(jobId);
  // recDocRef.update({"appllicants":firebase.firestore.FieldValue.arrayUnion(user.uid)})

}

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#E8DEF8',height:100}}>
          <Svg
          height={200}
          width={Dimensions.get('screen').width}
          viewBox="0 0 1440 320"
          >
             <Text style={{textAlign:'center',paddingTop:50}} variant="titleMedium">Hello {name}</Text>
            <Text style={{textAlign:'center',paddingTop:10}}variant="titleMedium">Welcome to Animeverse</Text>
            <Path
            fill="#EADDFF"
            // d="M0,256L60,256C120,256,240,256,360,266.7C480,277,600,299,720,282.7C840,267,960,213,1080,202.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            d="M0,256L120,240C240,224,480,192,720,197.3C960,203,1200,245,1320,266.7L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            //d="M0,224L60,234.7C120,245,240,267,360,266.7C480,267,600,245,720,208C840,171,960,117,1080,112C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
          </View>
          <Text style={{textAlign:'center',paddingTop:40,paddingBottom:30,}} variant="titleLarge">Favourite of all time</Text>
      {upcoming?
        <FlatList
          data={upcoming.data}
          keyExtractor={(item)=>item.mal_id.toString()}
          renderItem={({item})=>(
            <View>
              <Card style={{marginBottom:20,marginHorizontal:20}}>
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
                         {list.includes(item.mal_id)||comp.includes(item.mal_id)?(<Button style={{right:25,position:'absolute',bottom:20,}} icon='playlist-check' disabled={true}>Added</Button>):<Button style={{right:35,position:'absolute',bottom:20,}} mode='contained-tonal' icon='view-list' onPress={()=>handleList(item.mal_id)}>Add</Button>}
                         </Card.Actions>              
                </Card.Content>
              </Card>
            </View>
            )}
               />:<ActivityIndicator animating={true}/>
          }
      </View>
     
      

       
    
    </View>
  )
}
export default  Home;