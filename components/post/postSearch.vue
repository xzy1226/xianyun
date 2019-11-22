<template>
  <div class="post-search">
    <div class="search-bar">
      <el-input placeholder="请输入想去的城市，比如 '广州'" v-model="searchText">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="handleSearchPost"></i>
      </el-input>
    </div>
    <div class="search-recommend">
      推荐:
      <span
        v-for="(item, index) in recommendCities"
        :key="index"
        @click="handleCity(item)"
      >{{item}}</span>
    </div>
    <input type="hidden" v-model="text">
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendCities: ["广州", "上海", "北京"],
      searchText: ''
    };
  },
  computed: {
    text(){
      const { city } = this.$route.query;
      // 判断city 是否存在
      if (city) this.searchText=city;
      return city;
    }
  },
  methods: {
    // 点击搜索按钮，搜索数据
    handleSearchPost() {
      this.$router.replace(`/post?city=${this.searchText}`)
    },
    // 点击推荐城市
    handleCity(val) {
      this.$router.replace(`/post?city=${val}`)
    }
  }
};
</script>

<style lang="less" scoped>
.post-search {
  .search-bar {
    /deep/.el-input__inner {
      border: 2px solid #ffa500;
    }

    /deep/.el-icon-search {
      font-size: 18px;
      font-weight: bold;
      color: #ffa500;
    }
  }

  .search-recommend {
    font-size: 12px;
    margin: 10px 0;
    color: #333;

    span {
      margin: 0 10px;

      &:hover {
        color: #ffa500;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>