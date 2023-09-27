import React, { useState, useEffect } from 'react';
import { View, Image, FlatList } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Completed=()=>{
    return(
    <View style={{flex:1,paddingHorizontal:20}}>
        <Text style={{ textAlign: 'center', paddingTop: 50, paddingBottom: 20 }} variant="titleLarge">
        Completed
      </Text>
    </View>
    )
}
export default Completed;