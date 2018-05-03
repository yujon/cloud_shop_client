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
import {getAgentListByCreatedShopIdAndLevel,getAgentListByClonedShopIdAndLevel} from '../../actions/shop';

import * as NavigationUtil from '../../utils/Navigation';


const topTabs = [
  {
    tabLabel:'作为供应商'
  },
  {
    tabLabel:'作为代理商'
  }
]

const bottomTabs = [
  {
    tabLabel:'上一级'
  },
  {
    tabLabel:'下一级'
  }
]


class Agent extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "代理商管理",
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
      curLevel:0
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
            this.refreshAgentList();
          })
        }
      });
  }

  changeTopTab = (index)=>{
    this.setState({
      topTabIndex:index,
      curLevel:0
    },()=>{
      this.refreshAgentList();
    })
  }

  changeBottomTab = (number)=>{
    let newLevel = this.state.curLevel + number;
    this.setState({
      curLevel:newLevel
    },()=>{
      this.refreshAgentList();
    })
  }


  refreshAgentList = ()=>{
    const {shopId,topTabIndex,curLevel} = this.state;
    if(topTabIndex == 0){
      this.props.getAgentListByCreatedShopIdAndLevel(shopId,curLevel)
    }else if(topTabIndex == 1){
      this.props.getAgentListByClonedShopIdAndLevel(shopId,curLevel);
    }
  }


  render() {
    const {agentList} = this.props;
    const {topTabIndex,curLevel} = this.state;
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
                  agentList.map((agentItem,agentIndex)=>{
                    const {agentCommodities,shopName,shopImg,shopDesc} = agentItem;
                    
                    return(
                      <View key={agentIndex} style={{flex:1,backgroundColor:'#fff',marginBottom:10,display:'flex',flexDirection:'column'}}>
                        <View style={{flex:1,height:80,marginTop:5,display:'flex',flexDirection:'row',width:'100%'}}>
                           <View style={{width:80,paddingLeft:20}}>
                              <Image style={{width:80,height:80}} source={{uri:SERVER+shopImg}}/>
                           </View>
                           <View style={{flex:1,display:'flex',flexDirection:'column'}}>
                              <Text style={{display:'flex',flex:1,fontSize:18,paddingLeft:40}}>{shopName}</Text>
                              <Text style={{display:'flex',flex:2,paddingLeft:40}}>简介：{shopDesc}</Text>
                           </View>
                        </View>
                        {
                          agentCommodities && agentCommodities.map((commodity,index)=>{
                            return (
                            <View key={index} style={{height:80,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                              <Text  style={{paddingLeft:20,fontSize:16}}>代理的商品:</Text>
                              <View style={{paddingRight:20,display:'flex',flexDirection:'column'}}>  
                                <Text>
                                  商品名称：{commodity.commodityName}
                                </Text>
                                <Text>
                                  总销量：{commodity.commodityAllSaleQuantity}&nbsp;&nbsp;总营业额：￥{commodity.commodityAllSaleAmount}
                                </Text>
                                <Text>
                                  该店销量：{commodity.commoditySaleQuantity}&nbsp;&nbsp;该店营业额：￥{commodity.commoditySaleAmount}
                                </Text>
                              </View>
                            </View>
                            )
                          })
                        }
                      </View>
                    ) //agent return 
                  })
                }
                <View style={{display:agentList&& agentList.length?'none':'flex',backgroundColor:'#fff'}}>
                  <Text  style={{display:'flex',textAlign:'center'}}>暂时没有代理哦</Text>
                </View> 
              </ScrollView>    
              )  //tab trturn
            })
          }
        </ScrollableTabView>

        <View style={styles.manageView}>
          <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem} disabled={curLevel==0}
            onPress={()=>{this.changeBottomTab(-1)}}>
              <View style={styles.manageItem}>
              <Text style={curLevel==0?styles.manageItemText:styles.activeManageItemText}>上一级</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} focusedOpacity={0.7} style={styles.manageItem} disabled={agentList.length==0}
              onPress={()=>{this.changeBottomTab(1)}}>
            <View style={styles.manageItem}>
              <Text style={agentList.length==0?styles.manageItemText:styles.activeManageItemText}>下一级</Text>
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
  const agentList = state.shop.agentList || [];
  return {
    agentList,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getAgentListByCreatedShopIdAndLevel,getAgentListByClonedShopIdAndLevel}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Agent);
