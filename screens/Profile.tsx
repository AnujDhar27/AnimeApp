import React, { useEffect,useState } from 'react';
import {View} from 'react-native';
import {Text,Button, Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
const Profile=(props)=>{
    const db=firestore();
    const [name,setName]=useState('');
    const [num,setNum]=useState(0);
    const [ongo,setOngo]=useState(0);

    useEffect(()=>{
        const user=auth().currentUser
        const sub=firestore()
        .collection('users')
        .doc(user?.uid)
        .onSnapshot(documentSnapshot=>{
            if(documentSnapshot.data()?.completed)
            setNum((documentSnapshot.data().completed).length)

            if(documentSnapshot.data()?.list)
            setOngo((documentSnapshot.data().list).length)
        })
    })
    const handleSignOut=()=>{
        console.log('pressed')
      auth()
      .signOut()
      .then(()=>props.navigation.navigate('Login'))
      }
    const user=auth().currentUser;
    const mail=user?.email;
    useEffect(()=>{
        const sub=firestore()
    .collection('users')
    .doc(user?.uid)
     .onSnapshot(documentSnapshot=>{
    setName(documentSnapshot.data()?.Name);
  })
  return()=>sub();
    },[])
    
    return(
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:20}}>
            <Text variant='headlineLarge' style={{paddingTop:80,textAlign:'center'}}>Profile</Text>
            <Avatar.Icon size={210}  style={{alignSelf:'center',marginTop:20,}} icon='account-outline'/>
            <Text variant='headlineSmall' style={{paddingTop:80,textAlign:'center'}}>Name: {name}</Text>
            <Text variant='headlineSmall' style={{paddingTop:20,textAlign:'center'}}>Email: {mail}</Text>
            <Text variant='headlineSmall' style={{paddingTop:20,textAlign:'center'}}>Animes Completed: {num}</Text>
            <Text variant='headlineSmall' style={{paddingTop:20,textAlign:'center'}}>Animes Ongoing: {ongo}</Text>
            <Button mode='contained-tonal' style={{marginTop:30}} onPress={handleSignOut}>Sign Out</Button>
        </View>
    )
}
export default Profile;