<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    }
  }
</script>

<style lang="scss">
  /*每个页面公共css */
  .status_bar {
    height: var(--status-bar-height);
    background: #FFF;
    width: 100%;
  }

  .miniProgram-title {
    margin-top: 60rpx;
    margin-bottom: 30rpx;
    text-align: center;
    font-weight: bold;
    font-size: 17px;
    color: #000000;
  }

  .extend-title {
    content: " ";
    width: 32px;
    height: 13px;
  }

  .common-title {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      @extend .extend-title;
      margin-left: 6px;
      background: url("static/right.png");
      background-size: 100% 100%;
    }

    &::before {
      @extend .extend-title;
      margin-right: 6px;
      background: url("static/left.png");
      background-size: 100% 100%;
    }
  }
</style>
