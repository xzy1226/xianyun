<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{price | priceTofix}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        
        <el-row v-if="isPay" type="flex" justify="center" align="middle" class="pay-success">
          <h2>您的订单已支付</h2>
        </el-row>
        <el-row v-else type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
      
    </div>
  </div>
</template>

<script>
// 生成二维码的包
import QRCode from "qrcode";
export default {
  data() {
    return {
      price: 0,      // 订单详情数据
      timer: null,   // 定时器id
      isPay: false   // 订单付款状态   
    }
  },
  mounted() {
    const {id}=this.$route.query;

    // 添加延时，在 store加载完后执行
    setTimeout(async() => {
      const {userInfo:{token}}=this.$store.state;
      // 请求，订单详情数据
      const res=await this.$store.dispatch('getAirOrders',{id,token})
      // 解构数据
      const {payInfo,price}=res.data;
      this.price=price;

      // 生成二维码 到canvas
      const stage=document.querySelector('#qrcode-stage');
      QRCode.toCanvas(stage,payInfo.code_url,{
        width: 200
      })

      // 要查询付款状态的数据
      const param={
        token,
        data: {
          id,
          nonce_str: payInfo.nonce_str,
          out_trade_no: payInfo.order_no
        }
      }

      // 设置定时器，每3秒请求一次，通过轮询，直到订单 支付成功
      this.timer=setInterval(() => {
        this.checkPay(param)
      }, 3000);
      
    }, 1);
  },
  methods: {
    // 轮询 - 查询付款状态
    async checkPay(data){
      // 得到 后台返回的数据
      const {data: {statusTxt}}= await this.$store.dispatch('checkPay',data);
      // 判断当前付款状态
      if(statusTxt=='支付完成' ) {
        // 清除定时器
        clearInterval(this.timer);
        this.timer=null

        // 提示
        this.$alert(statusTxt, "提示", {
          confirmButtonText: "确定",
          type: "success"
        });

        // 显示付款 成功页
        this.isPay=true;

      }
      // 用户离开 付款页，结束定时，不再轮询
      else if(!location.pathname.includes('pay')){
        // 清除定时器
        clearInterval(this.timer);
        this.timer=null
      }
    }

  },
  filters:{
    // 添加两个小数
    priceTofix(val){
      return Number(val||0).toFixed(2)
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-success{
        height: 300px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>