import Vue from 'vue'
let _g = {}
_g.getuuid = function () {
  return new Date().getTime();
  // return uuid.v1().replace(/-/g, '')
}
_g.millisecondToDate = function(msd) {
  let _arr =[0,0,0];
  let _s = [1000*60*60*24,1000*60*60,1000*60]
  _arr[0] = Math.floor(msd/_s[0]);
  _arr[1] = Math.floor((msd-_s[0]*_arr[0])/_s[1]);
  _arr[2] = Math.floor((msd-_s[0]*_arr[0]-_s[1]*_arr[1])/_s[2]);
  return _arr;
}
_g.award = {
  '110':{title:'乐心手环',name:'乐心28天减脂营',imgUrl:require('../assets/award/110.png'),price:'998'},
  '111':{title:'Softie',name:'超细毛电动牙刷 ',imgUrl:require('../assets/award/111.png'),price:'499'},
  '112':{title:'非糖',name:'非糖减脂3日餐',imgUrl:require('../assets/award/112.png'),price:'258'},
  '11301':{title:'橙子快跑',name:'全麦面包',imgUrl:require('../assets/award/11301.png'),price:'39.9'},
  '11302':{title:'橙子快跑',name:'黑麦面包',imgUrl:require('../assets/award/11302.png'),price:'39.9'},
  '11303':{title:'橙子快跑',name:'抹茶面包',imgUrl:require('../assets/award/11303.png'),price:'39.9'},
  '11304':{title:'橙子快跑',name:'代餐宝宝',imgUrl:require('../assets/award/11304.png'),price:'38.8'},
  '11305':{title:'橙子快跑',name:'鸡胸肉套装',imgUrl:require('../assets/award/11305.png'),price:'99'},
  '11306':{title:'橙子快跑',name:'鸡胸肉肠',imgUrl:require('../assets/award/11306.png'),price:'49.9'},
  '11307':{title:'橙子快跑',name:'代餐饼干',imgUrl:require('../assets/award/11307.png'),price:'49.9'},
  '11308':{title:'橙子快跑',name:'紫薯魔芋代餐粥',imgUrl:require('../assets/award/11308.png'),price:'49.9'},
  '11309':{title:'橙子快跑',name:'果酱组合',imgUrl:require('../assets/award/11309.png'),price:'28'},
  '11310':{title:'橙子快跑',name:'魔芋面套装',imgUrl:require('../assets/award/11310.png'),price:'39.9'},
  '11311':{title:'橙子快跑',name:'三色餐包',imgUrl:require('../assets/award/11311.png'),price:'32.8'},
  '114':{title:'优惠码',doc:'仅限乐心Ziva Plus',imgUrl:require('../assets/award/114.png'),link:'https://h5.youzan.com/v2/goods/3emr4z0ko34x5'},
  '115':{title:'优惠码',doc:'仅限Softie 超细毛电动牙刷 ',imgUrl:require('../assets/award/115.png'),link:'https://h5.youzan.com/v2/goods/3nj0t8wgqflc9'},
  '116':{title:'优惠码',doc:'仅限非糖3日减脂体验餐',imgUrl:require('../assets/award/116.png'),link:'https://h5.youzan.com/v2/goods/2xbgfhqqgbx0p'},
  '117':{title:'优惠码',doc:'仅限橙子快跑·紫薯魔芋代餐粥500g',imgUrl:require('../assets/award/117.png'),link:'https://h5.youzan.com/v2/goods/35wm4wloz09nt'},
  '118':{title:'优惠码',doc:'仅限橙子快跑·全麦面包600g',imgUrl:require('../assets/award/118.png'),link:'https://h5.youzan.com/v2/goods/2g2obaoth70g9'},
  '119':{title:'优惠码',doc:'仅限橙子快跑·鸡胸肉套装108g*10',imgUrl:require('../assets/award/119.png'),link:'https://h5.youzan.com/v2/goods/2xbhmz2wje4ux'},
  '120':{title:'长按保存图片或识别二维码',doc:'仅限乐心减脂营2天课',imgUrl:require('../assets/award/120.png')},
},


Vue.prototype._g = _g;