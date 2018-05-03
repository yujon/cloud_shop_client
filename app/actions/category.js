import * as categoryConf from '../constants/category';
// 获取商品类目列表
export function getCategoryList(pid,empryListCallback){
	return {
		type:categoryConf.GET_CATEGORY_LIST_REQUEST,
		pid,
		empryListCallback,
		payload:{
			getCategoryListStatus:'doing'
		}
	}
}

export function getCategoryListSuccess(categoryList){
	return {
		type:categoryConf.GET_CATEGORY_LIST_SUCCESS,
		payload:{
			getCategoryListStatus:'success',
			categoryList:categoryList
		}
	}
}

export function getCategoryListFail(){
	return {
		type:categoryConf.GET_CATEGORY_LIST_FAIL,
		payload:{
			getCategoryListStatus:'fail'
		}
	}
}



