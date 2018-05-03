import React from 'react';
import {StyleSheet,Dimensions,Text,TouchableOpacity,View,Modal,TouchableWithoutFeedback,TextInput} from 'react-native';

const CourierInfoEditDialog = (
  {visible,courierType,courierNumber,changeCourierType,changeCourierNumber,onCancel,onFinish}
  ) => {
  return (
      <TouchableWithoutFeedback style={styles.container} onPress={onCancel}>
        <Modal animationType="fade" visible={visible} transparent onRequestClose={()=>{onCancel()}}>
            <View key="spinner" style={styles.spinner}>
                <View style={styles.spinnerContent}>
                    <Text style={[styles.spinnerTitle, { fontSize: 20, color: 'black',marginBottom:20 }]}>发货信息</Text>
                    <View style={{flex:1}} >
                        <View style={{height:50,flexDirection:'row',alignItems:'center'}}>
                          <Text style={{flex:1,alignItems:'center'}}>快递类型：</Text>
                          <TextInput style={{flex:2}} value={courierType} clearButtonMode="while-editing" onChangeText={(text) =>{changeCourierType(text);}} />
                        </View>
                        <View style={{height:50,flexDirection:'row',alignItems:'center'}}>
                          <Text style={{flex:1,alignItems:'center'}}>快递单号</Text>
                          <TextInput style={{flex:2}} value={courierNumber} clearButtonMode="while-editing" onChangeText={(text) =>{changeCourierNumber(text);}} />
                        </View>
                    </View>
                    <View style={styles.spinnerBtnLine}>
                        <TouchableOpacity onPress={()=>{onCancel()}} style={{marginRight:15}}>
                           <View style={styles.leftBtn}>
                             <Text>取消</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={()=>{onFinish()}}>
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
    height: Dimensions.get('window').width * 0.8,
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

export default CourierInfoEditDialog;