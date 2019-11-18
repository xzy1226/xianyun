<template>
  <section class="container">
    <el-row type="flex"  justify="space-between">
      <div class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>

        <h1>{{post.title}}</h1>
        <div class="post-info">
          <span>攻略：{{post.updated_at | formatTime}}</span>
          <span>阅读：{{post.watch}}</span>
        </div>
        <div class="post-content" v-html="post.content"></div>
        <div class="post-ctrl">
            <div class="ctrl-item">
              <i class="iconfont icon-pinglun"></i>
              <p>评论 ({{post.comments.length}})</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont icon-shoucang"></i>
              <p>收藏</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont icon-fenxiang-1"></i>
              <p>分享</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont icon-dianzan"></i>
              <p>点赞({{post.like || 0}})</p>
            </div>
        </div>

        <DetailComments />
      </div>
      <DetailAside />
    </el-row>
  </section>
</template>

<script>
import DetailAside from "@/components/post/detailAside";
import DetailComments from '@/components/post/detailComments';
import moment from "moment";
export default {
  components: { DetailAside ,DetailComments},
  data() {
    return {
      // 文章详情数据
      post: {
        comments: []    
      }
    };
  },
  async mounted() {
    // 获取文章详情数据
    const { id } = this.$route.query;
    const { data } = await this.$store.dispatch("getPostDetail", id);
    this.post = data
  },
  filters: {
    // 过滤时间格式
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD hh:mm");
    }
  }
};
</script>

<style lang="less" scoped>
@import url('http://at.alicdn.com/t/font_1514501_s6ru3tuzl.css');
.container {
  width: 1000px;
  margin: 20px auto;

  .main {
    width: 700px;

    h1 {
      font-size: 32px;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }

    .post-info {
      padding: 20px;
      text-align: right;
      color: #999;

      span {
        margin-left: 10px;
      }
    }

    .post-content {
      width: 700px;

      /deep/span {
        /deep/img {
          width: 100%;
          height: auto;
          object-fit: cover;
          margin-top: 10px;
        }
      }
    }

    .post-ctrl{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px 0 30px;

      .ctrl-item{
        padding: 0 25px;
        text-align: center;
        cursor: pointer;
        i{
          display: block;
          font-size: 30px;
          color: #ffa500;
        }
        p{
          font-size: 14px;
          color: #999;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>