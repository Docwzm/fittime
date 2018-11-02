import Vue from 'vue'
Vue.filter('dateFormat', function(value,str) {
  return new Date(value).formatDate(str);
});