export default {
    activated(){
        let name = this.$route.name;
        // let el = document.body || document.documentElement;
        document.body.scrollTop = this._d.domTopList[name];
    },
    deactivated() {
        let name = this.$route.name;
        let el = document.body || document.documentElement;
        this._d.domTopList[name] = el.scrollTop;
    }
}