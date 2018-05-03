import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,Dimensions,View,Text,TouchableOpacity} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'antd-mobile';
import Web from '../../components/Web';

import {checkHaveCommodity} from '../../actions/shop';
import {cloneCommodity} from '../../actions/commodity';

import * as NavigationUtil from '../../utils/Navigation';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

class CommodityDisplay extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "商品预览",
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
    const {shopId,commodityId} = props.navigation.state.params;
    this.state = {
      shopId,
      commodityId,
      myShopId:''

    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ goBack:this.goBack });
  }

  componentDidMount() {
    const {commodityId} = this.state;
    store.get('shopId').then((shopId) => {
      if(!shopId) { 
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
        return;
      }
      this.setState({
          myShopId:shopId
      })
      this.props.checkHaveCommodity(shopId,commodityId);  //本店铺是否已有该商品
    });
  }

  goBack = () => {
      this.props.navigation.goBack();
  }

  cloneCommodity(){
    const {myShopId,shopId,commodityId} = this.state;
    this.props.cloneCommodity(myShopId,shopId,commodityId,()=>{
      this.props.navigation.pop(1)
    })
  }

  render() {
    const {shopHaveCommodity} = this.props;
    const {shopId,commodityId} = this.state;
    return (
        <View style={styles.container}>
            <View style={{width: maxWidth,height:shopHaveCommodity?maxHeight:(maxHeight-150)}}>
              <Web shopId={shopId} commodityId={commodityId} />
            </View>
            <View style={[styles.others,{display:shopHaveCommodity ?'none':'flex'}]}>
              <Button onClick={()=>this.cloneCommodity()}>代理</Button>
            </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {shopHaveCommodity} = state.shop;
  return {
    shopHaveCommodity
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({checkHaveCommodity,cloneCommodity}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  others:{
    width:maxWidth,
    height:80,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CommodityDisplay);
