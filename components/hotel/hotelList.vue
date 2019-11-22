<template>
  <div>
    <div class="hotel-list" v-if="hotelData.length>0">
      <div>
        <el-row type="flex" class="hotel-item" v-for="(item, index) in hotelData" :key="index">
          <el-col :span="8">
            <span class="img-wrapper">
              <nuxt-link :to="`/hotel/detail?id=${item.id}`">
                <img :src="item.photos" alt srcset />
              </nuxt-link>
            </span>
          </el-col>
          <el-col :span="10" class="hotel-info">
            <h4 class="hotel-title">
              <nuxt-link :to="`/hotel/detail?id=${item.id}`">{{item.name}}</nuxt-link>
            </h4>
            <div class="hotel-cm-name">
              <span>{{item.alias}}</span>
              <span :title="item.hotellevel.name" v-if="item.hotellevel">
                <i
                  class="iconfont iconhuangguan"
                  v-for="(item, index) in Array(item.hotellevel.level)"
                  :key="index"
                ></i>
              </span>
              <span v-if="item.hoteltype">{{item.hoteltype.name}}</span>
            </div>
            <el-row type="flex">
              <el-col :span="10">
                <el-rate
                  v-model="item.stars"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}分"
                ></el-rate>
              </el-col>
              <el-col :span="7">
                <span class="height-light">{{item.all_remarks}}</span>
                条评价
              </el-col>
              <el-col :span="7">
                <span class="height-light">{{Math.floor(Math.random()*100)}}</span>
                篇游记
              </el-col>
            </el-row>
            <el-row type="flex" class="summary">{{item.summary}}</el-row>
            <el-row type="flex" class="location-row">
              <i class="iconfont iconlocation"></i>
              {{item.address}}
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-table :show-header="false" :data="item.products" style="width: 100%">
              <el-table-column prop="name"></el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <span style="margin-left: 20px;color: #f90">￥{{ scope.row.price }}</span> 起
                  <i class="el-icon-arrow-right"></i>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <el-row class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          background
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    <div v-else class="noHotel">暂无符合条件的酒店</div>
    <input type="hidden" v-model="Data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelData: [],
      page: 1,
      total: 0
    };
  },
  methods: {
    async getHotelData() {
      let url = this.$route.fullPath.slice(6);
      // 页数
      let _start = 5 * (this.page - 1);
      // 判断路径
      url ? (url += `&_start=${_start}`) : (url += `?_start=${_start}`);

      const res = await this.$store.dispatch("getHotelList", url);
      this.hotelData = res.data.data;
      this.total = res.data.total;
    },
    handleCurrentChange(val) {
      this.page = val;
      console.log(val);
    }
  },
  computed: {
    Data() {
      this.getHotelData();
    }
  }
};
</script>

<style lang="less" scoped>
.hotel-list {
  .hotel-item {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;

    .img-wrapper {
      img {
        width: 320px;
        height: 210px;
        object-fit: cover;
      }
    }

    .hotel-info {
      padding: 0 10px;

      .hotel-title {
        font-weight: 400;
        font-size: x-large;
      }

      .hotel-cm-name {
        color: #999;
        margin-bottom: 5px;

        .iconhuangguan {
          color: #f90;
        }
      }

      .height-light {
        color: #f90;
      }

      .location-row {
        margin-top: 10px;
        font-size: 14px;
        color: #999;
      }

      /deep/.el-table th.is-leaf {
        border-bottom: none;
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 40px;
}

.noHotel {
  height: 300px;
  margin-top: 20px;
  text-align: center;
}
</style>