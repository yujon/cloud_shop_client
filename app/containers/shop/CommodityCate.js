import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,TouchableOpacity,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store'

import CommodityCateEditDialog from '../../components/CommodityCateEditDialog';

import {addCommodityCate,getCommodityCateList,removeCommodityCate,updateCommodityCate} from '../../actions/shop';

import * as NavigationUtil from '../../utils/Navigation';

class commodityCate extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "商品分类",
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
  }

  constructor(props){
    super(props);
    let {onSelectItem} = this.props.navigation.state.params;
    if(!onSelectItem)
      onSelectItem = ()=>{};
    this.onSelectItem = onSelectItem;
    this.state = {
       showAddCommodityCateDialog:false,
       showEditCommodityCateDialog:false,
       curEditIndex:0,
       updateCommodityCateVal:""
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ goBack:this.goBack });
  }

  componentDidMount(){
    store.get('shopId').then((shopId) => {
        if (!shopId) { 
          NavigationUtil.reset(this.props.navigation, 'ShopNav');
        } else {
          this.setState({
            shopId:shopId
          })
          this.props.getCommodityCateList(shopId);
        }
      });
  }

  changeShowAddCommodityCateDialog(){
    this.setState({
      showAddCommodityCateDialog:!this.state.showAddCommodityCateDialog
    })
  }

  changeShowEditCommodityCateDialog(){
    this.setState({
      showEditCommodityCateDialog:!this.state.showEditCommodityCateDialog
    })
  }

  renderDialogContent = (callback)=>{
    return(
       <TextInput 
          style={{width:250}}
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          clearButtonMode="while-editing"
          underlineColorAndroid='transparent'
          placeholder=""
          autoFocus={true}
          onChangeText={(text) =>{
             callback(text)
          }}>
       </TextInput>
    )
  }


  addItem = () =>{
     this.changeShowAddCommodityCateDialog();
  }

  onFinishAddItem = (commodityCateName)=>{
    const {shopId} = this.state;
    const commodityCateInfo = {
      name:commodityCateName
    };
    this.changeShowAddCommodityCateDialog();
    this.props.addCommodityCate(shopId,commodityCateInfo);
  }

  updateItem = (index) =>{
    const {commodityCateList} = this.props;
    this.changeShowEditCommodityCateDialog();
    this.setState({
      curEditIndex:index,
      updateCommodityCateVal:commodityCateList[index]['name']
    })
  }

  onFinishEditItem = (commodityCateName)=>{
    const {shopId,curEditIndex} = this.state;
    const {commodityCateList} = this.props;
    const commodityCateId = commodityCateList[curEditIndex]['_id'];
    const commodityCateInfo = {
      name:commodityCateName
    };
    this.changeShowEditCommodityCateDialog();
    this.props.updateCommodityCate(shopId,commodityCateId,commodityCateInfo);
  }


  removeItem = (index) =>{
    const {shopId} = this.state;
    const {commodityCateList} = this.props;
    const commodityCateId = commodityCateList[index]['_id'];
    this.props.removeCommodityCate(shopId,commodityCateId)
  }


  goBack = () => {
      this.props.navigation.goBack();
  }

  onPick = (commodityCateId,commodityCateName)=>{
    this.onSelectItem(commodityCateId,commodityCateName);
    this.goBack()
  }

  render() {
    const commodityCateListView = [];
    const commodityCateList = this.props.commodityCateList;
    const {showAddCommodityCateDialog,showEditCommodityCateDialog,updateCommodityCateVal}  = this.state;
    commodityCateList.map((commodityCate,index) => {
     commodityCateListView.push(
        <TouchableOpacity style={styles.commodityCate} activeOpacity={0.5} focusedOpacity={0.7} 
            onPress={()=>this.onPick(commodityCate['_id'],commodityCate['name'])} key={index}>
          <View style={styles.leftLabel}>
            <Text style={styles.commodityCateName}>{commodityCate['name']}</Text>
          </View>
          <View style={styles.rightView}>
              <TouchableOpacity onPress={()=>{this.updateItem(index)}}>
                  <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Icon  name="edit" size={20} style={{marginRight:10}}></Icon>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{this.removeItem(index)}}>
                  <View  style={{justifyContent:'center',alignItems:'center'}} >
                    <Icon  name="times" size={20} style={{marginRight:10}}></Icon>
                  </View>
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    })
    return (
        <View style={styles.container}>
            <View style={[styles.commodityCateList]}>
            {
              commodityCateListView
            }
              <View  style={[styles.addView]}>
                  <TouchableOpacity  onPress={this.addItem} activeOpacity={0.5} focusedOpacity={0.7} style={{flexDirection:'row'}}>
                    <Icon name="plus" style={styles.addIcon}></Icon>
                    <Text style={styles.addText}>新建分类</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <CommodityCateEditDialog 
                visible={showAddCommodityCateDialog} title="添加商品分类"
                renderContent={this.renderDialogContent.bind(this)}
                onCancel={this.changeShowAddCommodityCateDialog.bind(this)} 
                onFinish={this.onFinishAddItem.bind(this)} >
            </CommodityCateEditDialog>
            <CommodityCateEditDialog 
                visible={showEditCommodityCateDialog} title="编辑商品分类"
                renderContent={this.renderDialogContent.bind(this)}
                onCancel={this.changeShowEditCommodityCateDialog.bind(this)} 
                onFinish={this.onFinishEditItem.bind(this)} >
            </CommodityCateEditDialog>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const commodityCateList = state.shop.commodityCateList || [];
  return {
    commodityCateList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({removeCommodityCate,addCommodityCate,getCommodityCateList,updateCommodityCate}, dispatch);
  return {
    ...actions
  };
};
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#eee'
    },
    commodityCateList:{
      height:"auto",
      display:'flex',
    },
    commodityCate:{
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
export default connect(mapStateToProps, mapDispatchToProps)(commodityCate);