import React, {useContext, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {FlatList, Text, View, StyleSheet} from 'react-native';
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


// export interface ISingleSelectDataType {
//   id: number;
//   value: string;
//   imageSource?: any;
//   data?: any;
// }

import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";

const staticData: Array<ISingleSelectDataType> = [
  { id: 0, value: "Euismod Justo" },
  { id: 1, value: "Risus Venenatis" },
  { id: 2, value: "Vestibulum Ullamcorper" },
  { id: 3, value: "Lorem Nibh" },
  { id: 4, value: "Ligula Amet" },
];


type NavigationProp = StackNavigationProp<MyFeedTabParamList, 'MyFeed33'>;

interface Props {
  navigation: NavigationProp;
}

const NewHome = ({navigation}: Props) => {

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
    <SafeAreaView>
      <View style={styles.top}>
              <Text> 신규 분양 단지 </Text>
      </View>
      <View style={styles.sub}>
      {/* <RNSingleSelect
        data={staticData}        
        onSelect={(selectedItem: ISingleSelectDataType) =>
        console.log("SelectedItem: ", selectedItem)
        }
      /> */}
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  top: {
      marginTop:50,
      height: 30,      
      backgroundColor: "#e53e53",
      alignItems:"center",      
  },
  sub: {
    height: 30,      
    backgroundColor: "blue",
}
})

export default NewHome;
