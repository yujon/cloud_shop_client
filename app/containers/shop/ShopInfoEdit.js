import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Switch,DatePickerAndroid,TouchableOpacity,Image,TextInput,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';

import {SERVER} from '../../constants/common';
import {updateShop} from '../../actions/shop';
import {uploadFile} from '../../actions/common';

import {pickImg} from '../../utils/Image';
import * as NavigationUtil from '../../utils/Navigation';

class ShopInfoEdit extends React.Component {
   static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "修改店铺资料",
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
    const {shopInfo} = props;
    this.state = {
      ...shopInfo,
      shopId:''
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({goBack:this.goBack,save:this.save });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

   componentDidMount() {
    store.get('shopId').then((shopId) => {
      if (!shopId) { 
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
      } else {
        this.setState({
            shopId
        })
      }
    })
  }

  save = () =>{
    const {shopId,shopImg,shopName,shopInformation,shopAddress,shopPhoneNumber} = this.state;
    const shopInfo = {
      shopName,shopInformation,shopAddress,shopPhoneNumber,shopImg
    };
    this.props.updateShop(shopId,shopInfo,()=>{
      this.props.navigation.pop(1)
    });
  }

  pickImage= () =>{
      pickImg((file,fileName)=>{
         this.props.uploadFile(file,fileName,(tmpImg)=>{
             this.setState({
                shopImg:tmpImg
             })
         });
      })
  }

  render() {
    const {shopImg,shopName,shopInformation,shopAddress,shopPhoneNumber} = this.state;
    return (
        <View  style={[styles.container]}>
             <View style={[styles.line,{marginTop:10}]}>
                   <Text style={styles.leftLabel}>上传LOGO</Text>
                   <TouchableOpacity onPress={this.pickImage} style={styles.rightView}>
                      <Image source={{uri: SERVER+shopImg}} style={styles.img}></Image>
                   </TouchableOpacity>
              </View>
               <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>店铺名称</Text>
                    <TextInput 
                      style={styles.input}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      value={shopName}
                      placeholder="输入店铺名称"
                      onChangeText={(text) => this.setState({shopName:text})}>
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>店铺公告</Text>
                    <TextInput 
                      style={[styles.rightView,styles.input]}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      placeholder="填写店铺公告"
                      value={shopInformation}
                      onChangeText={(text) => this.setState({shopInformation:text})}>
                   </TextInput>
              </View>
              <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>店铺地址</Text>
                    <TextInput 
                      style={[styles.rightView,styles.input]}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      placeholder="填写店铺地址"
                      value={shopAddress}
                      onChangeText={(text) => this.setState({shopAddress:text})}>
                   </TextInput>
              </View>
               <View style={[styles.line,{marginTop:10}]}>
                    <Text style={styles.leftLabel}>客服电话</Text>
                    <TextInput 
                      style={[styles.rightView,styles.input]}
                      enablesReturnKeyAutomatically={true}
                      blurOnSubmit={true}
                      clearButtonMode="while-editing"
                      underlineColorAndroid='transparent'
                      placeholder="填写客服电话"
                      value={shopPhoneNumber}
                      onChangeText={(text) => this.setState({shopPhoneNumber:text})}>
                   </TextInput>
              </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
   const shopInfo = state.shop.shopInfo || {};
  return {
    shopInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({uploadFile,updateShop}, dispatch);
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
    minWidth:100,
    height:40,
    textAlign:'center'
   },
   img:{
    width:40,
    height:40,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopInfoEdit);