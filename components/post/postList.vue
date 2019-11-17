<template>
  <div class="post-wrapper">
    <div v-if="total">
      <div v-for="(item, index) in postList" :key="index">
        <!-- 左右布局， 只有一张图片 -->
        <el-row
          v-if="item.images.length==1"
          type="flex"
          align="middle"
          justify="space-between"
          class="post-list-cross post-list"
        >
          <div class="cover">
            <nuxt-link :to="`/post/detail?id=${item.id}`">
              <img :src="item.images[0]" alt srcset />
            </nuxt-link>
          </div>
          <div class="post-content">
            <h3>
              <nuxt-link :to="`/post/detail?id=${item.id}`">{{item.title}}</nuxt-link>
            </h3>
            <p>
              <nuxt-link :to="`/post/detail?id=${item.id}`">{{item.summary}}</nuxt-link>
            </p>

            <el-row type="flex" align="middle" justify="space-between" class="post-info">
              <div class="info-left">
                <div class="city">
                  <i class="el-icon-location-outline"></i>
                  {{item.cityName}}
                </div>
                <el-row type="flex" align="middle" justify="space-between" class="user">
                  by
                  <img
                    :src="$axios.defaults.baseURL+item.account.defaultAvatar"
                    alt
                    class="avatar"
                  />
                  <span class="username">
                    <a href="#">{{item.account.nickname}}</a>
                  </span>
                </el-row>
                <div class="read">
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </div>
              </div>
              <div class="like">{{item.like || ''}} 赞</div>
            </el-row>
          </div>
        </el-row>

        <!-- 上下布局 图片多余一张 -->
        <div class="post-list-vertical post-list" v-else>
          <h3>
            <nuxt-link :to="`/post/detail?id=${item.id}`">{{item.title}}</nuxt-link>
          </h3>
          <p>
            <nuxt-link :to="`/post/detail?id=${item.id}`">{{item.summary}}</nuxt-link>
          </p>
          <el-row class="cover" type="flex" align="middle" justify="space-between">
            <nuxt-link
              :to="`/post/detail?id=${item.id}`"
              v-for="(item, index) in item.images"
              :key="index"
            >
              <img :src="item" alt srcset />
            </nuxt-link>
          </el-row>
          <el-row type="flex" align="middle" justify="space-between" class="post-info">
            <div class="info-left">
              <div class="city">
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}
              </div>
              <el-row type="flex" align="middle" justify="space-between" class="user">
                by
                <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt class="avatar" />
                <span class="username">
                  <a href="#">{{item.account.nickname}}</a>
                </span>
              </el-row>
              <div class="read">
                <i class="el-icon-view"></i>
                {{item.watch}}
              </div>
            </div>
            <div class="like">{{item.like || ''}} 赞</div>
          </el-row>
        </div>
      </div>

      <!-- 分页组件 -->
      <el-pagination
        class="paging"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-row v-else type="flex" align="middle" justify="center" style="margin-top: 100px">
      <h2>您的数据不存在！！！</h2>
    </el-row>

    <input type="hidden" v-model="handleGetList" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: [], // 文章列表
      pageIndex: 1, // 当前页码
      pageSize: 3, // 当前页数
      total: 0 // 文章总数
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
    }
  },
  computed: {
    // 用于监听url ，分页索引，分页数量的变化，
    async handleGetList() {
      // 获取url参数
      const { city } = this.$route.query;
      // 要发送请求的参数
      let params = {
        _start: (this.pageIndex - 1) * this.pageSize,
        _limit: this.pageSize
      };
      // 判断city 是否存在
      if (city) params.city = city;

      // 获取文章列表数据
      const { data, total } = (await this.$store.dispatch("getPostList", {
        params
      })).data;
      this.postList = data;
      this.total = total;

      // 限制封面图片 最多为3张
      this.postList.forEach(element => {
        element.images = element.images.filter((el, i) => i < 3);
      });

      return "";
    }
  }
};
</script>

<style lang="less" scoped>
.post-wrapper {
  .post-list {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }
  h3 {
    font-size: 18px;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 10px;
    margin-bottom: 15px;

    a:hover {
      color: #ffa500;
    }
  }

  p {
    height: 63px;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 15px;
    // 多行省略
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;

    a {
      color: #666;
    }
  }

  .post-info {
    padding-bottom: 10px;

    .info-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 12px;
      color: #999;

      .city,
      .user {
        margin-right: 10px;
      }

      .user {
        .avatar {
          width: 16px;
          height: 16px;
          border-radius: 50px;
          margin: 0 8px;
        }

        .username {
          a {
            color: #ffa500;
          }
        }
      }
    }

    .like {
      color: #ffa500;
    }
  }

  // 左右布局
  .post-list-cross {
    .cover {
      width: 220px;
      height: 150px;
      margin-right: 10px;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    .post-content {
      flex: 1;
    }
  }

  // 上下布局
  .post-list-vertical {
    p {
      height: auto;
    }
    .cover {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      img {
        width: 220px;
        height: 150px;
        object-fit: cover;
      }
    }
  }

  .paging {
    margin-top: 20px;
  }
}
</style>