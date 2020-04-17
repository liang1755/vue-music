<!--
* @description no description
* @fileName player.vue
* @author liyang
* @date 2020/04/17 16:26:23
* @version V1.0.0
!-->
<template>
  <div class="player" v-show="playList.length">
    <div class="normal-player"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'currentIndex',
      'playList'
    ])
  }
}
</script>

<style  lang="stylus" scoped rel="stylesheet/stylus">
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
  }
}
</style>