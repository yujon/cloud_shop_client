import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import store from 'react-native-simple-store';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {GET_CATEGORY_LIST_REQUEST} from '../constants/category';
import * as CategoryrActionCreators from '../actions/category';


export function* getCategoryList({pid,empryListCallback}){
  try {
    Toast.loading('Loading...',0);
    const {code,data} = yield call(Request.request, '/category/getListByPid/'+ pid,'get',{});
    //缓存顶级类目
    if(pid === 0){
      yield store.save('categoryList',data.categoryList);
    }
    Toast.hide();
    if(code == 0){  //获取到子列表
      yield put(CategoryrActionCreators.getCategoryListSuccess(data.categoryList));
    }else if(code == 1){
      empryListCallback && empryListCallback();
    }
  } catch (error) {
    Toast.hide();
    Toast.success('获取失败，请重试',2);
    yield put(CategoryrActionCreators.getCategoryListFail());
  }
}

export function* watchCategoryRequest(getState) {
  yield takeLatest(GET_CATEGORY_LIST_REQUEST, getCategoryList);
}