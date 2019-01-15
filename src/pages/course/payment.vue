
<template>
  <div class="payment-wrap">
    <div class="pay-info">
      <div class="title">购买该课程1年试用期</div>
      <div class="sub-title">1次购买，1年内随意训练</div>
      <div class="pay-title">支付金额</div>
      <div class="money">
        <span>￥</span>
        {{orderInfo.price}}
      </div>
      <div class="button" @click="handlePayment">立即支付</div>
      <div class="tips">
        <img v-if="checked" src="@/assets/images/icons/ic_multiselect_normal_ck@2x.png" alt>
        <img v-else src="@/assets/images/icons/ic_multiselect_normal@2x.png">
        <span @click="handleChecked">我已阅读并同意</span>
        <a href="/#/system-agreement">服务协议</a>
      </div>
      <div class="service-icon" @click="handleServieClick">
        <img src="@/assets/images/icons/service@2x.png">
      </div>
    </div>
  </div>
</template>
<script>
import { payInfo, createOrder, buyCourse } from "@/api/course";
import {
  LSJavascriptBridgeInit,
  navigationButtonsBridge,
  registerCallbackHandler,
  navTitleBridge
} from "@/util/jsBridge";
export default {
  data() {
    return {
      checked: false,
      btnState: true,
      orderInfo: {}
    };
  },

  created() {
    let id = this.$route.params.id;
    this.crriculumId = id;
    this.actionPayInfo(id);
    window.global_wxpaycallback = this.wxpaycallback.bind(this, id);
  },

  mounted() {
    LSJavascriptBridgeInit(() => {
      navTitleBridge({
        title: "购买介绍",
        autoResetToDefaultConfigWhtenOpenLink: true,
        tintColorType: 2,
        backButtonType: 1,
        topPadding: 64,
        barLineHidden: false,
        color: { red: 255, green: 255, blue: 255, alpha: 255 }
      });
      this.registeNavButton()
    });
  },

  methods: {
    //服务协议
    handleServieClick() {
      this.$router.push("/system-service");
    },

    //阅读服务协议
    handleChecked() {
      this.checked = !this.checked;
    },

    //发起支付
    handlePayment() {
      const { checked, btnState, crriculumId, orderInfo } = this;
      if (checked) {
        if (btnState) {
          this.actionCreateOrder({
            crriculumId,
            price: orderInfo.price,
            source: 6
          });
        }
      } else {
        this.$vux.toast.text("请先阅读并同意服务协议");
      }
    },

    //支付成功的回调
    wxpaycallback(id) {
      if (code == 0) {
        this.actionBuyCourse(id);
        this.$vux.toast.text("支付成功");
        setTimeout(()=>{
          this.$router.push("/course-detail/"+id);
        },1000)
      } else {
        this.$vux.toast.text("支付失败");
        return;
      }
    },

    //根据课程ID获取支付信息
    actionPayInfo(id) {
      payInfo(id).then(res => {
        if (res.code === 200) {
          this.orderInfo = res.data;
        }
      });
    },

    //创建订单
    actionCreateOrder(data) {
      this.btnState = false;
      this.$vux.loading.show({
        text: "订单提交中"
      });
      createOrder(data)
        .then(res => {
          if (res.code === 200) {
            this.btnState = true;
            this.$vux.loading.hide();
            this.callWxPay(res.data);
          }
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.btnState = true;
        });
    },

    //购买完成，加入到我的功课
    actionBuyCourse(id) {
      buyCourse(id).then(res => {
        if (res.code === 200) {
          this.$vux.toast.text("购买成功");
        }
      });
    },

    //通知APP拉起微信支付
    callWxPay(appData) {
      if (typeof lxPayDelegate !== "undefined") {
        this.isPaying = true;
        const { appid, nonceStr, partnerid, paySign, prepayid, timestamp, orderId } = appData
        let appDataPay = {
            partnerId: partnerid,
            orderId: orderId,
            prepayId: prepayid,
            signType: "Sign=WXPay",
            nonceStr: nonceStr,
            timeStamp: timestamp,
            paySign: paySign,
            callback: 'global_wxpaycallback',
        }
        lxPayDelegate.sendWxPayRequest(JSON.stringify(appDataPay));
      } else {
        this.isPaying = false;
        this.$vux.toast.text("当前APP不支持微信支付");
      }
    },

    registeNavButton() {
      let self = this;
      let button1 = {
        title: "服务协议", // 按钮title
        buttonId: "btnOrderList", // 按钮唯一Id
        callbackHandlerName: "ButtonCallBack", // 事件回调函数名
        callback: () => self.$router.push("/system-agreement")
      };
      let buttons = new Array(button1);
      //设置导航栏按钮
      navigationButtonsBridge(buttons);
    }
    
  }
};
</script>
<style lang="less">
.payment-wrap {
  height: 100vh;
  background: url("../../assets/images/pay_bg@2x.jpg") top #f1f1f1;
  background-size: 100%;
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
      display: flex;
      justify-content: center;
      img {
        display: inline-block;
        width: 34px;
        height: 34px;
        vertical-align: middle;
        margin-right: 10px;
      }
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
