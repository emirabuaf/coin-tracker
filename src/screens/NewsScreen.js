import React,{Component} from 'react';
import {ScrollView, View,Text,TouchableOpacity,Linking } from 'react-native';
import axios from 'axios';

class NewsScreen extends Component{

  state={news:[]}

  componentDidMount(){
    this.fetchNews()
  }

  fetchNews = async() => {
    const fetchNews = await axios.get('https://newsapi.org/v2/everything?sources=crypto-coins-news&apiKey=0b6c6577301b4bbfa9b548cf392f505e')
      this.setState({news:fetchNews.data.articles})
  }

  renderNews = () => {
    return this.state.news.map((news,index)=>{
      return (
      <TouchableOpacity key={index} onPress={() =>Linking.openURL(news.url)}>
        <View style={styles.newsStyle}>
          <Text style={styles.textStyle}>{news.title}</Text>
          <Text >{news.publishedAt}</Text>
        </View>
      </TouchableOpacity>

      )
    })
  }


  render(){
    return(
      <ScrollView>
        <View>
        {this.renderNews()}
        </View>
      </ScrollView>
    )
  }
}

const styles={
  newsStyle:{
    padding:10,
    borderBottomWidth:0.5,
  },
  textStyle:{
    fontWeight:'bold',
    fontSize:17
  }
}


export default NewsScreen;
