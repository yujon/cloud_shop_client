import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_COMMODITY_REQUEST,GET_COMMODITY_LIST_BY_CATEGORY_REQUEST,GET_COMMODITY_LIST_REQUEST,ADD_COMMODITY_REQUEST,CLONE_COMMODITY_REQUEST,
  UPDATE_COMMODITY_REQUEST,REMOVE_COMMODITY_REQUEST} from '../constants/commodity'
import * as CommodityrActionCreators from '../actions/commodity';


export function* getCommodityList({shopId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/getListByShopId/'+ shopId,'get',{});
    Toast.hide();
    yield put(CommodityrActionCreators.getCommodityListSuccess(data.commodityList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取商品失败，请重试',2);
    yield put(CommodityrActionCreators.getCommodityListFail());
  }
}

export function* getCommodityListByCategoryId({categoryId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/getListByCategoryId/'+ categoryId,'get',{});
    Toast.hide();
    yield put(CommodityrActionCreators.getCommodityListByCategoryIdSuccess(data.categoryCommodityList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取商品失败，请重试',2);
    yield put(CommodityrActionCreators.getCommodityListByCategoryIdFail());
  }
}


export function* getCommodity({shopId,commodityId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/commodity/get/${shopId}/${commodityId}`,'get',{});
    const commodityInfo = data.commodityInfo;
    Toast.hide();
    yield put(CommodityrActionCreators.getCommoditySuccess(commodityInfo));
    callback && callback();
  } catch (error) {
    Toast.hide();
    Toast.fail('获取商品失败，请重试',2);
    yield put(CommodityrActionCreators.getCommodityFail());
  }
}

export function* addCommodity({shopId,commodityInfo,shopCommodityInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      commodityInfo,
      shopCommodityInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/create','post',{},jsonStr);
    Toast.hide();
    Toast.success('添加成功',2);
    yield put(CommodityrActionCreators.addCommoditySuccess(data.commodityList));
    callback && callback();
  } catch (error) { 
    Toast.hide();
    Toast.fail('添加商品失败，请重试',2);
    yield put(CommodityrActionCreators.addCommodityFail());
   
  }
}


export function* cloneCommodity({myShopId,shopId,commodityId,callback}){
  try {
    const jsonStr = JSON.stringify({
      myShopId,
      shopId,
      commodityId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/clone','post',{},jsonStr);
    Toast.hide();
    Toast.success('代理成功',2);
    yield put(CommodityrActionCreators.cloneCommoditySuccess(data.commodityList));
    callback && callback();
  } catch (error) { 
    Toast.hide();
    Toast.fail('代理商品失败，请重试',2);
    yield put(CommodityrActionCreators.cloneCommodityFail());
   
  }
}

export function* updateCommodity({isCreator,shopId,commodityId,commodityInfo,shopCommodityInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      isCreator,
      shopId,
      commodityId,
      commodityInfo,
      shopCommodityInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/update','post',{},jsonStr);
    Toast.hide();
    Toast.success('更新成功',2);
    yield put(CommodityrActionCreators.updateCommoditySuccess(data.commodityList));
    callback && callback();
  } catch (error) {
    Toast.hide();
    Toast.fail('修改商品信息失败，请重试',2);
    yield put(CommodityrActionCreators.updateCommodityFail());
  }
}

export function* removeCommodity({isCreator,shopId,commodityId,callback}){
  try {
    const jsonStr = JSON.stringify({
      isCreator,
      shopId,
      commodityId,
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/commodity/remove','post',{},jsonStr);
    Toast.hide();
    Toast.success('移除成功',2);
    yield put(CommodityrActionCreators.removeCommoditySuccess(data.commodityList));
    callback && callback();
  } catch (error) {
    Toast.hide();
    Toast.fail('移除商品失败，请重试',2);
    yield put(CommodityrActionCreators.removeCommodityFail());
  }
}


export function* watchCommodityRequest(getState) {
  yield takeLatest(GET_COMMODITY_LIST_REQUEST, getCommodityList);
  yield takeLatest(GET_COMMODITY_LIST_BY_CATEGORY_REQUEST, getCommodityListByCategoryId);
  yield takeLatest(GET_COMMODITY_REQUEST, getCommodity);
  yield takeLatest(ADD_COMMODITY_REQUEST, addCommodity);
  yield takeLatest(CLONE_COMMODITY_REQUEST, cloneCommodity);
  yield takeLatest(UPDATE_COMMODITY_REQUEST, updateCommodity);
  yield takeLatest(REMOVE_COMMODITY_REQUEST, removeCommodity);
}