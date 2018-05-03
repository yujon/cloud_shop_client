import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';

import {SERVER} from '../../constants/common';

import {getShop} from '../../actions/shop'

import * as NavigationUtil from '../../utils/Navigation';

const shopInfoSetting = [
    {
      name:'店铺logo',
      enName:'shopImg'
    },
    {
      name:'店铺名称',
      enName:'shopName',
    },
    {
      name:'店铺公告',
      enName:'shopInformation',
    },
    {
      name:'店铺地址',
      enName:'shopAddress',
    },
    {
      name:'客服电话',
      enName:'shopPhoneNumber',
    },
    {
      name:'店铺等级',
      enName:'shopLevel',
    },
  ]
  const shopConfirmSetting = [
    {
      name:'店铺认证',
      enName:'shopConfirm'
    }
  ]
class ShopInfo extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "店铺资料",
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
        <TouchableOpacity onPress={params.goEdit} activeOpacity={0.5} focusedOpacity={0.7}>
          <View >
            <Text style={{fontSize:15,color:'#fff','marginRight':10}}>编辑</Text>
          </View>
        </TouchableOpacity>
      )
    }
  };

  constructor(props){
    super(props);   
  }

  componentWillMount() {
    this.props.navigation.setParams({goBack:this.goBack,goEdit:this.goEdit });
  }

  componentDidMount(){
    store.get('shopId').then((shopId)=>{
      if (!shopId) { //未选择哪个商店
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
      } 
      this.props.getShop(shopId);
    })
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  goEdit = () =>{
    this.props.navigation.navigate('ShopInfoEdit');
  }


  render() {
    const {shopInfo} = this.props;
    console.log(shopInfo)
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headInfo}>
              <Text style={styles.headInfoText}>基本信息</Text>
            </View>
            <View  style={styles.shopInfo}>
              {
                shopInfoSetting.map((item,index) => {
                  return (
                      <View style={styles.userInfoLine} key={index}>
                         <Text style={styles.userInfoName}>{item.name}</Text>
                         <View style={styles.rightView}>
                           <Image source={{uri:SERVER+shopInfo['shopImg']}} style={[styles.img,{display:item.enName=='shopImg'?'flex':'none'}]}/>
                           <Text  style={[styles.text,{display:item.enName=='shopImg'?'none':'flex'}]}>{ shopInfo[item.enName] == undefined?'未填写':shopInfo[item.enName]}</Text>
                         </View>
                      </View>
                  )
                })
              }
            </View>

            <View style={styles.headInfo}>
              <Text style={styles.headInfoText}>认证信息</Text>
            </View>
            <View  style={styles.shopInfo}>
              {
                shopConfirmSetting.map((item,index) => {
                  return (
                      <View style={styles.userInfoLine} key={index}>
                         <Text style={styles.userInfoName}>{item.name}</Text>
                         <View style={styles.rightView}>
                           <Text  style={[styles.text]}>{ shopInfo[item.enName]?'已认证':'未认证'}</Text>
                         </View>
                      </View>
                  )
                })
              }
            </View>
        </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const shopInfo = state.shop.shopInfo ||{};
  return {
    shopInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getShop}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#eee'
  },
  headInfo:{
    marginTop:5,
    marginBottom:5,
    marginLeft:10,
  },
  headInfoText:{
    fontSize:18,
  },
  userInfo:{
    marginTop:10,
    marginBottom:20
  },
  userInfoLine:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:60,
    backgroundColor:'#fff',
    marginBottom:1,
  },
  userInfoName:{
    fontSize:15
  },
  rightView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  img:{
    width:40,
    height:40,
  },
  text:{
     marginRight:10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);