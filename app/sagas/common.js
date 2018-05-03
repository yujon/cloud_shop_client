import { put, take,takeLatest, call, fork } from 'redux-saga/effects';
import * as Request from '../utils/Request';
import {Toast} from 'antd-mobile';

import {UPLOAD_FILE_REQUEST} from '../constants/common'
import * as CommonActionCreators from '../actions/common';

export function* uploadFile({file,fileName,callback}){
  try {
    let json = new FormData();
    json.append('myfile', {
        uri: file,
        type: 'image/jpeg',
        name:fileName
    });
    console.log({
        uri: file,
        type: 'image/jpeg',
        name:fileName
    })
    Toast.loading('Loading...',0);
    const {data} = yield call(Request.request, '/upload/uploadFile','post',{'Content-Type':'multipart/form-data'},json);
    Toast.hide();
    Toast.success('上传成功',2);
    yield put(CommonActionCreators.uploadFileSuccess());
    callback && callback(data.tmpImg);
    
  } catch (error) {
    Toast.hide();
    Toast.fail('上传失败，请重试',2);
    yield put(CommonActionCreators.uploadFileFail());
  }
}


export function* watchCommonRequest(getState) {
  yield takeLatest(UPLOAD_FILE_REQUEST, uploadFile);
}