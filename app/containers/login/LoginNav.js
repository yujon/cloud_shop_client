import React from 'react';
import {StyleSheet, Text, View,ImageBackground,TouchableOpacity} from 'react-native';
import store from 'react-native-simple-store';

import * as NavigationUtil from '../../utils/Navigation';

const loginImg = require('../../static/img/bg_1.png');

class LoginNav extends  React.Component {
    static navigationOptions = {
     header: null
    };

    constructor(props) {
      super(props);
    };

    componentWillMount() {
      store.get('userId').then((userId) => {  
        if(userId){ //已经登录过了
           NavigationUtil.reset(this.props.navigation, 'ShopNav');
        }
      })
    }

    onLoginIn = () =>{
      this.props.navigation.navigate('LoginIn');
    };

    onLoginUp = () =>{
      this.props.navigation.navigate('LoginUp');
    };

    render(){
    	return (
 	      <ImageBackground source={loginImg} style={styles.container}>
            <View style={styles.header}>
               
            </View>
            <View style={styles.footer}>
                <TouchableOpacity  style={styles.btnWrapper} onPress={this.onLoginUp}  activeOpacity={0.2} focusedOpacity={0.5}>
                   <View style= {styles.loginUp}>
                       <Text style= {styles.btn}>注册</Text>
                   </View>
                </TouchableOpacity>
                 <TouchableOpacity style={styles.btnWrapper} onPress={this.onLoginIn}  activeOpacity={0.2} focusedOpacity={0.5}>
                   <View style= {styles.loginIn}>
                       <Text  style= {styles.btn}>登录</Text>
                   </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>  
    	)
   	    
    }
 
}

const styles = StyleSheet.create({
  container: {
      flex:1
  },
  header:{
    flex:4,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontSize:30,  
    width:300,
    height:50,
    textAlign:'center',
    textAlignVertical:'center'
  },
  info:{
    fontSize:20,  
    width:300,
    height:50,
    textAlign:'center',
    textAlignVertical:'center'
  },
  footer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    height:50,
    marginLeft:30,
    marginRight:30,
  },
  btnWrapper:{
    flex:1,
  },
  loginUp:{
    height:50,
    marginRight:10,
  },
  loginIn:{
    backgroundColor:'red',
     marginLeft:10,
    height:50,
  },
  btn:{
    flex:1,
    color:'#fff',
    borderWidth:1,
    borderColor:'red',
    height:50,
    fontSize:20,
    textAlign:'center',
    textAlignVertical:'center'
  }

})

export default LoginNav;