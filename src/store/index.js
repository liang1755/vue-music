import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import state from './states'
import mutations from './mutations'

// vuex提供一个可以打印通过state修改的插件plugin,prestate/nextstate
import createLogger from 'vuex/dist/logger'

// 注册vuex插件
Vue.use(Vuex)

// 添加调试工具，查看是否是通过state修改的,这个是会有一定性能损耗，只线下开发调试，不做线上
const debug = process.env.NODE_ENV !=='production' 



// export一个vuex实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,  //线上需得关掉
    plugins:debug ? [createLogger()] : []
})