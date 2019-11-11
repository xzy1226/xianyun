export default {
  // 登录
  async login({commit},data){
    // 发送请求
    const res=await this.$axios.post("/accounts/login", data);
    // 提交数据
    commit('setUserInfo',res.data);
    return res
  },
  
  // 注册
  async register({commit},data){
    // 发送请求
    const res=await this.$axios.post("/accounts/register",data);
    // 提交数据
    commit('setUserInfo',res.data);
  },

  // 验证手机号码
  async validateCaptcha({commit},data){
    return await this.$axios.post('/captchas',data)
  },

  // 机票页面 接口
  // 获取推荐机票
  async getAirSale({commit}){
    return await this.$axios('/airs/sale')
  },

  // 查询实时机票城市
  async getSearchCity({commit},data){
    return await this.$axios("/airs/city",data)
  }
}