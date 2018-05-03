import * as orderConf from '../constants/order';
// 获取作为非供应商的订单列表
export function getOrderListByClonedShopIdAndStatus(clonedShopId,status){
	return {
		type:orderConf.GET_ORDER_LIST_BY_CLONED_SHOP_AND_STATUS_REQUEST,
		clonedShopId,
		status,
		payload:{
			getOrderListByClonedShopIdAndStatusStatus:'doing'
		}
	}
}

export function getOrderListByClonedShopIdAndStatusSuccess(orderList){
	return {
		type:orderConf.GET_ORDER_LIST_BY_CLONED_SHOP_AND_STATUS_SUCCESS,
		payload:{
			getOrderListByClonedShopIdAndStatusStatus:'success',
			orderList
		}
	}
}

export function getOrderListByClonedShopIdAndStatusFail(){
	return {
		type:orderConf.GET_ORDER_LIST_BY_CLONED_SHOP_AND_STATUS_FAIL,
		payload:{
			getOrderListByClonedShopIdAndStatusStatus:'fail'
		}
	}
}

// 获取作为非供应商的订单列表
export function getOrderListByCreatedShopIdAndStatus(createdShopId,status){
	return {
		type:orderConf.GET_ORDER_LIST_BY_CREATED_SHOP_AND_STATUS_REQUEST,
		createdShopId,
		status,
		payload:{
			getOrderListByCreatedShopIdAndStatusStatus:'doing'
		}
	}
}

export function getOrderListByCreatedShopIdAndStatusSuccess(orderList){
	return {
		type:orderConf.GET_ORDER_LIST_BY_CREATED_SHOP_AND_STATUS_SUCCESS,
		payload:{
			getOrderListByCreatedShopIdAndStatusStatus:'success',
			orderList
		}
	}
}

export function getOrderListByCreatedShopIdAndStatusFail(){
	return {
		type:orderConf.GET_ORDER_LIST_BY_CREATED_SHOP_AND_STATUS_FAIL,
		payload:{
			getOrderListByCreatedShopIdAndStatusStatus:'fail'
		}
	}
}


// 已经发货
export function haveSendCommodity(orderId,courierType,courierNumber,callback){
	return {
		type:orderConf.HAVE_SEND_COMMODITY_REQUEST,
		orderId,
		courierType,
		courierNumber,
		callback,
		payload:{
			haveSendCommodityStatus:'doing'
		}
	}
}

export function haveSendCommoditySuccess(orderList){
	return {
		type:orderConf.HAVE_SEND_COMMODITY_SUCCESS,
		payload:{
			haveSendCommodityStatus:'success',
		}
	}
}

export function haveSendCommodityFail(){
	return {
		type:orderConf.HAVE_SEND_COMMODITY_FAIL,
		payload:{
			haveSendCommodityStatus:'fail'
		}
	}
}