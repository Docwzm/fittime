<template>
    <div>
        <button @click="handleShare">分享</button>
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
    
</style>