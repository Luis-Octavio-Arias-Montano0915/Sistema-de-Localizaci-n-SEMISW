/*import React, {PureComponent} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
//import YoutubeIframe from 'react-native-youtube-iframe';

const YOUTUB = "https://www.youtube.com/watch?v=gHhbKWjytGA&list=PLsa6fFCUllDDtvaF3Incdj_munTKQ8ssn" 

const videos = [
    { id: '1', url: 'https://www.youtube.com/watch?v=mMfkwUiGMIo' },
    { id: '2', url: 'https://www.youtube.com/watch?v=5-IRImDXjjc&t=166s' },
]

const VideoItem = ({ videoUrl}) => (
    <WebView 
        source={{ uri: videoUrl}}
        style={{width: 300, height: 200}}
    />
);

export default class TAB2 extends PureComponent {
    render() {      
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                horizontal
                renderItem={({item})  => <VideoItem videoUrl={item.url} />}
            
                />
                
            <StatusBar style="auto" />
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    video: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
});*/