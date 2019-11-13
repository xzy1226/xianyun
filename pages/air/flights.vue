<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList"/>
                
                <!-- 航班头部布局 -->
                <FlightsListHead />
                
                
                <!-- 航班信息 -->
                <div v-if="dataList.length>0">
                  <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
                    <el-pagination
                      background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size='5'
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="flightsData.total">
                  </el-pagination>
                </div>
                <div v-else style="text-align:center">
                  暂无航班信息
                </div>

            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside @refreshUrl='getflightsData'/>
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from '@/components/air/flightsListHead';
import FlightsItem from '@/components/air/flightsItem';
import FlightsFilters from '@/components/air/flightsFilters';
import FlightsAside from '@/components/air/flightsAside';

export default {
  components: {FlightsListHead,FlightsItem,FlightsFilters,FlightsAside},
    data(){
        return {            
            // 缓存一份数据，只会修改一次
            cacheFlightsData:{
              flights: [],
              info: {},
              options: {}
            },   
            flightsData: {},  // 航班总数据
            dataList: [],     // 当前页航班数据列表
            pageIndex: 1,     // 当前页码
            pageSize: 5       // 当前页数
        }
    },
    mounted() {
      this.getflightsData()
    },
    methods: {
      // 发送请求，获取返回的航班信息
      async getflightsData(){
        // 设置传参数据
        const props={
          params: this.$route.query
        }
        const {data}=await this.$store.dispatch('getAirs',props);
        // 获取航班数据
        this.flightsData=data
        this.cacheFlightsData={...data}

        this.setDataList()
      },
      // 设置当前页的数量
      setDataList(arr){
        // 是否有筛选选项
        if (arr) {
          this.pageIndex=1;
          this.flightsData.flights=arr;
          this.flightsData.total=arr.length;
        }

        // 处理分页
        const start=(this.pageIndex-1)*this.pageSize;
        const end=start+this.pageSize;
        this.dataList=this.flightsData.flights.slice(start,end);
      },
      // 改变每页页数
      handleSizeChange(val) {
        this.pageSize=val;
        this.setDataList()
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.pageIndex=val;
        this.setDataList()
      }
    },
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>