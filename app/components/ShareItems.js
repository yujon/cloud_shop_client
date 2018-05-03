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

const shareIconWechat = require('../static/img/share_icon_wechat.png');
const shareIconMoments = require('../static/img/share_icon_moments.png');

const ShareItems = (
  {visible,shareToSession,shareToTimeline,onCancel}
  ) => {
  return(
      <TouchableWithoutFeedback style={styles.container} onPress={onCancel}>
        <Modal animationType="fade" visible={visible} transparent onRequestClose={()=>{onCancel()}}>
            <View key="spinner" style={styles.spinner}>
              <View style={styles.spinnerContent}>
                <Text style={[styles.spinnerTitle, { fontSize: 20, color: 'black' }]}>
                  分享到
                </Text>
                <View style={styles.shareParent}>
                  <TouchableOpacity style={styles.base}  onPress={shareToSession}>
                    <View style={styles.shareContent}>
                      <Image style={styles.shareIcon} source={shareIconWechat} />
                      <Text style={styles.spinnerTitle}>微信</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.base} onPress={shareToTimeline}>
                    <View style={styles.shareContent}>
                      <Image style={styles.shareIcon} source={shareIconMoments} />
                      <Text style={styles.spinnerTitle}>朋友圈</Text>
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
    width: Dimensions.get('window').width * (7 / 10),
    height: Dimensions.get('window').width * (7 / 10) * 0.68,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
    marginTop: 5
  },
  shareParent: {
    flexDirection: 'row',
    marginTop: 20
  },
  shareContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  }
});

export default ShareItems;