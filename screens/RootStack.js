import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import MainTab from './MainTab';
import WelcomeScreen from './WelcomeScreen';
import WebviewScreen from './WebviewScreen';
import SignUpScreen from './SignUpScreen';
import SetupProfileScreen from './SetupProfileScreen';
import ListScreen from './ListScreen';
import PageScreen from './PageScreen';
import SettingScreen from './SettingScreen';
import ProfileScreen from './ProfileScreen';
import InformationScreen from './InformationScreen';
import EssayScreen from './EssayScreen';
import MyEssayScreen from './MyEssayScreen';
import HomeScreen from './HomeScreen';
import MyPage from './MyPage';
import EditPageScreen from './EditPageScreen';
import ModifyProfileScreen from './ModifyProfileScreen';
import MoveToMyEssayScreen from './MoveToMyEssayScreen';
import MoveToEssayScreen from './MoveToEssayScreen';
import RegisterInfoScreen from './RegisterInfoScreen';
const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      
      <Stack.Screen
        name="ModifyProfile"
        component={ModifyProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="List"
        options={{title: '글쓰기'}}
        component={ListScreen}
      />
      
      
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      
      
      <Stack.Screen
        name="RegisterInfo"
        component={RegisterInfoScreen}
        options={{headerTitleAlign: 'center'}}
      />
      
      <Stack.Screen
        name="SetupProfile"
        component={SetupProfileScreen}
        options={{headerTitleAlign: 'center'}}
      />

      
      <Stack.Screen
        name="MoveToEssay"
        component={MoveToEssayScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MoveToMyEssay"
        component={MoveToMyEssayScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="EditPage" component={EditPageScreen} />
      <Stack.Screen
        name="MyEssay"
        component={MyEssayScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Essay"
        options={{title: 'Essay', headerShown: false}}
        component={EssayScreen}
      />

      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false}}
      />

      
      <Stack.Screen
        name="Information"
        component={InformationScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="WebView" component={WebviewScreen} />
      

      <Stack.Screen
        name="Page"
        options={{title: '페이지', headerShown: false}}
        component={PageScreen}
      />

      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
