<template>
  <div class="aside-wrapper">
    <div class="aside-menus" @mouseleave="handleLeaveMenus">
      <div class="menus">
        <div
          class="menus-item"
          v-for="(item, index) in data"
          :key="index"
          @mouseover="handleSelectItem(index)"
          :class="{active: index === currentActive}"
        >
          {{item.type}}
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>

      <div class="sub-menu" v-if="isShow">
        <ul>
          <li v-for="(item, index) in subCitiesList" :key="index">
            <nuxt-link :to="`/post?city=${item.city}`">
              <i>{{index}}</i>
              <strong>{{item.city}}</strong>
              <span>{{item.desc}}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="aside-recommend">
      <h2>推荐城市</h2>
      <nuxt-link to="/post">
        <img src="/img/pic_sea.jpeg" alt srcset />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isShow: false, // 子菜单的状态
      subCitiesList: [], // 子菜单数据-城市列表
      currentActive: "" // 当前tab选项
    };
  },
  methods: {
    // 鼠标移入-当前所选的项
    handleSelectItem(index) {
      this.isShow = true;
      this.currentActive = index;
      this.subCitiesList = this.data[index].children;
    },
    // 鼠标移出
    handleLeaveMenus() {
      this.isShow = false;
      this.currentActive = "";
    }
  }
};
</script>

<style lang="less" scoped>
.aside-wrapper {
  width: 260px;
  position: relative;
  box-sizing: border-box;
  z-index: 2;

  .aside-menus {
    .menus {
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      z-index: 2;

      &-item {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 260px;
        height: 40px;
        padding: 0 20px;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;

        z-index: 3;
      }

      .active {
        color: #ffa500;
        border-right: 1px solid #fff !important;
      }
    }
    .sub-menu {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 260px;
      width: 350px;
      padding: 10px 20px;
      background-color: #fff;
      border: 1px solid #ddd;

      li {
        line-height: 36px;
        font-size: 14px;
        i {
          color: #ffa500;
          font-size: 24px;
          font-style: italic;
        }
        strong {
          color: #ffa500;
          font-weight: 400;
          margin: 0 10px;
        }
        span {
          color: #aaa;
        }
      }
    }
  }
}

.aside-recommend {
  margin-top: 10px;
  h2 {
    font-size: 16px;
    font-weight: 400;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }

  img {
    width: 260px;
    height: auto;
  }
}
</style>