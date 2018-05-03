import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';

var newCarryCateInfo = {};
const CarryCateEditDialog = (
  {visible,title,onCancel,onFinish,renderContent}
  ) => {
  return (
      <TouchableWithoutFeedback style={styles.container} onPress={onCancel}>
        <Modal animationType="fade" visible={visible} transparent onRequestClose={()=>{onCancel()}}>
            <View key="spinner" style={styles.spinner}>
                <View style={styles.spinnerContent}>
                    <Text style={[styles.spinnerTitle, { fontSize: 20, color: 'black' }]}>
                      {title}
                    </Text>
                     {
                      renderContent((type,text)=>{
                         newCarryCateInfo[type] = text;
                      })
                     }
                    <View style={styles.spinnerBtnLine}>
                        <TouchableOpacity onPress={()=>{onCancel()}} style={{marginRight:7}}>
                           <View style={styles.leftBtn}>
                             <Text>取消</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{onFinish(newCarryCateInfo)}}>
                           <View style={styles.leftBtn}>
                             <Text>确定</Text>
                           </View>
                        </TouchableOpacity>
                      </View>
                </View>
            </View>
        </Modal>
      </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  spinnerContent: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * (8 / 10),
    height: Dimensions.get('window').width * 1.2,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5,
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
    marginTop: 5
  },
  spinnerBtnLine:{
    height:40,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }

});

export default CarryCateEditDialog;