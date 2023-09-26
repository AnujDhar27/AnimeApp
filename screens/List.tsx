import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const List = (props) => {
  const [Data, setData] = useState([]);
  const [ret, setRet] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const user = auth().currentUser;
    const sub = firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot((documentSnapshot) => {
        setData(documentSnapshot.data()?.list);
      });

    return () => sub();
  }, []);

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
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Text style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 20 }} variant="titleLarge">
        WatchList
      </Text>
      {ret.length > 0 ? (
        <FlatList
        data={ret}
        keyExtractor={(item) => item.data.mal_id.toString()}
        renderItem={({ item }) => (
          <View>
            <Card style={{ marginBottom: 20 }}>
              <Card.Content>
              <Text variant="bodyLarge" style={{textAlign:'center',paddingBottom:10,}}> {item.data.title}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:120}}> Rank: #{item.data.rank}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:140}}> Popularity: #{item.data.popularity}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:160}}> Episodes: {item.data.episodes}</Text>
                         <Text variant="bodyLarge" style={{position:'absolute',left:230,top:180}}> Score: {item.data.score}</Text> 
                         <Image source={{uri:item.data.images.jpg.large_image_url}} style={{height:300,width:200,resizeMode:'contain',borderRadius:20,}}/>
                         <Card.Actions>
                         <Button style={{right:10,position:'absolute',bottom:50,}} onPress={()=>props.navigation.navigate('Episodes',{ID:item.data.mal_id})} icon='eye' mode='contained-tonal'>Episodes</Button>
                         </Card.Actions> 
              </Card.Content>
            </Card>
          </View>
        )}
      />
         
      ):null}
    </View>
  );
};

export default List;
