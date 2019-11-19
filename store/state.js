/*
  状态对象
 */

export default ()=>{
  return {
    // 用户信息
    userInfo: {
      token: '',
      user: {}
    },
    
    airsHistory: [],  // 用户查询机票历史
    allPrice: 0,      // 订单总价
    usersLen: 1,       // 乘客数量
    draftBox: []       // 草稿箱
  }
}