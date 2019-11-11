<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input v-model="form.checkPassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", //手机号码
        nickname: "", //昵称
        captcha: "", //手机验证码
        password: "", //密码
        checkPassword: "" // 确认密码
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    async handleSendCaptcha() {
      // 验证手机号是否为空
      if (!this.form.username) {
        //提示信息
        return this.$message.warning({
          message: "手机号码不能为空",
          duration: 1000
        })
      }
      // 验证手机号码是否为11位数字
      if (this.form.username.length != 11) {
        
        return this.$message.warning({
          message: "请输入11位手机号码",
          duration: 1000
        })
      }
      // 发送
      const res = await this.$store.dispatch("validateCaptcha", {
        tel: this.form.username
      });
      const { code } = res.data;
      //弹出框
      this.$confirm(`手机验证码为${code}`, "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: "warning"
      });
    },

    // 注册
    async handleRegSubmit() {
      console.log(this.form);
      //验证数据
      const valid = await this.$refs["form"].validate();
      //解构出data数据
      const { checkPassword, ...data } = this.form;

      try {
        // valia 为true ，执行后面代码
        valid && (await this.$store.dispatch("register", data));

        //提示信息
        this.$message.success({
          message: "注册成功",
          duration: 1000
        });

        //延时跳转
        const timer = setTimeout(() => {
          //清除定时器
          clearTimeout(timer);
          //跳转到首页
          this.$router.replace("/");
        }, 1000);
      } catch (e) {}
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>