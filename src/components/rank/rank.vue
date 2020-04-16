<template>
  <div>{{formatLetter}}</div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return{
      letter:'kuaizi'
    }
  },
  computed:{
    formatLetter(){
      return this.letter.substring(0,1)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>