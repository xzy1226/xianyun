export default {
  //登录
  async login({commit},data){
    try {
      // 发送请求
      const res=await this.$axios.post("/accounts/login", data);
      // 提交数据
      commit('setUserInfo',res.data);
      return res.data;
    } catch (e) {
      const {statusCode,message}=e.response.data
      if (statusCode === 400) {
        //提示信息
        this._vm.$message({
          message: message,
          type: "error"
        })
        throw e.response;
      }
    }
  },
  //注册
  async register({commit},data){
    try {
      //发送请求
      const res=await this.$axios.post("/accounts/register",data);
      //提交数据
      commit('setUserInfo',res.data);
      return res.data;
    } catch (e) {
      throw e.response;
    }
  },

  //验证手机号码
  async validateCaptcha({commit},data){
    return await this.$axios.post('/captchas',data)
  }
}