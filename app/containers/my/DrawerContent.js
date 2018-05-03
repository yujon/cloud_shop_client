import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet, ScrollView,View,Text,Image,ImageBackground,TouchableOpacity,Alert} from 'react-native';
import { DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';;
import store from 'react-native-simple-store';
import {SERVER} from '../../constants/common';
import {loginOut} from '../../actions/user';

import * as NavigationUtil from '../../utils/Navigation';

const userImageBg = require('../../static/img/userImgBg.jpg');

class DrawerContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userId:''
    }
  }

  componentDidMount() {
    store.get('userId').then((userId) => {
      this.setState({
        userId
      })
    })
  }

  loginOut = () =>{
    const {userId} = this.state;
    this.props.loginOut(userId,()=>{
      NavigationUtil.reset(this.props.attrs.navigation, 'LoginNav');
    })
  }

  editUserInfo = ()=>{
    this.props.attrs.navigation.navigate('DrawerClose');
    this.props.attrs.navigation.navigate('UserInfoEdit');
  }

  render() {
    const {attrs,name,img,birthday,sex} = this.props;
    // <DrawerItems {...attrs} />
    return (
        <ScrollView>
          <View style={styles.container}>
              <ImageBackground source={userImageBg} style={styles.userImageBg} onPress={this.showUserInfo}>
                <View style={styles.imgLine}>
                   <Image source={{uri:SERVER+img}} style={styles.userImage}/>
                </View>
                <View style={styles.infoline}>
                   <Text style={styles.userName}>{name || "未命名"}</Text>
                   <Icon name={sex=='男'?"male":"female"} backgroundColor="transparent" style={styles.sex}></Icon>
                </View>
              </ImageBackground>
              <View style= {styles.loginOutView}>
                  <TouchableOpacity 
                      style= {styles.line} onPress={()=>this.editUserInfo()}  
                      activeOpacity={0.5} focusedOpacity={0.7}>
                    <Text  style= {styles.loginOutText}>修改信息</Text>
                  </TouchableOpacity>
              </View>
              <View style= {styles.loginOutView}>
                  <TouchableOpacity 
                      style= {styles.line} onPress={()=>this.loginOut()}  
                      activeOpacity={0.5} focusedOpacity={0.7}>
                    <Text  style= {styles.loginOutText}>退出登录</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const {userInfo} = state.user;
  const {name,sex,birthday,img} = userInfo || {};
  return {
    name,
    sex,
    birthday,
    img
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({loginOut}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  userImageBg:{
    height:100,
    alignItems:'center',
    justifyContent:'center'
  },
  imgLine:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  userImage:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight:5
  },
  userName:{
    marginLeft:5,
    fontSize:15,
    color:'orange'
  },
  infoline:{
    flexDirection:'row',
    justifyContent:'center'
  },
  age:{
    fontSize:12,
    marginRight:10,
    marginLeft:5
  },
  sex:{
    marginTop:5,
    fontSize:12,
    color:'orange',
    marginLeft:3,
    justifyContent:'center'
  },
  loginOutView:{
  },
  line:{
    height:40,
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,

  }


})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);