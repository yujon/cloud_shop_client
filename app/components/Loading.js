import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';

const SIZES = ['small', 'large'];

const propTypes = {
  visible: PropTypes.bool,
  overlayColor: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  loadingColor: PropTypes.string,
  textColor: PropTypes.string,
};

const Loading = ({
  visible, overlayColor, size,loadingColor,textColor
}) => (
  <Modal visible={visible} transparent onRequestClose={()=>{}}>
    {visible ? (
      <View key="spinner" style={styles.container}>
        <View style={[styles.background, { backgroundColor: overlayColor }]}>
          <View style={styles.loading}>
            <ActivityIndicator size={size} color={loadingColor} />
            <Text style={[styles.loadingText,{color:textColor}]}>加载中...</Text>
          </View>
        </View>
      </View>
    ) : (
      <View key="spinner" />
    )}
  </Modal>
);

Loading.propTypes = propTypes;

Loading.defaultProps = {
  visible: false,
  overlayColor: 'transparent',
  size: 'large',
  loadingColor: '#fff',
  textColor: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
    borderRadius: 10,
    backgroundColor: 'transparent'
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fcfcfc'
  }
});

export default Loading;
