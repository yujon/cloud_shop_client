import *  as Wechat from 'react-native-wechat';
import {Toast} from 'antd-mobile';

export const shareToSession = function(info) {
  Wechat.isWXAppInstalled().then((isInstalled) => {
    if (isInstalled) {
      Wechat.shareToSession(info).catch((error) => {
        Toast.info(error.message, 2);
      });
    } else {
      Toast.info('没有安装微信软件，请您安装微信之后再试', 3);
    }
  });
}

export const shareToTimeline = function(info) {
  Wechat.isWXAppInstalled().then((isInstalled) => {
    if (isInstalled) {
      Wechat.shareToTimeline(info).catch((error) => {
        Toast.info(error.message, 2);
      });
    } else {
      Toast.info('没有安装微信软件，请您安装微信之后再试', 3);
    }
  });
}

export const registerApp = function(appId) {
  Wechat.registerApp(appId);
}