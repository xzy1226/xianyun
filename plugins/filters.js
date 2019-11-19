import Vue from 'vue';
import moment from "moment";

// 全局过滤器插件
export default () => {
  Vue.filter('formatTime',(val)=>{
    return moment(val).format("YYYY-MM-DD HH:mm");
  })
}

