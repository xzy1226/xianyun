<template>
  <section class="container">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-autocomplete
          :fetch-suggestions="queryCitySearch"
          @select="handleCitySelect"
          class="el-autocomplete"
          v-model="form.city"
        ></el-autocomplete>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-input placeholder="人数未定" v-model="form.person">
          <i slot="suffix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">查看价格</el-button>
      </el-form-item>
    </el-form>

    <el-row type="flex" justify="space-between" class="hotel-option">
      <el-col :span="14">
        <div class="search-option">
          <el-row type="flex" justify="space-between" class="option-row">
            <el-col :span="3">区域</el-col>
            <el-col :span="24" :class="{hiddenAll:hidden}">
              <div class="scenics-box">
                <a
                  href="#"
                  class="location-budget"
                  :class="{active:scenic===''}"
                  @click="handleBudget()"
                >全部</a>
                <a
                  class="location-budget"
                  v-for="(item, index) in scenics"
                  :key="index"
                  :class="{active:scenic===item.id}"
                  @click="handleBudget(item)"
                >{{item.name}}</a>
              </div>
              <a href="javascript:;" @click="hidden=!hidden">
                <i class="el-icon-d-arrow-right icon"></i>
                等43个区域
              </a>
            </el-col>
          </el-row>
          <el-row type="flex" justify="space-between" class="option-row">
            <el-col :span="3">攻略</el-col>
            <el-col
              :span="24"
            >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
          </el-row>
          <el-row type="flex" justify="space-between" class="option-row">
            <el-col :span="3">均价
              <el-tooltip
                class="item"
                effect="dark"
                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                placement="bottom-start">
                  <sup class="question-mark">?</sup>
              </el-tooltip>
            </el-col>
            <el-col :span="24">
              <el-row type="flex" justify="flex-start" class="option-row">
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ￥332
                    </span>
                  </el-tooltip>
                </el-col>
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ￥521
                    </span>
                  </el-tooltip>
                </el-col>
                <el-col :span="6">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                    placement="bottom-start"
                  >
                    <span>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      <i class="iconfont iconhuangguan"></i>
                      ￥768
                    </span>
                  </el-tooltip>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10" id="hotelMap" class="hotel-map"></el-col>
    </el-row>

    <!-- 酒店选项 -->
    <div class="list-filter">
      <el-row type="flex" >
        <el-col :span="8" class="filter-col"> 
          <el-row type="flex">
            <el-col :span="24">价格</el-col>
            <el-col :span="24" class="ta-r">0-{{price}}</el-col>
          </el-row>
          <el-row type="flex">
            <el-slider v-model="price" @change='handleChange'  :max='4000'></el-slider>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row type="flex">
            <el-col :span="24">住宿等级</el-col>
          </el-row>
          <el-row type="flex">
            <el-select v-model="hotellevel_in" size="mini" multiple placeholder="请选择">
              <el-option
                v-for="item in options.levels"
                :key="item.id"
                :label="item.name"
                :value="item.level">
              </el-option>
            </el-select>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row type="flex">
            <el-col :span="24">住宿类型</el-col>
          </el-row>
          <el-row type="flex">
            <el-select v-model="hoteltypes_in" size="mini" multiple placeholder="请选择">
              <el-option
                v-for="item in options.types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row type="flex">
            <el-col :span="24">酒店设施</el-col>
          </el-row>
          <el-row type="flex">
            <el-select v-model="hotelassets_in" size="mini" multiple placeholder="请选择">
              <el-option
                v-for="item in options.assets"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-row>
        </el-col>
        <el-col :span="6" class="filter-col">
          <el-row type="flex">
            <el-col :span="24">酒店品牌</el-col>
          </el-row>
          <el-row type="flex">
            <el-select v-model="hotelbrands_in" size="mini" multiple placeholder="请选择">
              <el-option
                v-for="item in options.brands"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 酒店列表 -->
    <HotelList :data="params"/>

    <input type="hidden" v-model="handleHotel">
  </section>
</template>

<script>
import HotelList from '@/components/hotel/hotelList';
import moment from 'moment';

export default {
  components: {HotelList},
  data() {
    return {
      form: {
        city: "",
        id: '',
        date: "",
        person: "",
      },
      city: 74,     // 城市id
      hotellevel_in: [],   // 酒店等级
      hoteltypes_in: [],    // 酒店设施
      hotelassets_in: [],   // 酒店设施
      hotelbrands_in: [],    // 酒店品牌
      
      enterTime: '',  //入店时间
      leftTime: '',   //离店时间

      pageSize: 5,  // 页数
      pageIndex: 1, // 页码
      price: 0,
      price_lt: 0,      // 价格
      scenic: '',   // 景点id
      params: [],   // 获取酒店详情的参数
      scenics: [], // 沿线
      // 酒店选项
      options: {  
        levels: [],   // 酒店等级
        types: [],    // 酒店类型
        assets: [],   // 酒店设施
        brands: []    // 酒店品牌
      },
      hidden: true,
    };
  },
  computed: {
    handleHotel() {
      
      this.city && this.params.push(`city=${this.city}`);
      this.enterTime && this.params.push(`enterTime=${this.enterTime}`);
      this.leftTime && this.params.push(`leftTime=${this.leftTime}`);

      if(this.hotellevel_in!=0){
        
        this.hotellevel_in.forEach(el => {

          this.params.push(`hotellevel_in=${el}`)
        });
      }
      if(this.hoteltypes_in!=0)this.hoteltypes_in.forEach(el => this.params.push(`hoteltypes_in=${el}`));
      if(this.hotelassets_in!=0)this.hotelassets_in.forEach(el => this.params.push(`hotelassets_in=${el}`));
      if(this.hotelbrands_in!=0)this.hotelbrands_in.forEach(el => this.params.push(`hotelbrands_in=${el}`));

      this.price_lt && this.params.forEach((el,i)=>{
        if(el.includes('price_lt')){
          this.params.splice(i,1,`price_lt=${this.price_lt}`)
        }else{
          this.params.push(`price_lt=${this.price_lt}`)
        }
      })

      this.scenic && this.params.forEach((el,i)=>{
        if(el.includes('scenic')){
          this.params.splice(i,1,`scenic=${this.scenic}`)
        }else{
          this.params.push(`scenic=${this.scenic}`)
        }
      })
      

      console.log(this.params);
      return this.params;
    },
  },
  methods: {
    handleSubmit(){
      // 处理入店时间，离店时间
      const timeArr=this.form.date.map(el => moment(el).format("YYYY-MM-DD"));
      this.enterTime=timeArr[0];
      this.leftTime=timeArr[1];
      this.city=this.form.id
      console.log(this.city,this.enterTime,this.leftTime);

      this.$router.replace({
        path: '/hotel',
        query: {
          city: this.city,
          enterTime: this.enterTime,
          leftTime: this.leftTime
        }
      })
    },
    // 价格改变，鼠标释放后获取值
    handleChange(val){
      this.price_lt=val;
    },
    // 选择城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryCitySearch(value, cb) {
      const arr = await this.querySearchAsync(value);
      // 默认选择下拉列表第1项
      if (arr.length > 0){
        this.form.city = arr[0].value;
        this.form.id=arr[0].id
      } 
      cb(arr);
    },

    // 查询城市接口的方法，返回promise
    // queryString是查询关键字
    async querySearchAsync(queryString) {
      // 关键字为空，返回空数组
      if (!queryString) return [];
      // 处理参数
      const porps = {
        params: {
          name: queryString
        }
      };
      // 发送请求 查询城市
      const { data } = (await this.$store.dispatch(
        "getSearchCity",
        porps
      )).data;
      // 下拉提示列表必须要有value字段
      const arr = data.map(el => {
        return {
          ...el,
          value: el.name.replace("市", "")
        };
      });
      return arr;
    },

    // 选择下拉列表的某项
    handleCitySelect(item) {
      this.form.city = item.value;
      this.form.id=item.id;
    },

    // 区域地 激活
    handleBudget(val) {
      this.scenic = val.id;
    }
  },
  async mounted() {
    // 获取查找城市区域
    const { data } = (await this.$store.dispatch("getSearchCities", "")).data;
    this.scenics = data[0].scenics;
    // 获取城市id
    this.city=this.scenics[0].city;

    // this.params.push({city:this.city});
    this.params.push(`city=${this.city}`)

    // 获取酒店选项数据
    const res= await this.$store.dispatch("getHotelOption")
    this.options=res.data.data;

    window.onLoad = () => {
      // 1.如何显示地图
      var map = new AMap.Map("hotelMap", {
        zoom: 11, //级别
        center: [113.3245904, 23.1066805] //中心点坐标
      });

      this.map = map;

      // 2.添加点标记
      var marker1 = new AMap.Marker({
        position: new AMap.LngLat(113.3245904, 23.1066805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "广州塔"
      });

      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(113.3345904, 23.1166805), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "广州塔2"
      });
      // 把点标记添加到地图
      map.add([marker1, marker2]);
    };

    const url =
      "https://webapi.amap.com/maps?v=1.4.15&key=7389d567cb5e257d1bcf274de61d1e00&callback=onLoad";
    let jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;

  .breadcrumb {
    margin: 20px 0;
  }

  /deep/.el-range-separator {
    width: 10%;
  }

  .hotel-option {
    min-height: 260px;
    margin-bottom: 20px;
    .search-option {
      .option-row {
        margin-bottom: 20px;
        color: #666;
        font-size: 14px;

        i {
          color: #f90;
        }
      }

      .scenics-box {
        .location-budget {
          display: inline-block;
          padding: 0 2px;
          margin-right: 10px;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            color: #09f;
            text-decoration: underline;
          }
        }
        .active {
          background-color: #eee;
          color: #999;

          &:hover {
            color: #999;
            cursor: auto;
            text-decoration: none;
          }
        }
      }

      .icon {
        transform: rotate(270deg);
      }

      .question-mark{
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        text-align: center;
        background-color: #ccc;
        color: #fff;
        border-radius: 50%;

      }

      /deep/.hiddenAll {
        .scenics-box {
          max-height: 3em;
          overflow: hidden;
        }
        .icon {
          transform: rotate(90deg);
          color: #f90;
        }
      }
    }
  }

  .list-filter{
    padding: 5px 20px;
    border: 1px solid #ddd;
    color: #666;

    .filter-col{
      padding: 5px 20px;
      border-right: 1px solid #ddd;
      
      &:first-child{
        padding-left: 0;
      }
      &:last-child{
        padding-right: 0;
        border-right: none;
      }
    }

    .ta-r{
      text-align: right;
    }

    /deep/.el-slider{
      width: 100%;
      height: 30px;
    }

    /deep/.el-input__inner{
      padding-left: 0;
      border: none;
      margin-top: 5px;
    }
  }
}
</style>