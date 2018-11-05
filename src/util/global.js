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
 
},


Vue.prototype._g = _g;