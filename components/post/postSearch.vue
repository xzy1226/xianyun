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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      recommendCities: ["广州", "上海", "北京"]
    };
  },
  methods: {
    handleSearchPost() {
      this.$router.replace(`/post?city=${this.searchText}`)
    },
    handleCity(val) {
      this.searchText = val;
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