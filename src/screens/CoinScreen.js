import React,{Component} from 'react';
import {ScrollView,View,Text,Image,TouchableOpacity,Alert} from 'react-native';
import axios from 'axios';
import SVGImage from 'react-native-svg-image';
import Swipeout from 'react-native-swipeout';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class CoinScreen extends Component{



  state={
    cryptos:[],
    watchList:[],
    selectedItem:null,
    toggle:true,
    activeColor:false
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
            <View key={this.state.cryptos[key].id} style={styles.coinStyle} >
              <View style={{flexDirection: 'column'}}>
                <SVGImage style={styles.imageStyle} source={{uri: this.state.cryptos[key].iconUrl}} />
                <Text style={{marginTop:15,marginRight:90}}>{this.state.cryptos[key].symbol}</Text>
              </View>
              <View style={{marginRight: 105,marginTop:15}}>
                <Text style={{fontSize: 15,fontWeight: 'bold'}}>${Math.round(this.state.cryptos[key].price*10000)/10000}</Text>
                <Text style={{paddingTop:15 }}>${this.state.cryptos[key].marketCap.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Text>
                  <View style={{width:80,height:50,marginTop:-50,marginLeft:140,borderWidth: 2,borderRadius: 10,backgroundColor:this.state.cryptos[key].change < 0 ? 'red' : 'green'}}>
                    <Text
                    style={{marginTop:10,color:'white',fontWeight:'bold',fontSize:20}}>
                    %{this.state.cryptos[key].change}
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
      const {watchList} = this.state
      const isOnTheList = watchList.includes(this.state.watchList[key])

      if(isOnTheList){
        return null;
      }else{
        this.setState({
          watchList:[...this.state.watchList,this.state.cryptos[key]],
          selectedItem:this.state.cryptos[key]
        })
      }
    }

    showWatchList = () => {
      this.setState({toggle:false,activeColor:true})
    }

    showAllCoins = () => {
      this.setState({toggle:true,activeColor:false})
    }



  render(){

    return(
      <ScrollView>
      <View style={{backgroundColor: '#08457e'}}>
          <View style={{marginTop:45,flexDirection: 'row',justifyContent: 'center'}}>
            <TouchableOpacity onPress={this.showWatchList}>
              <Text style={{borderWidth:1,backgroundColor: this.state.activeColor ? 'green' : 'gray',fontSize:25}}>watchList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.showAllCoins}>
              <Text style={{borderWidth:1,backgroundColor: this.state.activeColor ? 'gray' : 'green',fontSize:25}}>All Coins</Text>
            </TouchableOpacity>
          </View>
          {
            this.state.toggle ?
        <View>
          {Object.keys(this.state.cryptos).map((key,id) => (
            <View key={this.state.cryptos[key].id} style={styles.coinStyle} >
              <View style={{flexDirection: 'column'}}>
                <SVGImage style={styles.imageStyle} source={{uri: this.state.cryptos[key].iconUrl}} />
                <Text style={{marginTop:15,marginRight:90}}>{this.state.cryptos[key].symbol}</Text>
              </View>
              <View style={{marginRight: 105,marginTop:15}}>
                <Text style={{fontSize: 15,fontWeight: 'bold'}}>${Math.round(this.state.cryptos[key].price*10000)/10000}</Text>
                <Text style={{paddingTop:15 }}>${this.state.cryptos[key].marketCap.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Text>
                  <Icon
                    onPress={() => this.addItem(key)}
                    style={{marginLeft: 25,marginTop:15}}
                    name="plus"
                    size={20} />
                  <View style={{alignItems: 'center',width:80,height:50,marginTop:-80,marginLeft:140,borderWidth: 2,borderRadius: 10,backgroundColor:this.state.cryptos[key].change < 0 ? 'red' : 'green'}}>
                  <Text
                  style={{marginTop:10,color:'white',fontWeight:'bold',fontSize:20}}>
                  %{this.state.cryptos[key].change}
                  </Text>
                </View>
              </View>
            </View>
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
    backgroundColor: '#08457e'
  },
  imageStyle:{
    width:35,
    height:35,
    marginTop:15
  }
}

export default CoinScreen;
