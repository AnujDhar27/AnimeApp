import {View} from 'react-native'
import {Text,TextInput,Button, Dialog} from 'react-native-paper';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import DialogActions from 'react-native-paper/lib/typescript/components/Dialog/DialogActions';
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore';


const SignUp=(props)=>{
    const db=firestore();
    const [mail,setMail]=useState('');
    const [pass,setPass]=useState('');
    const [vis,setVis]=useState(false);
    const [name,setName]=useState('');
    const handleSignIn=()=>{
        auth()
        .createUserWithEmailAndPassword(mail,pass)
        .then((usercred)=>{
            const user=usercred.user;
            setVis(true);
            const ref=db.collection('users').doc(user?.uid)
            ref.set({'Name': name})
        })
    }
    return(
        <View style={{flex:1,paddingHorizontal:20}}>
            <Text style={{marginTop:150,textAlign:'center'}} variant='headlineLarge'>Create your Account</Text>
            <TextInput
            label='Name'
            placeholder='Enter your name'
            value={name}
            onChangeText={(name)=>setName(name)}
            style={{marginTop:80,}}
            />
            <TextInput
                label='Email ID'
                placeholder='Enter your Email ID'
                value={mail}
                onChangeText={(mail)=>setMail(mail)}
                style={{marginTop:20,}}
             />
             <TextInput
             label='Password'
             placeholder='Enter your password'
             value={pass}
             onChangeText={(pass)=>setPass(pass)}
             style={{marginTop:20,}}
             />
             <Button mode='contained' onPress={handleSignIn} style={{marginTop:40,}}>Sign In</Button>
             <Dialog visible={vis}>
                <Dialog.Title style={{textAlign:'center'}}>Congratulations!</Dialog.Title>
                <Dialog.Content>
                    <Text variant='bodyMedium'>Your Account has been successfuly created!</Text>
                    <Text variant='bodyMedium'>You can now log in using your credentials</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>props.navigation.navigate('Login')}>OK</Button>
                </Dialog.Actions>
             </Dialog>
        </View>
    )
}
export default SignUp;