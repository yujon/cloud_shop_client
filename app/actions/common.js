import * as CommonConf from '../constants/common';
export function syncActionCreator(type,payload){
	return {
		type:type,
		payload:payload,
	}
}

export function navigate(routeName){
    return {
    	type:'Navigation/NAVIGATE',
    	routeName:routeName
    }
}

export function back(){
    return {
    	type:'Navigation/BACK'
    }
}

//上传文件
export function uploadFile(file,fileName,callback){
    return {
        type:CommonConf.UPLOAD_FILE_REQUEST,
        callback,
        file,
        fileName,
        payload:{
            uploadFileStatus:'doing',
        }
    }
}
export function uploadFileSuccess(){
    return {
        type:CommonConf.UPLOAD_FILE_SUCCESS,
        payload:{
            uploadFileStatus:'success',
        }
    };
}
export function uploadFileFail(){
    return {
        type:CommonConf.UPLOAD_FILE_FAIL,
        payload:{
            uploadFileStatus:'fail',
        }
    }
}
