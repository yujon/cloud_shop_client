import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet, Text, View, TouchableOpacity,TextInput,Keyboard,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SMSEnterActivity} from '../../native/NativeModules';
import CommonDialog from '../../components/CommonDialog';
import CountryCodePicker from '../../components/CountryCodePicker';
import {Toast} from 'antd-mobile';

class LoginUp extends  React.Component {
    static navigationOptions = ({navigation})=>{
      const params = navigation.state.params || {};
      return {
        headerTitle: '注册',
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
      this.state = {
        phoneNumber:'',
        phoneCode:"86",
        countryName:"中国",
        countryPicker:false
      }
    };

    componentWillMount() {
      this.props.navigation.setParams({ goBack: this.goBack });
    }

    goBack = () => {
      this.props.navigation.goBack();
    }

    changeShowCountryPicker= ()=>{
      Keyboard.dismiss();
      this.setState({
        countryPicker:!this.state.countryPicker
      })
    }

    onSelectCountry = (phoneCode,countryName)=>{
      this.setState({
        countryPicker:!this.state.countryPicker,
        phoneCode,
        countryName
      })
    }

    confirm = ()=>{
      const {phoneNumber} = this.state;
      this.refs.confirmDialog.show({
         thide:true, /*不显示头部标题*/
         messText:`将发送验证短信到${phoneNumber}`,
         innersWidth:250,
         innersHeight:100,
         buttons:[
           {
            txt:'取消',
            btnStyle:{backgroundColor:'transparent',width:50,height:20},
            txtStyle:{color:'#000',fontSize:11},
           },
           {
            txt:'确定',
            btnStyle:{backgroundColor:'red',width:50,height:20},
            txtStyle:{color:'#000',fontSize:11}, 
            onpress:this.submit.bind(this)
           }
         ]    
      })
    }

    submit = () =>{
      const {phoneCode,phoneNumber} = this.state;
      const navigate = this.props.navigation.navigate;
      Keyboard.dismiss();
       //发送信息
      SMSEnterActivity.sendCode(phoneCode.toString(),phoneNumber.toString())
          .then((info)=>{
             navigate('LoginUpPassword',{phoneCode,phoneNumber});
          })
          .catch(()=>{
            Toast.info('发送失败，请稍后重试',2);
          })
    }

    render(){
      const {phoneCode,countryName,phoneNumber,countryPicker} = this.state;
    	return (
          <View style={styles.container}>
              <View style={[styles.line,{marginTop:30}]}>
                    <Text  style= {styles.lineLeft}>+{phoneCode}</Text>
                    <TouchableOpacity 
                        style= {styles.lineRight} onPress={this.changeShowCountryPicker}  
                        activeOpacity={0.5} focusedOpacity={0.7}>
                      <Text  style= {styles.countryNameText}>{countryName}</Text>
                      <Icon.Button
                        name="angle-right"
                        backgroundColor="transparent"
                        underlayColor="transparent"
                        activeOpacity={0.8}
                        size={25}
                        color="#000"
                        onPress={this.goCountryPicker}  
                      />
                    </TouchableOpacity>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                   <Text  style= {styles.lineLeft}>手机号</Text>
                   <TextInput 
                      style={styles.lineRight}
                      keyboardType="phone-pad"
                      enablesReturnKeyAutomatically={true}
                      returnKeyType = 'next'
                      placeholder="请输入手机号"
                      updateable={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      maxLength={11}
                      onChangeText={(text)=>{this.setState({phoneNumber:text})}}
                      >
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:30}]} >
                   <TouchableOpacity 
                        style= {[styles.submit]} onPress={this.confirm}  
                        activeOpacity={0.5} focusedOpacity={0.7}
                        disabled={!phoneCode || !phoneNumber}>
                      <Text style= {styles.submitText}>下一步</Text>
                    </TouchableOpacity>
              </View>
              <View style={countryPicker?styles.activeCountryCodePicker:styles.countryCodePicker}>
                <CountryCodePicker 
                    onSelectCountry={this.onSelectCountry.bind(this)} 
                    changeShowCountryPicker={this.changeShowCountryPicker.bind(this)}>
                </CountryCodePicker>
              </View>
              <CommonDialog ref="confirmDialog" types={'confirm'} />

              
         </View>
    	)
   	    
    }
}


const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions
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
     flex:1,
     marginTop:10,
     marginBottom:10,
     fontSize:15,
     borderRightWidth:0.5,
     borderRightColor:'#ddd',
     textAlign:'center',
     textAlignVertical:'center',
     color:'#000'
   },
   lineRight:{
     paddingLeft:20,
     flex:4,
     height:50,
     flexDirection:'row',
     justifyContent:'space-between',
   },
   activeCountryCodePicker:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
   },
   countryCodePicker:{
    position:'absolute',
   },
   countryNameText:{
     flex:1,
     fontSize:15,
     color:'#000',
     textAlignVertical:'center',
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
   phoneCodePickerView:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'stretch',
    height:500,
    position:'absolute',
    zIndex:100,
    backgroundColor:'green'
   }

})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUp);

