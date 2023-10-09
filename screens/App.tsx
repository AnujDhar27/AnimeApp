import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from "react";
import {useState,useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {View,Text,TextInput,Button,Image, ActivityIndicator} from 'react-native';
import Login from "./Login";
import Home from "./Home";
import Search from "./Search";
import Details from "./Details";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from "react-native-vector-icons/Icon";
import Profile from "./Profile";
import SignUp from "./SignUp";

import List from "./List";
import Episodes from "./Episodes";
import Completed from "./Completed";
import ForgotPass from "./ForgotPass";
const Stack=createStackNavigator();
function App()
{ 
const Tab = createMaterialBottomTabNavigator();
const Tab2 = createMaterialTopTabNavigator();

const TobTabs=()=>{
  return(
    <Tab2.Navigator screenOptions={{tabBarActiveTintColor:'#6750A4',tabBarInactiveTintColor:'grey',}}>
    <Tab2.Screen name='Ongoing' component={List}/>
    <Tab2.Screen name='Completed' component={Completed} />
    </Tab2.Navigator>
  )
};

const BotTabs=()=>{
return(
  <Tab.Navigator
  labeled={false}//hides the tab screen labels
  screenOptions={({route})=>({
    tabBarIcon:({focused,color})=>{
      let iconName;
      if(route.name==='Home1')
      {
        iconName=focused
        ?'home'
        :'home-outline'
      }

      else if(route.name==='Search')
      {
        iconName=focused
        ?'card-search'
        :'card-search-outline'
      }

      else if(route.name==='Profile')
      {
        iconName=focused
        ?'account'
        :'account-outline'
      }
      else if(route.name==='List')
      {
        iconName=focused
        ?'view-list'
        :'view-list-outline'
      }
      return <MaterialCommunityIcons name={iconName} size={28} color={color}/>
    }
  })}>
    <Tab.Screen name='Home1' component={Home} />
    <Tab.Screen name='Search' component={Search}/>
    <Tab.Screen name='List' component={TobTabs}/>
    <Tab.Screen name='Profile' component={Profile}/>
  </Tab.Navigator>
)
}
  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
      <Stack.Screen name='ForgotPass' component={ForgotPass} options={{headerShown:false}}/>
      <Stack.Screen name='Home' component={BotTabs} options={{headerShown:false}}/>
      <Stack.Screen name='Search' component={Search} options={{headerShown:false}}/>
      <Stack.Screen name='Details' component={Details} options={{headerShown:false}}/>
      <Stack.Screen name='Episodes' component={Episodes} options={{headerShown:false}}/>
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default  App;