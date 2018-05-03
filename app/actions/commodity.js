import * as commodityConf from '../constants/commodity';
// 获取商品
export function getCommodityList(shopId,callback){
	return {
		type:commodityConf.GET_COMMODITY_LIST_REQUEST,
		shopId,
		callback,
		payload:{
			getCommodityListStatus:'doing'
		}
	}
}

export function getCommodityListSuccess(commodityList){
	return {
		type:commodityConf.GET_COMMODITY_LIST_SUCCESS,
		payload:{
			getCommodityListStatus:'success',
			commodityList
		}
	}
}

export function getCommodityListFail(){
	return {
		type:commodityConf.GET_COMMODITY_LIST_FAIL,
		payload:{
			getCommodityListStatus:'fail'
		}
	}
}

// 获取某个品牌类下的商品(在售的)
export function getCommodityListByCategoryId(categoryId,callback){
	return {
		type:commodityConf.GET_COMMODITY_LIST_BY_CATEGORY_REQUEST,
		categoryId,
		callback,
		payload:{
			getCommodityListByCategoryIdStatus:'doing'
		}
	}
}

export function getCommodityListByCategoryIdSuccess(categoryCommodityList){
	return {
		type:commodityConf.GET_COMMODITY_LIST_BY_CATEGORY_SUCCESS,
		payload:{
			getCommodityListByCategoryIdStatus:'success',
			categoryCommodityList
		}
	}
}

export function getCommodityListByCategoryIdFail(){
	return {
		type:commodityConf.GET_COMMODITY_LIST_BY_CATEGORY_FAIL,
		payload:{
			getCommodityListByCategoryIdStatus:'fail'
		}
	}
}

export function get(shopId,commodityId,callback){
	return {
		type:commodityConf.GET_COMMODITY_REQUEST,
		shopId,
		commodityId,
		callback,
		payload:{
			getCommodityStatus:'doing'
		}
	}
}

export function gettSuccess(commodityInfo){
	return {
		type:commodityConf.GET_COMMODITY_SUCCESS,
		payload:{
			getCommodityStatus:'success',
			commodity:commodityInfo
		}
	}
}


export function getListFail(){
	return {
		type:commodityConf.GET_COMMODITY_FAIL,
		payload:{
			getCommodityStatus:'fail'
		}
	}
}

// 添加商品
export function addCommodity(shopId,commodityInfo,shopCommodityInfo,callback){
	return {
		type:commodityConf.ADD_COMMODITY_REQUEST,
		shopId,
		commodityInfo,
		shopCommodityInfo,
		callback,
		payload:{
			addCommodityStatus:'doing'
		}
	}
}

export function addCommoditySuccess(commodityList){
	return {
		type:commodityConf.ADD_COMMODITY_SUCCESS,
		payload:{
			addCommodityStatus:'success',
			commodityList
		}
	}
}

export function addCommodityFail(){
	return {
		type:commodityConf.ADD_COMMODITY_FAIL,
		payload:{
			addCommodityStatus:'fail'
		}
	}
}

// 代理商品
export function cloneCommodity(myShopId,shopId,commodityId,callback){
	return {
		type:commodityConf.CLONE_COMMODITY_REQUEST,
		myShopId,
		shopId,
		commodityId,
		callback,
		payload:{
			cloneCommodityStatus:'doing'
		}
	}
}

export function cloneCommoditySuccess(commodityList){
	return {
		type:commodityConf.CLONE_COMMODITY_SUCCESS,
		payload:{
			cloneCommodityStatus:'success',
			commodityList
		}
	}
}

export function cloneCommodityFail(){
	return {
		type:commodityConf.CLONE_COMMODITY_FAIL,
		payload:{
			cloneCommodityStatus:'fail'
		}
	}
}

//编辑商品
export function updateCommodity(isCreator,shopId,commodityId,commodityInfo,shopCommodityInfo,callback){
	return {
		type:commodityConf.UPDATE_COMMODITY_REQUEST,
		isCreator,
		shopId,
		commodityId,
		commodityInfo,
		shopCommodityInfo,
		callback,
		payload:{
			updateCommodityStatus:'doing'
		}
	}
}

export function updateCommoditySuccess(commodityList){
	return {
		type:commodityConf.UPDATE_COMMODITY_SUCCESS,
		payload:{
			updateCommodityStatus:'success',
			commodityList
		}
	}
}

export function updateCommodityFail(){
	return {
		type:commodityConf.UPDATE_COMMODITY_FAIL,
		payload:{
			updateCommodityStatus:'fail'
		}
	}
}

//删除商品
export function removeCommodity(isCreator,shopId,commodityId,callback){
	return {
		type:commodityConf.REMOVE_COMMODITY_REQUEST,
		isCreator,
		shopId,
		commodityId,
		callback,
		payload:{
			removeCommodityStatus:'doing'
		}
	}
}

export function removeCommoditySuccess(commodityList){
	return {
		type:commodityConf.REMOVE_COMMODITY_SUCCESS, 
		payload:{
			removeCommodityStatus:'success',
			commodityList
		}
	}
}

export function removeCommodityFail(){
	return {
		type:commodityConf.REMOVE_COMMODITY_FAIL,
		payload:{
			removeCommodityStatus:'fail'
		}
	}
}