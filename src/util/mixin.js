import { setAppNavTitle, LSJavascriptBridgeInit } from "@/util/appApi";

export default {
    created() {
        let title = this.$route.meta.title;
        console.log(title);
        LSJavascriptBridgeInit(() => {
            setAppNavTitle(title);
        });
    }
}