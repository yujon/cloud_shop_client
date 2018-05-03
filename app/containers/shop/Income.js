import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Income extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "收入管理",
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
  }

  componentWillMount() {
    this.props.navigation.setParams({goBack:this.goBack });
  }

   goBack = () => {
      this.props.navigation.goBack();
  }

  render() {
    const {income}= this.props;
    return (
        <View>
            <Text>当前店铺收入：￥{income || 0}</Text>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  const shopInfo = state.shop.shopInfo || {}
  return {
    income:shopInfo['income']
  };
};

const mapDispatchToProps = (dispatch) => {
  // const categoryActions = bindActionCreators(categoryCreators, dispatch);
  return {
  };
};

const styles = StyleSheet.create({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Income);
