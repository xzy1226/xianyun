<template>
  <div class="main">
    <!-- 乘机人 -->
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item, index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="item.username" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="item.id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <!-- 保险 -->
    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item, index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${$store.state.usersLen}  最高赔付${item.compensation}`"
            @change="handleInsurances(item.id)"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="form.contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <input type="hidden" :value="allPrice">
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
      form: {
        // 用户列表
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [], //保险id
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        captcha: "", //手机验证码
        invoice: false //发票
      }
    };
  },
  computed: {
    allPrice() {
      let price = 0; // 订单总价
      let len = this.form.users.length; // 乘客数量
      // 订单总价 = 机票价格 * 乘客数量
      price += this.data.seat_infos.org_settle_price * len;

      // 订单总价 = 保险 * 乘客数量
      this.form.insurances.forEach(el => {
        price += this.data.insurances[el - 1].price * len;
      });

      // 订单总价 = 机建＋燃油 * 乘客数量
      price += this.data.airport_tax_audlet * len;

      // 提交数据
      this.$store.commit('setAllPrice',{price,len})
      return price
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    // 添加保险id
    handleInsurances(id) {
      // id 存在则去除，不存在，则保留
      if (this.form.insurances.includes(id)) {
        let arr = this.form.insurances.slice(0);
        arr.splice(arr.indexOf(id), 1);
        this.form.insurances = arr;
      } else {
        this.form.insurances = [...new Set([...this.form.insurances, id])];
      }
    },

    // 发送手机验证码
    async handleSendCaptcha() {
      // 验证手机号是否为空
      if (!this.form.contactPhone) {
        //提示信息
        return this.$message.warning({
          message: "手机号码不能为空",
          duration: 1000
        });
      }
      // 验证手机号码是否为11位数字
      if (this.form.contactPhone.length != 11) {
        return this.$message.warning({
          message: "请输入11位手机号码",
          duration: 1000
        });
      }
      // 发送
      const res = await this.$store.dispatch("validateCaptcha", {
        tel: this.form.contactPhone
      });
      const { code } = res.data;
      //弹出框
      this.$alert(`手机验证码为${code}`, "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
    },

    // 提交订单
    async handleSubmit() {
      // 解构出 air 为 id的别称，seat_xid
      const {id: air,seat_xid}=this.$route.query
      
      const orderData = {
        ...this.form,
        air,
        seat_xid
      };
      const { token } = this.$store.state.userInfo;

      try {
        // 解构出 id
        const {data: {id}}=(await this.$store.dispatch("PostAirOrders", { token, orderData })).data;
        
        // 提示信息
        this.$message({
          message: "正在生成订单！请稍等",
          type: "success"
        });
        
        // 跳转到付款页
        this.$router.push({
          path: "/air/pay",
          query: {id}
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>