import React, { useState, useEffect } from 'react';
import { View,Dimensions} from 'react-native';
import { Button, TextInput,Text,Dialog, IconButton } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg,{Path} from 'react-native-svg';

function Login(props) {
  const [confirm, setConfirm] = useState(null);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  const [num,setNum]=useState('');
  const [mail,setMail]=useState('');
  const [pass,setPass]=useState('');
  const [vis,setVis]=useState(false);
  const [errorMessage,setErrorMessage]=useState('');
const [eye,setEye]=useState('eye-off')

const handleEye=()=>{
  if(eye==='eye')
  setEye('eye-off')
  else
  setEye('eye')
}

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

    return (
        <View style={{flex:1}}>
          <View style={{flex:1}}>
        <View style={{backgroundColor:'#E8DEF8',height:100}}>
          <Svg
          height={200}
          width={Dimensions.get('screen').width}
          viewBox="0 0 1440 320"
          >
            <Path
            fill="#EADDFF"
            // d="M0,256L60,256C120,256,240,256,360,266.7C480,277,600,299,720,282.7C840,267,960,213,1080,202.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            d="M0,256L120,240C240,224,480,192,720,197.3C960,203,1200,245,1320,266.7L1440,288L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
            //d="M0,224L60,234.7C120,245,240,267,360,266.7C480,267,600,245,720,208C840,171,960,117,1080,112C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </Svg>
          </View>
          <Text  style={{marginTop:100,textAlign:'center',}} variant='headlineSmall'>Welcome to AnimeVerse</Text>
            <Text  style={{marginTop:20,textAlign:'center',paddingBottom:30,}} variant='titleMedium'>Login to explore the world of Anime</Text>
            <TextInput
            label='Email ID'
            placeholder='Enter your Email ID'
            value={mail}
            onChangeText={(mail)=>setMail(mail)}
            style={{marginBottom:20,marginHorizontal:20}}
            />
            <TextInput
            label='Password'
            placeholder='Enter your password'
            value={pass}
            onChangeText={(pass)=>setPass(pass)}
            style={{marginBottom:20,marginHorizontal:20}}
            secureTextEntry={eye==='eye'?false:true}
            />
            <IconButton icon={eye} style={{top:-70,left:350,}} onPress={handleEye}/>
      <TouchableOpacity  style={{top:-50}} onPress={()=>props.navigation.navigate('ForgotPass')}><Text variant='bodyMedium' style={{textAlign:'right',marginHorizontal:20}}>Forgot Password?</Text></TouchableOpacity>
      <Button mode='contained' onPress={handleLogIn} style={{top:-20,marginHorizontal:20}}>Log in</Button>
      <TouchableOpacity  onPress={()=>props.navigation.navigate('SignUp')}><Text style={{textAlign:'center',marginTop:10,}} variant='bodyMedium'>New user? <Text style={{color:'#6750A4'}}>Sign Up</Text></Text></TouchableOpacity>
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
           
      </View>
    );
  }
export default Login;