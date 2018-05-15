import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import CommodityList from '../../components/CommodityList';

import * as WeChat from '../../utils/WeChat';

import {SERVER,WEB} from '../../constants/common.js';
import {getCommodityList,removeCommodity} from '../../actions/commodity';

import * as NavigationUtil from '../../utils/Navigation';

class Commodity extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "商品管理",
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

  constructor(props){
    super(props);
    this.state = {
      showShareItems:false,
      curTab:0,
      curOrderType:'saleQuantity',  
      curOrderVal:true, //由近到远，由高到低
      commodityId:'',
      userId:"",
      shopId:''
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ goBack:this.goBack });
  }

  goBack = () => {
      this.props.navigation.goBack();
  }


  componentDidMount() {
    const {commodityList} =this.props;
    store.get('userId').then((userId) => {
      if(!userId) { 
        NavigationUtil.reset(this.props.navigation, 'LoginNav');
      }
      store.get('shopId').then((shopId) => {
        if (!shopId) { 
          NavigationUtil.reset(this.props.navigation, 'ShopNav');
        } else {
          this.setState({
              userId,
              shopId
          })
          this.props.getCommodityList(shopId);
        }
      });
    });

  }

  seperateCommodityList(commodityList){
     let upCarriagelist = [];
     let downCarriagelist = [];
     commodityList.forEach((item) => {
        if(item.upcarriage !== 0){
          upCarriagelist.push(item)
        }else{
          downCarriagelist.push(item);
        }
     })
     return {upCarriagelist,downCarriagelist};
  }

  changeShowShareItems = () =>{
    this.setState({
      showShareItems:!this.state.showShareItems
    })
  }

  share = (commodityId) =>{
    this.setState({
      commodityId
    })
    this.changeShowShareItems();
  }
  
  shareToSession = () =>{
    const {userId,shopId,commodityId} = this.state;
    const {commodityList} = this.props;
    let commodityImg,commodityName;
    commodityList.forEach((commodity) => {
      if(commodity._id == commodityId){
          commodityImg = (commodity.showImgs)[0];
          commodityName = commodity.name;
       }
    })
    this.changeShowShareItems();
    WeChat.shareToSession({
      title:commodityName,
      description: "好产品，放心购",
      thumbImage: SERVER + commodityImg,
      type: 'news',
      webpageUrl: `${WEB}/web-commodity/${shopId}/${commodityId}`
    })
  }

  shareToTimeline = () =>{
    const {userId,shopId,commodityId} = this.state;
    const {commodityList} = this.props;
    let commodityImg,commodityName;
    commodityList.forEach((commodity) => {
       if(commodity._id == commodityId){
          commodityImg = (commodity.showImgs)[0];
          commodityName = commodity.name;
       }
    })
    this.changeShowShareItems();
    WeChat.shareToTimeline({
      title:commodityName,
      description: "好产品，放心购",
      thumbImage: SERVER + commodityImg,
      type: 'news',
      webpageUrl: `${WEB}/web-commodity/${shopId}/${commodityId}`
    })
  }

  gotoEditCommodity = (commodityId,commodityInfo) =>{
      const {shopId} = this.state;
      this.props.navigation.navigate('CommodityEdit',{commodityId,commodityInfo});
  }

  gotoRemoveCommodity = (commodityId,isCreator)=>{
    const {shopId} = this.state;
    this.props.removeCommodity(isCreator,shopId,commodityId);
  }


  chatWithCreator = (commodityId)=>{
    this.props.navigation.navigate('Chat',{
      commodityId:commodityId
    })
  }

  preShow = (commodityId) => {
    const {shopId} = this.state;
    this.props.navigation.navigate('CommodityDisplay',{shopId,commodityId});
  }

  gotoCommodityAdd = ()=>{
    this.props.navigation.navigate('CommodityAdd');
  }

  gotoCategory = ()=>{
    const params = {};
    params['onSelectItem'] = (categoryId,categoryName) =>{}
    this.props.navigation.navigate('CommodityCate',params)
  }

  gotoCarryCate = ()=>{
    const params = {};
    params['onSelectItem'] = (carryCateId,carryCateNmae) =>{}
    this.props.navigation.navigate('CarryCate',params)
  }
  reorder = (type = "saleQuantity")=>{ 
    const {curTab,curOrderType,curOrderVal} = this.state;
    const {commodityList} = this.props;
    let [upCarriagelist,downCarriagelist] = this.seperateCommodityList(commodityList);
    let newState = {};
    newState['curOrderType'] = type;
    if(type == curOrderType){
      newState['curOrderVal'] = !curOrderVal;
    }else{
      newState['curOrderVal'] = true;
    }
    let tempList = curTab == 0 ? upCarriagelist:downCarriagelist;
    tempList.sort(function(a,b){
      if(a[newState['curOrderType']] < b[newState['curOrderType']]){
        return 1;
      }else if(a[newState['curOrderType']] > b[newState['curOrderType']]){
      return -1;
      }else{
        return 0;
      }
    })
    if(!newState['curOrderVal']){
      tempList.reverse();
    }
    if(curTab == 0){
      newState['upCarriagelist'] = tempList;
    }else{
      newState['downCarriagelist'] = tempList;
    }
    this.setState(newState);
  }

  render() {
    const {curTab,curOrderType,showShareItems} = this.state;
    let commodityList = this.props.commodityList || [];
    let {upCarriagelist,downCarriagelist} = this.seperateCommodityList(commodityList);
    return (
        <View style={styles.container}>
            
            <ScrollableTabView style={styles.scrollView} renderTabBar={() => <DefaultTabBar/>} 
                  tabBarPosition='top' tabBarBackgroundColor="#fff" tabBarUnderlineStyle={{backgroundColor:'red',height:1}} 
                  tabBarActiveTextColor="red" tabBarInactiveTextColor="#000" 
                  onChangeTab={(tabIndex)=>{this.setState({curTab:tabIndex})}}> 
               <CommodityList tabLabel="出售中"
                      commodityList={upCarriagelist} showShareItems={showShareItems} 
                      isUp={true} curOrderType={curOrderType}
                      changeShowShareItems={this.changeShowShareItems.bind(this)} 
                      shareToSession={this.shareToSession.bind(this)}
                      shareToTimeline={this.shareToTimeline.bind(this)}
                      preShow={this.preShow.bind(this)}
                      chatWithCreator={this.chatWithCreator.bind(this)}
                      reorder={this.reorder.bind(this)}
                      gotoEditCommodity={this.gotoEditCommodity.bind(this)}
                      gotoRemoveCommodity={this.gotoRemoveCommodity.bind(this)}
                      share={this.share.bind(this)}/>
               <CommodityList tabLabel='待上架' 
                      commodityList={downCarriagelist} showShareItems={showShareItems} 
                      isUp={false}  curOrderType={curOrderType}
                      changeShowShareItems={this.changeShowShareItems.bind(this)}
                      shareToSession={this.shareToSession.bind(this)} 
                      shareToTimeline={this.shareToTimeline.bind(this)}
                      preShow={this.preShow.bind(this)}
                      chatWithCreator={this.chatWithCreator.bind(this)}
                      reorder={this.reorder.bind(this)}
                      gotoEditCommodity={this.gotoEditCommodity.bind(this)}
                      gotoRemoveCommodity={this.gotoRemoveCommodity.bind(this)}
                      share={this.share.bind(this)}/>
            </ScrollableTabView>

            <View style={styles.manageView}>
              <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem} onPress={this.gotoCommodityAdd}>
                  <View style={styles.manageItem}>
                  <Icon name="plus" size={20} style={styles.manageItemIcon}></Icon>
                  <Text style={styles.manageItemText}>添加商品</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem}style={styles.manageItem} onPress={this.gotoCarryCate}>
                <View style={styles.manageItem}>
                  <Icon name="barcode" size={20} style={styles.manageItemIcon}></Icon>
                  <Text style={styles.manageItemText}>运费配置</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem} onPress={this.gotoCategory}>
                <View style={styles.manageItem} onPress={()=>{}}>
                  <Icon name="archive" size={20} style={styles.manageItemIcon}></Icon>
                  <Text style={styles.manageItemText}>分类管理</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  const commodityList = state.commodity.commodityList || [];
  return {
    commodityList,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getCommodityList,removeCommodity}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  scrollView:{
    flex:1,
    backgroundColor:'#eee',
  },
  manageView:{
    borderTopWidth:1,
    borderTopColor:'#eee',
    height:60,
    backgroundColor:'#ccc',
    flexDirection:'row',
    alignItems:'center',
  },
  manageItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  manageItemIcon:{
    justifyContent:'center',
    alignItems:'center',
    color:'red',
  },
  manageItemText:{
    fontSize:16,
    color:'#000',
    marginLeft:2
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Commodity);
