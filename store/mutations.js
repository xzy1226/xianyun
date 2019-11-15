/*
直接更新state的多个方法的对象
 */

export default {
  // 保存用户 数据
  setUserInfo(state, data) {
    state.userInfo = data
  },

  // 更新用户查询机票数据
  setAirsHistory(state,data){
    state.airsHistory.unshift(data)
  },

  // 更新订单总价
  setAllPrice(state,data){
    const {price,len}=data;
    state.allPrice=price;
    state.usersLen=len
  }
}