<template>
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog message="上传视频" :before-close="true" title="上传视频" content="点击确定上传视频身份验证" @close="beforeClose"
      @confirm="uploadFile">
      <video :src="src" autoplay muted></video>
    </uni-popup-dialog>
  </uni-popup>
</template>


<script>
  import {
    baseURL,
    getOilCardAndInterests
  } from '@/api/index.js'
  export default {
    name: 'UploadVideo',
    props: ['show', 'src', 'form'],
    watch: {
      show(val) {
        if (val) {
          this.$nextTick(() => {
            console.log(this.$refs.popup)
            this.$refs.popup.open()
          })
        }
      }
    },
    methods: {
      uploadFile() { //上传视频
        uni.showLoading({
          mask: true,
          title: '正在上传比对中，请勿关闭'
        })
        uni.uploadFile({
          url: `${baseURL}/uploadFile/baiduUploadFile`,
          filePath: this.src,
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
            this.$emit('success', res.data)
          } else {
            console.log('失败了')
            this.$emit('error', res.msg)
          }
          this.beforeClose()
        }).catch(err => {
          uni.hideLoading()
          console.log('失败了', err)
          this.$emit('error', err.msg)
        })
      },
      beforeClose() {
        this.$emit('update:show', false)
        this.$refs.popup.close()
      }
    },
  };
</script>
