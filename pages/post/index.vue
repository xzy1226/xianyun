<template>
  <section class="container">
    <el-row type="flex" class="row-bg" justify="space-between">
      <div class="post-aside">
        <PostAside :data="citiesList" />
      </div>

      <div class="post-main">
        <!-- 搜索框 -->
        <PostSearch />

        <el-row type="flex" align="middle" justify="space-between" class="post-title">
          <h2>推荐攻略</h2>
          <el-button type="primary" icon="el-icon-edit" @click="$router.push('/post/create')">写游记</el-button>
        </el-row>

        <!-- 文章列表 -->
        <PostList />
      </div>
    </el-row>
  </section>
</template>

<script>
import PostAside from "@/components/post/postAside";
import PostSearch from "@/components/post/postSearch";
import PostList from "@/components/post/postList";

export default {
  components: { PostAside, PostSearch, PostList },
  data() {
    return {
      citiesList: [] // 城市列表
    };
  },
  async mounted() {
    const { data } = (await this.$store.dispatch("getPostCity")).data;
    this.citiesList = data;
    console.log(this.citiesList);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;

  .post-aside {
    width: 260px;
    font-size: 14px;
  }

  .post-main {
    width: 700px;

    .post-title {
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;

      h2 {
        position: relative;
        font-size: 18px;
        font-weight: normal;
        color: #ffa500;

        &::after {
          content: "";
          position: absolute;
          bottom: -19px;
          display: block;
          width: 100%;
          border-bottom: 2px solid #ffa500;
        }
      }
    }
  }
}
</style>