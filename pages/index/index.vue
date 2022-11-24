<template>
  <view>
    <view class="status_bar">
      <!-- 这是状态栏 -->
    </view>
    <view class="miniProgram-title">
      油券领取
    </view>
    <view class="step-box">
      <view class="step" @click="clickStep(0)">
        <image class="img" src="../../static/active1.png" mode=""></image>
        <text class="p">基本信息</text>
      </view>
      <view class="line" :class="active>=1?'active-line':''"></view>
      <view class="step" @click="clickStep(1)">
        <image class="img" :src="`../../static/${active>=1?'':'in'}active2.png`" mode=""></image>
        <text class="p">实名认证</text>
      </view>
      <view class="line" :class="active==2?'active-line':''"></view>
      <view class="step" @click="clickStep(2)">
        <image class="img" :src="`../../static/${active==2?'':'in'}active3.png`" mode=""></image>
        <text class="p">领取成功</text>
      </view>
    </view>

    <view v-if="active==0">
      <view class="input-box">
        <uni-forms ref="form" border label-width="90">
          <uni-forms-item label="手机号码：" name="phone">
            <uni-easyinput v-if="form.phone" type="number" v-model="form.phone" disabled :inputBorder="false"
              placeholder="请输入充值号码" maxlength="11" />
          </uni-forms-item>
          <uni-forms-item label="真实姓名：" name="realName">
            <picker @change="bindPickerChange" :value="nameIndex" :range="realNameList">
              <uni-easyinput type="text" v-model="form.realName" suffixIcon="arrowdown" disabled :inputBorder="false"
                placeholder="请选择真实姓名" />
            </picker>
          </uni-forms-item>
          <uni-forms-item label="证件号码：" name="idNum">
            <uni-easyinput type="idcard" v-model="form.idNum" :inputBorder="false" placeholder="请输入证件号码"
              maxlength="18" />
          </uni-forms-item>
        </uni-forms>
        <view class="btn-box">
          <button class="btn" @click="nextStep">下一步</button>
        </view>
        <view class="yinsi">
          <uni-data-checkbox multiple v-model="checked" selectedColor="#F14F44" :localdata="localdata">
          </uni-data-checkbox>
          <!-- <text>我已阅读并同意</text> -->
          <text @click.stop="open" class="text">《隐私条款》</text>
        </view>
      </view>
      <view class="rule-box">
        <view class="common-title">领取须知</view>
        <view class="p" v-for="(item,i) in tipList1" :key="i">{{i+1}}. <text class='span'>{{item}}</text></view>
        <view class="p" @click="gotoMiniProgram"><text class='span'>4. 领取成功之后金额将充值到广东中石化小程序<text
              style='color:#0099ff'>“大家来加油”</text>。</text></view>
      </view>
    </view>
    <view v-if="active==1" class="step2-box">
      <view class="p">请点击下方按钮录制<text class='span'>5秒</text>的视频</view>
      <view class="p">(视频中需包含<text class='span'>点头、摇头</text>动作)</view>
      <view class="msg-box">
        <camera device-position="front" frame-size="small" flash="off" @error="error"
          style="width: 100%; height: 100%;">
          <cover-view class="tips">{{(slider>0 && slider<2)?'请点点头':slider>=2?'请摇摇头':''}}</cover-view>
          <cover-image class="img" src="@/static/人像.png" v-if="!videoPopup"></cover-image>
        </camera>
        <!-- <image class="img" src="@/static/人像.png" alt=""></image> -->
        <!-- <text class="tips">{{(slider>0 && slider<500)?'请点点头':slider>=500?'请摇摇头':''}}</text> -->

      </view>
      <slider class="slider-box" v-if="slider>0" :value="slider" max="4" disabled activeColor="#f14f4480"
        backgroundColor="#ccc" block-color="#f14f44" block-size="20" />
      <view class="remark">{{failMsg ? `${failMsg},请重新录制` : ' '}}</view>
      <view class="remark">{{slider>0 ? '正在录制中' : ' '}}</view>
      <view class="camera-box">
        <!--  <image class="camera" src="../../static/camera.png" mode="aspectFill" @click="takePhoto" v-if="slider==0">
        </image> -->
        <button class="btn" @click="takePhoto" v-if="slider==0">开始录制</button>
      </view>
    </view>
    <view v-if="active==2">
      <view class="qrcode-img">
        <view class="p">恭喜您获得加油券 <text class='span'>{{moeny}}元 </text></view>
        <view class="gd-code" @click="gotoMiniProgram">
        </view>
        <view class="bottom-tips">点击即可去加油</view>
      </view>
      <view class="rule-box">
        <view class="common-title">注意事项</view>
        <view class="p" v-for="(item,i) in tipList" :key="i">{{i+1}}. <text class='span'>{{item}}</text></view>
        <view class="p" @click="callPhone"><text class='span'>4. 如有疑问，请咨询<text
              style='color:#0099ff;'>400-6310-818</text></text></view>
      </view>
    </view>
    <Pdftext :showpdf.sync="showpdf"></Pdftext>
    <GetOilSuccess :show.sync="showSuccess" :form="form" :moeny="moeny"></GetOilSuccess>
  </view>
</template>

<script>
  import {
    baseURL,
    getOilCardAndInterests
  } from '@/api/index.js'
  import {
    Debounce,
    CheckIdCard
  } from '@/utils/index.js'
  import Pdftext from './components/Pdftext'
  import GetOilSuccess from './components/GetOilSuccess'
  import UploadVideo from './components/UploadVideo'
  export default {
    components: {
      Pdftext,
      GetOilSuccess,
      UploadVideo
    },
    data() {
      return {
        realNameList: [],
        localdata: [{
          "value": 1,
          "text": "已阅读并同意"
        }],
        nameIndex: '',
        showName: false,
        active: 0,
        slider: 0,
        moeny: '',
        form: {
          idNum: '',
          phone: '',
          realName: '',
          imgUrl: ''
        },
        checked: false,
        showpdf: false,
        showSuccess: false,
        failMsg: '',
        tipList1: [
          '请输入您的真实姓名和身份证号码，否则不能领取成功。',
          '为了确保是您本人领取权益我们会采集您的脸部照片进行实名验证。',
          '每个账号每天只能验证3次，请确保输入正确的信息和录入清晰的照片。'
        ],
        tipList: [
          '广东省内任意中石化直营加油站可以使用，有效期180天。',
          '活动赠送优惠，不可开具发票。',
          '每月第一天和最后一天为中石化电子渠道内部结算日期，这两天不可以使用。'
        ],
        videoPopup: false,
        videoSrc: '',
        rules: {
          phone: {
            rules: [{
              required: true,
              errorMessage: '请获取手机号',
            }]
          },
          realName: {
            rules: [{
              required: true,
              errorMessage: '请选择真实名字',
            }]
          },
          idNum: {
            rules: [{
              required: true,
              errorMessage: '请输入身份证号码',
            }]
          },
        }
      }
    },
    onLoad(option) {
      this.form.phone = option.phone || ''
      this.realNameList = option.realNameList.split(',') || []
      if (this.realNameList && this.realNameList.length == 1) {
        this.nameIndex = 0
        this.form.realName = this.realNameList[this.nameIndex]
      }
    },
    onReady() {
      // 需要在onReady中设置规则
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      gotoMiniProgram() { //跳转小程序
        uni.navigateToMiniProgram({
          appId: 'wx32fe2eb8b2fa221f',
          path: '',
          success(res) {
            // 打开成功
          }
        })
      },
      callPhone() { //拨打电话
        uni.makePhoneCall({
          phoneNumber: '4006310818'
        });
      },
      takePhoto: Debounce(function() { //录制视屏
        const ctx = uni.createCameraContext();
        let stop = () => {
          ctx.stopRecord({
            compressed: true,
            success: res => {
              console.log('成功回调', res)
              this.videoSrc = res.tempVideoPath
              if (!this.videoSrc) {
                uni.showToast({
                  title: '录制失败，请刷新页面重试',
                  icon: 'none'
                })
              }
              uni.showLoading({
                mask: true,
                title: '正在上传比对中，请勿关闭'
              })
              this.uploadFile()
            },
            fail: err => {
              console.log('失败回调', err)
            },
          })
        }
        ctx.startRecord({
          success: res => {
            let st = setInterval(() => {
              this.slider++
              if (this.slider >= 4) {
                this.slider = 0
                clearInterval(st)
                stop()
              }
            }, 1000)
          },
          fail: err => {
            uni.showToast({
              title: err
            })
          }
        })
      }),
      error(e) { //相机组件初始化失败
        console.log(e.detail);
        uni.showModal({
          title:'提示',
          content: '相机组件初始化失败，请刷新重试，或检查是否开启摄像头权限',
          showCancel:false
        })
      },
      bindPickerChange(e) { //选择姓名
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.nameIndex = e.target.value
        this.form.realName = this.realNameList[this.nameIndex]
      },
      open() { //打开隐私条款
        this.showpdf = true
        this.checked = [1]
      },
      nextStep() { //下一步
        console.log(123123, this.form.realName, this.form.idNum, this.form.phone, this.checked)
        if (this.active == 0) {
          if (!this.form.phone) {
            uni.showToast({
              icon: 'none',
              title: '请获取手机号码'
            })
            return
          }
          if (!this.form.realName) {
            uni.showToast({
              icon: 'none',
              title: '请选择真实姓名'
            })
            return
          }
          if (!CheckIdCard(this.form.idNum)) {
            uni.showToast({
              icon: 'none',
              title: '请输入正确的身份证号'
            })
            return
          }
          if (!this.checked || !this.checked.length) {
            uni.showToast({
              icon: 'none',
              title: '请先阅读并勾选隐私协议'
            })
            return
          }
        }
        this.active++
      },
      clickStep(index) { //点击步骤条
        // this.active = index
        // if (index == 2) {
        //   this.showSuccess = true
        // }
        if (this.slider) return
        if (index == 0) {
          this.active = 0
        }
      },
      uploadFile() { //上传视频
        uni.uploadFile({
          url: `${baseURL}/uploadFile/baiduUploadFile`,
          filePath: this.videoSrc,
          name: 'mfile',
          success: (res) => {
            console.log(res.data)
            let result = {}
            //判断返回的是不是JSON字符串
            try {
              result = JSON.parse(res.data)
            } catch (e) {
              result = res.data
            }
            if (result.code != 200) {
              uni.hideLoading()
              uni.showToast({
                icon: 'none',
                title: result.msg || '上传失败'
              })
              return
            }
            this.submit(result.data)
          },
          fail: err => {
            uni.hideLoading()
          }
        });
      },

      submit(imgUrl) {
        let param = Object.assign({}, this.form)
        param.imgUrl = imgUrl
        getOilCardAndInterests(param).then(res => {
          uni.hideLoading()
          console.log(res)
          if (res.code == 200) {
            console.log('成功了')
            this.getOilSuccess(res.data)
          } else {
            console.log('失败了')
            this.getOilError(res.msg)
          }
          this.beforeClose()
        }).catch(err => {
          uni.hideLoading()
          console.log('失败了', err)
          this.getOilError(err.msg)
        })
      },
      getOilSuccess(money) { //获取油成功的回调
        this.moeny = money
        this.active = 2
        this.showSuccess = true
      },
      getOilError(msg) { //获取油失败的回调
        console.log('获取油失败的回调', msg)
        this.failMsg = msg
      }
    }
  }
</script>


<style lang="scss" scoped>
  .box {
    padding: 24rpx 12rpx;
    background: #fdfeff;
  }

  .common {
    width: 702rpx;
    background: #ffffff;
    box-shadow: 8rpx 8rpx 60rpx rgba(0, 0, 0, 0.08);
    border-radius: 12rpx;
    margin: 0 auto 16rpx;
    box-sizing: border-box;
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

  .step-box {
    @extend .common;
    padding: 30rpx 26rpx;
    display: flex;

    .step {
      text-align: center;
      width: 102rpx;
      height: 152rpx;

      .img {
        width: 96rpx;
        height: 96rpx;
      }

      .p {
        margin: 0;
        margin-top: 16rpx;
        font-weight: normal;
        font-size: 26rpx;
        white-space: nowrap;
      }
    }

    .line {
      flex: 1;
      height: 0px;
      border-bottom: 1px dashed #ddd;
      align-self: center;
    }

    .active-line {
      border-bottom: 1px dashed #f14f44;
    }
  }

  .input-box {
    @extend .common;
    padding: 16rpx 26rpx;

    .btn-box {
      margin-top: 20rpx;
      width: 100%;
      background: #fff;
      padding: 20rpx 0;
      text-align: center;

      .btn {
        @extend .common-btn;
        height: 80rpx;
        line-height: 80rpx;
        width: 650rpx;

      }
    }

    .yinsi {
      width: 100%;
      display: flex;
      justify-content: center;
      // font-size: 36rpx;
      margin: 30rpx 0;
      align-items: center;

      .text {
        color: #f14f44;
        font-size: 14px;
        margin-left: -44rpx;
        margin-top: -5rpx;
      }
    }

    .phone-btn {
      @extend .common-btn;
      float: right;
      font-size: 28rpx;
      height: 60rpx;
      line-height: 60rpx;
      width: 250rpx;
    }
  }


  .step2-box {
    .p {
      margin: 0;
      margin-bottom: 20rpx;
      white-space: nowrap;
      text-align: center;

      .span {
        color: #f14f44;
      }
    }

    .p:nth-child(1) {
      font-weight: bold;
      font-size: 32rpx;
      color: #333333;
    }

    .p:nth-child(2) {
      font-weight: normal;
      font-size: 32rpx;
      color: #666666;
    }

    .slider-box {
      width: 480rpx;
      margin-left: 135rpx;
    }

    .remark {
      width: 100%;
      text-align: center;
      margin-top: 40rpx;
      font-size: 30rpx;
      color: #f14f44;
    }
  }

  .msg-box {
    width: 480rpx;
    height: 580rpx;
    margin: 84rpx auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;

    .img {
      width: 480rpx;
      height: 580rpx;
      position: absolute;
      top: 0;
    }

    .tips {
      width: 100%;
      text-align: center;
      font-size: 40rpx;
      position: absolute;
      font-weight: bold;
      top: 60rpx;
      color: #f14f44;
    }

  }

  .camera-box {
    width: 100%;
    // position: fixed;
    // bottom: 68rpx;
    text-align: center;
    margin-top: 160rpx;

    .btn {
      @extend .common-btn;
      height: 88rpx;
      line-height: 88rpx;
      width: 650rpx;
    }

    .camera {
      // display: block;
      margin: 0 auto;
      width: 144rpx;
      height: 144rpx;
      // border: none;
      // input {
      //   width: 72rpx;
      //   height: 72rpx;
      //   opacity: 0;
      // }
    }
  }

  .qrcode-img {
    @extend .common;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 40rpx;

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
      font-size: 38rpx;
      margin: 28rpx 0 44rpx;

      span {
        font-weight: bold;
        font-size: 40rpx;
        color: #f14f44;
      }
    }

    .bottom-tips {
      font-weight: normal;
      font-size: 26rpx;
      color: #333333;
    }
  }

  .rule-box {
    @extend .common;
    padding: 28rpx 20rpx;

    .common-title {
      margin-bottom: 28rpx;
    }

    .p {
      margin: 0 0 24rpx;
      font-weight: normal;
      font-size: 24rpx;
      color: #333333;
    }
  }
</style>
<style lang="scss">
  .uni-easyinput__content {
    background: #fff !important;
  }
</style>
