import { navTitleBridge, LSJavascriptBridgeInit } from "@/util/jsBridge";

export default {
    created() {
        let title = this.$route.meta.title;
        LSJavascriptBridgeInit(() => {
            navTitleBridge({title});
            if(typeof this.callApp == 'function'){
                this.callApp();
            }
        });
    },
    // activated(){
    //     //解决keepAlvie返回时  标题消失
    //     let title = this.$route.meta.title;
    //     LSJavascriptBridgeInit(() => {
    //         navTitleBridge({title});
    //         if(typeof this.callApp == 'function'){
    //             this.callApp();
    //         }
    //     });
    // }
}