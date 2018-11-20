import { setAppNavTitle, LSJavascriptBridgeInit } from "@/util/appApi";

export default {
    created() {
        let title = this.$route.meta.title;
        LSJavascriptBridgeInit(() => {
            setAppNavTitle(title);
        });
    }
}