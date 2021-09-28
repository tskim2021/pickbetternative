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

type NavigationProp = StackNavigationProp<MyFeedTabParamList, 'MyFeed33'>;

interface Props {
  navigation: NavigationProp;
}

const Notice = ({navigation}: Props) => {

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
    <View style={styles.container}>
            <Text> Notice Screen </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  }
})

export default Notice;
