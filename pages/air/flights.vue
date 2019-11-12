<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead />
                
                
                <!-- 航班信息 -->
                <div>
                    <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
                </div>
                <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageIndex"
                  :page-sizes="[5, 10, 15, 20]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="flightsData.total">
                </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import FlightsListHead from '@/components/air/flightsListHead';
import FlightsItem from '@/components/air/flightsItem';

export default {
  components: {FlightsListHead,FlightsItem},
    data(){
        return { 
            flightsData:{},   // 航班总数据
            dataList: [],     // 当前页航班数据列表
            pageIndex: 1,     // 当前页码
            pageSize: 5       // 当前页数
        }
    },
    async mounted() {
      // 设置传参数据
      const props={
        params: this.$route.query
      }
      this.flightsData=(await this.$store.dispatch('getAirs',props)).data
      
      this.setDataList()
    },
    methods: {
      // 设置当前页的数量
      setDataList(){
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