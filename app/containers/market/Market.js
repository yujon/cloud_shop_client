import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Swiper from 'react-native-swiper';
import store from 'react-native-simple-store';

import {SERVER} from '../../constants/common';
import {getCategoryList} from '../../actions/category';
import {getSwiperImgList,getHotCaseList,getSpecialActivityList} from '../../actions/market';
import {getCommodityListByCategoryId} from '../../actions/commodity';

import * as NavigationUtil from '../../utils/Navigation';
import {getPriceRangeAndAllRest} from '../../utils/Format'

class Market extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "货源市场",
      headerLeft: null
    }
  };

  constructor(props){
    super(props);
    this.state = {
      curTab:0,
      defaultCategoryList:[]
    }
  }

  componentWillMount() {
    store.get('shopId').then((shopId) => {
      if (!shopId) { //未登录则去登录页面
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
      } 
    });
    store.get('categoryList').then((categoryList) => {
      this.setState({
        defaultCategoryList:categoryList
      })
    })
  }

  componentDidMount() {
    this.props.getCategoryList(0);
    this.props.getSwiperImgList();
    this.props.getHotCaseList();
    this.props.getSpecialActivityList();
  }

  changeCategory = (index) =>{
    const {categoryList} = this.props;
    this.setState({
      curTab:index
    })
    if(index == 0){
      this.props.getCategoryList(0);
      this.props.getSwiperImgList();
      this.props.getHotCaseList();
      this.props.getSpecialActivityList();
    }else{
      const {getCommodityListByCategoryId} = this.props;
      const categoryId = categoryList[index-1]['_id'];
      this.props.getCommodityListByCategoryId(categoryId);
    }
  }

  preShow = (shopId,commodityId) => {
    this.props.navigation.navigate('CommodityDisplay',{shopId,commodityId});
  }

  render() {
    const {swiperImgList,hotCaseList,specialActivityList,categoryList,categoryCommodityList} = this.props;
    const {defaultCategoryList} = this.state;
    const {curTab} = this.state;
    return (
        <View style={styles.container}>
            <ScrollableTabView  renderTabBar={() => <DefaultTabBar/>} 
                  tabBarPosition='top' tabBarBackgroundColor="#fff" tabBarUnderlineStyle={{backgroundColor:'red'}} 
                  tabBarActiveTextColor="red" tabBarInactiveTextColor="#000" 
                  initialPage={curTab} onChangeTab={({from,i})=>{this.changeCategory(i)}}  > 
               <ScrollView tabLabel="首页" style={styles.tabContainer}>
                  <View style={{height:200,width:'100%'}}>
                    <Swiper height={200} horizontal={true} autoplay={true} loop={true}
                        paginationStyle={{ bottom: 10 }} showsPagination={true} index={0}
                        dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                        activeDotStyle={{ backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}}
                        onIndexChanged={(index)=>{}}>
                        {
                           swiperImgList.map((imgUrl,imgUrlIndex) => {
                            return(
                                <Image source={{uri:SERVER + imgUrl}} style={{height:150,flex:1}} key={imgUrlIndex}></Image>
                             )
                           })
                        }
                    </Swiper>
                  </View>
                   


                  <View style={[styles.hotCaseList,{display:hotCaseList && hotCaseList.length?'flex':'none'}]}>
                    <View style={styles.hotCaseTitle}>
                      <Text style={styles.hotCaseTitleText}>爆款</Text>
                    </View>
                    <View style={styles.hotCaseList}>
                      {
                        hotCaseList.map((hotCase,hotCaseIndex) => {
                          const commodity = hotCase.commodityId;
                          const {priceRange,allRest,profitRange} = getPriceRangeAndAllRest(commodity.models);
                          return (
                             <TouchableOpacity key={hotCaseIndex} style={{height:120,width:'100%'}} 
                                onPress={()=>this.preShow(hotCase.shopId._id,commodity._id)} activeOpacity={0.5} focusedOpacity={0.7}>
                              <View style={styles.categoryCommodity} >
                                <View style={styles.categoryCommodityLeftView}>
                                   <Image source={{uri:SERVER + commodity.showImgs[0]}} style={styles.categoryCommodityImg}></Image>
                                </View>
                                <View style={styles.categoryCommodityRightView}>
                                   <Text style={styles.categoryCommodityName}>{commodity['name']}</Text>
                                   <Text style={styles.categoryCommodityPrice}>价格：￥{priceRange}</Text>
                                   <Text style={styles.categoryCommodityProfit}>利润：￥{profitRange}</Text>
                                   <Text style={styles.categoryCommodityAllRest}>库存：{allRest}</Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                           ) 
                        })
                      }
                    </View>
                  </View>
                  <View style={[styles.specialActivity,{display:specialActivityList && specialActivityList.length?'flex':'none'}]}>
                    <View style={styles.specialActivityTitle}>
                      <Text style={styles.specialActivityTitleText}>活动</Text>
                    </View>
                    {
                      specialActivityList.map((specialActivity,activityIndex) => {
                        const commodities = hotCase.commodities;
                        return (
                          <View style={styles.specialActivity} key={activityIndex}>
                           <Image source={{uri:SERVER + specialActivity.headImage}} style={styles.specialActivityImg}></Image>
                           {
                            commodities.map((commodityItem,commodityIndex) => {
                              const commodity = commodityItem.commodityId;
                              const {priceRange,allRest,profitRange} = getPriceRangeAndAllRest(commodity.models);
                              return (
                                <View style={styles.homeCommodity} key={commodityIndex}>
                                   <Image source={{uri:SERVER + commodity.showImgs[0]}} style={styles.homeCommodityImg}></Image>
                                   <Text style={styles.homeCommodityName}>{commodity['name']}</Text>
                                   <Text style={styles.homeCommodityPrice}>价格：￥{priceRange}</Text>
                                   <Text style={styles.homeCommodityProfit}>利润：￥{profitRange}</Text>
                                </View>
                              )
                            })
                           }
                         </View>
                         ) 
                      })
                    }
                  </View>
               </ScrollView>

               {
                (categoryList.length>0? categoryList:defaultCategoryList).map((category,categoryIndex) => {
                  return(
                    <ScrollView tabLabel={category['name']} style={styles.tabContainer} key={categoryIndex}>

                        <View style={{height:200,width:'100%',display:(category.swiperImgs&& category.swiperImgs.length>0)?'flex':'none'}}>
                          <Swiper height={200} horizontal={true} autoplay={true} loop={true}
                              paginationStyle={{ bottom: 10 }} showsPagination={true} index={0}
                              dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                              activeDotStyle={{ backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}}
                              onIndexChanged={(index)=>{}}>
                              {
                                 category && category.swiperImgs && category.swiperImgs.map((imgUrl,imgUrlIndex) => {
                                  return(
                                      <Image source={{uri:SERVER + imgUrl}} style={{height:150,flex:1}} key={imgUrlIndex}></Image>
                                   )
                                 })
                              }
                          </Swiper>
                        </View>

                        <View style={styles.categoryCommodityList}>
                          {
                            categoryCommodityList && categoryCommodityList.map((commodity,commodityIndex) => {
                              const {priceRange,allRest,profitRange} = getPriceRangeAndAllRest(commodity.models);
                              return(
                                <TouchableOpacity key={commodityIndex} style={{flex:1,display:'flex'}} 
                                    onPress={()=>this.preShow(commodity.shopId._id,commodity._id)} activeOpacity={0.5} focusedOpacity={0.7}>
                                  <View style={styles.categoryCommodity} >
                                    <View style={styles.categoryCommodityLeftView}>
                                       <Image source={{uri:SERVER + commodity.showImgs[0]}} style={styles.categoryCommodityImg}></Image>
                                    </View>
                                    <View style={styles.categoryCommodityRightView}>
                                       <Text style={styles.categoryCommodityName}>{commodity['name']}</Text>
                                       <Text style={styles.categoryCommodityPrice}>价格：￥{priceRange}</Text>
                                       <Text style={styles.categoryCommodityProfit}>利润：￥{profitRange}</Text>
                                       <Text style={styles.categoryCommodityAllRest}>库存：{allRest}</Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                                
                              )
                            })
                          }
                        </View>
                     </ScrollView>
                  )
                })
              }
              
            </ScrollableTabView>

        </View>
    );
  }
}

const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'#eee'
   },
   tabContainer:{
    flex:1,
    display:'flex',
    flexDirection:'column',
   },
   hotCaseList:{
    display:'flex',
    flexDirection:'column',
    backgroundColor:'#fff'
   },
   hotCaseTitle:{
    display:'flex',
    height:30,
    marginTop:20,
   },
   hotCaseTitleText:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:20,
    paddingLeft:10
   },
   specialActivityTitle:{
    display:'flex',
    height:50,
    marginTop:20
   },
   specialActivityTitleText:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:20,
    paddingLeft:10
   },
   homeCommodity:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor:'#ccc'
   },
   categoryCommodityList:{
    display:'flex',
    flexDirection:'column',
    flex:1,
   },
   categoryCommodity:{
    width:'100%',
    height:100,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    marginTop:10
   },
   categoryCommodityLeftView:{
    flex:1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
   },
    categoryCommodityImg:{
      height:100,
      width:100,
    },
    categoryCommodityRightView:{
      flex:2,
      flexDirection:'column'
    },
    categoryCommodityName:{
      height:30
    },
    categoryCommodityPrice:{
      flex:1
    },
    categoryCommodityProfit:{
      flex:1
    },
    categoryCommodityAllRest:{
      flex:1
    }
})

const mapStateToProps = (state) => {
  const categoryList= state.category.categoryList || [];
  const swiperImgList= state.market.swiperImgList || [];
  const hotCaseList= state.market.hotCaseList || [];
  const specialActivityList= state.market.specialActivityList || [];
  const categoryCommodityList = state.commodity.categoryCommodityList || [];
  return {
    categoryList,
    swiperImgList,
    hotCaseList,
    specialActivityList,
    categoryCommodityList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getCommodityListByCategoryId,getCategoryList,getSwiperImgList,getHotCaseList,getSpecialActivityList}, dispatch);
  return {
    ...actions
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Market);