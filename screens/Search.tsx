import React from "react";
import {useState,useEffect} from 'react';
import {View,Image, FlatList} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import {Text,TextInput,Button,ActivityIndicator, Searchbar,Card} from 'react-native-paper';
import { Colors } from "react-native/Libraries/NewAppScreen";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import { SelectCountry } from "react-native-element-dropdown";
function Search(props)
{
    const db=firestore();
    const [input,setInput]=useState('');
    const [searchData,setSearchData]=useState(null);
    const [noSearchData,setNoSearchData]=useState(null);
    const [list,setList]=useState([])
    const [comp,setComp]=useState([])
    const [filter,setFilter]=useState('airing')

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

    const handleList=(id)=>{
      console.log(id)
      const user=auth().currentUser;
      const ref=db.collection('users').doc(user?.uid)
      ref.update({'list':firebase.firestore.FieldValue.arrayUnion(id)})    
    }

    useEffect(()=>{
      const url=`https://api.jikan.moe/v4/anime?filter=${filter}`
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
    const local_data = [
      
      {
        value: '1',
        lable: 'Action',
        
      },
      {
        value: '2',
        lable: 'Adventure',
        
      },
      {
        value: '3',
        lable: 'Avant Garde',
        
      },
      {
        value: '4',
        lable: 'Award Winning',
        
      },
      {
        value: '5',
        lable: 'Gourmet',
        
      },
      {
        value: '6',
        lable: 'Comedy',
        
      },
      {
        value: '7',
        lable: 'Drama',
        
      },
      {
        value: '8',
        lable: 'Fantasy',
        
      },
      {
        value: '9',
        lable: 'Horror',
        
      },
      {
        value: '10',
        lable: 'Mystery',
        
      },
      {
        value: '11',
        lable: 'Romance',
        
      },
      {
        value: '12',
        lable: 'Sci-Fi',
        
      },
      {
        value: '13',
        lable: 'Sports',
        
      },
      {
        value: '14',
        lable: 'Supernatural',
        
      },
      {
        value: '15',
        lable: 'Suspense',
        
      },
    ];
      const [country, setCountry] = useState('');


  return (
    <View style={{flex:1,paddingHorizontal:20,backgroundColor:'white'}}>
      
      <Text style={{textAlign:'center',paddingTop:30,fontSize:18}}>Search for Anime</Text>
      <Searchbar
      placeholder="Enter Anime Name"
      value={input}
      onChangeText={(input)=>{handleSearch(input);setInput(input)}}
      style={{margin:10,marginBottom:20,}}
      />
      <SelectCountry
      style={{backgroundColor:'#EADDFF',height:50,width:150,alignSelf:'left',borderRadius:20,marginBottom:20,}}
      placeholderStyle={{color:'black',textAlign:'center'}}
      selectedTextStyle={{color:'black',textAlign:'center',}}
      // iconStyle={{width:20,height:20,paddingRight:20,}}
      data={local_data}
      value={country}
      valueField="value"
      labelField="lable"
      placeholder="Genres"
      onChange={e => {
        setCountry(e.value),console.log(e.lable);
      }}
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
                         <Button style={{right:35,position:'absolute',bottom:20,}} mode='contained-tonal' icon='view-list' onPress={()=>handleList(item.mal_id)} disabled={list.includes(item.mal_id)||comp.includes(item.mal_id)?true:false}>Add</Button>
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
                         <Button style={{right:30,position:'absolute',bottom:70,}} icon='eye' onPress={()=>props.navigation.navigate('Details',{title:item.title,yid:item.trailer.youtube_id,synopsis:item.synopsis,background:item.background,id:item.mal_id})} mode='contained-tonal'>View</Button>
                         <Button style={{right:35,position:'absolute',bottom:20,}} mode='contained-tonal' icon='view-list' onPress={()=>handleList(item.mal_id)} disabled={list.includes(item.mal_id)||comp.includes(item.mal_id)?true:false}>Add</Button>
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