import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { Button, TextInput,Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
function Login(props) {
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [num,setNum]=useState('');
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if(user)
    props.navigation.navigate('Home')
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  const signInWithPhoneNumber=async()=>{
    console.log('pressed')
    const confirmation = await auth().signInWithPhoneNumber(num);
    console.log(confirmation);
    setConfirm(confirmation);
  }
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

const confirmCode=async()=>{
    try {
        await confirm.confirm(code);
        props.navigation.navigate('Home');
      } catch (error) {
        console.log('Invalid code.');
      }
}
    return (
        <View style={{flex:1,paddingHorizontal:20}}>
            <Text  style={{marginTop:50,textAlign:'center',}} variant='headlineSmall'>Welcome to AnimeVerse</Text>
            <Text  style={{marginTop:20,textAlign:'center',paddingBottom:30,}} variant='titleMedium'>Login to know all about Anime</Text>
            <TextInput
            label='Phone Number'
            placeholder='Enter Phone Number'
            value={num}
            onChangeText={(num)=>setNum(num)}
            style={{marginBottom:20,}}
            />
            <TextInput
            label='OTP'
            placeholder='Enter OTP'
            value={code}
            onChangeText={setCode}
            keyboardType='numeric'
            />
            <Button mode='contained-tonal' style={{marginTop:50,}} onPress={signInWithPhoneNumber}>Send OTP</Button>
      <Button mode='contained' disabled={code===''?true:false} style={{marginTop:20}} onPress={confirmCode} >Sign in</Button>
      </View>
    );
  }

//   return (
//     <>
//       <TextInput value={code} onChangeText={text => setCode(text)} />
//       <Button title="Confirm Code" onPress={() => confirmCode()} />
//     </>
//   );
export default Login;