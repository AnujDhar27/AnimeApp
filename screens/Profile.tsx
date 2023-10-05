import React, { useEffect,useState } from 'react';
import {View,Dimensions} from 'react-native';
import {Text,Button, Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app'
import Svg,{Path} from 'react-native-svg';

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
        <View style={{flex:1,backgroundColor:'white'}}>
             <View style={{flex:1}}>
        <View style={{backgroundColor:'#E8DEF8',height:100}}>
          <Svg
          height={200}
          width={Dimensions.get('screen').width}
          viewBox="0 0 1440 320"
          >
            <Text variant='headlineLarge' style={{paddingTop:50,textAlign:'center'}}>Profile</Text>
            <Path
            fill="#EADDFF"
            // d="M0,256L60,256C120,256,240,256,360,266.7C480,277,600,299,720,282.7C840,267,960,213,1080,202.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            d="M0,256L120,240C240,224,480,192,720,197.3C960,203,1200,245,1320,266.7L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            //d="M0,224L60,234.7C120,245,240,267,360,266.7C480,267,600,245,720,208C840,171,960,117,1080,112C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
          </View>
          
          <Avatar.Icon size={210}  style={{alignSelf:'center',marginTop:30,}} icon='account-outline'/>
            <Text variant='headlineSmall' style={{paddingTop:80,textAlign:'center'}}>Name: {name}</Text>
            <Text variant='headlineSmall' style={{paddingTop:20,textAlign:'center'}}>Email: {mail}</Text>
            <Text variant='headlineSmall' style={{paddingTop:20,textAlign:'center'}}>Animes Completed: {num}</Text>
            <Text variant='headlineSmall' style={{paddingTop:20,textAlign:'center'}}>Animes Ongoing: {ongo}</Text>
            <Button mode='contained-tonal' style={{marginTop:30,marginHorizontal:20}} onPress={handleSignOut}>Sign Out</Button>
      </View>
            
            
        </View>
    )
}
export default Profile;