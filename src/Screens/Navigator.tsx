import React, {useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {UserContext} from '~/Context/User';
import SearchBar from '~/Components/SearchBar';
import Loading from '~/Components/Loading';

import Login from '~/Screens/Login';
import PasswordReset from '~/Screens/PasswordReset';
import Signup from '~/Screens/Signup';

import MyFeed from '~/Screens/MyFeed';
import Feeds from '~/Screens/Feeds';
import FeedListOnly from '~/Screens/FeedListOnly';
import Notice from '~/Screens/Notice';

import Upload from '~/Screens/Upload';
import Notification from '~/Screens/Notification';
import Profile from '~/Screens/Profile';

//새로시작하는 탭화면
//home
import Home from '~/Screens/Home';

//단지비교
import Complex from '~/Screens/Complex';

//세대분석
import House from '~/Screens/House';

//신규분양단지
import NewHome from '~/Screens/NewHome';

//마이홈
import MyPage from '~/Screens/MyPage';


import CustomDrawer from '~/Screens/Drawer';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
    </Stack.Navigator>
  );
};
//첫번째 탭 screenOptions={{headerTitle: 'SNS App11',  headerShown: false, }}
const HomeTab = () => {
  return (
    <Stack.Navigator   >
      <Stack.Screen
        name="MyFeed"
        component={Home}        
        options={{
            headerTitle: '',
            headerShown: true,
            headerStyle: {
                backgroundColor : 'transparent',
            },
            headerTransparent: true, 
        }} 
      />
      <Stack.Screen
        name="FeedListOnly"
        component={FeedListOnly}
        // options={{
        //   headerBackTitleVisible: false,
        //   title: '둘러보기',
        //   headerTintColor: '#292929',
        // }}
        
      />
    </Stack.Navigator>
  );
};
//두번째 탭
const ComplexTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Complex"
        component={Complex} //Feeds
        // options={{
        //   header: () => <SearchBar />,
        // }}
        options={{
          headerTitle: '',
          headerShown: true,
          headerStyle: {
              backgroundColor : 'transparent',
          },
          headerTransparent: true, 
        }} 
      />
      <Stack.Screen
        name="FeedListOnly"
        component={FeedListOnly}
        // options={{
        //   headerBackTitleVisible: false,
        //   title: '둘러보기',
        //   headerTintColor: '#292929',
        // }}
        
      />
      <Stack.Screen
        name="Notice"
        component={FeedListOnly}
        // options={{
        //   headerBackTitleVisible: false,
        //   title: '둘러보기',
        //   headerTintColor: '#292929',
        // }}
        
      />
    </Stack.Navigator>
  );
};
//세번째 탭
const HouseTab = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="Upload"
        component={House} //Upload
        // options={{title: '사진 업로드11'}}
        options={{
          headerTitle: '',
          headerShown: true,
          headerStyle: {
              backgroundColor : 'transparent',
          },
          headerTransparent: true, 
        }} 
      />
    </Stack.Navigator>
  );
};
//네번째 탭 notification 
const NewHomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="notice"
        component={NewHome} // Notification
        // options={{title: '사진 업로드22'}}
        options={{
          headerTitle: '',
          headerShown: true,
          headerStyle: {
              backgroundColor : 'transparent',
          },
          headerTransparent: true, 
        }} 
      />
    </Stack.Navigator>
  );
};

//다섯번째 탭
const MyPageTab = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="MyPage"
        component={MyPage} // Profile
        // options={{title: 'Profile'}}
        options={{
          headerTitle: '',
          headerShown: false,
          headerStyle: {
              backgroundColor : 'transparent',
          },
          headerTransparent: true, 
        }} 
      />
      <Stack.Screen
        name="FeedListOnly"
        component={FeedListOnly}
        // options={{
        //   headerBackTitleVisible: false,
        //   title: '둘러보기',
        //   headerTintColor: '#292929',
        // }}
        
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        // options={{
        //   headerBackTitleVisible: false,
        //   title: '둘러보기',
        //   headerTintColor: '#292929',
        // }}
        
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <BottomTab.Navigator tabBarOptions={{showLabel: false}}>
      <BottomTab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/app_home_on.png')
                  : require('~/Assets/Images/Tabs/app_home_off.png')
              }
            />
          ),
          headerShown:false,          
        }}

      />
      <BottomTab.Screen
        name="Complex"
        component={ComplexTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/app_apt_on.png')
                  : require('~/Assets/Images/Tabs/app_apt_off.png')
              }
            />
          ),
          headerShown:false,
        }}
      />
      <BottomTab.Screen
        name="House"
        component={HouseTab}
        options={{
          tabBarLabel: 'Third',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/app_unit_on.png')
                  : require('~/Assets/Images/Tabs/app_unit_off.png')
              }
            />
          ),
          headerShown:false,
        }}
      />
      <BottomTab.Screen
        name="NewHome"
        component={NewHomeTab} //Notification
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/app_new_on.png')
                  : require('~/Assets/Images/Tabs/app_new_off.png')
              }
            />
          ),
          headerShown:false,
        }}
      />
      <BottomTab.Screen
        name="MyPage"
        component={MyPageTab}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Image
              source={
                focused
                  ? require('~/Assets/Images/Tabs/app_my_on.png')
                  : require('~/Assets/Images/Tabs/app_my_off.png')
              }
            />
          ),
          headerShown:false,
        }}
      />
    </BottomTab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerType="slide"
      drawerContent={(props) => <CustomDrawer props={props} />}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
};

export default () => {
  const {isLoading, userInfo} = useContext<IUserContext>(UserContext);

  if (isLoading === false) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {userInfo ? <MainTabs /> : <LoginNavigator />}
    </NavigationContainer>
  );

  
};
