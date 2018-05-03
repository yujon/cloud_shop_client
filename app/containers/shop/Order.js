import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'antd-mobile'
import CourierInfoEditDialog from '../../components/CourierInfoEditDialog';

import {SERVER} from '../../constants/common';
import {getOrderListByClonedShopIdAndStatus,getOrderListByCreatedShopIdAndStatus,haveSendCommodity} from '../../actions/order';

import * as NavigationUtil from '../../utils/Navigation';


const bottomTabs = [
  {
    tabLabel:'作为供应商'
  },
  {
    tabLabel:'作为代理商'
  }
]

const topTabs = [
  {
    tabLabel:'待发货',
    status:'1'
  },
  {
    tabLabel:'已发货',
    status:'2'
  },
  {
    tabLabel:'已完成',
    status:'3|4'
  },
]

class Order extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "订单管理",
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
    super(props)
    this.state = {
      shopId:'',
      topTabIndex:0,
      bottomTabIndex:0,
      courierDialog:false,
      curEditOrderId:false,
      curOpType:'add'
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ goBack:this.goBack });
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  componentDidMount(){
    store.get('shopId').then((shopId) => {
        if (!shopId) { 
          NavigationUtil.reset(this.props.navigation, 'ShopNav');
        } else {
          this.setState({
              shopId
          },()=>{
            this.refreshOrderList();
          })
        }
      });
  }

  changeTopTab = (index)=>{
    this.setState({
      topTabIndex:index
    },()=>{
      this.refreshOrderList();
    })
  }

  changeBottomTab = (index)=>{
    this.setState({
      bottomTabIndex:index
    },()=>{
      this.refreshOrderList();
    })
  }

  refreshOrderList = ()=>{
    const {shopId,topTabIndex,bottomTabIndex} = this.state;
    const status = topTabs[topTabIndex].status;
    if(bottomTabIndex == 0){
      this.props.getOrderListByCreatedShopIdAndStatus(shopId,status)
    }else if(bottomTabIndex == 1){
      this.props.getOrderListByClonedShopIdAndStatus(shopId,status);
    }
  }

  clickSendCommodityBtn = (orderId,courierType,courierNumber)=>{
    this.setState({
      curEditOrderId:orderId,
      curCourierType:courierType,
      curCourierNumber:courierNumber
    },()=>{
      this.changeShowDialog();
    })
  }

  changeShowDialog = ()=>{
    this.setState({
      courierDialog:!this.state.courierDialog
    })
  }

  haveSendCommodity = (courierType,courierNumber)=>{
    const {curEditOrderId,curOpType,curCourierType,curCourierNumber} = this.state;
    this.changeShowDialog();
    this.props.haveSendCommodity(curEditOrderId,curCourierType,curCourierNumber,()=>{
      this.refreshOrderList();
    })
  }

  render() {
    const {orderList} = this.props;
    const {bottomTabIndex,courierDialog,curCourierType,curCourierNumber} = this.state;
    return (
      <View style={styles.container}>
        <ScrollableTabView style={styles.scrollView} renderTabBar={() => <DefaultTabBar/>} 
              tabBarPosition='top' tabBarBackgroundColor="#fff" tabBarUnderlineStyle={{backgroundColor:'red',height:1}} 
              tabBarActiveTextColor="red" tabBarInactiveTextColor="#000" 
              onChangeTab={({i})=>{this.changeTopTab(i)}}> 
          {
            topTabs.map((item,tabIndex) => {
              return(
                <ScrollView tabLabel={item.tabLabel} key={tabIndex} style={{flex:1,display:'flex',flexDirection:'column'}}>
                {
                  orderList.map((orderItem,orderIndex)=>{
                    const {_id,shopId,commodityId,modelId,buySum,words,payMoney,creatorIncome,oneLevelIncome,twoLevelIncome,threeLevelIncome,
                      addressInfo,courierType,courierNumber,commentContent,commentGrade,myLevel} = orderItem;
                    const {allCommodityPrice,carryPrice} = payMoney;
                    let model = null;
                    commodityId.models.forEach((tempItem) => {
                      if(tempItem._id == modelId){
                        model = tempItem;
                      }
                    })
                    return(
                      <View key={orderIndex} style={{flex:1,backgroundColor:'#fff',marginBottom:10,display:'flex',flexDirection:'column'}}>
                        <View style={{height:40,display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#ccc'}}>
                          <Icon name="home" backgroundColor="transparent" underlayColor="transparent" style={{marginLeft:10}}/>
                          <Text style={{marginLeft:10,fontSize:16}}>
                            {shopId.shopName}{bottomTabIndex==1?myLevel==2?"(下级)":myLevel==3?"(下下级)":"（自家）":""}
                          </Text>
                        </View>
                         <View style={{flex:1,height:80,marginTop:5,display:'flex',flexDirection:'row',width:'100%'}}>
                           <View style={{width:80,paddingLeft:10}}>
                              <Image style={{width:80,height:80}} source={{uri:SERVER+model['modelImg']}}/>
                              <Text style={(shopId&&shopId._id==this.state.shopId)?styles.cloneInfo:styles.hideCloneInfo}>直销</Text>
                           </View>
                           <View style={{flex:1,display:'flex',flexDirection:'column'}}>
                              <Text style={{display:'flex',flex:1,fontSize:18,paddingLeft:20}}>{commodityId['name']}</Text>
                              <Text style={{display:'flex',flex:2,paddingLeft:20}}>型号：{model['modelType']}</Text>
                           </View>
                           <View style={{width:80,display:'flex',flexDirection:'column'}}>
                             <Text style={{display:'flex',flex:1,fontSize:18}}>￥{model['modelPrice']}</Text>
                             <Text style={{display:'flex',flex:2,}}>X{buySum}</Text>
                           </View>
                        </View>
                        <View style={{height:20,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={{paddingLeft:20,fontSize:16}}>运费</Text>
                          <Text  style={{paddingRight:20}}>
                              {carryPrice}
                          </Text>
                        </View>
                        <View style={{height:20,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={{paddingLeft:20,fontSize:16}}>留言</Text>
                          <Text  style={{paddingRight:20}}>
                              {words}
                          </Text>
                        </View>
                        <View style={{height:80,display:commentContent||commentGrade?'flex':'none',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={{paddingLeft:20,fontSize:16}}>本单收益</Text>
                          <View style={{paddingRight:20,display:'flex',flexDirection:'column'}}>  
                            <Text>
                              {bottomTabIndex==0?"本店":'供应商'}（含邮）：{creatorIncome}
                            </Text>
                            <Text style={{display:threeLevelIncome==0?'none':'flex'}}>
                              {bottomTabIndex==1&&myLevel==3?"本店":"三级（上上级）"}{threeLevelIncome}
                            </Text>
                            <Text style={{display:twoLevelIncome==0?'none':'flex'}}>
                              {bottomTabIndex==1&&myLevel==2?"本店":"二级（上级）"}{twoLevelIncome}
                            </Text>
                            <Text  style={{display:oneLevelIncome==0?'none':'flex'}}>
                              {bottomTabIndex==1&&myLevel==1?"本店":"一级"}（直销）：{oneLevelIncome}
                            </Text>
                          </View>
                        </View>
                        <View style={{height:30,display:commentContent||commentGrade?'flex':'none',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                          <Text  style={{paddingLeft:20,fontSize:16}}>评论</Text>
                          <Text  style={{paddingRight:20}}>
                              {commentContent}({commentGrade}分)
                          </Text>
                        </View>
                        <View style={{height:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:20,paddingRight:10}}>
                          <Text style={{fontSize:16}}>合计：<Text style={{color:'red'}}>￥{allCommodityPrice+carryPrice}</Text></Text>
                          <View style={{display:'flex',flexDirection:'row'}}>
                            <TouchableOpacity  onPress={()=>this.clickSendCommodityBtn(_id,"","")} 
                            style={{display:bottomTabIndex==0&&orderItem.status==1?'flex':'none',borderRadius:3, width:70,height:30,alignItems:'center',backgroundColor:'red',borderWidth:0,marginRight:5}}>
                              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:13,color:'#fff'}}>确认发货</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.clickSendCommodityBtn(_id,courierType,courierNumber)}
                              style={{display:bottomTabIndex==0&&orderItem.status==2?'flex':'none',borderRadius:3,backgroundColor:'red',borderWidth:0,width:70,height:30,alignItems:'center',marginRight:5}}>
                              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:13,color:'#fff'}}>修改发货</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>{()=>{}}}
                              style={{display:orderItem.status==2||orderItem.status==3||orderItem.status==4?'flex':'none',borderRadius:3,backgroundColor:'red',borderWidth:0,width:70,height:30,alignItems:'center',marginRight:5}}>
                              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:13,color:'#fff'}}>查看物流</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                        
                      </View>
                    ) //order return 
                  })
                }
                <View style={{display:orderList&& orderList.length?'none':'flex',backgroundColor:'#fff'}}>
                  <Text  style={{display:'flex',textAlign:'center'}}>暂时没有订单哦</Text>
                </View> 
              </ScrollView>    
              )  //tab trturn
            })
          }
        </ScrollableTabView>

        <CourierInfoEditDialog visible={courierDialog} courierType={curCourierType} courierNumber={curCourierNumber} 
        changeCourierType={(type)=>this.setState({curCourierType:type})} changeCourierNumber={(number)=>this.setState({curCourierNumber:number})}
        onCancel={this.changeShowDialog.bind(this)} onFinish={this.haveSendCommodity.bind(this)}></CourierInfoEditDialog>
        
        <View style={styles.manageView}>
          <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem} 
            onPress={()=>{this.changeBottomTab(0)}}>
              <View style={styles.manageItem}>
              <Text style={bottomTabIndex==0?styles.activeManageItemText:styles.manageItemText}>作为供应商</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem} 
              onPress={()=>{this.changeBottomTab(1)}}>
            <View style={styles.manageItem}>
              <Text style={bottomTabIndex==1?styles.activeManageItemText:styles.manageItemText}>作为代理商</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
    );
  }
}


const styles = {
  container:{
    flex:1,
    backgroundColor:'#ddd'
  },
  manageView:{
    borderTopWidth:1,
    borderTopColor:'#ccc',
    height:60,
    backgroundColor:'#fff',
    flexDirection:'row',
    alignItems:'center',
  },
  manageItem:{
    flex:1,
    height:60,
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
    color:'#000',
    fontSize:16,
    color:'#000',
    marginLeft:2
  },
  activeManageItemText:{
    fontSize:16,
    color:'#000',
    marginLeft:2,
    color:'red'
  },
  cloneInfo:{
    position:'absolute',
    top:0,
    left:10,
    backgroundColor:'red',
  },
  hideCloneInfo:{
    display:'none'
  }
}

const mapStateToProps = (state) => {
  const orderList = state.order.orderList || [];
  return {
    orderList,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getOrderListByClonedShopIdAndStatus,getOrderListByCreatedShopIdAndStatus,haveSendCommodity}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
