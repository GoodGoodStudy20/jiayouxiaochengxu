<template>
  <view>
    <view class="status_bar">
      <!-- 这是状态栏 -->
    </view>
    <view class="miniProgram-title">
      我爱加油
    </view>
    <image class="img" src="../../static/logo.png" mode="" v-if="!phone"></image>
    <view class="top" v-if="phone && !realNameList.length">
      <image class="img" src="../../static/home1.png" mode=""></image>
      <view class="">您暂时没有可领取的油券哦!</view>
      <view class="number">当前账号：<text>{{phone}}</text></view>
    </view>
    <view class="top2" v-if="phone && realNameList.length">
      <image class="img" src="../../static/home2.png" mode=""></image>
      <view class="top2-right">
        <view class="">您有可领取的油券哦!</view>
        <view class="number">当前账号：<text>{{phone}}</text></view>
      </view>
    </view>
    <button class="phone-btn btn1" v-if="!phone" open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber">领取油券</button>
    <button class="phone-btn btn2" v-if="phone && realNameList.length" @click="gotoPage">去领取油券</button>
    <view class="tips" v-if="phone && realNameList.length">(点击“去领取油券”即可领取权益)</view>

    <view class="qrcode-img">
      <view class="p">如您已经领取了油券 </view>
      <view class="goto" @click="gotoMiniProgram">去加油-打开大家来加油</view>
      <view class="gd-code" @click="gotoMiniProgram"></view>
      <view class="bottom-tips">（或长按识别上方小程序码）</view>
    </view>
    <view class="bottom">
      <view>本服务由共幸科技（深圳）有限公司提供</view>
      <view @click="callPhone">
        <uni-icons type="phone" size="14" style="margin-right: 12rpx;"></uni-icons>400-6310-818
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getWxUserPhone,
    checkOilCardInterests
  } from '@/api/index.js'
  export default {
    data() {
      return {
        phone: '',
        realNameList: [],
        code: ''
      };
    },
    onShow() {
      this.phone = uni.getStorageSync('phone') || ''
      if (this.phone) {
        this.getRealName()
      }
      this.getVersion()
      this.getCode()
    },
    methods: {
      getVersion() { //获取版本更新
        //#ifdef MP-WEIXIN
        const updateManager = wx.getUpdateManager()
        updateManager.onCheckForUpdate(function(res) {
          // 请求完新版本信息的回调
          console.log(res.hasUpdate)
        })
        updateManager.onUpdateReady(function() {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function() {
          // 新版本下载失败
        })
        //#endif
      },
      getCode() {
        uni.login({ //获取code
          success: (login) => {
            this.code = login.code
          }
        })
      },
      getPhoneNumber(e) { //获取手机号
        let data = {
          appId: "wxd314dbda841995f5",
          wxCode: this.code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        }
        getWxUserPhone(data).then(res => {
          if (res.code != 200) {
            uni.showToast({
              icon: 'none',
              title: res.msg || '获取手机号失败,请重新获取'
            })
            this.getCode()
            return
          }
          this.phone = res.data
          uni.setStorageSync('phone', this.phone)
          this.getRealName()
          console.log('获取手机号成功', res.data)
        })
      },
      getRealName() { //通过手机号获取姓名
        if (!this.phone) return
        checkOilCardInterests(this.phone).then((res) => {
          if (res.data && res.data.length) {
            this.realNameList = res.data.map(item => item.usedName)
          }
        })
      },
      gotoPage() {
        uni.navigateTo({
          url: `/pages/index/index?phone=${this.phone}&realNameList=${this.realNameList.join(',')}`
        })
      },
      gotoMiniProgram() { //跳转小程序
        uni.navigateToMiniProgram({
          appId: 'wx32fe2eb8b2fa221f',
          path: '',
          success(res) {}
        })
      },
      callPhone() { //拨打电话
        uni.makePhoneCall({
          phoneNumber: '4006310818'
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .img {
    width: 240rpx;
    height: 272rpx;
    display: block;
    margin: 140rpx auto 0;
  }

  .number {
    margin-top: 8rpx;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #666666;

    text {
      font-size: 12px;
      color: #666666;
    }
  }

  .top {
    margin-top: 80rpx;
    text-align: center;

    .img {
      width: 234rpx;
      height: 228rpx;
      display: block;
      margin: 140rpx auto 0;
    }

    view:nth-child(2) {
      font-weight: bold;
      font-size: 18px;
      line-height: 25px;
      margin-top: 80rpx;
      color: #333333;
    }
  }

  .top2 {
    display: flex;
    width: 568rpx;
    height: 168rpx;
    margin: 140rpx auto 0;
    align-items: center;
    justify-content: space-between;

    .img {
      width: 192rpx;
      height: 168rpx;
      margin: 0;
    }

    .top2-right {
      view:nth-child(1) {
        font-weight: bold;
        font-size: 18px;
        line-height: 25px;
        color: #333333;
      }

    }
  }

  .tips {
    font-weight: normal;
    font-size: 11px;
    line-height: 15px;
    text-align: center;
    margin-top: 28rpx;
    color: #666666;
  }

  .common-btn {
    display: block;
    color: #fff;
    margin: 0rpx auto;
    text-align: center;
    background: linear-gradient(145.43deg, #ffaf9b 10.56%, #f14f44 91.33%);
    border-radius: 16rpx;
    font-weight: bold;
    font-size: 32rpx;

    &::after {
      border: none;
    }
  }

  .phone-btn {
    @extend .common-btn;
    font-size: 16px;
    height: 88rpx;
    line-height: 88rpx;
    width: 600rpx;
  }

  .btn1 {
    margin-top: 80rpx;
  }

  .btn2 {
    margin-top: 160rpx;
  }

  .common {
    width: 702rpx;
    margin: 0 auto 16rpx;
    box-sizing: border-box;
  }

  .qrcode-img {
    @extend .common;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 40rpx;
    margin-top: 140rpx;

    .gd-code {
      background: url("https://gz.bcebos.com/v1/zhijianche/691983a5-1f6c-4f41-8bd8-a5449d4f5293.png");
    }

    .gd-code {
      height: 300rpx;
      width: 300rpx;
      background-size: 100% 100%;
      border-radius: 30rpx;
    }

    .p {
      font-weight: bold;
      font-size: 15px;
      line-height: 21px;
      color: #333333;
    }

    .goto {
      margin-top: 20rpx;
      font-weight: normal;
      font-size: 12px;
      text-align: center;
      color: #005DE9;
    }

    .bottom-tips {
      font-size: 11px;
      line-height: 15px;
      text-align: center;
      color: #666666;
    }
  }

  .bottom {
    text-align: center;
    font-weight: normal;
    font-size: 11px;
    margin-top: 106rpx;
    padding-bottom: 40rpx;

    view:nth-child(1) {
      line-height: 15px;
      color: #999999;

    }

    view:nth-child(2) {
      margin-top: 14rpx;
      line-height: 16px;
      color: #005DE9;
    }
  }
</style>
