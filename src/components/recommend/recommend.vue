<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="playList" ref="scroll">
      <div>
        <div v-if="bannerList.length" class="slider-wrapper">
          <slider>
            <div class="item" v-for="item in bannerList" :key=item.key>
              <a :href="item.url"><img :src="item.pic" alt="" @load="loadImg"></a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in playList" class="item" :key=item.key>
              <div class="icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.creator.nickname"></p>
              </div>
            </li>
          </ul>    
        </div>
      </div>
      <div class="loading-container">
        <loading title="loading..." v-show="!playList.length"></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import Scroll from '../../base/scroll/scroll'
import Slider from '../../base/slider/slider'
import Loading from '../../base/loading/loading'
// import {getRecommend,getBanner} from '../../api/recommend'
import {ERR_OK} from '../../api/config'
export default {
  data(){
    return {
      bannerList:[],
      playList:[],
      imgLoaded:false
    }
  },
  created(){
    // this._getRecommend()
    // setTimeout(()=>{
      this._getBanner()
    // },1000)
    setTimeout(()=>{
      this._getPlayList()
    },2000)
    
  },
  filters:{
    // lenTen(value){
    //   return value.slice(0,20)+'...'
    // }
  },
  methods:{
    // _getRecommend(){
    //   getRecommend().then((res)=>{
    //     if(res.code===ERR_OK){
    //       console.log(res.focus.data.content)
    //     }
    //   })
    // },
    _getBanner(){
      let _this = this
      axios.get('http://localhost:3000/banner',{
        params:{
            type:2
        }
      }).then(function(res){
          // console.log(res.data.banners)
          _this.bannerList = res.data.banners
      })
    },
    _getPlayList(){
      let _this = this
      axios.get('http://localhost:3000/top/playlist',{
        params:{
            limit:10,
            order:'new'
        }
      }).then(function(res){
        // console.log(res.data)
        _this.playList = res.data.playlists
      })
    },
    loadImg(){
      //做一次判断，一旦有一张图片加载说明slider高度撑开，refresh整个scroll就可以了
      if(!this.imgLoaded){
        this.$refs.scroll.refresh()
        this.imgLoaded = true
      }
    }
  },
  components:{
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        // height: 0
        // padding-top: 40%
        // overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
              white-space nowrap
              overflow hidden                              
            .desc
              color: $color-text-d
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>