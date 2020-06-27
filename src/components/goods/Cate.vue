<template>
  <div>
      <breadcrumb><slot slot="left">商品管理</slot><slot slot="right">商品分类</slot></breadcrumb>
      <cate-card></cate-card>
  </div>
</template>

<script>
import Breadcrumb from '../common/Breadcrumb'
import CateCard from './children/CateCard'
export default {
  name: 'Cate',
  components: {
    Breadcrumb,
    CateCard
  },
  data() {
    return {

    }
  }
}

</script>

<style scoped>

</style>
