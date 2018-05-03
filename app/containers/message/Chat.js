import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


class Chat extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "聊天",
      headerLeft:null
    }
  };

  componentWillMount() {
    // this.props.navigation.setParams({ goBack: this.goBack });
  }

  render() {
    return (
        <View>
            <Text>chat</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);