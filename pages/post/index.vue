<template>
  <section class="container">
    <el-row type="flex" class="row-bg" justify="space-between">

    <div class="post-aside">
      <PostAside :data="citiesList"/>
    </div>

    <div class="post-main">
      <PostSearch />
      <div class="post-content">

      </div>
    </div>
    </el-row>
  </section>
</template>

<script>
import PostAside from '@/components/post/postAside';
import PostSearch from '@/components/post/postSearch'
export default {
  components: {PostAside,PostSearch},
  data() {
    return {
      citiesList: []
    }
  },
  async mounted() {
    const {data}=(await this.$store.dispatch('getPostCity')).data
    this.citiesList=data
    console.log(this.citiesList);
  },
}
</script>

<style lang="less" scoped>
  .container{
    width: 1000px;
    margin: 20px auto;

    .post-aside{
      width: 260px;
      font-size: 14px;
    }

    .post-main{
      width: 700px;
    }
  }
</style>