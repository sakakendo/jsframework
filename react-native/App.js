import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import Channel from './Channel';
import { Button, Text, View } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

function SampleComponent(props, {navigation}){
  console.log(props);
  return(
    <View>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Text>hello</Text>
      <Button
        onPress={()=>navigation.navigate('#general')}
        title="go to #general" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App(){
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="#random">
          <Drawer.Screen name="general" component={Channel} />
          <Drawer.Screen name="random" component={Channel} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
//  }
}
