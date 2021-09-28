import React, {memo, useContext, useState, useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FlatList, 
  Text, 
  View, 
  ScrollView,
  StatusBar,
  StyleSheet,  
  useColorScheme,
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

import HighchartsReactNative from '@highcharts/highcharts-react-native';
import {WebView} from 'react-native-webview';

import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import { CurrentRenderContext } from '@react-navigation/core';
import {NavigationContainer} from '@react-navigation/native';

const tempData = require('~/Assets/json/total.json');
const modules = ['heatmap', 'solid-gauge', 'highcharts-3d']; //scatter는 따로 필요 없음. 

const chart_data = [];
const x = 'solar_Avg';
const y = 'view1_img_Avg';

for (let key = 0; key < tempData.length; key++) {
    chart_data.push({
        x: Math.round(tempData[key][x]),
        y: Math.round(tempData[key][y]),
        // colorValue: Math.round(tempData[key].pricePerPyeong_show),
        name: tempData[key].kaptName,
        // kaptName: tempData[key].kaptName,
        // latitude: tempData[key]['latitude'],
        // longitude: tempData[key]['longitude'],
        complexNo: tempData[key]['complexNo'],
    });
}

const Item = memo(({complexList}) => {
  return (
      <ScrollView style={styles.scrollView} key={0}>
          {complexList.map((item, idx) => (
              <Text key={idx}>{item}</Text>
          ))}
      </ScrollView>
  );
});

const Chart = ({onReceiveData}) => {

  function selectPointsByDrag(e) {

      var xName = 'solar_Avg';
      var yName = 'view1_img_Avg';

      const selectedArrayForScatter = [];

      e.target.series[0].points.forEach(point => point.select(false, false));

      e.target.series[0].points.forEach(point => {
          if (
              point.x >= e.xAxis[0].min &&
              point.x <= e.xAxis[0].max &&
              point.y >= e.yAxis[0].min &&
              point.y <= e.yAxis[0].max
          ) {
              selectedArrayForScatter.push(point.complexNo);
              // if (temp != undefined) selectedArrayForScatter.push(temp);
              point.select(true, true);
          }
      });

      if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
              JSON.stringify(selectedArrayForScatter),
          );
      }
      return false;
  }

  const scatterChartOptions = {
      chart: {
          type: 'scatter',
          zoomBySingleTouch: true,
          zoomType: 'xy',
          // zoomKey: 'alt',

          events: {
              selection: selectPointsByDrag,
              selectedpoints: function (e) {},
              click: function (e) {},
          },
      },
      title: {
          text: 'abcd',
      },

      xAxis: {
          title: {
              text: '일사량',
          },
      },
      yAxis: {
          title: {
              text: '조망',
          },
      },
      legend: {
          enable: false,
      },
      plotOptions: {
          scatter: {
              marker: {
                  radius: 5,
                  symbol: 'circle',
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)',
                      },
                      select: {
                          radius: 7,
                          enabled: true,
                          fillColor: '#4d589b',
                          lineColor: '#323f89',
                      },
                  },
              },
              states: {
                  hover: {
                      marker: {
                          enabled: false,
                      },
                  },
              },
          },
      },
      tooltip: {
          enabled: false,
      },
      series: {
          data: chart_data,
      },
  };

  return (
      <HighchartsReactNative
          styles={styles.chart}
          options={scatterChartOptions}
          modules={modules}
          onMessage={onReceiveData}
      />
  );
};

function Parcoords({onReceiveData}) {
  let webviewRef = useRef();
  /** 웹뷰 ref */
  const handleSetRef = _ref => {
      webviewRef = _ref;
  };

  /** webview 로딩 완료시 */
  const handleEndLoading = e => {
      console.log('handleEndLoading');
      /** rn에서 웹뷰로 정보를 보내는 메소드 */
  };

  const uri =
      'http://pickbetter.shop/ParcoordsForWebview/ParcoordsForWebView.html';

  return (
      <ScrollView
          style={styles.HorScrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}>
          <WebView
              style={styles.WebView}
              onLoadEnd={handleEndLoading}
              onMessage={onReceiveData}
              ref={handleSetRef}
              source={{uri}}
              javaScriptEnabled={true}
              domStorageEnabled={true}></WebView>
      </ScrollView>
  );
}

function MyMap({complexList}) {

  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  const center = {
      latitude: tempData[0].latitude,
      longitude: tempData[0].longitude,
  };
  

  return (
      <NaverMapView
          style={{width: '100%', height: '100%'}}
          showsMyLocationButton={true}
          center={{...center, zoom: 13}}
          // onTouch={e =>
          //     console.warn('onTouch', JSON.stringify(e.nativeEvent))
          // }
          // onCameraChange={e =>
          //     console.warn('onCameraChange', JSON.stringify(e))
          // }
          // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
      >
          {complexList.map((item, idx) => (
              <Marker
                  key={idx}
                  coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                  }}
              />
          ))}
      </NaverMapView>
  );
}

//chart webview에서 receive 한 데이터
const onReceiveData = message => {
  const receivedComplexNo = JSON.parse(message);
  console.log(receivedComplexNo);

  //receivedComplexNo로 tempData에서 데이터 찾아서, setComplexList에 넣어줘야한다.
  let selectedData = [];
  receivedComplexNo.forEach(e => {
      var selected = tempData.find(t => t.complexNo == e);
      selectedData = [...selectedData, selected];
  });
  console.log(selectedData);

  setComplexList(selectedData);
};

const onReceiveDataForPC = ({nativeEvent: {data}}) => {
  var tempList = [];
  if (JSON.parse(data).length != 0) {
      tempList = JSON.parse(data).map(a => {
          return {
              latitude: parseFloat(a['latitude']),
              longitude: parseFloat(a['longitude']),
          };
      });
  }
  console.log(tempList);
  setComplexList(tempList);
};

function ChartScreen() {
  return <Chart onReceiveData={onReceiveData} />;
}

function PCScreen() {
  return (
      <ScrollView
          style={styles.HorScrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}>
          <Parcoords onReceiveData={onReceiveDataForPC} />
      </ScrollView>
  );
}

type NavigationProp = StackNavigationProp<MyFeedTabParamList, 'MyFeed33'>;

interface Props {
  navigation: NavigationProp;
}


const Complex = ({navigation}: Props) => {

  const [complexList, setComplexList] = useState(tempData);
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

  //render() {
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

      // <View style={styles.container}>
      //         <Text> Complex Screen </Text>
      // </View>      
        <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
                <MyMap complexList={complexList} />
            </View>
            <View style={styles.container}>
                <Text>1234</Text>
                {/* <Chart onReceiveData={onReceiveData} /> */}
            </View>
        </SafeAreaView>
      
    );
  //}; //render 
};

const styles = StyleSheet.create({
    safeView: {
        flex: 1, 
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chart: {
        backgroundColor: '#e53e53',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        flex: 0.5,
    },
    HorScrollView: {
        backgroundColor: '#fff',
        // width: 700,
        width: '100%',
        flex: 1,
    },
    WebView: {
        // width: '100%',
        width: 700,
        flex: 0.3,
        // height: '100%',
    },
})

export default Complex;
