import { playMode } from '../common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  currentIndex: -1,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence
}

export default state