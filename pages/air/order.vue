<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
              <OrderForm :data="infoData"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
              <OrderAside :data="infoData"/>
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm';
import OrderAside from '@/components/air/orderAside';
export default {
    components: {OrderForm,OrderAside},
    data() {
      return {
        // 机票信息
        infoData: {
          seat_infos: []
        }
      }
    },
    async mounted() {
      const {id,seat_xid}=this.$route.query
      // 获取选择机票数据
      const {data}=await this.$store.dispatch('getChooseAirs',{id,seat_xid})
      this.infoData=data;
      console.log(this.infoData);
      
    },
    methods: {
   
    },
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>