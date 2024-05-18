import TencentCloudChat from '@tencentcloud/chat';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import { genTestUserSig }  from '../../TUIKit/debug/GenerateTestUserSig';


Page({
    data: {
        config: {
            userID: '315', //User ID
            SDKAPPID: 1600007087, // Your SDKAppID
            SECRETKEY: '0c24bec9223d09337d752020a6f67796eaad5c318463929a47906c83217e1cf2', // Your secretKey
            EXPIRETIME: 604800,
        }
    },

    onLoad() {
        const userSig = genTestUserSig(this.data.config).userSig 
        wx.$TUIKit = TencentCloudChat.create({
            SDKAppID: this.data.config.SDKAPPID
        })
        wx.$chat_SDKAppID = this.data.config.SDKAPPID;
        wx.$chat_userID = this.data.config.userID;
        wx.$chat_userSig = userSig;
        wx.TencentCloudChat = TencentCloudChat;
        wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        wx.$TUIKit.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin });
        wx.$TUIKit.login({
            userID: this.data.config.userID,
            userSig
        });
        wx.setStorage({
            key: 'currentUserID',
            data: [],
        });
        wx.$TUIKit.on(wx.TencentCloudChat.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onUnload() {
        wx.$TUIKit.off(wx.TencentCloudChat.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onSDKReady() {
        const TUIKit = this.selectComponent('#TUIKit');
        TUIKit.init();
    }
});