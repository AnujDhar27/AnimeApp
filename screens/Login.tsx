import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { Button, TextInput,Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
function Login(props) {
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [num,setNum]=useState('');
  const [mail,setMail]=useState('');
  const [pass,setPass]=useState('');

  const handleLogIn=()=>{
    auth()
    .signInWithEmailAndPassword(mail,pass)
    .then(()=>{
      props.navigation.navigate('Home')
    })
    .catch(error=>{
      console.log(error);
    })

  }
  // verification code (OTP - One-Time-Passcode)
  // const [code, setCode] = useState('');

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   if(user)
  //   props.navigation.navigate('Home')
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // Handle the button press
  // const signInWithPhoneNumber=async()=>{
  //   console.log('pressed')
  //   const confirmation = await auth().signInWithPhoneNumber(num);
  //   console.log(confirmation);
  //   setConfirm(confirmation);
  // }
//   async function signInWithPhoneNumber(phoneNumber) {
//     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

// const confirmCode=async()=>{
//     try {
//         await confirm.confirm(code);
//         props.navigation.navigate('Home');
//       } catch (error) {
//         console.log('Invalid code.');
//       }
// }
    return (
        <View style={{flex:1,paddingHorizontal:20}}>
            <Text  style={{marginTop:180,textAlign:'center',}} variant='headlineSmall'>Welcome to AnimeVerse</Text>
            <Text  style={{marginTop:20,textAlign:'center',paddingBottom:30,}} variant='titleMedium'>Login to explore the Aniverse</Text>
            {/* <TextInput
            label='Phone Number'
            placeholder='Enter Phone Number'
            value={num}
            onChangeText={(num)=>setNum(num)}
            style={{marginBottom:20,}}
            /> */}
            <TextInput
            label='Email ID'
            placeholder='Enter your Email ID'
            value={mail}
            onChangeText={(mail)=>setMail(mail)}
            style={{marginBottom:20,}}
            />
            <TextInput
            label='Password'
            placeholder='Enter your password'
            value={pass}
            onChangeText={(pass)=>setPass(pass)}
            style={{marginBottom:20,}}
            />
{/*             
            <TextInput
            label='OTP'
            placeholder='Enter OTP'
            value={code}
            onChangeText={setCode}
            keyboardType='numeric'
            />
             */}
            {/* <Button mode='contained-tonal' style={{marginTop:50,}} onPress={signInWithPhoneNumber}>Send OTP</Button>
      <Button mode='contained' disabled={code===''?true:false} style={{marginTop:20}} onPress={confirmCode} >Sign in</Button> */}
      <Button mode='contained' onPress={handleLogIn} style={{marginTop:20,}}>Log in</Button>
      <TouchableOpacity  onPress={()=>props.navigation.navigate('SignUp')}><Text style={{marginTop:20,marginLeft:245,}} variant='bodyLarge'>New user? Sign Up</Text></TouchableOpacity>
      </View>
    );
  }
export default Login;