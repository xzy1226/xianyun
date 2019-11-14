<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option v-for="(item, index) in data.options.airport" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightIndex" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option v-for="(item, index) in data.options.flightTimes" :key="index" :label="item.from+':00 - '+item.to+':00'" :value="index"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option v-for="(item, index) in data.options.company" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option v-for="(item, index) in sizeOptions" :key="index" :label="item.name" :value="item.plane_size"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 机型信息
      sizeOptions: [
        {name: '大', plane_size: 'L'},
        {name: '中', plane_size: 'M'},
        {name: '小', plane_size: 'S'}
      ],
      airport: "", // 机场
      flightTimes: '', // 出发时间
      flightIndex: '',  // 出发时间索引
      company: "", // 航空公司
      airSize: "" // 机型大小
    };
  },
  methods: {
    // 筛选数据
    handleScreening(){
      let arr=this.data.flights;
      // 筛选机场
      if(this.airport)arr=arr.filter(el=>el.org_airport_name==this.airport);
      
      // 筛选出发时间
      if (this.flightTimes) {
        const {from,to}=this.flightTimes;
        arr=arr.filter(el=>{
          const current=+el.dep_time.split(':')[0]
          return current>=from && current<to;
        })
      }
      // 筛选公司
      if(this.company) arr=arr.filter(el=>el.airline_name==this.company);
      
      // 筛选机型
      if(this.airSize) arr=arr.filter(el=>el.plane_size==this.airSize);
      
      this.$emit('setDataList',arr)
    },
    
    // 选择机场时候触发
    handleAirport(value) {
      this.airport=value;
      this.handleScreening()
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      this.flightIndex=value;
      this.flightTimes=this.data.options.flightTimes[value];
      this.handleScreening()

    },

    // 选择航空公司时候触发
    handleCompany(value) {
      this.company=value;
      this.handleScreening()

    },

    // 选择机型时候触发
    handleAirSize(value) {
      this.airSize=value;
      this.handleScreening()

    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport= ""
      this.flightIndex= ""
      this.company= ""
      this.airSize= ""

      this.handleScreening()
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>