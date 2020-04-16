// getters 最终还是映射到 computed,也就是通过getters取数据需要在组件的computed中写
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const currentIndex = state => state.currentIndex
export const playList = state => state.playList
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}