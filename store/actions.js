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
  },

  // 获取机票列表
  async getAirs({commit},data){
    return await this.$axios('/airs',data)
  },

  // 获取选择机票
  async getChooseAirs({commit},data){
    const {id,seat_xid}=data
    return await this.$axios(`/airs/${id}`,{
      params: {
        seat_xid
      }
    })
  },

  // 提交机票表单
  async PostAirOrders({commit},data){
    const {token,orderData}=data
    return await this.$axios.post('/airorders',orderData,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 获取订单详情
  async getAirOrders({commit},data){
    const {id,token}=data
    return await this.$axios(`/airorders/${id}`,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 查询付款状态
  async checkPay({commit},res){
    const {data,token}=res
    return this.$axios.post('/airorders/checkpay',data,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 获取城市菜单列表
  async getPostCity({commit}){
    return this.$axios('/posts/cities')
  },

  //  获取文章列表
  async getPostList({commit},data){
    return this.$axios('/posts',data)
  },

  // 获取文章详情数据
  async getPostDetail({commit},data){
    return this.$axios('/posts/'+data)
  },

  // 获取文章收藏列表
  async getPostRecommend({commit}){
    return this.$axios('/posts/recommend')
  },

  // 点赞文章
  async getLikePost({commit},data){
    const {id,token}=data
    return this.$axios('/posts/like?id='+id,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 收藏文章
  async getStarPost({commit},data){
    const {id,token}=data
    return this.$axios('/posts/star?id='+id,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 获取文章评论
  async getPostComments({commit},data){
    return this.$axios('/posts/comments',data)
  },

  // 提交文章评论
  async postPostComments({commit},res){
    const {data,token}=res
    return this.$axios.post('/comments',data,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 上传图片
  async postUpload({commit},data){
    return this.$axios.post('/upload',data)
  },

  // 新增文章
  async postAddPost({commit},res){
    const {data,token}=res
    return this.$axios.post('/posts',data,{
      headers: {
        Authorization: `Bearer ${ token || 'NO TOKEN'}`
      }
    })
  },

  // 查找城市
  async getSearchCities({commit},data){
    return this.$axios('/cities?name=南京')
  },

  // 酒店选项
  async getHotelOption({commit}){
    return this.$axios('/hotels/options')
  },

  // 酒店详情
  async getHotelList({commit},url){
    return this.$axios('/hotels'+url)
  },

  // 酒店评论
  async getHotelComment({commit},data){
    return this.$axios('/hotels/comments',data)
  }
}