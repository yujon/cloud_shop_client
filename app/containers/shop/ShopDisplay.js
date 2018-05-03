import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,Dimensions,View,Text} from 'react-native';
import store from 'react-native-simple-store';
import Icon from 'react-native-vector-icons/FontAwesome';
import Web from '../../components/Web';

import * as NavigationUtil from '../../utils/Navigation';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

class ShopDisplay extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "店铺预览",
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
    const {shopId} = props.navigation.state.params;
    this.state = {
      shopId,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ goBack:this.goBack });
  }

  componentDidMount() {
    store.get('shopId').then((shopId) => {
      if(!shopId) { 
        NavigationUtil.reset(this.props.navigation, 'ShopNav');
        return;
      }
      this.setState({
          myShopId:shopId
      })
    });
  }

  goBack = () => {
      this.props.navigation.goBack();
  }

  render() {
    const {shopId} = this.state;
    return (
        <View style={styles.container}>
            <View style={{width: maxWidth,height:maxHeight}}>
              <Web shopId={shopId}/>
            </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {} = state.shop;
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopDisplay);
