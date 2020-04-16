<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import {getSingerList} from '../../api/singer.js'
import {ERR_OK} from '../../api/config'
import Singer from '../../common/js/singer'
import ListView from '../../base/list-view/list-view'
import {mapMutations} from 'vuex'

const HOST_NAME = '热门'
const HOT_SINGER_LEN = 10


export default {
  data(){
    return {
      singers:[]
    }
  },
  created(){
    this._getSingerList()
  },
  methods:{
    //接受来自子组件派发的select事件,事件触发就执行selectSinger函数
    selectSinger(singer){
      //通过路由再跳转到对应的组件页面singer-detail
      this.$router.push({
        path:`/singer/${singer.id}`
      })

      //实现对mutation的提交，修改state，相当于this.$store.commit('setSinger',singer)
      this.setSinger(singer)
    },
    _getSingerList(){
      // qq音乐数据获取方式
      getSingerList().then((res)=>{
        if(res.code===ERR_OK){
          console.log('从qq音乐获取的歌手列表数据')
          // console.log(res.data)
          this.singers = this._normalizeSinger(res.data.list)
          // console.log(this.singers)
        }
      })
    },
    _normalizeSinger(list){
      let map = {
        hot:{
          title:HOST_NAME,
          items:[]
        }
      }
      list.forEach((item,index)=>{
        if(index<HOT_SINGER_LEN){
          map.hot.items.push(new Singer({
            id:item.Fsinger_mid,
            name:item.Fsinger_name
          })) 
        }

        const key = item.Findex
        if(!map[key]){
          map[key] = {
            title: key,
            items:[]
          }
        }
        map[key].items.push(new Singer({
            id:item.Fsinger_mid,
            name:item.Fsinger_name
        }))
        
      })

      //为了得到有序列表，需要把map处理，title应按照英文字母排序 其中有一个Findex:"9",这样的数据不要的
      let hot = []
      let ret = []
      // 把热点和其他分开
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title===HOST_NAME){
          hot.push(val)
        }
      }
      // 将其他的title按照A-Z排序
      ret.sort((a,b)=>{
        return a.title.charCodeAt(0)-b.title.charCodeAt(0)
      })

      return hot.concat(ret)
    },
    // 把mutations的方法做一个对象映射
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  },
  components:{
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%    
</style>