import * as shopConf from '../constants/shop';

// 切换店铺
export function changeShop(callback){
	return {
		type:shopConf.CHANGE_SHOP_REQUEST,
		callback,
		payload:{
		}
	}
}

// 获取店铺列表
export function getShopList(userId,callback){
	return {
		type:shopConf.GET_SHOP_LIST_REQUEST,
		userId,
		callback,
		payload:{
			getShopListStatus:'doing'
		}
	}
}

export function getShopListSuccess(shopList){
	return {
		type:shopConf.GET_SHOP_LIST_SUCCESS,
		payload:{
			getShopListStatus:'success',
			shopList
		}
	}
}

export function getShopListFail(){
	return {
		type:shopConf.GET_SHOP_LIST_FAIL,
		payload:{
			getShopListStatus:'fail'
		}
	}
}

// 获取供应商的代理商列表（树转为列表）
export function getAgentListByCreatedShopIdAndLevel(createdShopId,curLevel,callback){
	return {
		type:shopConf.GET_SHOP_LIST_BY_CREATED_SHOP_AND_LEVEL_REQUEST,
		createdShopId,
		curLevel,
		callback,
		payload:{
			getAgentListByCreatedShopIdAndLevelStatus:'doing'
		}
	}
}

export function getAgentListByCreatedShopIdAndLevelSuccess(agentList){
	return {
		type:shopConf.GET_SHOP_LIST_BY_CREATED_SHOP_AND_LEVEL_SUCCESS,
		payload:{
			getAgentListByCreatedShopIdAndLevelStatus:'success',
			agentList
		}
	}
}

export function getAgentListByCreatedShopIdAndLevelFail(){
	return {
		type:shopConf.GET_SHOP_LIST_BY_CREATED_SHOP_AND_LEVEL_FAIL,
		payload:{
			getAgentListByCreatedShopIdAndLevelStatus:'fail'
		}
	}
}

// 获取代理商商的下俩级代理列表（树转为列表）
export function getAgentListByClonedShopIdAndLevel(clonedShopId,curLevel,callback){
	return {
		type:shopConf.GET_SHOP_LIST_BY_CLONED_SHOP_AND_LEVEL_REQUEST,
		clonedShopId,
		curLevel,
		callback,
		payload:{
			getAgentListByClonedShopIdAndLevelStatus:'doing'
		}
	}
}

export function getAgentListByClonedShopIdAndLevelSuccess(agentList){
	return {
		type:shopConf.GET_SHOP_LIST_BY_CLONED_SHOP_AND_LEVEL_SUCCESS,
		payload:{
			getAgentListByClonedShopIdAndLevelStatus:'success',
			agentList
		}
	}
}

export function getAgentListByClonedShopIdAndLevelFail(){
	return {
		type:shopConf.GET_SHOP_LIST_BY_CLONED_SHOP_AND_LEVEL_FAIL,
		payload:{
			getAgentListByClonedShopIdAndLevelStatus:'fail'
		}
	}
}



// 获取
export function getShop(shopId,callback){
	return {
		type:shopConf.GET_SHOP_REQUEST,
		shopId,
		callback,
		payload:{
		}
	}
}

export function getShopSuccess(shopInfo){
	return {
		type:shopConf.GET_SHOP_SUCCESS,
		payload:{
			shopInfo
		}
	}
}


export function getShopFail(){
	return {
		type:shopConf.GET_SHOP_FAIL,
	}
}




// 添加店铺
export function addShop(userId,shopInfo,callback){
	return {
		type:shopConf.ADD_SHOP_REQUEST,
		userId,
		shopInfo,
		callback,
		payload:{
			addShopStatus:'doing'
		}
	}
}

export function addShopSuccess(shopList){
	return {
		type:shopConf.ADD_SHOP_SUCCESS,
		payload:{
			addShopStatus:'success',
			shopList
		}
	}
}

export function addShopFail(){
	return {
		type:shopConf.ADD_SHOP_FAIL,
		payload:{
			addShopStatus:'fail'
		}
	}
}


// 编辑店铺信息
export function updateShop(shopId,shopInfo,callback){
	return {
		type:shopConf.UPDATE_SHOP_REQUEST,
		shopId,
		shopInfo,
		callback,
		payload:{
			updateShopStatus:'doing'
		}
	}
}

export function updateShopSuccess(shopInfo){
	return {
		type:shopConf.UPDATE_SHOP_SUCCESS,
		payload:{
			updateShopStatus:'success',
			shopInfo
		}
	}
}

export function updateShopFail(){
	return {
		type:shopConf.UPDATE_SHOP_FAIL,
		payload:{
			updateShopStatus:'fail'
		}
	}
}

// 删除商店
export function removeShop(shopId,callback){
	return {
		type:shopConf.REMOVE_SHOP_REQUEST,
		shopId,
		callback,
		payload:{
			removeShopStatus:'doing'
		}
	}
}

export function removeShopSuccess(shopInfo){
	return {
		type:shopConf.REMOVE_SHOP_SUCCESS,
		payload:{
			removeShopStatus:'success',
			shopInfo
		}
	}
}

export function removeShopFail(){
	return {
		type:shopConf.REMOVE_SHOP_FAIL,
		payload:{
			removeShopStatus:'fail'
		}
	}
}


//添加配送设置种类
export function addCarryCate(shopId,carryCateInfo,callback){
    return {
		type:shopConf.ADD_CARRY_CATE_REQUEST,
		shopId,
		carryCateInfo,
		callback,
		payload:{
			addCarryCateStatus:'doing',
		}
	}
}
export function addCarryCateSuccess(carryCateList){
	return {
		type:shopConf.ADD_CARRY_CATE_SUCCESS,
		payload:{
			addCarryCateStatus:'success',
			carryCateList
		}
	}
}
export function addCarryCateFail(){
	return {
		type:shopConf.ADD_CARRY_CATE_FAIL,
		payload:{
			addCarryCateStatus:'fail',
		}
	}
}

//获取配送设置种类
export function getCarryCateList(shopId,callback){
    return {
		type:shopConf.GET_CARRY_CATE_LIST_REQUEST,
		shopId,
		callback,
		payload:{
			getCarryCateListStatus:'doing',
		}
	}
}
export function getCarryCateListSuccess(carryCateList){
	return {
		type:shopConf.GET_CARRY_CATE_LIST_SUCCESS,
		payload:{
			getCarryCateListStatus:'success',
			carryCateList
		}
	}
}
export function getCarryCateListFail(){
	return {
		type:shopConf.GET_CARRY_CATE_LIST_FAIL,
		payload:{
			getCarryCateListStatus:'Fail',
		}
	}
}

//更新配送设置种类
export function updateCarryCate(shopId,carryCateId,carryCateInfo,callback){
    return {
		type:shopConf.UPDATE_CARRY_CATE_REQUEST,
		shopId,
		carryCateId,
		carryCateInfo,
		callback,
		payload:{
			updateCarryCateStatus:'doing',
		}
	}
}
export function updateCarryCateSuccess(carryCateList){
	return {
		type:shopConf.UPDATE_CARRY_CATE_SUCCESS,
		payload:{
			updateCarryCateStatus:'success',
			carryCateList
		}
	}
}
export function updateCarryCateFail(){
	return {
		type:shopConf.UPDATE_CARRY_CATE_FAIL,
		payload:{
			updateCarryCateStatus:'fail',
		}
	}
}

//删除配送设置种类
export function removeCarryCate(shopId,carryCateId,callback){
    return {
		type:shopConf.REMOVE_CARRY_CATE_REQUEST,
		shopId,
		carryCateId,
		callback,
		payload:{
			removeCarryCateStatus:'doing',
		}
	}
}
export function removeCarryCateSuccess(carryCateList){
	return {
		type:shopConf.REMOVE_CARRY_CATE_SUCCESS,
		payload:{
			removeCarryCateStatus:'success',
			carryCateList
		}
	}
}
export function removeCarryCateFail(){
	return {
		type:shopConf.REMOVE_CARRY_CATE_FAIL,
		payload:{
			removeCarryCateStatus:'fail',
		}
	}
}

//添加商品种类
export function addCommodityCate(shopId,commodityCateInfo,callback){
    return {
		type:shopConf.ADD_COMMODITY_CATE_REQUEST,
		shopId,
		commodityCateInfo,
		callback,
		payload:{
			addCommodityCateStatus:'doing',
		}
	}
}
export function addCommodityCateSuccess(commodityCateList){
	return {
		type:shopConf.ADD_COMMODITY_CATE_SUCCESS,
		payload:{
			addCommodityCateStatus:'success',
			commodityCateList
		}
	}
}
export function addCommodityCateFail(){
	return {
		type:shopConf.ADD_COMMODITY_CATE_FAIL,
		payload:{
			addCommodityCateStatus:'fail',
		}
	}
}

//获取商品种类
export function getCommodityCateList(shopId,callback){
    return {
		type:shopConf.GET_COMMODITY_CATE_LIST_REQUEST,
		shopId,
		callback,
		payload:{
			getCommodityCateStatus:'doing',
		}
	}
}
export function getCommodityCateListSuccess(commodityCateList){
	return {
		type:shopConf.GET_COMMODITY_CATE_LIST_SUCCESS,
		payload:{
			getCommodityCateStatus:'success',
			commodityCateList
		}
	}
}
export function getCommodityCateListFail(){
	return {
		type:shopConf.GET_COMMODITY_CATE_LIST_FAIL,
		payload:{
			getCommodityCateStatus:'fail',
		}
	}
}

//更新商品种类
export function updateCommodityCate(shopId,commodityCateId,commodityCateInfo,callback){
    return {
		type:shopConf.UPDATE_COMMODITY_CATE_REQUEST,
		shopId,
		commodityCateId,
		commodityCateInfo,
		callback,
		payload:{
			updateCommodityCateStatus:'doing',
		}
	}
}
export function updateCommodityCateSuccess(commodityCateList){
	return {
		type:shopConf.UPDATE_COMMODITY_CATE_SUCCESS,
		payload:{
			updateCommodityCateStatus:'success',
			commodityCateList
		}
	}
}
export function updateCommodityCateFail(){
	return {
		type:shopConf.UPDATE_COMMODITY_CATE_FAIL,
		payload:{
			updateCommodityCateStatus:'fail',
		}
	}
}

//删除商品种类
export function removeCommodityCate(shopId,commodityCateId,callback){
    return {
		type:shopConf.REMOVE_COMMODITY_CATE_REQUEST,
		shopId,
		commodityCateId,
		callback,
		payload:{
			removeCommodityCateStatus:'doing',
		}
	}
}
export function removeCommodityCateSuccess(commodityCateList){
	return {
		type:shopConf.REMOVE_COMMODITY_CATE_SUCCESS,
		payload:{
			removeCommodityCateStatus:'success',
			commodityCateList
		}
	}
}
export function removeCommodityCateFail(){
	return {
		type:shopConf.REMOVE_COMMODITY_CATE_FAIL,
		payload:{
			removeCommodityCateStatus:'fail',
		}
	}
}

//检测是否含有某商品
export function checkHaveCommodity(shopId,commodityId,callback){
    return {
		type:shopConf.CHECK_HAVE_COMMODITY_REQUEST,
		shopId,
		commodityId,
		callback,
		payload:{
			checkHaveCommodityStatus:'doing',
		}
	}
}
export function checkHaveCommoditySuccess(shopHaveCommodity){
	return {
		type:shopConf.CHECK_HAVE_COMMODITY_SUCCESS,
		payload:{
			checkHaveCommodityStatus:'success',
			shopHaveCommodity
		}
	}
}
export function checkHaveCommodityFail(){
	return {
		type:shopConf.CHECK_HAVE_COMMODITY_FAIL,
		payload:{
			checkHaveCommodityStatus:'fail',
		}
	}
}






