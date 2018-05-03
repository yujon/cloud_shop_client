import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class Information extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "消息",
       headerLeft:null
    }
  };

  componentWillMount() {
    // this.props.navigation.setParams({ goBack: this.goBack });
  }

  render() {
    return (
        <View>
            <Text>Information</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);