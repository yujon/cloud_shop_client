import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as Request from '../utils/Request';
import {SERVER} from '../constants/common';
import {Toast} from 'antd-mobile';

import {
  CHANGE_SHOP_REQUEST,UPDATE_SHOP_REQUEST,ADD_SHOP_REQUEST,REMOVE_SHOP_REQUEST,
  GET_SHOP_LIST_REQUEST,GET_SHOP_LIST_BY_CREATED_SHOP_AND_LEVEL_REQUEST,GET_SHOP_LIST_BY_CLONED_SHOP_AND_LEVEL_REQUEST,GET_SHOP_REQUEST,
  UPDATE_CARRY_CATE_REQUEST,ADD_CARRY_CATE_REQUEST,REMOVE_CARRY_CATE_REQUEST,GET_CARRY_CATE_LIST_REQUEST,
  UPDATE_COMMODITY_CATE_REQUEST,ADD_COMMODITY_CATE_REQUEST,REMOVE_COMMODITY_CATE_REQUEST,GET_COMMODITY_CATE_LIST_REQUEST,
  CHECK_HAVE_COMMODITY_REQUEST
  } from '../constants/shop'

import * as ShopActionCreators from '../actions/shop';

export function* changeShop({callback}){
    yield store.delete('shopId');
    callback && callback()
}

// 店铺
export function* addShop({userId,shopInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      userId,
      shopInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/add','post',{},jsonStr);
    Toast.hide();
    Toast.success('创建店铺成功',2);
    yield put(ShopActionCreators.addShopSuccess(data.shopList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('创建店铺失败，请重试',2);
    yield put(ShopActionCreators.addShopFail());
  }
}

export function* getShopList({userId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/shop/getListByUserId/${userId}`,'get');
    Toast.hide();
    yield put(ShopActionCreators.getShopListSuccess(data.shopList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取已有店铺列表失败，请重试',2);
    yield put(ShopActionCreators.getShopListFail());
  }
}

export function* getAgentListByCreatedShopIdAndLevel({createdShopId,curLevel,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/shop/getAgentListByCreatedShopIdAndLevel/${createdShopId}/${curLevel}`,'get');
    Toast.hide();
    yield put(ShopActionCreators.getAgentListByCreatedShopIdAndLevelSuccess(data.agentList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取代理列表失败，请重试',2);
    yield put(ShopActionCreators.getAgentListByCreatedShopIdAndLevelFail());
  }
}

export function* getAgentListByClonedShopIdAndLevel({clonedShopId,curLevel,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/shop/getAgentListByClonedShopIdAndLevel/${clonedShopId}/${curLevel}`,'get');
    Toast.hide();
    yield put(ShopActionCreators.getAgentListByClonedShopIdAndLevelSuccess(data.agentList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取代理列表失败，请重试',2);
    yield put(ShopActionCreators.getAgentListByClonedShopIdAndLevelFail());
  }
}

export function* getShop({shopId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, `/shop/get/${shopId}`,'get');
    Toast.hide();
    yield put(ShopActionCreators.getShopSuccess(data.shopInfo));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取店铺信息失败，请重试',2);
     yield put(ShopActionCreators.getShopFail());
  }
}

export function* updateShop({shopId,shopInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      shopInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/update','post',{},jsonStr);
    Toast.hide();
    Toast.success('修改成功',2);
    yield put(ShopActionCreators.updateShopSuccess(data.shopInfo));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('修改店铺信息失败，请重试',2);
    yield put(ShopActionCreators.updateShopFail());
  }
}

export function* removeShop({shopId,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/remove','post',{},jsonStr);
    Toast.hide();
    Toast.success('删除成功',2);
    yield put(ShopActionCreators.removeShopSuccess(data.shopList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('删除失败，请重试',2);
    yield put(ShopActionCreators.removeShopFail());
  }
}

//商品种类
export function* addCommodityCate({shopId,commodityCateInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      commodityCateInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/addCommodityCate','post',{},jsonStr);
    const commodityCateList = data.commodityCateList;
    Toast.hide();
    Toast.success('添加成功',2);
    yield put(ShopActionCreators.addCommodityCateSuccess(commodityCateList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('添加失败，请重试',2);
     yield put(ShopActionCreators.addCommodityCateFail());
  }
}


export function* getCommodityCateList({shopId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/getCommodityCateList/'+shopId,'get',{});
    const commodityCateList = data.commodityCateList;
    Toast.hide();
    yield put(ShopActionCreators.getCommodityCateListSuccess(commodityCateList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取失败，请重试',2);
    yield put(ShopActionCreators.getCommodityCateListFail());
  }
}


export function* updateCommodityCate({shopId,commodityCateId,commodityCateInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      commodityCateId,
      commodityCateInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/updateCommodityCate','post',{},jsonStr);
    const commodityCateList = data.commodityCateList;
    Toast.hide();
    Toast.success('修改成功',2);
    yield put(ShopActionCreators.updateCommodityCateSuccess(commodityCateList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('修改失败，请重试',2);
    yield put(ShopActionCreators.updateCommodityCateFail());
  }
}

export function* removeCommodityCate({shopId,commodityCateId,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      commodityCateId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/removeCommodityCate','post',{},jsonStr);
    const commodityCateList = data.commodityCateList;
    Toast.hide();
    Toast.success('移除成功',2);
    yield put(ShopActionCreators.removeCommodityCateSuccess(commodityCateList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('删除失败，请重试',2);
    yield put(ShopActionCreators.removeCommodityCateFail());
  }
}

//配送设置种类
export function* addCarryCate({shopId,carryCateInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      carryCateInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/addCarryCate','post',{},jsonStr);
    const carryCateList = data.carryCateList;
    Toast.hide();
    Toast.success('添加成功',2);
    yield put(ShopActionCreators.addCarryCateSuccess(carryCateList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('添加失败，请重试',2);
    yield put(ShopActionCreators.addCarryCateFail());
  }
}


export function* getCarryCateList({shopId,callback}){
  try {
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/getCarryCateList/'+shopId,'get');
    const carryCateList = data.carryCateList;
    Toast.hide();
    yield put(ShopActionCreators.getCarryCateListSuccess(carryCateList));
    callback && callback()
  } catch (error) {
    Toast.hide();
    Toast.fail('获取失败，请重试',2);
    yield put(ShopActionCreators.getCarryCateListFail());
  }
}


export function* updateCarryCate({shopId,carryCateId,carryCateInfo,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      carryCateId,
      carryCateInfo
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/updateCarryCate','post',{},jsonStr);
    const carryCateList = data.carryCateList;
    Toast.hide();
    Toast.success('修改成功',2);
    yield put(ShopActionCreators.updateCarryCateSuccess(carryCateList));
    callback && callback()
  } catch (error) {
     Toast.hide();
     Toast.fail('修改失败，请重试',2);
     yield put(ShopActionCreators.updateCarryCateFail());
  }
}

export function* removeCarryCate({shopId,carryCateId,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      carryCateId
    });
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/removeCarryCate','post',{},jsonStr);
    const carryCateList = data.carryCateList;
    Toast.hide();
    Toast.success('移除成功',2);
    yield put(ShopActionCreators.removeCarryCateSuccess(carryCateList));
    callback && callback()
  } catch (error) {
     Toast.hide();
     Toast.fail('移除失败，请重试',2);
     yield put(ShopActionCreators.removeCarryCateFail());
  }
}


export function* checkHaveCommodity({shopId,commodityId,callback}){
  try {
    const jsonStr = JSON.stringify({
      shopId,
      commodityId
    });
    // Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/shop/checkHaveCommodity','post',{},jsonStr);
    Toast.hide();
    yield put(ShopActionCreators.checkHaveCommoditySuccess(data.shopHaveCommodity));
    callback && callback()
  } catch (error) {
     Toast.hide();
     Toast.fail('检测失败，请重试',2);
     yield put(ShopActionCreators.checkHaveCommodityFail());
  }
}



export function* watchShopRequest(getState) {

  yield takeLatest(CHANGE_SHOP_REQUEST, changeShop);
  yield takeLatest(ADD_SHOP_REQUEST, addShop);
  yield takeLatest(GET_SHOP_LIST_REQUEST, getShopList);
  yield takeLatest(GET_SHOP_LIST_BY_CREATED_SHOP_AND_LEVEL_REQUEST, getAgentListByCreatedShopIdAndLevel);
  yield takeLatest(GET_SHOP_LIST_BY_CLONED_SHOP_AND_LEVEL_REQUEST, getAgentListByClonedShopIdAndLevel);
  yield takeLatest(GET_SHOP_REQUEST, getShop);
  yield takeLatest(UPDATE_SHOP_REQUEST, updateShop);
  yield takeLatest(REMOVE_SHOP_REQUEST, removeShop);

  yield takeLatest(ADD_COMMODITY_CATE_REQUEST, addCommodityCate);
  yield takeLatest(GET_COMMODITY_CATE_LIST_REQUEST, getCommodityCateList);
  yield takeLatest(UPDATE_COMMODITY_CATE_REQUEST, updateCommodityCate);
  yield takeLatest(REMOVE_COMMODITY_CATE_REQUEST, removeCommodityCate);

  yield takeLatest(ADD_CARRY_CATE_REQUEST, addCarryCate);
  yield takeLatest(GET_CARRY_CATE_LIST_REQUEST, getCarryCateList);
  yield takeLatest(UPDATE_CARRY_CATE_REQUEST, updateCarryCate);
  yield takeLatest(REMOVE_CARRY_CATE_REQUEST, removeCarryCate);

  yield takeLatest(CHECK_HAVE_COMMODITY_REQUEST, checkHaveCommodity);
}