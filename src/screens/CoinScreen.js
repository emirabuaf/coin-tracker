import React,{Component} from 'react';
import {ScrollView,View,Text,Image,Button,TouchableOpacity,Alert} from 'react-native';
import axios from 'axios';
import SVGImage from 'react-native-svg-image';
import Swipeout from 'react-native-swipeout';


class CoinScreen extends Component{



  state={
    cryptos:[],
    watchList:[],
    selectedItem:null,
    toggle:true,

  }

  componentDidMount() {
  this.fetchCoinData()
    }

    fetchCoinData = async() => {
      const fetchCoin = await axios.get('https://api.coinranking.com/v1/public/coins')
        this.setState({cryptos:fetchCoin.data.data.coins})
    }

    renderWatchList = () => {
      return Object.keys(this.state.watchList).map((key) => {
        console.log(this.state.watchList[key].price)
        const swipeSettings = {
          autoClose:true,
          onClose:(secId,rowId,direction) => {
            this.setState({activeRowKey:null})
          },
          onOpen:(secId,rowId,direction) => {
            this.setState({activeRowKey:key})
          },
          right:[
            {
              onPress:() => {
                Alert.alert(
                  'Alert',
                  'Are you sure you want to delete ?',
                  [
                    {text:'No', onPress:() => console.log('Cancel Pressed'),style:'cancel'},
                    {text:'Yes', onPress:() => {
                      this.removeItem(key)
                    }},
                  ],
                  {cancelable:true}
                )
              },
              text:'Delete',type:'delete'
            }
          ],
          rowId:this.state.watchList[key].id,
          sectionId:1
        }

        return(

          <Swipeout key={this.state.watchList[key].id} {...swipeSettings} style={{backgroundColor: 'white'}} >
          <View style={styles.coinStyle} >
            <View style={{flexDirection: 'column'}}>
              <SVGImage style={styles.imageStyle} source={{uri: this.state.watchList[key].iconUrl}} />
              <Text style={{marginTop:15,marginRight:90}}>{this.state.watchList[key].symbol}</Text>
            </View>
            <View style={{marginRight: 105,marginTop:30}}>
              <Text style={{fontSize: 15,fontWeight: 'bold'}}>${Math.round(this.state.watchList[key].price*10000)/10000}</Text>
              <Text style={{paddingTop:15 }}>${this.state.watchList[key].marketCap.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Text>
              <View>
              <Text
              style={{color:'white',fontWeight:'bold',fontSize:20,marginTop:-60,marginLeft: 150,width:80,height:80,backgroundColor:this.state.watchList[key].change < 0 ? 'red' : 'green'}}>
              %{this.state.watchList[key].change}
              </Text>
              </View>
            </View>
          </View>
          </Swipeout>
        )
      })
  }

  removeItem = (key) => {
    const watchList = this.state.watchList;
    watchList.splice(key,1);
    this.setState({watchList})
  }

    addItem = (key) => {
    this.setState({
      watchList:[...this.state.watchList,this.state.cryptos[key]],
      selectedItem:this.state.cryptos[key]
      })
    }

    showWatchList = () => {
      const {watchList} = this.state
      this.setState({toggle:false})
    }

    showAllCoins = () => {
      const {cryptos} = this.state
      this.setState({toggle:true})
    }



  render(){

    return(
      <ScrollView>
      <View>
          <View style={{marginTop:45,flexDirection: 'row',justifyContent:'space-between',justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.showWatchList}>
              <Text style={{fontSize:15,marginRight: 15}}>watchList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showAllCoins}>
              <Text style={{fontSize:15}}>All Coins</Text>
            </TouchableOpacity>
          </View>
          {
            this.state.toggle ?
        <View>
          {Object.keys(this.state.cryptos).map((key,id) => (
          <TouchableOpacity key={this.state.cryptos[key].id} onPress={() => this.addItem(key)}>
            <View style={styles.coinStyle} >
              <View style={{flexDirection: 'column'}}>
                <SVGImage style={styles.imageStyle} source={{uri: this.state.cryptos[key].iconUrl}} />
                <Text style={{marginTop:15,marginRight:90}}>{this.state.cryptos[key].symbol}</Text>
              </View>
              <View style={{marginRight: 105,marginTop:30}}>
                <Text style={{fontSize: 15,fontWeight: 'bold'}}>${Math.round(this.state.cryptos[key].price*10000)/10000}</Text>
                <Text style={{paddingTop:15 }}>${this.state.cryptos[key].marketCap.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Text>
                <View>
                <Text
                style={{color:'white',fontWeight:'bold',fontSize:20,marginTop:-60,marginLeft: 150,width:80,height:80,backgroundColor:this.state.cryptos[key].change < 0 ? 'red' : 'green'}}>
                %{this.state.cryptos[key].change}
                </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          ))}
        </View> :(this.renderWatchList())
      }
      </View>
      </ScrollView>
    )
  }
}


const styles={
  coinStyle:{
    flexDirection:'row',
    justifyContent: 'space-between',
    padding:20,
    borderBottomWidth:0.2,
  },
  imageStyle:{
    width:35,
    height:35
  }
}

export default CoinScreen;
