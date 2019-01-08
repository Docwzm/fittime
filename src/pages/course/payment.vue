
<template>
    <div class="payment-wrap">
        <div class="background"></div>
        <div class="pay-info">
            <div class="title">购买该课程1年试用期</div>
            <div class="sub-title">1次购买，1年内随意训练</div>
            <div class="pay-title">支付金额</div>
            <div class="money"><span>￥</span>99.00</div>
            <div class="button">立即支付</div>
            <div class="tips">我已阅读并同意<a href='#'>服务协议</a></div>
            <div class="service-icon" @click="handleServieClick"><img src='@/assets/images/icons/service@2x.png'/></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        handleServieClick(){
            this.$router.push('/system-service')
        }
    },
}
</script>
<style lang="less">
    .payment-wrap{
        .background{
            height: 8.8rem;
            background: #f5f5f5;
        }
        .pay-info{
            width: 9.2rem;
            height: 10rem;
            background: #fff;
            margin: -3.786rem auto 0;
            box-shadow: 1px 1px 10px 1px #ddd;
            border-radius: .16rem;
            overflow: hidden;
            position: relative;
            .title{
                font-size: .48rem;
                color: #414141;
                text-align: center;
                margin-top: 1.2rem
            }
            .sub-title{
                font-size: .342rem;
                color: #B6B6B6;
                text-align: center;
            }
            .pay-title{
                text-align: center;
                color: #414141;
                font-size: .342rem;
                margin-top: .666rem;
            }
            .money{
                text-align: center;
                font-size: .64rem;
                color: #4A90E2;
                margin-top: .1rem;
            }
            .button{
                width: 7.333rem;
                height: 1.333rem;
                line-height: 1.333rem;
                text-align: center;
                background: linear-gradient(left,#90DEFF,#87ACFF);
                border-radius: .6665rem;
                color: #fff;
                margin: 1.466rem auto 0;
                font-size: .4266rem;
            }
            .tips{
                text-align: center;
                font-size: .32rem;
                color: #B6B6B6;
                margin-top: .48rem;
                a{
                    color: #4A90E2
                }
            }
            .service-icon{
                width: 1.013rem;
                height: 1.04rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -0.5065rem;
                box-shadow: 1px -1px 10px 1px #eee;
                border-top-left-radius: .5065rem;
                border-top-right-radius: .5065rem;
                text-align: center;
                line-height: 1.4rem;
                img{
                    display: inline-block;
                    width: .5333rem;
                    height: .5333rem;
                }
            }
        }
    }
</style>
