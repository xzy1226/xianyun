import axios from 'axios';
export default {
  //登录
  async login({commit},data){
    try {
      const res=await axios.post("/accounts/login", data);
      commit('setUserInfo',res.data)
      return res.data;
    } catch (e) {
      if (e.response.status === 401) {
        this.$message({
          message: e.response.message,
          type: "error"
        })
      }
    }
  }
}