import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Switch,DatePickerAndroid,TouchableOpacity,Image,TextInput,Platform,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import store from 'react-native-simple-store';
import {Toast} from "antd-mobile";

import {SERVER} from '../../constants/common';
import {uploadFile} from '../../actions/common';
import {updateCommodity} from '../../actions/commodity';

import * as NavigationUtil from '../../utils/Navigation';
import {pickImg} from '../../utils/Image';

class CommodityEdit extends React.Component {
   static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "编辑商品",
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
          <View>
            <Text style={{fontSize:16,color:'#fff','marginRight':10}}>完成</Text>
          </View>
        </TouchableOpacity>
      )
    }
  };

  constructor(props) {
    super(props);
    const {commodityId,commodityInfo} = props.navigation.state.params;
    this.state = {
      curSwiperIndex:0,
      commodityId,
      isCreator:commodityInfo.isCreator,
      name:commodityInfo.name,
      detail:commodityInfo.detail,
      showImgs:commodityInfo.showImgs || [],
      models:commodityInfo.models || [],
      commodityCateId:commodityInfo.commodityCateId,
      carryCateId:commodityInfo.carryCateId,
      categoryId:commodityInfo.categoryId,
      shopOwnerRecommodate:commodityInfo.shopOwnerRecommodate,
      upcarriage:commodityInfo.upcarriage,
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({goBack:this.goBack,save:this.save });
  }

   componentDidMount(){
    store.get('shopId').then((shopId) => {
      if (!shopId) {
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
      } else {
        this.setState({
          shopId:shopId
        })
      }
    });
  }


  goBack = () => {
    this.props.navigation.goBack();
  }

  removeImg = ()=>{
    let {showImgs,curSwiperIndex} = this.state;
    showImgs.splice(curSwiperIndex,1);
    this.setState({
      showImgs:showImgs
    })
  }

  pickImage = (isSwiperPic,modelIndex) =>{
    let {showImgs,models} = this.state;
    pickImg((file,fileName)=>{
       this.props.uploadFile(file,fileName,(tmpImg) =>{
        if(isSwiperPic){
            showImgs.push(tmpImg);
            this.setState({
              showImgs:showImgs
            })
        }else{
            models[modelIndex]['modelImg'] = tmpImg;
            this.setState({
              models:models
            })
        }
       });
    })
  }

  addModelItem = ()=>{
    let {models} = this.state;
    models.push({
       nmodelType:"",
       modelImg:"",
       modelPrice:"",
       modelRest:"", 
       modelProfit:""
    });
    this.setState({
      models:models
    })
  }

  removeModelItem = (index) =>{
    let {models} = this.state;
    models.splice(index,1);
    this.setState({
      models:models
    })
  }
  
  changeModelItem = (index,key,val) =>{
    let {models} = this.state;
    models[index][key] = val;
    this.setState({
      models:models
    })
  }

  gotoCommodityCate =() =>{
    const params = {};
    params['onSelectItem'] = (commodityCateId,commodityCateName) =>{
       this.setState({
          commodityCateId,
          commodityCateName
       })
    }
    this.props.navigation.navigate('CommodityCate',params)
  }

  gotoCarryCate =() =>{
    const params = {};
    params['onSelectItem'] = (carryCateId,carryCateName) =>{
       this.setState({
          carryCateId,
          carryCateName
       })
    }
    this.props.navigation.navigate('CarryCate',params)
  }

  gotoCategory =() =>{
    const params = {};
    params['onSelectItem'] = (categoryId,categoryName) =>{
       this.setState({
          categoryId,
          categoryName
       })
    }
    this.props.navigation.navigate('CategoryPicker',params)
  }


  save = () =>{
    const {commodityId,shopId,name,detail,showImgs,models,shopOwnerRecommodate,upcarriage,
      commodityCateId,carryCateId,categoryId,isCreator} = this.state;
    const commodityInfo = {
      showImgs,
      name,
      detail,
      models,
      carryCateId,
      categoryId,
    }
    const shopCommodityInfo = {
      commodityCateId,
      shopOwnerRecommodate,
      upcarriage,
    }
    this.props.updateCommodity(isCreator,shopId,commodityId,commodityInfo,shopCommodityInfo,()=>{
      this.props.navigation.pop(1)
    });
  }

  render() {
    const {isCreator,name,detail,showImgs,models,shopOwnerRecommodate,upcarriage,
      commodityCateId,commodityCateName,carryCateId,carryCateName,categoryId,categoryName} = this.state;
    let swiperImgView = [];
    (showImgs || []).map((imgUrl,index) => {
       swiperImgView.push(<Image source={{uri:SERVER + imgUrl}} style={styles.swiperImg} key={index}></Image>)
    })

    console.log(models)
    return (
        <ScrollView  style={[styles.container]}>
              <Swiper style={styles.swiper} height={200} horizontal={true} autolay={false}
                  paginationStyle={{ bottom: 10 }} showsPagination={true} index={0}
                  dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                  activeDotStyle={{ backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}}
                  onIndexChanged={(index)=>{this.setState({curSwiperIndex:index})}}>
                  {
                     swiperImgView
                  }
              </Swiper>

              <View style={[styles.swiperOp,{display:isCreator?'flex':'none'}]}>
                 <Icon.Button
                    name="trash"
                    color="#000"
                    style={styles.swiperOpBtn}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    onPress={()=>{this.removeImg(true)}}
                  />
                 <Icon.Button
                    name="upload"
                    color="#000"
                    style={styles.swiperOpBtn}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    onPress={()=>{this.pickImage(true)}}
                  />
              </View>

              <View style={styles.line}>
                <Text style={[styles.leftLabel,{marginTop:10}]}>标题</Text>
                <TextInput 
                  style={[styles.rightView,{display:isCreator?'flex':'none'}]}
                  enablesReturnKeyAutomatically={true}
                  blurOnSubmit={true}
                  clearButtonMode="while-editing"
                  underlineColorAndroid='transparent'
                  value={name}
                  placeholder="输入标题"
                  onChangeText={(text) => this.setState({name:text})}>
                </TextInput>
                <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                  <Text>{name}</Text>
                </View>
              </View>

              <View style={[styles.line,{marginTop:10}]}>
                <Text style={styles.leftLabel}>商品类目</Text>
                <View style={[styles.rightView,{display:isCreator?'flex':'none'}]} >
                  <Text style={[styles.rightViewLeft]}>{categoryName}</Text>
                  <TouchableOpacity onPress={this.gotoCategory}  style={[styles.rightViewRight]} activeOpacity={0.5} focusedOpacity={0.7} >
                    <View style={[styles.rightViewRightContent]}>
                      <Text style={{marginRight:6}}>选择</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                  <Text>{categoryName}</Text>
                </View>
              </View>

               <View style={[styles.modelsWrap,{display:models && models.length > 0?'flex':'none'}]}>
               {
                 models.map((model,index) => {
                  return(
                    <View key={index} style={styles.model}>
                      <View style={styles.leftContent}>
                        <View style={styles.line} >
                          <Text style={[styles.leftLabel,{marginTop:10}]}>型号</Text>
                          <TextInput 
                            style={[styles.rightView,{display:isCreator?'flex':'none'}]}
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            clearButtonMode="while-editing"
                            underlineColorAndroid='transparent'
                            value={model['modelType']}
                            placeholder="输入型号"
                            onChangeText={(text)=>{this.changeModelItem(index,'modelType',text)}}>
                          </TextInput>
                          <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                            <Text>{model['modelRest']}</Text>
                          </View>
                        </View>

                        <View style={styles.line}>
                          <Text style={[styles.leftLabel,{marginTop:10}]}>价格</Text>
                          <TextInput 
                            style={[styles.rightView,{display:isCreator?'flex':'none'}]}
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            clearButtonMode="while-editing"
                            underlineColorAndroid='transparent'
                            value={model['modelPrice'].toString()}
                            placeholder="输入价格"
                            onChangeText={(text)=>{this.changeModelItem(index,'modelPrice',text)}}>
                          </TextInput>
                          <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                            <Text>{model['modelPrice']}</Text>
                          </View>
                        </View>

                        <View style={styles.line}>
                          <Text style={[styles.leftLabel,{marginTop:10}]}>库存</Text>
                          <TextInput 
                            style={[styles.rightView,{display:isCreator?'flex':'none'}]}
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            clearButtonMode="while-editing"
                            underlineColorAndroid='transparent'
                            value={model['modelRest'].toString()}
                            placeholder="输入库存"
                            onChangeText={(text)=>{this.changeModelItem(index,'modelRest',text)}}>
                          </TextInput>
                          <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                            <Text>{model['modelRest']}</Text>
                          </View>
                        </View>

                        <View style={styles.line}>
                          <Text style={[styles.leftLabel,{marginTop:10}]}>分销让利</Text>
                          <TextInput 
                            style={[styles.rightView,{display:isCreator?'flex':'none'}]}
                            enablesReturnKeyAutomatically={true}
                            blurOnSubmit={true}
                            clearButtonMode="while-editing"
                            underlineColorAndroid='transparent'
                            value={model['modelProfit'].toString()}
                            placeholder="输入利润金额"
                            onChangeText={(text)=>{this.changeModelItem(index,'modelProfit',text)}}>
                          </TextInput>
                          <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                            <Text>{model['modelProfit'].toString()}</Text>
                          </View>
                        </View>

                         <View style={[styles.modelImgWrap,{margin:10,display:model['modelImg']?'flex':'none'}]}>
                            <Image style={styles.modelImg} source={{uri:SERVER+model['modelImg']}}></Image>
                         </View>
                         <View style={[styles.swiperOp,{display:isCreator?'flex':'none'}]}>
                             <Icon.Button
                                name="trash"
                                color="#000"
                                style={styles.swiperOpBtn}
                                backgroundColor="transparent"
                                underlayColor="transparent"
                                onPress={()=>this.changeModelItem(index,'modelImg',"")}
                              />
                             <Icon.Button
                                name="upload"
                                color="#000"
                                style={styles.swiperOpBtn}
                                backgroundColor="transparent"
                                underlayColor="transparent"
                                onPress={()=>{this.pickImage(false,index)}}
                              />
                          </View>

                      </View>

                      <View style={[styles.rightContent,{display:isCreator?'flex':'none'}]} >
                           <TouchableOpacity onPress={()=>this.removeModelItem(index)} style={styles.removeIconBtn} activeOpacity={0.5} focusedOpacity={0.7}  >
                              <Icon size={20} style={styles.removeIcon} name="remove"></Icon>
                          </TouchableOpacity>
                      </View>
                    </View>
                  )
                 })
                }
              </View>

              <View style={[styles.addModelWrap,{display:isCreator?'flex':'none'}]}>
                  <TouchableOpacity style={styles.addViewRight} onPress={this.addModelItem}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                      <Icon name="plus"></Icon>
                      <Text tyle={{marginLeft:5}}>添加商品型号</Text>
                    </View>
                  </TouchableOpacity>
              </View>
              
              
              <View style={[styles.line,{marginBottom:10}]}>
                <Text style={styles.leftLabel}>商品详情</Text>
                <View style={[styles.rightView,{display:isCreator?'flex':'none'}]} >
                  <Text style={styles.rightViewLeft}>{detail}</Text>
                  <TouchableOpacity onPress={this.gotoCommodityDetailEdit} style={styles.rightViewRight}>
                    <View style={styles.rightViewRightContent}>
                      <Text style={{marginRight:5}}>去编辑</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                  <Text>{detail}</Text>
                 </View>
              </View>

              <View style={[styles.line,{marginBottom:10}]}>
                <Text style={styles.leftLabel}>快递设置</Text>
                <View style={[styles.rightView,{display:isCreator?'flex':'none'}]} >
                  <Text style={styles.rightViewLeft}>{carryCateName}</Text>
                  <TouchableOpacity onPress={this.gotoCarryCate} style={styles.rightViewRight}>
                    <View style={[styles.rightViewRightContent]}>
                      <Text>选择</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
                 <View style={[styles.rightView,{display:isCreator?'none':'flex'}]}>
                  <Text>{carryCateName}</Text>
                 </View>
              </View>

              <View style={[styles.line,{marginBottom:10}]}>
                <Text style={styles.leftLabel}>选择分类</Text>
                <View style={[styles.rightView]} >
                  <Text style={styles.rightViewLeft}>{commodityCateName}</Text>
                  <TouchableOpacity onPress={this.gotoCommodityCate} style={styles.rightViewRight}>
                    <View style={[styles.rightViewRightContent]}>
                      <Text>选择</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.commonWrap}>
                    <View style={[styles.line,{marginTop:10}]}>
                      <Text style={styles.leftLabel}>店长推荐</Text>
                      <View style={[styles.rightView]} >
                        <Text>否</Text>
                        <Switch onValueChange={(value) => this.setState({shopOwnerRecommodate:value})} value={shopOwnerRecommodate} />
                        <Text>是</Text>
                      </View>
                    </View>
                    <View style={styles.line}>
                      <Text style={styles.leftLabel}>上架销售</Text>
                      <View style={[styles.rightView]} >
                        <Text>否</Text>
                        <Switch onValueChange={(value) => this.setState({upcarriage:value?1:0})} value={upcarriage!==0} />
                        <Text>是</Text>
                      </View>                   
                    </View>
                </View>
                 
        </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({uploadFile,updateCommodity}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
     flex:1,
     backgroundColor:'#eee'
    },
    swiper:{

    },
    swiperImg:{
      height:120,
      flex:1
    },
    swiperOp:{
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:'#fff',
       marginBottom:10
    },
    swiperOpBtn:{
      width:50,
      height:50,
      borderRadius:25
    },

    titleWrap:{
      height:150,
      flexDirection:'row'
    },
    leftContent:{
      flexDirection:'column',
      flex:1,
    },
    titleWrap:{
      height:50,
      marginTop:10,
      marginBottom:10,
      backgroundColor:'#fff',
    },
    modelsWrap:{
      marginTop:10,
      marginBottom:10,
    },
     model:{
      display:'flex',
      flexDirection:'row',
      marginTop:5,
      backgroundColor:'#fff',
    },
    modelImgWrap:{
      width:'100%',
      height:30,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    modelImg:{
      height:30,
      width:30,
    },
    addModelWrap:{
      height:50,
      backgroundColor:'#eee',
      flexDirection:'row'
    },
    addViewRight:{
      flex:1,
      height:50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-end',
      marginRight:20
    },
    commonWrap:{
      backgroundColor:'#fff',
      marginBottom:30
    },
    rightContent:{
      width:50,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    removeIcon:{

    },
    line:{
      paddingLeft:10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#fff',
      height:50,
    },
    leftLabel:{
       flex:1,
       justifyContent:'space-between',
       alignItems:'center',
    },
    rightView:{
      flex:2,
      flexDirection:'row',
      alignItems:'center'
    }, 
    rightViewLeft:{
      flex:3,
    },
    rightViewRight:{
      flex:1,
      flexDirection:'row'
    },
    rightViewRightContent:{
      flexDirection:'row',
      alignItems:'center'
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CommodityEdit);