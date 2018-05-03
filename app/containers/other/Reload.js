import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Setting extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "设置",
      headerLeft: (
        <Icon.Button
          name="angle-left"
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.8}
          style={{marginLeft:10}}
          onPress={params.goBack}
        />
      ),
      drawerLabel: 'Setting',
      drawerIcon: ({ tintColor }) => (
        <Icon
              name="cog"
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={0.8}
              size={25}
              style={{color:tintColor}}
            />
      )
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({ showDrawer: this.showDrawer,goBack:this.goBack });
  }

  goBack = () => {
      this.props.navigation.goBack();
    }

  showDrawer = () =>{
     this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    return (
        <View>
            <Text>Setting</Text>
        </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  // const categoryActions = bindActionCreators(categoryCreators, dispatch);
  return {
  };
};

const styles = StyleSheet.create({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Setting);