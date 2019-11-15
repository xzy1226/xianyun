<template>
    <div class="aside">
        <div class="air-info">
            <el-row type="flex" justify="space-between" class="info-top">
                <div>{{data.dep_date}}</div>
                <div>{{data.org_city_name}} - {{data.dst_city_name}}</div>
            </el-row>    
            <el-row 
            type="flex" 
            justify="space-between" 
            align="middle" 
            class="info-step">
                <el-col :span="5" class="flight-airport">
                    <strong>{{data.dep_time}}</strong>
                    <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
                </el-col>
                <el-col :span="14" class="flight-time">
                    <span>--- {{rankTime}} ---</span>
                    <span>{{data.airline_name}}{{data.seat_infos.flight_no}}</span>
                </el-col>
                <el-col :span="5" class="flight-airport">
                    <strong>{{data.arr_time}}</strong>
                    <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
                </el-col>
            </el-row> 
        </div>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>订单总价</span>
            <span>金额</span>
            <span>数量</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>成人机票</span>
            <span>￥{{data.seat_infos.org_settle_price}}</span>
            <span>x{{$store.state.usersLen}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" class="info-bar">
            <span>机建＋燃油</span>
            <span>¥{{data.airport_tax_audlet}}/人/单程</span>
            <span>x{{$store.state.usersLen}}</span>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="info-bar">
            <span>应付总额：</span>
            <span class="price">￥ {{$store.state.allPrice}}</span>
        </el-row>           
    </div>
</template>

<script>
import moment from 'moment';
export default {
    props: {
      data: {
        type: Object,
        default: {}
      }
    },

    computed: {
      rankTime(){
        // 出发时间
        let dep=moment(this.data.dep_datetime,'DD-MM-YYYY HH:mm:ss');
        // 到达时间
        let arr=moment(this.data.arr_datetime,'DD-MM-YYYY HH:mm:ss');
        // 有些航班时间跨越两天，需要加一天
        if(arr<dep){
          arr+=(3600 * 1000 * 24)
        }
        const distime=moment(arr).diff(moment(dep),"minute");//计算相差的分钟数
        const h=Math.floor(distime/60);//相差的小时数
        const mm=distime%60;//计算相差小时后余下的分钟数

        return `${h}时${mm}分`
      }
    },
}
</script>

<style scoped lang="less">
/*aside*/
.aside{
    width: 350px;
    height: fit-content;
    border:1px #ddd solid;
}

.air-info{
    padding:15px;

    .info-top{
        margin-bottom:10px;
        > div:last-child{
            font-size:14px;
        }
    }

    .info-step{
        .flight-airport{
            strong{
                display: block;
                font-size: 22px;
                font-weight: normal;
            }

            span{
                font-size: 12px;
                color:#999;
            }
        }

        .flight-time{
            text-align: center;
            font-size: 12px;
            color:#999;
            span{
                display: block;
            }
        }
    }
}

.info-bar{
    border-top:1px #ddd dashed;
    padding: 10px 15px;
    font-size: 14px;
    color: #666;

    .price{
        font-size:28px;
        color: orange;
    }
}
</style>