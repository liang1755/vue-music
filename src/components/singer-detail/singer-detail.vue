<template>
  <transition name="slide" appear>
    <music-list class="singer-detail" :bgImage="avatar" :songs="songs" :title="title"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import { createSong, isValidMusic, processSongsUrl } from '../../common/js/song'
import MusicList from '../music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    avatar () {
      return this.singer.avatar
    }
  },
  created () {
    this._getDetail()
    // console.log(this.singer)
  },
  methods: {
    _getDetail () {
      // 边界情况处理，如果用户在歌手详情页刷新了，则跳转到歌手列表页
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {

        console.log(res.data.list.length)
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            // console.log(songs)
            this.songs = songs
          })
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        //对象的解构赋值
        // let {musicData} = item 
        if (isValidMusic(item.musicData)) {
          ret.push(createSong(item.musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>