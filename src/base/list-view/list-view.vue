<!-- 此组件为歌手页子组件 -->
<template>
    <scroll class="listview"
            ref="listview"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            :probeType="probeType"
            :data="data">
        <ul>
            <li class="list-group" 
                v-for="(group,index) in data" 
                :key="index"
                ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" 
                        v-for="(item,index) in group.items" 
                        :key="index"
                        @click="selectItem(item)">
                        <img v-lazy="item.avatar" alt="" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" 
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchmove.stop.prevent="onShortcutTouchMove"
            @touchend.stop>
            <ul>
                <li v-for="(item,index) in shortcutList" 
                    :data-index="index" 
                    class="item" 
                    :key="index"
                    :class="{'current':currentIndex===index}">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>


<script type="text/ecmascript-6">
import Scroll from '../scroll/scroll'
import {getData} from '../../common/js/dom'
import Loading from '../loading/loading'

// 定义左侧每一项标题高度和右侧字母锚点列高度
const TITLE_HEIGHT = 30
const ANCHOR_HEIGHT = 18

    export default {
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                currentIndex:0,
                scrollY:-1,
                // diff是每一个item项高度上限与scrollY的差值
                diff:-1
            }
        },
        created(){
            this.touch = {},
            this.listHeight=[],
            this.listenScroll = true
            this.probeType = 3
        },
        computed:{
            shortcutList(){
                return this.data.map((group)=>{
                    return group.title.substr(0,1)
                })
            },
            fixedTitle(){
                if(this.scrollY>0){
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        watch:{
            data(){
                setTimeout(()=>{
                    this._calculateHeight()
                },20)
            },
            scrollY(newY){
                const listHeight = this.listHeight
                // 当滚动到最顶部的时候
                if(newY>0){
                    this.currentIndex = 0

                    // console.log(this.currentIndex)
                    return
                }
                // 在中间部分滚动时
                for(let i=0; i<listHeight.length-1; i++){
                    let height1 = listHeight[i]
                    let height2 = listHeight[i+1]
                    if(-newY>=height1 && -newY<height2){
                        this.currentIndex = i
                        // scrollY（newY）是负值，相加实际上是在做减法
                        this.diff = height2+newY

                        // console.log(this.diff)
                        // console.log(this.currentIndex)
                        return 
                    }
                }

                // 当滚动到底部时
                this.currentIndex = listHeight.length-2
            },
            diff(newVal){
                let fixedTop = (newVal>0 && newVal<TITLE_HEIGHT) ? (newVal - TITLE_HEIGHT) : 0
                if(this.fixedTop===fixedTop){
                    return
                }
                // console.log(fixedTop)
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        },
        methods:{
            onShortcutTouchStart(e){
                // 获取点击字母所对应的索引anchorIndex以及页面位置的y坐标
                let anchorIndex = getData(e.target,'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                // this.currentIndex = anchorIndex
                // console.log("点击页面纵坐标的值"+this.touch.y1)
                this._scrollTo(anchorIndex)
            },
            onShortcutTouchMove(e){
                const firstTouch = e.touches[0]
                this.touch.y2 = firstTouch.pageY
                let delta = (this.touch.y2-this.touch.y1) / ANCHOR_HEIGHT | 0
                let anchorIndex = parseInt(this.touch.anchorIndex) + delta
                this._scrollTo(anchorIndex)
            },
            scroll(pos){
                // 当页面发生滚动时
                this.scrollY = pos.y
                
                // console.log("页面此时纵坐标方向滚动距离"+this.scrollY)
            },
            refresh(){
                this.$refs.listview.refresh()
            },
            _scrollTo(index){
                if(!index && index !== 0){
                    return
                }
                if(index<0){
                    index=0
                }else if(index>this.listHeight.length-2){
                    index = this.listHeight.length-2
                }
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
                this.scrollY = this.$refs.listview.scroll.y
                // console.log("歌手列表滚动坐标"+this.scrollY)
            },
            _calculateHeight(){
                // 计算并存储每一个歌手title到页面顶部的距离
                this.listHeight = []
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    height += list[i].clientHeight
                    this.listHeight.push(height)
                }
            },
            //点击每一个item就派发select事件给父组件 singer.vue，具体的让父组件处理
            selectItem(item){
                this.$emit('select',item)
            }
        },
        components:{
            Scroll,
            Loading
        }
    }

</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>