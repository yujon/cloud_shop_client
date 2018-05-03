import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,TouchableOpacity,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store'

import CarryCateEditDialog from '../../components/CarryCateEditDialog';

import {addCarryCate,getCarryCateList,removeCarryCate,updateCarryCate} from '../../actions/shop';

class CarryCate extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "运费配置",
      headerLeft:(
        <Icon.Button
          name="angle-left"
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.8}
          onPress={params.goBack}
        />
      ),
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({ goBack:this.goBack });
  }

  componentDidMount(){
    store.get('shopId').then((shopId) => {
      if (!shopId) { //未登录则去登录页面
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
      } else {
        this.setState({
          shopId:shopId
        })
        this.props.getCarryCateList(shopId);
      }
    });
  }

  constructor(props){
    super(props);
    let {onSelectItem} = this.props.navigation.state.params;
    this.onSelectItem = onSelectItem
    this.state = {
       showAddCarryCateDialog:false,
       showEditCarryCateDialog:false,
       curEditIndex:0,
       updateCarryCateVal:""
    }
  }

  changeShowAddCarryCateDialog(){
    this.setState({
      showAddCarryCateDialog:!this.state.showAddCarryCateDialog
    })
  }

  changeShowEditCarryCateDialog(){
    this.setState({
      showEditCarryCateDialog:!this.state.showEditCarryCateDialog
    })
  }

  addItem = () =>{
     this.changeShowAddCarryCateDialog();
  }

  onFinishAddItem = (carryCateInfo)=>{
    console.log(carryCateInfo)
    const {shopId} = this.state;
    this.changeShowAddCarryCateDialog();
    this.props.addCarryCate(shopId,carryCateInfo);
  }

  updateItem = (index) =>{
    const {carryCateList} = this.props;
    this.changeShowEditCarryCateDialog();
    this.setState({
      curEditIndex:index,
      updateCarryCateVal:carryCateList[index]['name']
    })
  }

  onFinishEditItem = (carryCateInfo)=>{
    const {shopId,curEditIndex} = this.state;
    const {carryCateList} = this.props;
    const carryCateId = carryCateList[curEditIndex]['_id'];
    this.changeShowEditCarryCateDialog();
    this.props.updateCarryCate(shopId,carryCateId,carryCateInfo);
  }


  removeItem = (index) =>{
    const {shopId} = this.state;
    const {carryCateList} = this.props;
    const carryCateId = carryCateList[index]['_id'];
    this.props.removeCarryCate(shopId,carryCateId)
  }

  renderDialogContent = (changeInfo)=>{
    return(
      <View style={{flex:1}} >
        <Text style={{height:50,marginTop:10}}>模板：出特殊地区不包邮（货到付款）外，其他地区邮费几何，几件起免邮</Text>
        <View style={{height:40,flexDirection:'row',alignItems:'center'}}>
          <Text style={{flex:1,alignItems:'center'}}>模板名称：</Text>
          <TextInput style={{flex:2}} clearButtonMode="while-editing" onChangeText={(text) =>{ changeInfo('name',text)}} />
        </View>
        <View style={{height:40,flexDirection:'row',alignItems:'center'}}>
          <Text style={{flex:1,alignItems:'center'}}>不包邮地区</Text>
          <TextInput style={{flex:2}} clearButtonMode="while-editing" onChangeText={(text) =>{ changeInfo('exceptAreas',text)}} />
        </View>
        <View style={{height:40,flexDirection:'row',alignItems:'center'}}>
           <Text style={{alignItems:'center'}}>运费</Text>
           <TextInput style={{flex:1}}clearButtonMode="while-editing" onChangeText={(text) =>{ changeInfo('normalPrice',text)}} />
           <Text style={{alignItems:'center'}}>元，</Text>
           <TextInput style={{flex:1}}clearButtonMode="while-editing" onChangeText={(text) =>{ changeInfo('freeSum' ,text)}} />
           <Text style={{alignItems:'center'}}>件起免邮</Text>
        </View>
      </View>
    )
  }


  goBack = () => {
    this.props.navigation.goBack();
  }

  onPick = (carryCateId,carryCateName) => {
    this.onSelectItem(carryCateId,carryCateName);
    this.goBack()
  }

  render() {
    const carryCateListView = [];
    const carryCateList = this.props.carryCateList;
    const {showAddCarryCateDialog,showEditCarryCateDialog,updateCarryCateVal}  = this.state;
    carryCateList.forEach((carryCate,index) => {
        carryCateListView.push(
          <TouchableOpacity style={styles.carryCate} onPress={()=>this.onPick(carryCate['_id'],carryCate['name'])} key={index} ctiveOpacity={0.5} focusedOpacity={0.7} >
            <View style={styles.leftLabel}>
               <Text style={styles.carryCateName}>{carryCate['name']}</Text>
            </View>
            <View style={styles.rightView}>
              <TouchableOpacity onPress={()=>{this.updateItem(index)}} activeOpacity={0.5} focusedOpacity={0.7} >
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Icon  name="edit" size={20} style={{marginRight:10}} name="edit"></Icon>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.removeItem(index)}} activeOpacity={0.5} focusedOpacity={0.7} >
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Icon  name="edit" size={20} style={{marginRight:10}} name="close"></Icon>
                  </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )
      })
    return (
        <View style={styles.container}>
            <View style={[styles.carryCateList]}>
              {
                carryCateListView
              }
            </View>
             <View  style={[styles.addView]}>
               <TouchableOpacity onPress={()=>{this.addItem()}} activeOpacity={0.5} focusedOpacity={0.7} >
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                      <Icon name="plus" style={styles.addIcon}></Icon>
                      <Text style={styles.addText}>新建运费类型</Text>
                   </View>
               </TouchableOpacity>
            </View>
            <CarryCateEditDialog 
                visible={showAddCarryCateDialog} title="添加配送类型" 
                renderContent={this.renderDialogContent.bind(this)}
                onCancel={this.changeShowAddCarryCateDialog.bind(this)} 
                onFinish={this.onFinishAddItem.bind(this)} >
            </CarryCateEditDialog>
            <CarryCateEditDialog 
                visible={showEditCarryCateDialog} title="编辑配送类型"
                renderContent={this.renderDialogContent.bind(this)}
                onCancel={this.changeShowEditCarryCateDialog.bind(this)} 
                onFinish={this.onFinishEditItem.bind(this)} >
            </CarryCateEditDialog>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const carryCateList = state.shop.carryCateList || [];
  return {
    carryCateList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({removeCarryCate,addCarryCate,getCarryCateList,updateCarryCate}, dispatch);
  return {
    ...actions
  };
};
const styles = StyleSheet.create({
   container:{
     flex:1,
     backgroundColor:'#eee'
   },
   carryCateList:{
      height:"auto",
      display:'flex',
   },
   carryCate:{
     height:50,
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     borderBottomColor:'#ccc',
     borderBottomWidth:1,
     marginRight:20,
     marginLeft:20
   },
   leftLabel:{
     flex:1,
   },
   commodityCateName:{

   },
   rightView:{
    width:70,
    height:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
   },
   rightViewIcon:{
     color:'#ccc',
     marginLeft:20
   },
   addView:{
    height:50,
    flexDirection:'row',
    alignItems:'center',
    marginLeft:20,
    marginRight:20,
   },
   addIcon:{
    paddingLeft:5,
    paddingRight:5
   },
   addText:{
    fontSize:14,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
   }


})
export default connect(mapStateToProps, mapDispatchToProps)(CarryCate);