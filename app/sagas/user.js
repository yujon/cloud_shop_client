import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as Request from '../utils/Request';
import {SERVER} from '../constants/common';
import {Toast} from 'antd-mobile';

import {
  LOGIN_IN_REQUEST,LOGIN_OUT_REQUEST,LOGIN_UP_REQUEST,
  UPDATE_USER_REQUEST,GET_USER_REQUEST,REMOVE_USER_REQUEST
  } from '../constants/user'

import * as UserActionCreators from '../actions/user';

export function* loginUp({phoneCode,phoneNumber,password,callback}){
  try {
    const jsonStr = JSON.stringify({
      phoneCode:phoneCode,
      phoneNumber:phoneNumber,
      password:password
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/loginUp','post',{},jsonStr);
    Toast.hide();
    Toast.success('注册成功',2);
    yield put(UserActionCreators.loginUpSuccess());
    callback && callback();
  } catch (error) {
    Toast.hide();
    Toast.fail('注册失败，请重试',2);
    yield put(UserActionCreators.loginUpFail());
  }
}

export function* loginIn({phoneCode,phoneNumber,password,callback}){
  try {
    const jsonStr = JSON.stringify({
      phoneCode:phoneCode,
      phoneNumber:phoneNumber,
      password:password
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/user/loginIn','post',{},jsonStr);
    try {
      yield store.save('userId',data.userInfo._id);
      Toast.hide();
      Toast.success('登录成功',2);
      yield put(UserActionCreators.loginInSuccess(data.userInfo));
      callback && callback();
    }catch(error){
      Toast.hide();
      Toast.fail('登录失败',2);
      yield put(UserActionCreators.loginInFail());
    }
  } catch (error) {
    Toast.hide();
    Toast.fail('手机号或密码错误，请重试',2);
    yield put(UserActionCreators.loginInFail());
  }
}

export function* loginOut({userId,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId
    });
    Toast.loading('Loading...',0);
    yield call(Request.request, '/user/loginOut','post',{},jsonStr);
    try {
      yield store.delete('userId');
      yield store.delete('shopId');
      Toast.hide();
      Toast.success('成功退出登录',2);
      callback && callback();
    }catch(error){
      Toast.hide();
      Toast.fail('退出登录失败',2);
    }
  } catch (error) {
    Toast.hide();
    Toast.fail('退出登录失败',2);
  }
}

export function* getUser({userId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/user/get/${userId}`,'get');
    const userInfo = data.userInfo;
    Toast.hide();
    yield put(UserActionCreators.getUserSuccess(userInfo));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取用户信息失败，请重试',2);
     yield put(UserActionCreators.getUserFail());
  }
}


export function* updateUser({userId,userInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      userInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, "/user/update",'post',{},jsonStr);
    userInfo = data.userInfo.userInfo;
    Toast.hide();
    yield put(UserActionCreators.updateUserSuccess(userInfo));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('修改失败，请重试',2);
    yield put(UserActionCreators.updateUserFail());
  }
}

export function* removeUser({userId,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, "/user/remove",'post',{},jsonStr);
    yield store.remove('userId');
    Toast.hide();
    Toast.success('成功注销',2);
    yield put(UserActionCreators.removeUserSuccess());
    callback && callback();
  } catch (error) {
    Toast.hide();
    Toast.fail('注销失败，请重试',2);
     yield put(UserActionCreators.removeUserFail());
  }
}



export function* watchUserRequest(getState) {
  yield takeLatest(LOGIN_UP_REQUEST, loginUp);
  yield takeLatest(LOGIN_IN_REQUEST, loginIn);
  yield takeLatest(LOGIN_OUT_REQUEST, loginOut);

  yield takeLatest(GET_USER_REQUEST, getUser);
  yield takeLatest(UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(REMOVE_USER_REQUEST, removeUser);

}