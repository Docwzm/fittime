<template>
    <div>
        <div class="demo-btn" @click="handleShare">分享</div>
    </div>
</template>

<script>
import mixin from '@/util/mixin';
import {courseShareBridge} from '@/util/jsBridge';

export default {
    name:'courseDetail',
    data(){
        return {

        }
    },
    mixins:[mixin],
    created(){

    },
    methods:{
        handleShare(){
           courseShareBridge({
               "count": 45,
                "time": 18
           },this.callbackShare)
        },
        callbackShare(res){
            alert(res)
        }
    }
}
</script>

<style lang="less">
    .demo-btn{
        width: 100px;
        height: 50px;
        border: 1px solid #bbb;
        margin: 50px auto;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
    }
</style>