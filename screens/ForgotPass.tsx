import {View,Dimensions} from 'react-native'
import {Text,TextInput,Button, Dialog} from 'react-native-paper';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import DialogActions from 'react-native-paper/lib/typescript/components/Dialog/DialogActions';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';
import Svg,{Path} from 'react-native-svg';

const ForgotPass=(props)=>{
    const db=firestore();
    const [mail,setMail]=useState('');
    const [pass,setPass]=useState('');
    const [vis1,setVis1]=useState(false);
    const [vis2,setVis2]=useState(false);
    const [name,setName]=useState('');
    const [errorMessage,setErrorMessage]=useState('An error has occured');
    const handleFP=()=>{
        auth()
       .sendPasswordResetEmail(mail)
       .then(()=>{
        setVis1(true)
       })
       .catch(error=>{
        if(error.code==='auth/invalid-email')
        {
            setErrorMessage('The email id is invalid, please enter a valid email id')
            setVis2(true);
        }
       })
    }
    return(
        <View style={{flex:1,}}>
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
          <Text style={{marginTop:60,textAlign:'center'}} variant='headlineLarge'>Forgot Password?</Text>
          <Text variant='titleSmall' style={{textAlign:'center',marginTop:20,}}>Please provide the email address you used to create your account,and we'll send you a link to reset your password</Text>
            <TextInput
                label='Email ID'
                placeholder='Enter your Email ID'
                value={mail}
                onChangeText={(mail)=>setMail(mail)}
                style={{marginTop:20,marginHorizontal:20}}
             />

             <Button mode='contained' onPress={handleFP} style={{marginTop:40,marginHorizontal:20}}>Submit</Button>
             <Dialog visible={vis1}>
                <Dialog.Title style={{textAlign:'center'}}>Success!</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium'>Password Reset instructions have been sent to {mail}</Text>
                    <Text variant='bodyMedium'>Kindly check your mail</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>setVis1(false)}>OK</Button>
                </Dialog.Actions>
             </Dialog>
             <Dialog visible={vis2}>
                <Dialog.Title style={{textAlign:'center'}}>Alert!</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium'>{errorMessage}</Text>
                    
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>setVis2(false)}>OK</Button>
                </Dialog.Actions>
             </Dialog>
          </View>
           
        </View>
    )
}
export default ForgotPass;