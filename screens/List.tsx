import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const List = (props) => {
  const [Data, setData] = useState([]);
  const [ret, setRet] = useState([]); 
const db=firestore();

  useEffect(() => {
    const user = auth().currentUser;
    const sub = firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot((documentSnapshot) => {
        if(documentSnapshot.data()?.list)
        setData(documentSnapshot.data()?.list);
      });
    return () => sub();
  }, []);

  const handleRemove=(id)=>{
  const user=auth().currentUser;
  const ref=db.collection('users').doc(user?.uid)
  ref.update({'list':firebase.firestore.FieldValue.arrayRemove(id)})

  }
const handleComplete=(id)=>{
  console.log(id)
  const user=auth().currentUser;
  const ref=db.collection('users').doc(user?.uid)
  ref.update({'completed':firebase.firestore.FieldValue.arrayUnion(id)})
  ref.update({'list':firebase.firestore.FieldValue.arrayRemove(id)})


}

  useEffect(() => {
    // Fetch data for each id in Data and accumulate it in an array
    Promise.all(Data.map((id) => ListData(id)))
      .then((results) => {
        setRet(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Data]);

  const ListData = async (id) => {
    const url = `https://api.jikan.moe/v4/anime/${id}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        return json;
      }
      // else {
      //   throw new Error('Network response was not ok');
      // }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20,backgroundColor:'#E8DEF8' }}>

      {ret?(
        <FlatList
        data={ret}
        keyExtractor={(item) => item.data.mal_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Card style={{ marginBottom: 20,marginTop:30, }}>
              <Card.Content>
              <Text variant="bodyLarge" style={{textAlign:'center',paddingBottom:10,}}> {item.data.title}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:80}}> Rank: #{item.data.rank}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:100}}> Popularity: #{item.data.popularity}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:120}}> Episodes: {item.data.episodes}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:140}}> Score: {item.data.score}</Text> 
                         <Image source={{uri:item.data.images.jpg.large_image_url}} style={{height:300,width:200,resizeMode:'contain',borderRadius:20,}}/>
                         <Card.Actions>
                         <Button style={{right:10,position:'absolute',bottom:150,}} onPress={()=>props.navigation.navigate('Episodes',{ID:item.data.mal_id})} icon='eye' mode='contained-tonal'>Episodes</Button>
                         <Button style={{position:'absolute',bottom:100,}} onPress={()=>handleComplete(item.data.mal_id)} icon='plus-circle' mode='contained-tonal'>Completed</Button>
                         <Button style={{right:10,position:'absolute',bottom:50,}} onPress={()=>handleRemove(item.data.mal_id)} icon='minus-circle' mode='contained-tonal'>Remove</Button>
                         </Card.Actions> 
              </Card.Content>
            </Card>
          </View>
        )}
      />
      ):null
      }
    </View>
  );
};

export default List;
