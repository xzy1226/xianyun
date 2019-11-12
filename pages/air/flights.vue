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
                    <FlightsItem v-for="(item,index) in flightsData.flights" :key="index" :data="item" />
                </div>
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
            flightsData:{}
        }
    },
    async mounted() {
      const props={
        params: this.$route.query
      }
      this.flightsData=(await this.$store.dispatch('getAirs',props)).data
      console.log(this.flightsData);
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