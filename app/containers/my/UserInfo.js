import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {StyleSheet,View,Text,Image,ScrollView,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDate} from '../../utils/Format';

import {SERVER} from '../../constants/common';

const userInfoSetting = [
      {
        name:'店长头像',
        enName:'img'
      },
      {
        name:'昵称',
        enName:'name',
      },
      {
        name:'性别',
        enName:'sex',
      },
      {
        name:'生日',
        enName:'birthday',
      },
      {
        name:'微信',
        enName:'wx',
      },
      {
        name:'QQ',
        enName:'qq',
      },
    ]
class UserInfo extends React.Component {
  static navigationOptions = ({navigation})=>{
    const params = navigation.state.params || {};
    return {
      headerTitle: "店长信息",
      headerLeft:null,
      headerRight: (
          <TouchableOpacity onPress={params.showDrawer} activeOpacity={0.5} focusedOpacity={0.7}>
          <View >
            <Icon
                    name="cog"
                    size={20}
                    color="#fff"
                    backgroundColor="transparent"
                    style={{marginRight:20}}
                  />
          </View>
        </TouchableOpacity>
      ),
      drawerLabel: '店长信息',
      drawerIcon: ({ tintColor }) => (
        <Icon
          name="user"
          backgroundColor="transparent"
          underlayColor="transparent"
          activeOpacity={0.8}
          size={25}
          style={{color:tintColor}}
        />
      )
    }
  };

  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.navigation.setParams({ showDrawer: this.showDrawer});
  }

  showDrawer = () =>{
     this.props.navigation.navigate('DrawerOpen');
  }

  render() {
    const {userInfo} = this.props;
    return (
        <ScrollView style={styles.container}>
            <View  style={styles.userInfo}>
              {
                userInfoSetting.map((item,index) => {
                  return (
                      <View style={styles.userInfoLine} key={index}>
                         <Text style={styles.userInfoName}>{item.name}</Text>
                         <View style={styles.rightView}>
                           <Image source={{uri:SERVER+userInfo['img']}} style={[styles.img,{display:item.enName=='img'?'flex':'none'}]}/>
                           <Text  style={[styles.text,{display:item.enName=='img'?'none':'flex'}]}>{ userInfo[item.enName] == undefined?'未填写':userInfo[item.enName]}</Text>
                         </View>
                      </View>
                  )
                })
              }
            </View>
        </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const userInfo = state.user.userInfo ||  {};
  const {birthday} = userInfo;
  userInfo['birthday'] = getDate(birthday);
  return {
    userInfo
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
    flex:1,
    backgroundColor:'#eee'
  },
  headInfo:{
    marginTop:5,
    marginBottom:5,
    marginLeft:10,
  },
  headInfoText:{
    fontSize:18,
  },
  userInfo:{
    marginTop:10,
    marginBottom:20
  },
  userInfoLine:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:60,
    backgroundColor:'#fff',
    marginBottom:1,
  },
  userInfoName:{
    fontSize:15
  },
  rightView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  img:{
    width:40,
    height:40,
  },
  text:{
     marginRight:10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);