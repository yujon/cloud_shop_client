import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_ORDER_LIST_BY_CLONED_SHOP_AND_STATUS_REQUEST,GET_ORDER_LIST_BY_CREATED_SHOP_AND_STATUS_REQUEST,HAVE_SEND_COMMODITY_REQUEST} from '../constants/order';
import * as OrderActionCreators from '../actions/order';


export function* getOrderListByClonedShopIdAndStatus({clonedShopId,status}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/order/getListByClonedShopIdAndStatus/${clonedShopId}/${status}`,'get',{});
    Toast.hide();
    yield put(OrderActionCreators.getOrderListByClonedShopIdAndStatusSuccess(data.orderList));
  } catch (error) {
    Toast.hide();
    Toast.success('获取失败，请重试',2);
    yield put(OrderActionCreators.getOrderListByClonedShopIdAndStatusFail());
  }
}

export function* getOrderListByCreatedShopIdAndStatus({createdShopId,status}){
  try {
    Toast.loading('Loading...',0);
    const {code,data} = yield call(Request.request, `/order/getListByCreatedShopIdAndStatus/${createdShopId}/${status}`,'get',{});
    Toast.hide();
    yield put(OrderActionCreators.getOrderListByCreatedShopIdAndStatusSuccess(data.orderList));
  } catch (error) {
    Toast.hide();
    Toast.success('获取失败，请重试',2);
    yield put(OrderActionCreators.getOrderListByCreatedShopIdAndStatusFail());
  }
}


export function* haveSendCommodity({orderId,courierType,courierNumber,callback}){
  try {
    const jsonStr = JSON.stringify({
      orderId,
      courierType,
      courierNumber
    });
    Toast.loading('Loading...',0);
    const {code,data} = yield call(Request.request, '/order/hadSendCommodity','post',{},jsonStr);
    Toast.hide();
    yield put(OrderActionCreators.haveSendCommoditySuccess(data.orderList));
    callback && callback();
  } catch (error) {
    Toast.hide();
    Toast.success('发货失败失败，请重试',2);
    yield put(OrderActionCreators.haveSendCommodityFail());
  }
}


export function* watchOrderRequest(getState) {
  yield takeLatest(GET_ORDER_LIST_BY_CLONED_SHOP_AND_STATUS_REQUEST, getOrderListByClonedShopIdAndStatus);
  yield takeLatest(GET_ORDER_LIST_BY_CREATED_SHOP_AND_STATUS_REQUEST, getOrderListByCreatedShopIdAndStatus);
  yield takeLatest(HAVE_SEND_COMMODITY_REQUEST, haveSendCommodity);
}