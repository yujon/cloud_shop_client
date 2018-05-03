import React from 'react';
import {View, Text, StyleSheet, SectionList, ListView, TouchableHighlight, TouchableWithoutFeedback} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import store from 'react-native-simple-store';
import {Toast} from 'antd-mobile';

import {getCategoryList} from '../../actions/category';

import * as NavigationUtil from '../../utils/Navigation';

class Category extends React.Component {
    static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "选择商品类目",
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

    constructor(props) {
        super(props);
        const {onSelectItem} = props.navigation.state.params;
        this.onSelectItem = onSelectItem;
        this.state = {
            hideRightBar: false,
            matchSection:new Set(),
            matchItem:new Set(),
        };
    };

    componentWillMount() {
        this.props.navigation.setParams({ goBack: this.goBack });
   }

   componentDidMount(){
        store.get('userId').then((userId) => {
            if (!userId) { //未登录则去登录页面
              NavigationUtil.reset(this.props.navigation, 'LoginNav');
            } else {
              this.props.getCategoryList(0,(isRoot)=>{
                if(isRoot){
                    Toast.info('暂时没有类目,请等待管理员添加',2)
                    this.goBack();
                }
              });
            }
          });
   }

    goBack = () => {
      this.props.navigation.goBack();
    }

    onPick = (item) => {
       this.onSelectItem(item._id,item.name);
       this.goBack();
    }
    renderItem = ({item}) =>{
        return(<TouchableHighlight onPress={() => this.onPick(item)} key={item._id}>
                <View style={[styles.sessionListItemContainer]} >
                    <Text style={[styles.sessionListItem1]}>{item.name}</Text>
                </View>
            </TouchableHighlight>)
       
    };
    renderSectionHeader = ({section, index}) => {
        return (<View key={index}>
            <Text style={[styles.sessionHeader]}>{section.key}</Text>
        </View>)
    };
    ItemSeparatorComponent = ({index}) => <View style={[styles.itemSeparator]}  key={index}></View>
    render(){
        const {categoryList} = this.props;
        const title = this.props.title || 'No Title';
        const data = this.props.data || 'No Data';

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const commodityCateSession = [
           {
              key:'商品类目',
              data:categoryList
           }
        ]
        console.log(commodityCateSession[0].data)
        return (
            <View style={[styles.container]}>
                <View style={[styles.container2]}>
                    <SectionList
                        sections={commodityCateSession}
                        initialNumToRender={15}
                        style={[styles.sessionList]}
                        renderSectionHeader={this.renderSectionHeader}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
  const categoryList = state.category.categoryList || [];
  return {
    categoryList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getCategoryList}, dispatch);
  return {
    ...actions
  };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    container2: {
        flex: 11,
        flexDirection: 'row'
    },
    sessionList: {
        flex: 1
    },
    sessionHeader: {
        backgroundColor: '#eee',
        height:30,
        paddingLeft:15,
        textAlignVertical:'center',
        fontSize:15
    },
    sessionListItemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft:15,
        paddingRight:15,
        height:50,
    },
    sessionListItem1: {
        flex: 1,
        textAlignVertical:'center'
    },
    sessionListItem2: {
        flex: 1,
        textAlign: 'right',
        color: 'red',
        textAlignVertical:'center'
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#eee'
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(Category);