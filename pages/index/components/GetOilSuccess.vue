<template>
  <uni-popup ref="popup" :mask-click="false">
    <image src="../../../static/bg1.png" mode="" class="img"></image>
    <view class="contennier">
      <view class="p">姓名：<text class="span">{{form.realName}}</text></view>
      <view class="p">证件号码：<text class="span">{{form.idNum}}</text></view>
      <view class="p">金额：{{moeny}} 元</view>
      <view class="btn-box">
        <view class="btn" @click="beforeClose">确认领取</view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
  export default {
    name: 'GetOilSuccess',
    props: ['show', 'form', 'moeny'],
    data() {
      return {
        city: '',
        coupons: '',
        mid: ''
      }
    },
    created() {},
    watch: {
      show(val) {
        if (val) this.$refs.popup.open()
      }
    },
    methods: {
      beforeClose() {
        this.$emit('update:show', false)
        this.$refs.popup.close()
      }
    },
  };
</script>
<style scoped lang="scss">
  .img {
    position: fixed;
    top: 300rpx;
    left: 54rpx;
    z-index: -1;
    width: 642rpx;
    height: 722rpx;
  }

  .contennier {
    width: 400rpx;
    // margin: 80rpx auto 0;
    position: fixed;
    top: 650rpx;
    left: 180rpx;

    .p {
      margin: 0;
      margin-bottom: 20rpx;
      font-weight: bold;
      font-size: 12px;
      line-height: 40rpx;
      color: #333333;

      .span {
        font-weight: normal;
        font-size: 12px;
        color: #666666;
      }
    }

    .btn-box {
      top: 900rpx;
      position: fixed;
      width: 380rpx;
      height: 64rpx;
      display: flex;
      color: #fff;
      font-size: 13px;

      .btn {
        margin: 0 auto;
        width: 320rpx;
        height: 72rpx;
        line-height: 72rpx;
        background: linear-gradient(145.43deg, #ffaf9b 10.56%, #f14f44 91.33%);
        border-radius: 70rpx;
        text-align: center;
      }
    }
  }
</style>
