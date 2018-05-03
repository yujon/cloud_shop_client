package com.cloud_shop_client;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import cn.smssdk.SMSSDK;
import cn.smssdk.EventHandler;
import java.lang.String;

public class SMSEnterActivity extends ReactContextBaseJavaModule {

    public SMSEnterActivity(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @Override
    public String getName() {
        return "SMSEnterActivity";
    }

    @ReactMethod
    public void sendCode(String phoneCode, String phoneNumber,final Promise promise) {
        // 注册一个事件回调，用于处理发送验证码操作的结果
        SMSSDK.registerEventHandler(new EventHandler() {
            public void afterEvent(int event, int result, Object data) {
                SMSSDK.unregisterAllEventHandler();
                if (result == SMSSDK.RESULT_COMPLETE) {
                    // 请注意，此时只是完成了发送验证码的请求，验证码短信还需要几秒钟之后才送达
                    promise.resolve("done");
                } else {
                    promise.reject("fail");
                }
            }
        });
        // 触发操作
        SMSSDK.getVerificationCode(phoneCode, phoneNumber);
    }

    @ReactMethod
    public void submitCode(String phoneCode, String phoneNumber, String code,final Promise promise) {
        // 注册一个事件回调，用于处理发送验证码操作的结果
        SMSSDK.registerEventHandler(new EventHandler(){
            public void afterEvent(int event, int result, Object data) {
                SMSSDK.unregisterAllEventHandler();
                if (result == SMSSDK.RESULT_COMPLETE) {
                    promise.resolve("done");
                } else {
                    promise.reject("fail");
                }
            }
        });
        // 触发操作
        SMSSDK.submitVerificationCode(phoneCode, phoneNumber, code);
    }
}