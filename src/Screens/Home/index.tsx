import React, {useContext, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, 
  Text, 
  View, 
  StyleSheet ,
  ImageBackground,
  Image,
  Platform,
  TextInput
} from 'react-native';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

const HeaderRightContainer = Styled.View`
  flex-direction: row;
`;

import {RandomUserDataContext} from '~/Context/RandomUserData';
import IconButton from '~/Components/IconButton';
import Feed from '~/Components/Feed';

import StoryList from './StoryList';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../Components/Button';
import { forSlideLeft } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators';
import { ScrollView } from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<MyFeedTabParamList, 'MyFeed33'>;

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #FEFFFF;
`;

const TopContainer = Styled.View`
  width: 100%;
  margin: 0 0 20px 0;
  padding: 0 20px 0 20px;
  border-top-width: 1px;
  border-color: #D3D3D3;
  text-align:center;
  align-items: center;
`;

const SearchContainer = Styled.View`
  flex-direction: row;
  margin:0 20px;  
  padding: 8px 16px;
  align-items: center;
  border-radius: 80px;
  background-color: rgba(255,255,255,0.9);
`;

const BottomContainer = Styled.View`  
  padding: 8px 16px;  
  background-color: #fff;   
  height: 65%;
  margin-top:50px;
  text-align:center;
  border-radius: 30px;
`;
const BottomText = Styled.View`  
  margin: 0 0 40px;
`;
const BottomButton = Styled.View`  
  flex-direction: row;
  margin:0 0 15px 0;
`;
const ScrollViews = Styled.View`  
  flex-direction: row;
`;
interface Props {
  navigation: NavigationProp;
}


const Home = ({navigation}: Props) => {

  const {getMyFeed} = useContext(RandomUserDataContext);
  const [feedList, setFeedList] = useState<Array<IFeed>>([]);
  const [storyList, setStoryList] = useState<Array<IFeed>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const text = `PICK.BETTER`
  const logoUrl = `~/Assets/Images/home/logo_type2.png`;

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

    <Container>
      <ImageBackground
          style={styles.backgroundImage}
          source={require('~/Assets/bg/landing_img.png')}>

          <TopContainer>
            <Image source={require('~/Assets/Images/home/logo_type2.png')} style={[styles.topimage]} /> 
          </TopContainer>

          <SearchContainer>
            <Image source={require('~/Assets/Images/home/i_search.png')} style={[styles.searchimage]} /> 
            <TextInput style={styles.input}
            // onChangeText={onChangeNumber}
            // value={number}
            placeholder="지역 또는 단지명을 입력하세요"
            //keyboardType="numeric"
            />
          </SearchContainer>

          <BottomContainer>
            <Image source={require('~/Assets/Images/home/i_dropdwon_down.png')} style={[styles.searchimage]} /> 
            <BottomText>
              <Text style={[styles.semiBold]}>#서울 #강남구 #대치1동에서 </Text>
              <Text style={[styles.semiBold]}>#지하철 가까운 #개방감 좋은 </Text>            
              <Text style={[styles.semiBold]}>#조망 좋은 #햇빛잘드는 </Text>
              <Text style={[styles.linkGo]}>단지찾기 <Image source={require('~/Assets/Images/home/i_go_on.png')} /> </Text>
            </BottomText>
              <BottomButton>
                <Text style={[styles.mainButton]}>강남구</Text>
                <Text style={[styles.mainButton]}>마포구</Text>
                <Text style={[styles.mainButton]}>서초구</Text>
                <Text style={[styles.mainButton]}>관악구</Text>
                <Text style={[styles.mainButton]}>양천구</Text>
                <Text style={[styles.mainButton]}>강남구</Text>
                <Text style={[styles.mainButton]}>마포구</Text>
                <Text style={[styles.mainButton]}>서초구</Text>
                <Text style={[styles.mainButton]}>관악구</Text>
                <Text style={[styles.mainButton]}>양천구</Text>
              </BottomButton>
              <BottomButton>
                <Text style={[styles.mainButton]}>논현1동</Text>
                <Text style={[styles.mainButton]}>논현2동</Text>
                <Text style={[styles.mainButton]}>대치1동</Text>
                <Text style={[styles.mainButton]}>대치2동</Text>
                <Text style={[styles.mainButton]}>논현1동</Text>
                <Text style={[styles.mainButton]}>논현2동</Text>
                <Text style={[styles.mainButton]}>대치1동</Text>
                <Text style={[styles.mainButton]}>대치2동</Text>
              </BottomButton>
              <BottomButton>
                <Text style={[styles.mainButton]}>지하철 가까운</Text>
                <Text style={[styles.mainButton]}>초등학교 가까운</Text>
                <Text style={[styles.mainButton]}>최근 지어진</Text>
                <Text style={[styles.mainButton]}>지하철 가까운</Text>
                <Text style={[styles.mainButton]}>초등학교 가까운</Text>
                <Text style={[styles.mainButton]}>최근 지어진</Text>
              </BottomButton>
          </BottomContainer>


      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({  
  flex: {flex: 1, },
  top : { alignItems:"center"},
  backgroundImage: {flex: 1},
  topimage: { width: 164, height: 21, marginTop:150 },
  search: { width:"90%", marginLeft:"5%", borderRadius:25, height: 54, backgroundColor:"white" },
  padding10: {padding: 10},
  margin20: {margin: 20},
  marginL20: {marginLeft: 20},
  marginR20: {marginRight: 20},  
  searchimage: {marginLeft: "auto", marginRight: "auto", alignItems: "center" },
  input:     {width:"90%", height: 40, borderWidth: 0,fontWeight: '600', padding: 10 }, 
  regular:   {fontFamily: 'DancingScript-Regular',  fontWeight: '400'},
  medium:    {fontFamily: 'DancingScript-Medium',   fontWeight: '500'},
  semiBold:  {fontFamily: 'DancingScript-SemiBold', fontWeight: '600', fontSize:24   },
  linkGo:  {position: 'relative', bottom: 0, right: 0, height: 46, lineHeight: 46, fontSize: 18},
  bold: {
    fontFamily: 'DancingScript-Bold',
    fontWeight: Platform.select({ios: '700', android: '600'}),
  },
  mainButton: {
    marginLeft: 5, 
    marginRight: 5, 
    paddingLeft: 15, 
    paddingRight: 15,
    lineHeight: 32, 
    height: 32,
    fontSize: 16,
    color: '#888888',
    textAlign: 'center', 
    backgroundColor: '#f2f2f2', 
    borderRadius: 30
  }
})

export default Home;
