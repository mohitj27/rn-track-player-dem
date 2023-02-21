import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
export default function App() {

  // TrackPlayer.registerPlaybackService(() => require('./service'));

 const [apiData,setApiData] = useState({});
 const start = async (data) => {
  // Set up the player

  // Add a track to the queue
  await TrackPlayer.add({
      id: 'trackId',
      url: data.enclosureUrl,
      title: 'Track Title',
      artist: 'Track Artist',
      artwork: data.image
  });

  // Start playing it
  await TrackPlayer.play();
};
 const goForAxios = () => {
        
        axios.get("https://6sswjybjxsyovdiqpw7uehxmrq0nhhmp.lambda-url.us-east-1.on.aws/?rss_url=https://anchor.fm/s/55669fa4/podcast/rss&=&=")
            .then(response => {
                // console.log('getting data from axios', response.data);
                setApiData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(()=>{
      async function setup() {
        await TrackPlayer.setupPlayer();
      }
      setup();
       goForAxios();
    },[])
    if(apiData && apiData.episodes_list) {
console.log(apiData.episodes_list);
start(apiData.episodes_list[0]);
    }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
