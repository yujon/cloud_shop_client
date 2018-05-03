import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShareItems from './ShareItems';
import {getDate,getPriceRangeAndAllRest} from '../utils/Format'

import {SERVER} from '../constants/common';
var defaultCommodityImage = require('../static/img/commodity.jpg');

const CommodityList = ({
  commodityList,isUp,showShareItems,changeShowShareItems,
  shareToSession,shareToTimeline,preShow,chatWithCreator,share,
  gotoEditCommodity,gotoRemoveCommodity,
  curOrderType,reorder,
}) => {
  let commodityListView = [];
  commodityList && commodityList.forEach((commodityInfo,index)=>{
      let realTime = getDate(commodityInfo['createTime']);
      let {priceRange,allRest} = getPriceRangeAndAllRest(commodityInfo.models);
      if(commodityInfo.showImgs && commodityInfo.showImgs.length > 0){
          defaultCommodityImage = {uri:SERVER +(commodityInfo.showImgs)[0]}
      }
      commodityListView.push (
          <View style={styles.commodity} key={index} >
            <TouchableOpacity style={styles.mainView} onPress={()=>{gotoEditCommodity(commodityInfo._id,commodityInfo)}} activeOpacity={0.5} focusedOpacity={0.7}>
                <View style={styles.imageView} >
                  <Image  style={styles.image} source={defaultCommodityImage}></Image>
                  <Text style={commodityInfo.isCreator?styles.hideCloneInfo:styles.cloneInfo}>代理</Text>
                </View>
                <View style={styles.contentView}>
                   <Text style={styles.name}>{commodityInfo['name']}</Text>
                   <Text style={styles.price}>￥{priceRange}</Text>
                   <View  style={styles.detailView}>
                     <Text style={styles.sale}>{commodityInfo['saleQuantity']}</Text>
                     <Text style={styles.sale}>{commodityInfo['saleAmount']}</Text>
                   </View>
                   <Text style={styles.createTime}>{realTime}</Text>
                </View>
                <View style={styles.rightArrowView}>
                   <Icon name="angle-right" backgroundColor="transparent" underlayColor="transparent"></Icon>
                </View>
             </TouchableOpacity>
             <View style={styles.othersView}>
                <TouchableOpacity style={styles.otherItem} onPress={()=>{preShow(commodityInfo._id)}} activeOpacity={0.5} focusedOpacity={0.7}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Icon name="eye" size={20} color="#ccc"  style={styles.otherItemIcon}></Icon>
                      <Text style={styles.otherItemText}>预览</Text>
                    </View>
                 </TouchableOpacity>
                <TouchableOpacity style={styles.otherItem} onPress={()=>{gotoRemoveCommodity(commodityInfo._id,commodityInfo.isCreator)}} activeOpacity={0.5} focusedOpacity={0.7} >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Icon name="times" size={20} color="#ccc" style={styles.otherItemIcon}></Icon>
                      <Text style={styles.otherItemText} >删除</Text>
                    </View>
                 </TouchableOpacity>
                <TouchableOpacity style={[styles.otherItem,{display:isUp?'flex':'none'}]} onPress={()=>{share(commodityInfo._id)}} activeOpacity={0.5} focusedOpacity={0.7} >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Icon name="share-alt" size={20} color="#ccc" style={styles.otherItemIcon}></Icon>
                      <Text style={styles.otherItemText} >分享</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.otherItem,{display:isUp&&!commodityInfo.isCreator?'flex':'none'}]} onPress={()=>{chatWithCreator(commodityInfo._id)}} activeOpacity={0.5} focusedOpacity={0.7} >
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                      <Icon name="comment" size={20} color="#ccc" style={styles.otherItemIcon}></Icon>
                      <Text style={styles.otherItemText} >联系供应商</Text>
                    </View>
                </TouchableOpacity>
             </View>
          </View>
      )
    })
  return (
    <ScrollView style={styles.container}>
         <View  style={styles.bar}>
            <View  style={styles.barItem} onPress={()=>{reorder('saleQuantity')}}>
                <Text style={curOrderType=="saleQuantity"?styles.activeBarItemText:styles.barItemText}>销量</Text>
            </View>
            <View  style={styles.barItem} onPress={()=>{reorder('saleAmount')}}>
                <Text  style={curOrderType=="saleAmount"?styles.activeBarItemText:styles.barItemText}>成交额</Text>
            </View>
            <View  style={styles.barItem} onPress={()=>{reorder('normalPrice')}}>
                <Text  style={curOrderType=="normalPrice"?styles.activeBarItemText:styles.barItemText}>价格</Text>
            </View>
         </View>
           {
             commodityListView
           }
         <View style={[styles.nothingView,{display:commodityList.length>0?"none":'flex'}]} >
           <Text style={styles.nothingText}>暂无商品</Text>
         </View>

         <ShareItems visible={showShareItems} shareToSession={shareToSession}  shareToTimeline={shareToTimeline} 
         onCancel={changeShowShareItems}></ShareItems>
    </ScrollView>
)};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  bar:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    backgroundColor:'#fff',
    marginBottom:10
  },
  barItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  activeBarItemText:{
    fontSize:14,
    color:'red'
  },
  barItemText:{
    fontSize:14,
  },
  commodityList:{
    flex:1,
    marginBottom:20,
    marginTop:20,
    backgroundColor:'#ccc'
  },
  commodity: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#fff",
    justifyContent: 'center',
    alignItems: 'center',
    height:200,
    marginBottom:10
  },
  mainView: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:2,
    borderBottomColor:'#eee',
    borderBottomWidth:1
  },
  imageView:{
    flex:3,
    padding:10,
    position:'relative'
  },
  image:{
    height:100,
    width:100
  },
  cloneInfo:{
    position:'absolute',
    top:10,
    left:10,
    backgroundColor:'red',
  },
  hideCloneInfo:{
    display:'none'
  },
  contentView:{
    padding:20,
    flex:6,
    justifyContent:'center'
  },
  name:{
    flex:1,
    fontSize:15,
    alignItems: 'center',
    color:'#000'
  },
  price:{
    flex:1,
    fontSize:17,
    color:"red",
    alignItems: 'center',
  },
  detailView:{
    flex:1,
    flexDirection:"row",
    alignItems: 'center',
  },
  sale:{
    fontSize:13,
  },
  createTime:{
    flex:1,
    flexDirection:"row",
    alignItems: 'center',
  },
  rightArrowView:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  othersView:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row'
  },
  otherItem:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  otherItemIcon:{
    justifyContent:'center',
    alignItems:'center'
  },
  otherItemText:{
    alignItems:'center',
    textAlign:'center',
  },
  nothingView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  nothingText:{
    flex:1,
    fontSize:18,
    justifyContent:'center',
    alignItems:'center'
  }


});

export default CommodityList;
