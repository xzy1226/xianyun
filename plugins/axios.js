import {Message} from "element-ui";

// 使用axios的拦截器拦截页面的所有请求错误
export default ({$axios, redirect})=>{
  $axios.onError(err=>{
    const {statusCode,message}=err.response.data;

    statusCode===400 && Message.warning({message})
  })
}