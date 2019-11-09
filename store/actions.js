export default {
  //登录
  async login({commit},data){
    // 发送请求
    const res=await this.$axios.post("/accounts/login", data);
    // 提交数据
    commit('setUserInfo',res.data);
    return res.data;
  },
  //注册
  async register({commit},data){
    //发送请求
    const res=await this.$axios.post("/accounts/register",data);
    commit('setUserInfo',res.data);
    return res.data;
  },

  //验证手机号码
  async validateCaptcha({commit},data){
    return await this.$axios.post('/captchas',data)
  }
}