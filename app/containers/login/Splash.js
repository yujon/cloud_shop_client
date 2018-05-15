import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimensions, Animated } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import store from 'react-native-simple-store';
import * as NavigationUtil from '../../utils/Navigation';

import {registerApp} from '../../utils/WeChat';
import {WXAPPID} from '../../constants/common.js';

const splashImg = require('../../static/img/splash.jpg');
const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

class Splash extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  // componentWillMount(){
  //   store.get('userId').then((userId)=>{
  //     if(userId){
  //       const userId = userId;
  //       //监听状态改变事件
  //       AppState.addEventListener('change', ()=>{
  //         this.props.getUserInfo(userId);
  //       });
  //     }
  //   })
  // }

  componentDidMount() {
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    SplashScreen.hide();
    registerApp(WXAPPID);
    //判断是否登录来选择跳转页面
    this.timer = setTimeout(() => {
      store.get('userId').then((userId) => {
        store.get('shopId').then((shopId) => {
          if (!userId) { //未登录则去登录页面
             NavigationUtil.reset(this.props.navigation, 'LoginNav');
          } else if(!shopId) {
             NavigationUtil.reset(this.props.navigation, 'ShopNav');
          }else{
             NavigationUtil.reset(this.props.navigation, 'Main');
          }
        })
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    //删除状态改变事件监听
    // AppState.removeEventListener('change');
  }

  render() {
    return (
      <Animated.Image
        style={{
          width: maxWidth,
          height: maxHeight,
          transform: [{ scale: this.state.bounceValue }]
        }}
        source={splashImg}
      />
    );
  }
}

const mapStateToProps = () => {
  return {
    
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Splash);
