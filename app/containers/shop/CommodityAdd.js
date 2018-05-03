import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Switch,DatePickerAndroid,TouchableOpacity,Image,TextInput,Platform,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import store from 'react-native-simple-store'

import {SERVER} from '../../constants/common';
import {uploadFile} from '../../actions/common';
import {addCommodity} from '../../actions/commodity';

import * as NavigationUtil from '../../utils/Navigation';
import {pickImg} from '../../utils/Image';

class CommodityAdd extends React.Component {
   static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "添加商品",
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
    this.state = {
      curSwiperIndex:0,
      name:'',
      detail:'',
      showImgs:[],
      models:[],
      commodityCateId:'',
      commodityCateName:'',
      carryCateId:'',
      carryCateName:'',
      categoryId:{},
      categoryName:'',
      shopOwnerRecommodate:false,
      upcarriage:0
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

  removeSwiperImg = ()=>{
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
       modeltype:"",
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
    console.log(index)
    let {models} = this.state;
    models.splice(index,1);
    console.log(models)
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

  gotoCommodityCate= () =>{
    const params = {};
    params['onSelectItem'] = (commodityCateId,commodityCateName) =>{
       this.setState({
          commodityCateId,
          commodityCateName
       })
    }
    this.props.navigation.navigate('CommodityCate',params)
  }

  gotoCarryCate= () =>{
    const params = {};
    params['onSelectItem'] = (carryCateId,carryCateName) =>{
       this.setState({
          carryCateId,
          carryCateName
       })
    }
    this.props.navigation.navigate('CarryCate',params)
  }

  gotoCategory = () =>{
    const params = {};
    params['onSelectItem'] = (categoryId,categoryName) =>{
       this.setState({
          categoryId,
          categoryName
       })
    }
    this.props.navigation.navigate('CategoryPicker',params)
  }

  gotoCommodityDetailEdit = () =>{

  }
  
  save = () =>{
    const {shopId,name,detail,showImgs,models,shopOwnerRecommodate,upcarriage,
      commodityCateId,carryCateId,categoryId} = this.state;
    const commodityInfo = {
      showImgs,
      name,
      detail,
      models,
      carryCateId,
      categoryId
    }
    const shopCommodityInfo = {
      commodityCateId,
      shopOwnerRecommodate,
      upcarriage,
    }
    this.props.addCommodity(shopId,commodityInfo,shopCommodityInfo,()=>{
      this.props.navigation.pop(1)
    });
  }

  render() {
    const {name,detail,showImgs,models,shopOwnerRecommodate,upcarriage,
      commodityCateId,commodityCateName,carryCateId,carryCateName,categoryId,categoryName} = this.state;
    

    return (
        <ScrollView  style={[styles.container]}>
             <Swiper  height={200} horizontal={true} autoplay={false}
                  paginationStyle={{ bottom: 10 }} showsPagination={true} index={0}
                  dotStyle={{ backgroundColor: 'rgba(0,0,0,.2)', width: 6, height: 6 }}
                  activeDotStyle={{ backgroundColor: 'rgba(0,0,0,.5)', width: 6, height: 6}}
                  onIndexChanged={(index)=>{this.setState({curSwiperIndex:index})}}>
                  {
                     showImgs && showImgs.map((imgUrl,index) => 
                       <Image source={{uri:SERVER + imgUrl}} style={styles.swiperImg} key={index}></Image>
                      )
                  }
              </Swiper>

              <View style={[styles.swiperOp]}>
                 <Icon.Button
                    name="trash"
                    color="#000"
                    style={styles.swiperOpBtn}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    onPress={()=>{this.removeSwiperImg()}}
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
                <Text style={[styles.leftLabel]}>标题</Text>
                <TextInput 
                  style={[styles.rightView]}
                  enablesReturnKeyAutomatically={true}
                  blurOnSubmit={true}
                  clearButtonMode="while-editing"
                  underlineColorAndroid='transparent'
                  value={name}
                  placeholder="输入标题"
                  onChangeText={(text) => this.setState({name:text})}>
                </TextInput>
              </View>
              
              <View style={styles.line}>
                <Text style={styles.leftLabel}>商品类目</Text>
                <View style={[styles.rightView]} >
                  <Text style={[styles.rightViewLeft]} >{categoryName}</Text>
                  <TouchableOpacity onPress={this.gotoCategory} style={[styles.rightViewRight]} activeOpacity={0.5} focusedOpacity={0.7} >
                    <View  style={[styles.rightViewRightContent]} >
                      <Text>选择</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.modelsWrap]}>
              {
                models && models.map((model,index) => {
                   return(
                      <View key={index} style={styles.model}>
                        <View style={styles.leftContent}>
                          <View style={styles.line} >
                            <Text style={[styles.leftLabel,{marginTop:10}]}>型号</Text>
                            <TextInput 
                              style={[styles.rightView]}
                              enablesReturnKeyAutomatically={true}
                              blurOnSubmit={true}
                              clearButtonMode="while-editing"
                              underlineColorAndroid='transparent'
                              value={model['modelType']}
                              placeholder="输入型号"
                              onChangeText={(text)=>{this.changeModelItem(index,'modelType',text)}}>
                            </TextInput>
                          </View>
                          <View style={styles.line}>
                            <Text style={[styles.leftLabel,{marginTop:10}]}>价格</Text>
                            <TextInput 
                              style={[styles.rightView]}
                              keyboardType="number-pad"
                              enablesReturnKeyAutomatically={true}
                              blurOnSubmit={true}
                              clearButtonMode="while-editing"
                              underlineColorAndroid='transparent'
                              value={model['modelPrice'].toString()|| ""}
                              placeholder="输入价格"
                              onChangeText={(text)=>{this.changeModelItem(index,'modelPrice',text)}}>
                            </TextInput>
                          </View>
                          <View style={styles.line}>
                            <Text style={[styles.leftLabel,{marginTop:10}]}>库存</Text>
                            <TextInput 
                              style={[styles.rightView]}
                              keyboardType="number-pad"
                              enablesReturnKeyAutomatically={true}
                              blurOnSubmit={true}
                              clearButtonMode="while-editing"
                              underlineColorAndroid='transparent'
                              value={model['modelRest'].toString()|| ""}
                              placeholder="输入库存"
                              onChangeText={(text)=>{this.changeModelItem(index,'modelRest',text)}}>
                            </TextInput>
                          </View>
                          <View style={styles.line}>
                            <Text style={[styles.leftLabel,{marginTop:10}]}>利润</Text>
                            <TextInput 
                              style={[styles.rightView]}
                              keyboardType="number-pad"
                              enablesReturnKeyAutomatically={true}
                              blurOnSubmit={true}
                              clearButtonMode="while-editing"
                              underlineColorAndroid='transparent'
                              value={model['modelProfit'].toString()|| ""}
                              placeholder="输入利润金额"
                              onChangeText={(text)=>{this.changeModelItem(index,'modelProfit',text)}}>
                            </TextInput>
                          </View>
                           <View style={[styles.modelImgWrap,{margin:10,display:model['modelImg']?'flex':'none'}]}>
                              <Image style={styles.modelImg} source={{uri:SERVER+model['modelImg']}}></Image>
                           </View>
                           <View style={[styles.swiperOp]}>
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

                        <View style={[styles.rightContent]}>
                          <TouchableOpacity onPress={()=>this.removeModelItem(index)} style={styles.removeIconBtn} activeOpacity={0.5} focusedOpacity={0.7}  >
                              <Icon size={20} style={styles.removeIcon} name="remove"></Icon>
                          </TouchableOpacity>
                        </View>

                      </View>
                    )
                  })
              }
              </View>
    
              <View style={[styles.addModelWrap]}>
                <TouchableOpacity style={styles.addViewRight} onPress={()=>this.addModelItem()} activeOpacity={0.5} focusedOpacity={0.7} >
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Icon name="plus" ></Icon>
                    <Text style={{marginLeft:5}}>添加商品型号</Text>
                  </View>
                </TouchableOpacity>
              </View>
              
             
             <View style={[styles.line,{marginBottom:10}]}>
                <Text style={styles.leftLabel}>商品详情</Text>
                <View style={[styles.rightView]} >
                  <Text style={styles.rightViewLeft}></Text>
                  <TouchableOpacity onPress={this.gotoCommodityDetailEdit} style={styles.rightViewRight}>
                    <View style={styles.rightViewRightContent}>
                      <Text style={{marginRight:5}}>去编辑</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>


              <View style={[styles.line,{marginBottom:10}]}>
                <Text style={styles.leftLabel}>快递设置</Text>
                <View style={[styles.rightView]} >
                  <Text style={styles.rightViewLeft}>{carryCateName}</Text>
                  <TouchableOpacity onPress={this.gotoCarryCate} style={styles.rightViewRight}>
                    <View style={styles.rightViewRightContent}>
                      <Text style={{marginRight:5}}>选择</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.line,{marginBottom:10}]}>
                <Text style={styles.leftLabel}>商品分类</Text>
                <View style={[styles.rightView]} >
                  <Text style={styles.rightViewLeft}>{commodityCateName}</Text>
                  <TouchableOpacity onPress={this.gotoCommodityCate} style={styles.rightViewRight}>
                    <View style={styles.rightViewRightContent}>
                      <Text style={{marginRight:5}}>选择</Text>
                      <Icon name="angle-right"></Icon>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.commonWrap}>
                  <View style={styles.line}>
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
  const actions = bindActionCreators({uploadFile,addCommodity}, dispatch);
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
      flexDirection:'row'
    },
    swiperImg:{
      height:120,
      flex:1
    },
    swiperInstead:{
      backgroundColor:'#aaa',
      flex:1,
      height:120,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    swiperInsteadIcon:{
      height:30,
      height:30,
      color:'red'
    },
    swiperInsteadText:{
      fontSize:18,
      color:'#000'
    },
    swiperOp:{
      backgroundColor:'#fff',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    swiperOpBtn:{
      width:50,
      height:50,
      borderRadius:25
    },
    titleWrap:{
      backgroundColor:'#fff',
      height:50,
      flexDirection:'row',
      marginTop:10,
      marginBottom:10,
    },
    categoryWrap:{
      backgroundColor:'#fff',
      height:50,
      flexDirection:'row',
      marginTop:10,
      marginBottom:10,
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
    leftContent:{
      flexDirection:'column',
      flex:1,
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
    rightContent:{
      width:50,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
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
    removeIcon:{

    },
    line:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#fff',
        height:50,
        paddingLeft:10,
        paddingRight:10,
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

export default connect(mapStateToProps, mapDispatchToProps)(CommodityAdd);