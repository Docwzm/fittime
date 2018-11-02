window.getCookie = function(name) {
  if(name=='token' && sessionStorage.token){
    return sessionStorage.token
  }
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
window.delCookie = function(name) {
  if(name=='token'){
    sessionStorage.removeItem('token');
  }
  var date = new Date();
  date.setTime(date.getTime() - 10000);
  document.cookie = name + "=a; expires=" + date.toGMTString();
}
window.setCookie = function(name, value) {
  if(name=='token'){
    sessionStorage.token = value;
  }
  var Days = 7
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie =
    name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}