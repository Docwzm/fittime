<template>
    <div class="special-wrap">
        <div class="banner"></div>
        <div class="description">
            <p>在家健身 時，有沒有經曆過被樓下鄰居，隔壁的室友投訴？這真是讓人尷尬呢。本期專題的課程設計靈感就來自於此。 </p>
            <p>為什麼減脂訓練動靜都這麼大？</p>
            <p>燃脂訓練的原理是通過運動擴大熱量的消耗，訓練邊拍通常需要具備三個要素： </p>
            <p>大幅度的身體重心移動</p>
            <p>更多的肌肉群參與</p>
            <p>有氧和無氧的結合</p>
            <p>要結合這三點，最直接的方式就是加入大量的跳躍動作，動靜自然就大了。 </p>
            <p>如何安安靜靜地減脂？ </p>
            <p>即使沒有跳躍動作，通過蹲起、平移、旋轉等動作模式，以及站姿、俯臥支撐等姿勢的切換，同樣可以達到上述的三個條件，一樣有不錯的減脂效果。</p>
        </div>
        <div class="list-content">
            <list-item></list-item>
        </div>
        <div class="all-course">
            <img src="@/assets/images/icons/right@2x.png"/>
            <span>查看所有课程</span>
        </div>
    </div>
</template>

<script>
import mixin from '@/util/mixin';
import ListItem from '@/components/ListItem'

export default {
    name:'courseSpecial',
    data(){
        return {

        }
    },
    mixins:[mixin],
    components: {
        'list-item': ListItem
    },
    created(){
        
    },
    methods:{

    }
}
</script>

<style lang="less">
    .special-wrap{
        .banner{
            height: 270px;
            background: #f5f5f5;
        }
        .description{
            width: 684px;
            margin: 0 auto;
            padding: 15px 0;
            box-sizing: border-box;
            p{
                font-size: 28px;
                color: #414141;
            }
        }
        .list-content{
            margin-top: 80px;
        }
        .all-course{
            font-size: 26px;
            text-align: center;
            padding-bottom: 60px;
            padding-top: 40px;
            color: #414141;
            img{
                display: inline-block;
                width: 30px;
                height: 30px;
                vertical-align: middle
            }
            span{
                vertical-align: middle
            }

        }
    }
</style>