/*
vuex最核心的管理对象store
 */
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


export const createstore=()=>{
  return new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
  })
} 