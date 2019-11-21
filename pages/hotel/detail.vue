<template>
  <section class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/hotel?city=${hotelData.city.id}` }">{{hotelData.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{hotelData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="name-info">
      <el-row>
        <h4 class="cn-name">{{hotelData.name}}
          <span :title="hotelData.hotellevel.name" v-if="hotelData.hotellevel"> 
              <i class="iconfont iconhuangguan" v-for="(item, index) in Array(hotelData.hotellevel.level)" :key="index"></i>
          </span>
        </h4>
      </el-row>
      <el-row>
        <span class="en-name">{{hotelData.alias}}</span>
      </el-row>
      <el-row type="flex" class="location-row">
        <i class="iconfont iconlocation"></i>
        {{hotelData.address}}
      </el-row>
    </div>
    <el-row type="flex" justify="space-bewteen" class="pic-info info-row">
      <el-col :span="16" class="main-pic">
        <img  :src="pic" :alt="hotelData.name" srcset="">
      </el-col>
      <el-col :span="8" class="list-pic">
        <el-row class="list-item" style="margin-left: -10px; margin-right: -10px;">
          <el-col :span="12" v-for="(item, index) in pics" :key="index" style="padding-left: 10px; padding-right: 10px;">
           <a href="javascript:;">
              <img :src="item" :alt="hotelData.name" srcset="" :class="{active:item==pic}" @mouseover="handleChangePic(item)">
           </a>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="info-row">
      <el-table
        :data="hotelData.products"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="价格来源"
          width="400">
        </el-table-column>
        <el-table-column
          prop="bestType"
          label="低价房型"
          width="400">
        </el-table-column>
        <el-table-column
          label="最低价格/每晚">
            <template slot-scope="scope">
              <span style="color: #f90">￥{{ scope.row.price }}</span> 起
              <i class="el-icon-arrow-right" style="color: #f90"></i>
            </template>
        </el-table-column>
      </el-table>
    </el-row>
    
    <div class="info-row">
      <div class="map-view">
        <div class="map-box" id="hotelMap"></div>
        <div class="poi-list"></div>
      </div>
    </div>

    <div class="info-row">
      <el-row class="assets-info">
        <el-col class="assets-info-hd" :span="4">基本信息</el-col>
        <el-col class="assets-info-bd" :span="20">
          <el-row>
            <el-col :span="6">入住时间：14:00之后</el-col>
            <el-col :span="6">离店时间：12:00之前</el-col>
            <el-col :span="6">{{hotelData.creation_time}}/{{hotelData.renovat_time}}</el-col>
            <el-col :span="6">酒店规模：{{hotelData.roomCount}}间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col class="assets-info-hd" :span="4">主要设施</el-col>
        <el-col class="assets-info-bd" :span="20">
          <el-row v-if="hotelData.hotelassets.length>0">
            <el-tag v-for="(item, index) in hotelData.hotelassets" :key="index" type="info" style="margin-right:10px;">item.name</el-tag>
          </el-row>
          <el-row v-else>
            <el-tag type="info" style="margin-right:10px;">外币兑换服务</el-tag>
            <el-tag type="info" style="margin-right:10px;">电梯</el-tag>
            <el-tag type="info" style="margin-right:10px;">洗衣服务</el-tag>
            <el-tag type="info" style="margin-right:10px;">热水壶</el-tag>
          </el-row>
            
        </el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col class="assets-info-hd" :span="4">停车服务</el-col>
        <el-col class="assets-info-bd" :span="20">-</el-col>
      </el-row>
      <el-row class="assets-info">
        <el-col class="assets-info-hd" :span="4">品牌信息</el-col>
        <el-col class="assets-info-bd" :span="20">-</el-col>
      </el-row>
    </div>

    <div class="comment-row">
      <h4>{{hotelData.all_remarks}}条用户评论</h4>
      <el-row class="scores-row">
        <el-col :span="4">
          <p>总评数：{{hotelData.all_remarks}}</p>
          <p>好评数：{{hotelData.good_remarks}}</p>
          <p>差评数：{{hotelData.bad_remarks}}</p>
        </el-col>
        <el-col :span="5" class="recomment-score">
          <el-rate
            v-model="hotelData.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分"
            class="comment-star">
          </el-rate>
          <div class="stamp">推荐</div>
        </el-col>
        <el-col :span="3" class="scores-info">
          <el-progress type="circle" 
          :percentage="(hotelData.scores.environment*10)||50" 
          color="#f90" 
          :width="80"
          :stroke-width="2"
          :show-text="false">
          </el-progress>
          <div class="text">
            <p>环境</p>
            <p>{{hotelData.scores.environment||50}}</p>
          </div>
        </el-col>
        <el-col :span="3" class="scores-info">
          <el-progress type="circle" 
          :percentage="(hotelData.scores.product*10)||50" 
          color="#f90" 
          :width="80"
          :stroke-width="2"
          :show-text="false">
          </el-progress>
          <div class="text">
            <p>产品</p>
            <p>{{hotelData.scores.product||50}}</p>
          </div>
        </el-col>
        <el-col :span="3" class="scores-info">
          <el-progress type="circle" 
          :percentage="(hotelData.scores.service*10)||50" 
          color="#f90" 
          :width="80"
          :stroke-width="2"
          :show-text="false">
          </el-progress>
          <div class="text">
            <p>服务</p>
            <p>{{hotelData.scores.service||50}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      hotelData: {
        city: {},
        hotellevel:[],
        hotelassets:[],
        scores: {}
      },
      pics: [
        '/img/1.jpeg',
        '/img/2.jpeg',
        '/img/3.jpeg',
        '/img/4.jpeg',
        '/img/5.jpeg',
        '/img/6.jpeg',
      ],
      pic: '/img/1.jpeg'
    }
  },
  methods: {
    handleChangePic(url){
      this.pic=url
    }
  },
  async mounted() {
    const {id}=this.$route.query;
    // const str=;
    const {data}=(await this.$store.dispatch('getHotelList',`?id=${id}`)).data;
    this.hotelData=data[0];
    console.log(this.hotelData);

    const res=await this.$store.dispatch('getHotelComment',{params:{id}})
    console.log(res);

    window.onLoad = () => {
      // 1.如何显示地图
      var map = new AMap.Map("hotelMap", {
        zoom: 11, //级别
        center: [this.hotelData.location.longitude, this.hotelData.location.latitude] //中心点坐标
      });

      this.map = map;

      // 2.添加点标记
      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(this.hotelData.location.longitude, this.hotelData.location.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: this.hotelData.name
      });

      // var marker2 = new AMap.Marker({
      //   position: new AMap.LngLat(113.3345904, 23.1166805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //   title: "广州塔2"
      // });
      // // 把点标记添加到地图
      map.add([marker1]);
    };

    const url =
      "https://webapi.amap.com/maps?v=1.4.15&key=7389d567cb5e257d1bcf274de61d1e00&callback=onLoad";
    let jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
}
</script>

<style lang="less" scoped>
  .container{
    width: 1000px;
    margin: 20px auto;

    .name-info{
      margin-top: 20px;

      .cn-name{
        font-size: 24px;
        font-weight: normal;
        color: #333;
        i{
          color: #f90;
        }
      }

      .en-name{
        font-size: 14px;
        color: #666;
      }

      .location-row{
        font-size: 14px;
        color: #666;
      }
      
    }

    .pic-info{

      .main-pic{

        img{
          width: 640px;
          height: 360px;
          object-fit: cover;
        }
      }
      .list-pic{
        .list-item{
          display: flex;
          justify-content: flex-end;
          flex-wrap: wrap;
        }
        img{
          width: 160px;
          height: 110px;
          object-fit: cover;
          margin-bottom: 10px;
        }
        .active{
          border: 1px solid #f90;
        }
      }
    }
    .info-row{
      margin: 40px 0;
    }
    .map-view{
      display: flex;
      justify-content: space-between;
      height: 360px;

      .map-box{
        width: 640px;
      }
    }

    .assets-info{
      border-bottom: 1px solid #ddd;

      .assets-info-hd,.assets-info-bd{
        padding: 20px 10px;
        font-size: 14px;
      }
      .assets-info-bd{
        color: #666;
      }
    }

    .comment-row{
      .scores-row{
        margin: 20px 0;
        color: #666;

        .recomment-score{
          position: relative;
          padding-top: 20px;

          .stamp{
            position: absolute;
            top: 0;
            left: 20px;
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            font-size: 20px;
            border: 2px solid #f90;
            color: #f90;
            border-radius: 50%;
            transform:rotate(-30deg);
            opacity: .2;
          }
        }

        .scores-info{
          position: relative;
          .text{
            position: absolute;
            top: 20px;
            left: 23px;
            color: #f90;
            text-align: center;
          }
        }
      }
    }
  }
</style>