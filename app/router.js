import React from 'react';
import { StackNavigator, TabNavigator,DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

// login
import SplashContainer from './containers/login/Splash';
import LoginNavContainer from './containers/login/LoginNav';
import LoginInContainer from './containers/login/LoginIn';
import LoginUpContainer from './containers/login/LoginUp';
import LoginUpPasswordContainer from './containers/login/LoginUpPassword';


// shop tab
import ShopNavContainer from './containers/shop/ShopNav';
import ShopContainer from './containers/shop/Shop';
import ShopDisplayContainer from './containers/shop/ShopDisplay';
import ShopInfoContainer from './containers/shop/ShopInfo';
import ShopInfoEditContainer from './containers/shop/ShopInfoEdit';
import CommodityCateContainer from './containers/shop/CommodityCate';
import CarryCateContainer from './containers/shop/CarryCate';
import CategoryPickerContainer from './containers/shop/CategoryPicker';
import CommodityContainer from './containers/shop/Commodity';
import CommodityEditContainer from './containers/shop/CommodityEdit';
import CommodityAddContainer from './containers/shop/CommodityAdd';
import CommodityDisplayContainer from './containers/shop/CommodityDisplay';
import OrderContainer from './containers/shop/Order';
import AgentContainer from './containers/shop/Agent';
import IncomeContainer from './containers/shop/Income';
import DecorationContainer from './containers/shop/Decoration';
import MaterialCenterContainer from './containers/shop/MaterialCenter';

//market tab
import MarketContainer from './containers/market/Market';

//message tab
import ChatContainer from './containers/message/Chat';
import InformationContainer from './containers/message/Information';

//my tab
import UserInfoEditContainer from './containers/my/UserInfoEdit';
import UserInfoContainer from './containers/my/UserInfo';
import DrawerContentContainer from './containers/my/DrawerContent';


//error
import ReloadContainer from './containers/other/Reload';


const MessageTab = TabNavigator(
  {
    Chat: { 
      screen: ChatContainer,
      navigationOptions: {  
        tabBarLabel: '聊天'
      } 
    },
    Information: { 
      screen: InformationContainer,
      navigationOptions: {  
        tabBarLabel: '通知'
      }
    }
  },
  {
    lazy: true,
    tabBarPosition: 'top',
    swipeEnabled:true,
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: '#999999',
      showIcon: false,
      style: {
        backgroundColor: '#fff'
      },
      tabStyle: {
        padding: 0,
      },
      indicatorStyle: {
        opacity: 0,
        height:0
      },
      labelStyle: {  
        fontSize: 14,  
        paddingVertical: 3, 
        borderBottomWidth:1,
        borderBottomColor:'red'
      }
    }
  }
);

const MyDrawer = DrawerNavigator({
    UserInfo: {
        screen: UserInfoContainer
    }
},{
    drawerWidth: 250, 
    drawerPosition: 'right',
    contentOptions: {
      initialRouteName: 'UserInfo', // 默认页面组件
      labelStyle : {//标签样式
           height : 30,
      },
      activeTintColor: 'white',  // 选中文字颜色
      activeBackgroundColor: '#ff8500', // 选中背景颜色
      inactiveTintColor: '#666',  // 未选中文字颜色
      inactiveBackgroundColor: '#fff', // 未选中背景颜色
      style: {  // 样式
         marginVertical: 0,
      },
   },
   contentComponent: (attrs) => {
        return (
            <DrawerContentContainer attrs={attrs}></DrawerContentContainer>
        )
    },
});


const HomeTab = TabNavigator(
  {
    Shop: { 
      screen: ShopContainer,
      navigationOptions: {  
        tabBarLabel: '店铺',  
        tabBarIcon: ({ tintColor, focused }) => (  
             <Icon
              name="home"
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={0.8}
              size={25}
              style={{color:tintColor}}
            />
        ) 
      } 
    },
    Market: { 
      screen: MarketContainer,
      navigationOptions: {  
        tabBarLabel: '货源',  
        tabBarIcon: ({ tintColor, focused }) => (  
             <Icon
              name="codepen"
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={0.8}
              size={25}
              style={{color:tintColor}}
            />
        ) 
      }
    },
    Message: { 
      screen: MessageTab,
      navigationOptions: {  
        tabBarLabel: '消息',  
        tabBarIcon: ({ tintColor, focused }) => (  
             <Icon
              name="comment"
              backgroundColor="transparent"
              underlayColor="transparent"
              activeOpacity={0.8}
              size={25}
              style={{color:tintColor}}
            />
        ) 
      }  
    },
    My: { 
      screen: MyDrawer,
      navigationOptions: {  
        tabBarLabel: '我',  
        tabBarIcon: ({ tintColor, focused }) => (  
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
    }
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled:true,
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: '#999999',
      showIcon: true,
      style: {
        backgroundColor: '#fff',
      },
      indicatorStyle: {
        opacity: 0
      },
      labelStyle: {  
        fontSize: 14,  
        paddingVertical: 0, 
      },  
      iconStyle: {  
    
      },  
      tabStyle: {
        padding: 0,
      }
    }
  }
);


const Router = StackNavigator(
  {
    Splash: { screen: SplashContainer },
    LoginNav: {
      screen: LoginNavContainer,
      navigationOptions: {
      }
    },
    LoginIn: {
      screen: LoginInContainer,
      navigationOptions: {
      }
    },
    LoginUp: {
      screen: LoginUpContainer,
      navigationOptions: {
      }
    },
    LoginUpPassword: {
      screen: LoginUpPasswordContainer,
      navigationOptions: {
      }
    },
    ShopNav: {
      screen: ShopNavContainer,
      navigationOptions: {
      }
    },
    // tabs 
    Main: {
      screen: HomeTab,
      navigationOptions: {
      }
    },
    //shopTab
    ShopInfo:{
      screen: ShopInfoContainer,
    },
    ShopInfoEdit:{
      screen: ShopInfoEditContainer,
    },
    ShopDisplay:{
        screen: ShopDisplayContainer,
    },
    CarryCate: {
      screen: CarryCateContainer,
      navigationOptions: {
      }
    },
    CommodityCate: {
      screen: CommodityCateContainer,
      navigationOptions: {
      }
    },
    CategoryPicker: {
      screen: CategoryPickerContainer,
      navigationOptions: {
      }
    },
    Commodity: {
      screen: CommodityContainer,
      navigationOptions: {
      }
    },
    CommodityAdd: {
      screen: CommodityAddContainer,
      navigationOptions: {
      }
    },
    CommodityEdit: {
      screen: CommodityEditContainer,
      navigationOptions: {
      }
    },
    CommodityDisplay: { 
      screen: CommodityDisplayContainer,
      navigationOptions: {
      }
    },
    Order: {
      screen: OrderContainer,
      navigationOptions: {
      }
    },
    Agent: {
      screen: AgentContainer,
      navigationOptions: {
      }
    },
    Income: {
      screen: IncomeContainer,
      navigationOptions: {
      }
    },
    Decoration: {
      screen: DecorationContainer,
      navigationOptions: {
      }
    },
    MaterialCenter: {
      screen: MaterialCenterContainer,
      navigationOptions: {
      }
    },
    //my tab
    UserInfoEdit:{
      screen: UserInfoEditContainer,
    },
    Reload:{
      screen: ReloadContainer,
      navigationOptions: {
      }
    }
  },
  {
    initialRouteName:'Splash',
    headerMode: 'screen',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'red',
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20,
      },
      headerTintColor: '#fff'
    }
  }
);


export default Router;
