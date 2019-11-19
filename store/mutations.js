/*
直接更新state的多个方法的对象
 */
import {
  Message
} from "element-ui";

export default {
  // 保存用户 数据
  setUserInfo(state, data) {
    state.userInfo = data
  },

  // 更新用户查询机票数据
  setAirsHistory(state, data) {
    state.airsHistory.unshift(data)
  },

  // 更新订单总价
  setAllPrice(state, data) {
    const {
      price,
      len
    } = data;
    state.allPrice = price;
    state.usersLen = len
  },

  // 保存草稿箱
  setDraftBox(state, data) {
    // 检查传过来的数据是否已存在，返回索引，没有则返回-1
    const index = state.draftBox.findIndex(el => el.date == data.date)
    console.log(index);
    index >= 0 ? state.draftBox.splice(index, 1, data) : state.draftBox.unshift(data);
    Message.warning('保存成功')
  },

  // 从草稿箱中移除
  removeDraftBox(state,data){
    // 检查传过来的数据是否已存在，返回索引，没有则返回-1
    const index = state.draftBox.findIndex(el => el.date == data.date)
    console.log(index);
    state.draftBox.splice(index, 1)
  }
}
