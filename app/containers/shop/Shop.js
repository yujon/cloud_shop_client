 import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,BackHandler,ScrollView,View,Text,Image,TouchableOpacity} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/Ionicons';
import ShareItems from '../../components/ShareItems';

import {getUser} from '../../actions/user';
import {getShop,changeShop} from '../../actions/shop';
import {SERVER,WEB} from '../../constants/common.js';

import * as WeChat from '../../utils/WeChat';
import * as NavigationUtil from '../../utils/Navigation';

const modules = [
  {
    name:'商品管理',
    icon:'md-bookmark',
    to:'Commodity'
  },
  {
    name:'代理商管理',
    icon:'md-browsers',
    to:'Agent'
  },
   {
    name:'订单管理',
    icon:'md-book',
    to:'Order'
  },
   {
    name:'店铺收入',
    icon:'ios-cube-outline',
    to:'Income'
  },
   {
    name:'装饰店铺',
    icon:'ios-build-outline',
    to:'Decoration'
  },
   {
    name:'素材中心',
    icon:'ios-briefcase',
    to:'MaterialCenter'
  },
];
const shopSetting = [
  {
    name:'店铺信息',
    to:'ShopInfo'
  },
   {
    name:'交易设置',
    to:''
  }
]


class Shop extends React.Component {
  static navigationOptions = ({navigation}) =>{
      const params = navigation.state.params || {};
      return {
        header:null
      }
   }

  constructor(props){
      super(props);
      this.state = {
        shopId:'',
        opItems:false,
        shareItems:false
      }
  }

  componentWillMount() {
    this.props.navigation.setParams({ changeShowShareItems:this.changeShowShareItems });
  }


  componentDidMount(){  //初始化
    const {userInfo,shopInfo} = this.props;
    store.get('userId').then((userId)=>{
      if (!userId) { //未登录则去登录页面
        NavigationUtil.reset(this.props.navigation, 'LoginNav');
      } 
      this.props.getUser(userId);     
    })
    store.get('shopId').then((shopId)=>{
      if (!shopId) { //未选择哪个商店
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
      } 
      this.setState({
        shopId
      })
      this.props.getShop(shopId);
    })
  }

  changeShowOpItems = () =>{
    this.setState({
      opItems:!this.state.opItems
    })
  }
  
  changeShowShareItems = () => {
    this.setState({
      shareItems:!this.state.shareItems,
      opItems:false
    })
  }

  refreshInfo = ()=>{
    const {shopId} = this.state;
    this.changeShowOpItems();
    this.props.getShop(shopId);
  }

  preShow = () =>{
    const {shopId} = this.state;
    this.changeShowOpItems();
    this.props.navigation.navigate('ShopDisplay',{shopId});
  }

  gotoExchangeShop = ()=>{
    this.changeShowOpItems();
    this.props.changeShop(()=>{
      NavigationUtil.reset(this.props.navigation, 'ShopNav');
    });
  }

  
  shareToSession = () =>{
    const {shopInfo,userInfo} = this.props;
    const userId = userInfo['_id'];
    const shopId = shopInfo['_id'];
    const shopName = shopInfo['shopName'];
    const shopIcon = shopInfo['shopImg'];
    
    this.changeShowShareItems();
    WeChat.shareToSession({
      title:shopName,
      description: "推荐这家云店",
      thumbImage: SERVER + shopIcon,
      type: 'news',
      webpageUrl: `${WEB}/web-shop/${shopId}`
    })
  }

  shareToTimeline = () =>{
    const {shopInfo,userInfo} = this.props;
    const userId = userInfo['_id'];
    const shopId = shopInfo['_id'];
    const shopName = shopInfo['shopName'];
    const shopIcon = shopInfo['shopImg'];
    
    this.changeShowShareItems();
    WeChat.shareToTimeline({
      title:shopName,
      description: "推荐这家云店",
      thumbImage: SERVER + shopIcon,
      type: 'news',
      webpageUrl: `${WEB}/web-shop/${shopId}`
    })
  }

  goto = (to) =>{
    this.props.navigation.navigate(to);
  }

  render() {
    const {opItems,shareItems} = this.state;
    const {shopInfo,userInfo} = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.headerLeftText}>我的云店</Text>
            </View>
            <View  style={styles.headerRight}>
              <TouchableOpacity onPress={this.changeShowOpItems} activeOpacity={0.5} focusedOpacity={0.7}>
                  <View >
                    <Icon
                          name="ios-add"
                          size={30}
                          color="#fff"
                          backgroundColor="transparent"
                          style={{marginRight:20}}
                        />
                  </View>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.body}>
            <View style={styles.dataShow}>
              <Text style={styles.dataShowHeader}>经营分析</Text>
              <View style={styles.dataShowBody}>
                  <View  style={styles.dataShowBodySection}>
                      <Text style={styles.dataShowBodyText}>访问量</Text>
                      <Text style={styles.dataShowBodyText}>0</Text>
                  </View>
                  <View  style={styles.dataShowBodySection}>
                      <Text style={styles.dataShowBodyText}>收藏量</Text>
                      <Text style={styles.dataShowBodyText}>{shopInfo['collectionSum']}</Text>
                  </View>
                  <View style={styles.dataShowBodySection}>
                     <Text style={styles.dataShowBodyText}>客户数</Text>
                     <Text style={styles.dataShowBodyText}>0</Text>
                  </View>
              </View>
            </View>

            <View style={styles.modules}>
            {
              modules.map((item,index) => {
                 if(index % 2 !== 0){
                    var prevItem = modules[index-1];
                    return (
                        <View style={styles.moduleLine} key={index}>
                          <TouchableOpacity style={[styles.module,{marginRight:1}]} onPress={ ()=>{this.goto(prevItem.to)} }>
                              <View style={styles.moduleView} >
                                  <Icon
                                    name={modules[index-1].icon}
                                    backgroundColor="transparent"
                                    underlayColor="transparent"
                                    activeOpacity={0.8}
                                    size={25}
                                    style={styles.moduleIcon}
                                  />
                                  <Text style={styles.moduleName}>{prevItem.name}</Text>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.module} onPress={()=>{this.goto(item.to)}}>
                              <View style={styles.moduleView} >
                                  <Icon
                                    name={item.icon}
                                    backgroundColor="transparent"
                                    underlayColor="transparent"
                                    activeOpacity={0.8}
                                    size={25}
                                    style={styles.moduleIcon}
                                  />
                                  <Text style={styles.moduleName}>{item.name}</Text>
                              </View>
                          </TouchableOpacity>
                        
                     </View>
                    )
                 }
              })
            }
            </View>

            <View  style={styles.shopSetting}>
              {
                shopSetting.map((item,index) => {
                  return (
                    <TouchableOpacity key={index} onPress={()=>{this.goto(item.to)}}>
                      <View style={styles.shopInfoLine}>
                         <Text style={styles.shopInfoName}>{item.name}</Text>
                         <Icon
                          name="ios-arrow-dropright"
                          backgroundColor="transparent"
                          underlayColor="transparent"
                          activeOpacity={0.8}
                          size={25}
                        />
                       </View>
                    </TouchableOpacity>
                     
                  )
                })
              }
            </View>
          </ScrollView>
          <View style={[opItems?{position:'absolute',top:35,right:35}:{display:'none'},{backgroundColor:"#0D0D0D",width:120,zIndex:100}]}>
            <TouchableOpacity style={{height:40,width:'100%',borderBottomWidth:0.5,borderBottomColor:'#000'}} onPress={this.refreshInfo}>
              <View style={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Icon name="ios-sync"
                      size={20}
                      color="#fff"
                      backgroundColor="transparent"
                      style={{marginLeft:20,marginRight:10}}
                    />
                <Text style={{color:'#fff',fontSize:17}}>刷新</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{height:40,width:'100%',borderBottomWidth:0.5,borderBottomColor:'#000'}} onPress={this.changeShowShareItems}>
              <View style={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Icon name="md-share"
                      size={20}
                      color="#fff"
                      backgroundColor="transparent"
                      style={{marginLeft:20,marginRight:10}}
                    />
                <Text style={{color:'#fff',fontSize:17}}>分享</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{height:40,width:'100%',borderBottomWidth:0.5,borderBottomColor:'#000'}} onPress={this.preShow}>
              <View style={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Icon name="ios-eye"
                      size={20}
                      color="#fff"
                      backgroundColor="transparent"
                      style={{marginLeft:20,marginRight:10}}
                    />
                <Text style={{color:'#fff',fontSize:17}}>预览</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{height:40,width:'100%',borderBottomWidth:0.5,borderBottomColor:'#000'}} onPress={this.gotoExchangeShop}>
              <View style={{flex:1,display:'flex',flexDirection:'row',alignItems:'center'}}>
                <Icon name="ios-pie-outline"
                    size={20}
                    color="#fff"
                    backgroundColor="transparent"
                    style={{marginLeft:20,marginRight:10}}
                  />
                <Text style={{color:'#fff',fontSize:17}}>切换</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ShareItems visible={shareItems} 
                 onCancel={this.changeShowShareItems.bind(this)}
                 shareToSession={this.shareToSession.bind(this)} 
                 shareToTimeline={this.shareToTimeline.bind(this)}
          ></ShareItems>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const shopInfo = state.shop.shopInfo || {};
  const userInfo = state.user.userInfo || {};
  return {
    userInfo,
    shopInfo
  }
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getUser,getShop,changeShop}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ddd'
  },
  header:{
    height:60,
    backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headerLeft:{
    flex:1,
  },
  headerLeftText:{
    fontSize:20,
    fontWeight :'bold',
    color:'#fff',
    paddingLeft:20
  },
  headerRight:{
    width:40,
  },
  body:{
  },
  dataShow:{
    height:140,
    borderRadius:5,
    backgroundColor:'#fff',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:30
  },
  dataShowHeader:{
    height:40,
    fontSize:17,
    color:'#000'
  },
  dataShowBody:{
    height:100,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  dataShowBodySection:{
    flexDirection:'column',
  },
  dataShowBodyText:{
    flex:1,
    fontSize:15,
    color:'#000',
    textAlign:'center'
  },
  modules:{
    marginTop:10
  },
  moduleLine:{
    flexDirection:'row',
    height:100,
    marginRight:1,
    marginBottom:1,
  },
  module:{
    height:100,
    flex:1,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  moduleView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  moduleIcon:{
    marginRight:5,
    color:'red',
  },
  moduleName:{
    marginLeft:5,
    fontSize:15
  },
  shopSetting:{
    marginTop:10,
    marginBottom:20
  },
  shopInfoLine:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
    backgroundColor:'#fff',
    marginBottom:1,
  },
  shopInfoName:{
    fontSize:15
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop);