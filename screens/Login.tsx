import React, { useState, useEffect } from 'react';
import { View} from 'react-native';
import { Button, TextInput,Text,Dialog } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
function Login(props) {
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [num,setNum]=useState('');
  const [mail,setMail]=useState('');
  const [pass,setPass]=useState('');
  const [vis,setVis]=useState(false);
  const [errorMessage,setErrorMessage]=useState('');

  const handleLogIn=()=>{
    auth()
    .signInWithEmailAndPassword(mail,pass)
    .then(()=>{
      props.navigation.navigate('Home')
    })
    .catch(error=>{
      console.log(error.code);
      if(error.code==='auth/invalid-login'){
      setErrorMessage('Invalid Login Credentials');
      setVis(true);
      }
    })

  }
  
  //if user has already logged in once when the app is relaunched he/she will not have to login again
  function onAuthStateChanged(user) {
    setUser(user);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if(user)
    props.navigation.navigate('Home')
    return subscriber; // unsubscribe on unmount
  });


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
      <Dialog visible={vis}>
                <Dialog.Title style={{textAlign:'center'}}>Alert!</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium' style={{textAlign:'center'}}>An error has occured while logging in the user</Text>
                    <Text variant='bodyMedium'style={{textAlign:'center'}} >{errorMessage}</Text>
                    <Text variant='bodyMedium' style={{textAlign:'center'}}>Please Retry!</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>setVis(false)}>Retry</Button>
                </Dialog.Actions>
             </Dialog>
      </View>
    );
  }
export default Login;