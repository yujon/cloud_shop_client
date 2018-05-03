import {Platform} from 'react-native';
import {Toast} from 'antd-mobile';
import ImagePicker from 'react-native-image-picker'; 

exports.pickImg = function(callback){
    const options = { // 弹出框配置
        title:'请选择',  
        cancelButtonTitle:'取消',
        takePhotoButtonTitle:'拍照',
        chooseFromLibraryButtonTitle:'选择相册',
        quality:0.75,
        allowsEditing:true,
        noData:false,
        storageOptions: {
            skipBackup: true,
            path:'images'
        }
    };


    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            Toast.info('取消获取图片',2);
        }
        else if (response.error) {
            Toast.info('获取图片过程出错',2);
        }
        else {
            let source;
            if (Platform.OS === 'android') {
                source = {uri: response.uri, isStatic: true}
            } else {
                source = {uri: response.uri.replace('file://', ''), isStatic: true}
            }
            let file;
            let fileName = "未命名文件";
            if(Platform.OS === 'android'){
                file = response.uri
            }else {
                file = response.uri.replace('file://', '');
            }
            callback && callback(file,file);
        }
    });
}