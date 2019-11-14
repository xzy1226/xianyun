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
    
    airsHistory: []  // 用户查询机票历史
  }
}