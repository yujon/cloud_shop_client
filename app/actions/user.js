import * as userConf from '../constants/user';
// 注册
export function loginUp(phoneCode,phoneNumber,password,callback){
	return {
		type:userConf.LOGIN_UP_REQUEST,
		phoneCode,
		phoneNumber,
		password,
		callback,
		payload:{
			loginUpStatus:'doing'
		}
	}
}

export function loginUpSuccess(){
	return {
		type:userConf.LOGIN_UP_SUCCESS,
		payload:{
			loginUpStatus:'success'
		}
	}
}

export function loginUpFail(){
	return {
		type:userConf.LOGIN_UP_FAIL,
		payload:{
			loginUpStatus:'fail'
		}
	}
}


// 登录
export function loginIn(phoneCode,phoneNumber,password,callback){
	return {
		type:userConf.LOGIN_IN_REQUEST,
		phoneCode,
		phoneNumber,
		password,
		callback,
		payload:{
			loginInStatus:'doing'
		}
	}
}

export function loginInSuccess(userInfo){
	return {
		type:userConf.LOGIN_IN_SUCCESS,
		payload:{
			loginInStatus:'success',
			userInfo
		}
	}
}

export function loginInFail(){
	return {
		type:userConf.LOGIN_IN_FAIL,
		payload:{
			loginInStatus:'fail'
		}
	}
}


// 退出登录
export function loginOut(userId,callback){
	return {
		type:userConf.LOGIN_OUT_REQUEST,
		userId,
		callback
	}
}

//获取信息
export function getUser(userId,callback){
	return {
		type:userConf.GET_USER_REQUEST,
		userId,
		callback,
	}
}

export function getUserSuccess(userInfo,callback){
	return {
		type:userConf.GET_USER_SUCCESS,
		callback,
		payload:{
			userInfo
		}
	}
}

export function getUserFail(){
	return {
		type:userConf.GET_USER_FAIL,
	}
}

//修改信息
export function updateUser(userId,userInfo,callback){
    return {
		type:userConf.UPDATE_USER_REQUEST,
		userId,
		userInfo,
		callback,
		payload:{
			updateUserStatus:'doing',
		}
	}
}
export function updateUserSuccess(userInfo){
	return {
		type:userConf.UPDATE_USER_SUCCESS,
		payload:{
			updateUserStatus:'success',
			userInfo
		}
	}
}
export function updateUserFail(){
	return {
		type:userConf.UPDATE_USER_FAIL,
		payload:{
			updateUserStatus:'fail',
		}
	}
}

//删除用户
export function removeUser(userId,callback){
    return {
		type:userConf.REMOVE_USER_REQUEST,
		userId,
		callback,
		payload:{
			removeUserStatus:'doing',
		}
	}
}
export function removeUserSuccess(){
	return {
		type:userConf.REMOVE_USER_SUCCESS,
		payload:{
			removeUserStatus:'success'
		}
	}
}
export function removeUserFail(){
	return {
		type:userConf.REMOVE_USER_FAIL,
		payload:{
			removeUserStatus:'fail'
		}
	}
}

//添加地址
export function addAddress(userId,addressInfo,callback){
    return {
		type:userConf.ADD_ADDRESS_REQUEST,
		userId,
		addressInfo,
		callback,
		payload:{
			addAddressStatus:'doing',
		}
	}
}
export function addAddressSuccess(addressList){
	return {
		type:userConf.ADD_ADDRESS_SUCCESS,
		payload:{
			addAddressStatus:'success',
			addressList:addressList
		}
	}
}
export function addAddressFail(){
	return {
		type:userConf.ADD_ADDRESS_FAIL,
		payload:{
			addAddressStatus:'fail',
		}
	}
}

//获取地址列表
export function getAddressList(userId,callback){
    return {
		type:userConf.GET_ADDRESS_LIST_REQUEST,
		userId,
		callback,
		payload:{
			getAddressListStatus:'doing',
		}
	}
}
export function getAddressListSuccess(addressList){
	return {
		type:userConf.GET_ADDRESS_LIST_SUCCESS,
		payload:{
			getAddressListStatus:'success',
			addressList:addressList
		}
	}
}
export function getAddressListFail(){
	return {
		type:userConf.GET_ADDRESS_LIST_FAIL,
		payload:{
			getAddressListStatus:'fail',
		}
	}
}

//更新地址
export function updateAddress(userId,addressId,addressInfo,callback){
    return {
		type:userConf.UPDATE_ADDRESS_REQUEST,
		userId,
		addressId,
		addressInfo,
		callback,
		payload:{
			updateAddressStatus:'doing',
		}
	}
}
export function updateAddressSuccess(addressList){
	return {
		type:userConf.UPDATE_ADDRESS_SUCCESS,
		payload:{
			updateAddressStatus:'success',
			addressList:addressList
		}
	}
}
export function updateAddressFail(){
	return {
		type:userConf.UPDATE_ADDRESS_FAIL,
		payload:{
			updateAddressStatus:'fail',
		}
	}
}

//删除地址
export function removeAddress(userId,addressId,callback){
    return {
		type:userConf.REMOVE_ADDRESS_REQUEST,
		userId,
		addressId,
		callback,
		payload:{
			removeAddressStatus:'doing',
		}
	}
}
export function removeAddressSuccess(addressList){
	return {
		type:userConf.REMOVE_ADDRESS_SUCCESS,
		payload:{
			removeAddressStatus:'success',
			addressList:addressList
		}
	}
}
export function removeAddressFail(){
	return {
		type:userConf.REMOVE_ADDRESS_FAIL,
		payload:{
			removeAddressStatus:'fail',
		}
	}
}

