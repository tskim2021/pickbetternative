import React, {useContext, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, Text, View, StyleSheet,Image,ImageBackground,TouchableHighlight,Button,TouchableOpacity} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

const MyContainer = Styled.SafeAreaView`
flex-direction: row;
background-color: #000;
border-bottom-right-radius:30px;
border-bottom-left-radius:30px;
`;

const TopContainer = Styled.View`
  width: 100%;  
  height:150px;  
`;

const SubContainer = Styled.View`
  width: 100%;
  margin: 0 auto;  
  height:150px;  
  position:absolute;
  top:80px;
  flex-direction: row;
  background-color:red;
`;

const TitleContainer = Styled.View`    
  width: 100%;  
  height:100px;    
  background-color: red;
  color: red;
`;

const TitleDescription = Styled.Text`
  color: red;
  text-align: center;
  width:100%;
  height:30px;
`;
const HeaderRightContainer = Styled.View`
  flex-direction: row;
`;

import {RandomUserDataContext} from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Feed from '~/Components/Feed';

import StoryList from './StoryList';
import { SafeAreaView } from 'react-native-safe-area-context';

type NavigationProp = StackNavigationProp<MyPageTabParamList, 'MyPage'>;

interface Props {
  navigation: NavigationProp;
}


const MyPage = ({navigation}: Props) => {

  const {getMyFeed} = useContext(RandomUserDataContext);
  const [feedList, setFeedList] = useState<Array<IFeed>>([]);
  const [storyList, setStoryList] = useState<Array<IFeed>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <IconButton iconName="topLeft" />,
      headerRight: () => (
        <HeaderRightContainer>          
          <IconButton iconName="topRight" />
        </HeaderRightContainer>
      ),
    });
  }, []);

  useEffect(() => { 
    //setFeedList(getMyFeed());
    //setStoryList(getMyFeed());
    SplashScreen.hide();
  }, []);

  return (

    // <FlatList
    //   data={feedList}
    //   keyExtractor={(item, index) => {
    //     return `myfeed-${index}`;
    //   }}
    //   showsVerticalScrollIndicator={false}
    //   onRefresh={() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //       setFeedList(getMyFeed());
    //       setStoryList(getMyFeed());
    //       setLoading(false);
    //     }, 2000);
    //   }}
    //   onEndReached={() => {
    //     setFeedList([...feedList, ...getMyFeed()]);
    //   }}
    //   onEndReachedThreshold={0.5}
    //   refreshing={loading}
    //   ListHeaderComponent={<StoryList storyList={storyList} />}
    //   renderItem={({item, index}) => (
    //     <Feed
    //       id={index}
    //       name={item.name}
    //       photo={item.photo}
    //       description={item.description}
    //       images={item.images}
    //     />
    //   )}
    // />
    <MyContainer>
      <TopContainer>
        {/* <ImageBackground source={require('~/Assets/Images/mypage/my_title_img.png')} style={styles.bgImage} /> */}
                
        <SubContainer >          
          <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
            <Text style={[styles.myName]} >픽배터</Text>        
            <Image source={require('~/Assets/Images/mypage/i_point.png')} />
            <Text style={[styles.myPoint]}>15</Text>           
          </TouchableOpacity>
        </SubContainer>
                
      </TopContainer>
      <TitleContainer>
        <TitleDescription>
          힐스테이트 송도 더 테라스 1018동 3405호 
        </TitleDescription>
      </TitleContainer>

    </MyContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  bgImage:{
    width: '100%',
    height: '100%', 
    borderRadius:100,
  },
  myName:{
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color:"white",
  },
  myPoint:{
    flexBasis: 70,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  }
})

export default MyPage;
