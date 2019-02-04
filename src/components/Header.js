import React from 'react';
import { View, Text } from 'react-native';

const Header = () => {
  return(
    <View style={styles.headerContainer}>
      <Text style={styles.header}>
      News
      </Text>
    </View>
  )
}

const styles = {
  headerContainer:{
    marginTop:55,
    alignItems:'center',
    borderBottomWidth:1
  },
  header:{
    fontWeight:'bold',
    fontSize:20
  }
}


export default Header;
