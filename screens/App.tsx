import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from "react";
import {useState,useEffect} from 'react';
import {View,Text,TextInput,Button,Image, ActivityIndicator} from 'react-native';
import Login from "./Login";
import Home from "./Home";
import Search from "./Search";
import Details from "./Details";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from "react-native-vector-icons/Icon";
import Profile from "./Profile";
const Stack=createStackNavigator();
function App()
{ 
// const navigation=useNavigation();
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(user => {

//       if (user) {
//         // User is authenticated; navigate to the Home screen.
//         navigation.navigate('Home');
//       }
//     });

//     return subscriber; // unsubscribe on unmount
//   }, []);
const Tab = createMaterialBottomTabNavigator();
const BotTabs=()=>{
return(
  <Tab.Navigator>
    <Tab.Screen name='Home1' component={Home}/>
    <Tab.Screen name='Search' component={Search}/>
    <Tab.Screen name='Profile' component={Profile}/>
  </Tab.Navigator>
)
}
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='Home' component={BotTabs} options={{headerShown:false}}/>
      <Stack.Screen name='Search' component={Search} options={{headerShown:false}}/>
      <Stack.Screen name='Details' component={Details} options={{headerShown:false}}/>

    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default  App;