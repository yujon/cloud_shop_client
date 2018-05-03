import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet, Text, View, TouchableOpacity,TextInput,Keyboard,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Toast} from 'antd-mobile';
import {SMSEnterActivity} from '../../native/NativeModules';
import {loginUp} from '../../actions/user';

class LoginUpPassword extends  React.Component {
    static navigationOptions = ({navigation})=>{
      const params = navigation.state.params || {};
      return {
        headerTitle: '设置密码',
        headerLeft: (
          <Icon.Button
            name="angle-left"
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.8}
            style={{marginLeft:10}}
            onPress={params.goBack}
          />
        )
      }
    };

    constructor(props) {
      super(props);
      const {phoneCode,phoneNumber} = props.navigation.state.params;
      this.state = {
        phoneCode,
        phoneNumber,
        verifyCode:'',
        password:'',
        secondPassword:'',
        timerText:'重新获取',
        timer:null,
        verifyCodeDisable:false,
      }
    };

    componentWillMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack = () => {
      this.props.navigation.goBack();
    }

    reGetVerifyCode = ()=>{
        //重新发送信息
        const {phoneCode,phoneNumber} = this.state;
        SMSEnterActivity.sendCode(phoneCode.toString(),phoneNumber.toString())
            .then(()=>{
               this.startNumberDown(60);// //倒计时
            })
            .catch(()=>{
              Toast.info('发送失败，请稍后重试',2);
            })
    }

    startNumberDown = (timeCount) =>{
      if(timeCount == 0){
        this.state.timer && clearTimeout(this.state.timer);
        this.setState({
          verifyCodeDisable:false,
          timerText :'重新获取'
        })
        return;
      }else{
        this.setState({
          verifyCodeDisable:true,
          timerText : `重新获取(${timeCount}s)`
        })
        timeCount--;
        this.state.timer && clearTimeout(this.state.timer);
        this.state.timer = setTimeout(() => {
          this.startNumberDown(timeCount);
        }, 1000)
      }
    }

    submit = () =>{
      Keyboard.dismiss();
      const {phoneCode,phoneNumber,password,secondPassword,verifyCode} = this.state;
      const {loginUp,navigation} = this.props;
      //校验密码
      if(password !== secondPassword){
        Toast.info('俩次密码不一致',3);
        return;
      }
      //校验验证码
      SMSEnterActivity.submitCode(phoneCode.toString(),phoneNumber.toString(),verifyCode.toString())
          .then(()=>{
            //注册
            loginUp(phoneCode,phoneNumber,password,()=>{
              navigation.navigate('LoginIn')
            });
          })
          .catch(()=>{
             Toast.info('验证码有误',2);
          })
    }

     componentWillUnmount() {
        this.state.timer && clearTimeout(this.state.timer);
      }

    render(){
      const {verifyCode,password,secondPassword,timerText,verifyCodeDisable} = this.state;
    	return (
          <View style={styles.container}>
              <View style={[styles.line,{marginTop:30}]}>
                   <Text  style= {styles.lineLeft}>验证码</Text>
                   <View style={styles.lineRight}>
                      <TextInput 
                        style={styles.verifyCodeLeft}
                        keyboardType="numeric"
                        enablesReturnKeyAutomatically={true}
                        placeholder="验证码"
                        blurOnSubmit={true}
                        clearButtonMode="while-editing"
                        underlineColorAndroid='transparent'
                        onChangeText={(text)=>{this.setState({verifyCode:text})}}>
                      </TextInput>
                      <Text style={[styles.verifyCodeRight,verifyCodeDisable?styles.darkVerifyCode:styles.highLightVerifyCode]} onPress={this.reGetVerifyCode}
                         disabled={verifyCodeDisable} >
                      {timerText} 
                      </Text>
                   </View>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                   <Text  style= {styles.lineLeft}>设置密码</Text>
                   <TextInput 
                      style={styles.lineRight}
                      keyboardType="numeric"
                      enablesReturnKeyAutomatically={true}
                      secureTextEntry={true}
                      blurOnSubmit={true}
                      placeholder="输入密码组合"
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      onChangeText={(text)=>{this.setState({password:text})}}>
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                   <Text  style= {styles.lineLeft}>确认密码</Text>
                   <TextInput 
                      style={styles.lineRight}
                      keyboardType="numeric"
                      enablesReturnKeyAutomatically={true}
                      secureTextEntry={true}
                      blurOnSubmit={true}
                      placeholder="再次输入密码"
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      onChangeText={(text)=>{this.setState({secondPassword:text})}}>
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:30}]} >
                   <TouchableOpacity 
                        style= {[styles.submit]} onPress={this.submit}  
                        activeOpacity={0.5} focusedOpacity={0.7}
                        disabled={!verifyCode || !password || !secondPassword}>
                      <Text style= {styles.submitText}>注册</Text>
                    </TouchableOpacity>
              </View>
         </View>
    	)
   	    
    }
}


const mapStateToProps = (state) => {
  const {} = state.user;
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  const loginActions = bindActionCreators({loginUp}, dispatch);
  return {
    ...loginActions
  };
};


const styles = StyleSheet.create({
   container:{
     flex:1,
     height:400
   },
   line:{
      flexDirection:'row',
      justifyContent:'space-between',
      height:50,
      marginLeft:10,
      marginRight:10,
      borderBottomWidth:0.5,
      borderBottomColor:'#ddd',
   },
   lineLeft:{
     flex:2,
     height:50,
     fontSize:15,
     textAlign:'center',
     textAlignVertical:'center',
     color:'#000'
   },
   lineRight:{
     flex:5,
     height:50,
     flexDirection:'row',
     justifyContent:'space-between'
   },
   verifyCodeLeft:{
    flex:1,
    height:50,
    fontSize:15,
   },
   verifyCodeRight:{
    flex:1,
    marginTop:10,
    marginBottom:10,
    height:30,
    borderLeftColor:'#ddd',
    borderLeftWidth:0.5,
    textAlign:'center',
    textAlignVertical:'center',
    fontSize:15,
   },
   highLightVerifyCode:{
    opacity:1,
    color:'blue',
   },
   darkVerifyCode:{
    opacity:0.5,
    color:'grey'
   },
   inputText:{
     paddingLeft:20,
     fontSize:15,
   },
   submit:{
    flex:1,
    backgroundColor:'red',
   },
   submitText:{
     flex:1,
     textAlign:'center',
     textAlignVertical:'center',
     fontSize:20,
     color:'#fff'
   },

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUpPassword);

