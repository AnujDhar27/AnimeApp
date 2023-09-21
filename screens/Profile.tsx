import React from 'react';
import {View} from 'react-native';
import {Text,Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
const Profile=(props)=>{
    const handleSignOut=()=>{
        console.log('pressed')
      auth()
      .signOut()
      .then(()=>props.navigation.navigate('Login'))
      }
    const user=auth().currentUser;
    const phn=user?.phoneNumber;
    return(
        <View style={{flex:1,backgroundColor:'white',paddingHorizontal:20}}>
            <Text variant='headlineLarge' style={{paddingTop:80,textAlign:'center'}}>Profile</Text>
            <Text variant='headlineLarge' style={{paddingTop:80,textAlign:'center'}}>Phone: {phn}</Text>
            <Button mode='contained-tonal' style={{marginTop:30}} onPress={handleSignOut}>Sign Out</Button>
        </View>
    )
}
export default Profile;