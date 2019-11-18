<template>
  <div class="aside">
    <h2 class="aside-title">相关攻略</h2>
    <div class="recommend-list">
      <nuxt-link to="/post/detail" class="recommend-item" 
      v-for="(item, index) in recommendList" :key="index">
        <img :src="item.images[0]" alt="" class="post-cover">
        <div class="post-text">
          <div class="post-title">{{item.title}}</div>
          <p>{{item.updated_at | formatTime}} 阅读{{item.watch}}</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      recommendList: []     //收藏文章列表
    }
  },
  async mounted() {
    // 获取收藏文章列表数据
    const {data}=(await this.$store.dispatch('getPostRecommend')).data
    this.recommendList=data;
  },
  filters: {
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD hh:mm");
    }
  }
}
</script>

<style lang="less" scoped>
  .aside{
    width: 280px;

    &-title{
      font-size: 18px;
      font-weight: normal;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }

    .recommend-list{
      .recommend-item{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #ddd;

        .post-cover{
          width: 100px;
          height: 80px;
          object-fit: cover;
          margin-right: 10px;
        }

        .post-text{
          flex: 1;
          position: relative;

          .post-title{
            position: absolute;
            top: 0;
            left: 0;

            width: 100%;
            font-size: 14px;
            line-height: 1.5em;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }

          p{
            position: absolute;
            bottom: 0;
            left: 0;

            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
</style>