/*
直接更新state的多个方法的对象
 */

export default {
  // 保存用户 数据
  setUserInfo(state, data) {
    state.userInfo = data
  },
  // 退出登录，
  clearUserInfo(state){
    // 清除本地数据
    localStorage.removeItem('userInfo');
    // 重置userInfo
    state.userInfo = {}
  }
}