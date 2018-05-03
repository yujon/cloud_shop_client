import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Switch,DatePickerAndroid,TouchableOpacity,Image,TextInput,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';

import {SERVER} from '../../constants/common';';'
import {updateUser} from '../../actions/user';
import {uploadFile} from '../../actions/common';

import {pickImg} from '../../utils/Image';
import * as NavigationUtil from '../../utils/Navigation';
import {getDate} from '../../utils/Format';

class UserInfoEdit extends React.Component {
   static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "修改店长信息",
      headerLeft: (
        <Icon.Button
          name="angle-left"
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.8}
          onPress={params.goBack}
        />
      ),
      headerRight: (
        <TouchableOpacity onPress={params.save} activeOpacity={0.5} focusedOpacity={0.7}>
          <View >
            <Text style={{fontSize:16,color:'#fff','marginRight':10}}>完成</Text>
          </View>
        </TouchableOpacity>
      )
    }
  };

  constructor(props) {
    super(props);
    const {_id,name,sex,birthday,img,wx,qq} = props;
    this.state = {
      _id,
      name,
      sex,
      wx,
      qq,
      img,
      birthday,
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({goBack:this.goBack,save:this.save });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    store.get('userId').then((userId) => {
      if (!userId) { 
        NavigationUtil.reset(this.props.navigation, 'LoginNav');
      } else {
        this.setState({
            userId
        })
      }
    })
  }

  save = () =>{
    const {userId,img,name,sex,birthday,wx,qq} = this.state;
    const data = {
      name,
      sex,
      birthday,
      wx,
      qq,
      img
    };
    this.props.updateUser(userId,data,()=>{
      this.props.navigation.pop(1)
    })
  }

  showDateTimePicker = () =>{
      var birthday = this.state.birthday;

      DatePickerAndroid.open({
         date: new Date(birthday || ''),
         maxDate:new Date()
      }).then( ({action, year, month, day}) => {
          if (action !== DatePickerAndroid.dismissedAction) {
             this.setState({
                birthday:`${year}-${month+1}-${day}`
             })
          }else{
            // info.showShort('',false);
          }
      })
  }
  
  pickImage = () =>{
      pickImg((file,fileName)=>{
         this.props.uploadFile(file,fileName,(tmpImg)=>{
             this.setState({
                img:tmpImg
             })
         });
      })
  }

  render() {
    const {img,name,sex,birthday,wx,qq} = this.state;
    return (
        <View  style={[styles.container]}>
             <View style={[styles.line,{marginTop:10}]}>
                   <Text style={styles.leftLabel}>上传头像</Text>
                   <TouchableOpacity onPress={this.pickImage} style={styles.rightView}>
                      <Image source={{uri:SERVER+img}} style={styles.img}></Image>
                   </TouchableOpacity>
              </View>
               <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>昵称</Text>
                    <TextInput 
                      style={styles.input}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      value={name}
                      placeholder="输入昵称"
                      onChangeText={(text) => this.setState({name:text})}>
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>性别</Text>
                    <View style={[styles.rightView,styles.switch]} >
                      <Text>男</Text>
                      <Switch onValueChange={(value) => this.setState({sex: value?"女":"男"})} value={sex == "女"} />
                      <Text>女</Text>
                    </View>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>生日</Text>
                    <Text onPress={this.showDateTimePicker}>{birthday}</Text>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>微信</Text>
                    <TextInput 
                      style={[styles.rightView,styles.input]}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      placeholder="输入微信号"
                      value={wx}
                      onChangeText={(text) => this.setState({wx:text})}>
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>QQ</Text>
                    <TextInput 
                      style={[styles.rightView,styles.input]}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      placeholder="输入QQ号"
                      value={qq}
                      onChangeText={(text) => this.setState({qq:text})}>
                   </TextInput>
              </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
   const userInfo = state.user.userInfo || {};
  let updateUserStatus  = state.user.updateUserStatus;
  let birthday = getDate(userInfo['birthday']);
  return {
    ...userInfo,
    birthday
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({uploadFile,updateUser}, dispatch);
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
      alignItems:'center',
      height:50,
      marginLeft:10,
      marginRight:10,
      borderBottomWidth:0.5,
      borderBottomColor:'#ddd',
   },
   leftLabel:{
     justifyContent:'space-between',
     alignItems:'center'
   },
   rightView:{
     flexDirection:'row'
   },
   input:{
    minWidth:80,
    height:40,
   },
   img:{
    width:40,
    height:40,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoEdit);