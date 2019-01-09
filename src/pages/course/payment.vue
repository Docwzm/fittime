
<template>
  <div class="payment-wrap">
    <div class="pay-info">
      <div class="title">购买该课程1年试用期</div>
      <div class="sub-title">1次购买，1年内随意训练</div>
      <div class="pay-title">支付金额</div>
      <div class="money">
        <span>￥</span>99.00
      </div>
      <div class="button">立即支付</div>
      <div class="tips">我已阅读并同意
        <a href="#">服务协议</a>
      </div>
      <div class="service-icon" @click="handleServieClick">
        <img src="@/assets/images/icons/service@2x.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleServieClick() {
      this.$router.push("/system-service");
    }
  }
};
</script>
<style lang="less">
.payment-wrap {
  height: 100vh;
  background: #f1f1f1;
  overflow: hidden;
  .pay-info {
    width: 690px;
    height: 780px;
    background: #fff;
    margin: 289px auto 0;
    box-shadow: 1px 1px 10px 1px #ddd;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    .title {
      font-size: 36px;
      color: #414141;
      text-align: center;
      margin-top: 90px;
    }
    .sub-title {
      font-size: 26px;
      color: #b6b6b6;
      text-align: center;
    }
    .pay-title {
      text-align: center;
      color: #414141;
      font-size: 26px;
      margin-top: 50px;
    }
    .money {
      text-align: center;
      font-size: 48px;
      color: #4a90e2;
      margin-top: 3.75px;
    }
    .button {
      width: 550px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background: linear-gradient(left, #90deff, #87acff);
      border-radius: 50px;
      color: #fff;
      margin: 110px auto 0;
      font-size: 32px;
    }
    .tips {
      text-align: center;
      font-size: 24px;
      color: #b6b6b6;
      margin-top: 36px;
      a {
        color: #4a90e2;
      }
    }
    .service-icon {
      width: 76px;
      height: 77px;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -38px;
      box-shadow: 1px -1px 10px 1px #eee;
      border-top-left-radius: 38px;
      border-top-right-radius: 38px;
      text-align: center;
      img {
        display: inline-block;
        margin-top: 20px;
        width: 36px;
        height: 39px;
      }
    }
  }
}
</style>
