import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';
import {Button} from 'antd-mobile';
 
import {addShop,getShopList,getShopSuccess} from '../../actions/shop';

import * as NavigationUtil from "../../utils/Navigation";

import {SERVER} from '../../constants/common';

class ShopNav extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "进入店铺",
      headerLeft: (
        <Icon.Button
          name="angle-left"
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.8}
          onPress={params.goBack}
        />
      )
    }
  };

  constructor(props){
    super(props);
    this.state = {
      shopName:""
    }
  }

  componentWillMount() {
    store.get('shopId').then((shopId) => {  
      if(shopId){ //已经选择过了
        NavigationUtil.reset(this.props.navigation, 'LoginNav');
        return;
      } 
      this.props.navigation.setParams({ goBack: this.goBack });
    })
   
  }

  componentDidMount() {
    const {shopList} = this.props;
    store.get('userId').then((userId) => {
        if (!userId) { //未登录则去登录页面
          NavigationUtil.reset(this.props.navigation, 'LoginNav');
          return;
        } else {
          //获取列表
          this.props.getShopList(userId);
        }
      });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  addShop = ()=>{
    const {shopName,userId} = this.state;
    const shopInfo = {
      shopName:shopName
    }
    this.props.addShop(userId,shopInfo);
  }
  
  gotoShop =(index) =>{
    const {shopList,getShopSuccess,navigation} = this.props;
    const shopInfo = shopList[index];
    getShopSuccess(shopInfo);
    store.save('shopId',shopInfo._id);
    navigation.navigate('Main');
  }

  render() {
    const {shopList} = this.props;
    const {shopName} = this.state;
    return (
        <View style={styles.container}>
            <View style={{height:50,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={{fontSize:18,color:'#000',paddingLeft:10}}>>&nbsp;&nbsp;店铺列表</Text>
            </View>
            <View style={[styles.shopList]}>
              {
                shopList.map((shop,index) => {
                  return (
                    <TouchableOpacity key={index} style={styles.shopWrap} onPress={()=>this.gotoShop(index)}>
                      <View style={styles.shop} key={index}>
                        <Image source={{uri:SERVER+shop['shopImg']}} style={styles.shopImg}></Image>
                        <Text style={styles.shopName}>{shop['shopName']}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
            <View style={[styles.infoWrap,{display:shopList.length>0?'none':'flex'}]}>
              <Text style={styles.infoText}>您还没有店铺，请先创建</Text>
            </View>
            
            <View style={{height:50,width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:20}}>
                <Text style={{fontSize:18,color:'#000',paddingLeft:10}}>>&nbsp;&nbsp;新建店铺</Text>
            </View>
            <View style={[styles.line]}>
                 <Text  style= {styles.lineLeft}>店铺名称</Text>
                 <TextInput 
                    style={styles.lineRight}
                    keyboardType="default"
                    enablesReturnKeyAutomatically={true}
                    returnKeyType = 'next'
                    placeholder="请输入店铺名称"
                    updateable={true}
                    clearButtonMode="while-editing"
                    underlineColorAndroid='transparent'
                    maxLength={11}
                    onChangeText={(text) => this.setState({shopName:text})}>
                 </TextInput>
            </View>

            <View style={[styles.line,{marginTop:30}]} >
                 <TouchableOpacity 
                      style= {[styles.submit]} onPress={this.addShop}  
                      activeOpacity={0.5} focusedOpacity={0.7}>
                    <Text style= {styles.submitText}>创建</Text>
                  </TouchableOpacity>
            </View>
        
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {shopList} = state.shop;
  return {
    shopList:shopList || []
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({addShop,getShopList,getShopSuccess}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
   container:{
     flex:1,
     height:400
   },
   shopList:{
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:30,
      paddingRight:30,
      paddingTop:10,
      borderRadius:2,
      display:'flex',
      flexWrap: 'wrap'
   },
   shopWrap:{
    height:70,
    width:70,
    marginLeft:10
   },
   shop:{
      height:70,
      width:70,
   },
   shopImg:{
      width:40,
      height:40,
      marginLeft:15
   },
   shopName:{
      textAlign:'center'
   },
  infoWrap:{
    height:30,
    margin:10,
    backgroundColor:'#FFF8DC',
    borderRadius:3,
    flexDirection:'row',
   },
   infoText:{
    flex:1,
    textAlign:'center',
    textAlignVertical:'center',
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
     flex:5,
     height:50,
     flexDirection:'row',
     justifyContent:'space-between',
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


export default connect(mapStateToProps, mapDispatchToProps)(ShopNav);