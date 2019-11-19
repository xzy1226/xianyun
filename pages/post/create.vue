<template>
  <section class="container">
    <el-row type="flex" justify="space-between">
      <div class="mian">
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <el-form ref="form" :model="form">
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>

          <el-form-item>
            <!-- 富文本编辑器 -->
            <vue-editor
              v-model="form.content"
              :editorToolbar="customToolbar"
              :useCustomImageHandler="true"
              @image-added="handleImageAdded"
            ></vue-editor>
          </el-form-item>

          <el-form-item label="选择城市">
            <!-- fetch-suggestions 返回输入建议的方法 -->
            <!-- select 点击选中建议项时触发 -->
            <el-autocomplete
              :fetch-suggestions="queryCitySearch"
              @select="handleCitySelect"
              class="el-autocomplete"
              v-model="form.city"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <span class="submit-aside">
              或者
              <a href="javascript:;">保存到草稿箱</a>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <aside>
        <div class="draft-box">
          <h4>草稿箱（1）</h4>
          <div class="draft-list">
            <div class="draft-item">
              <div class="draft-post-title">
                13232
                <i class="el-icon-edit"></i>
              </div>
              <p>2019-11-19</p>
            </div>
          </div>
        </div>
      </aside>
    </el-row>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        city: ""
      },
      //富文本编辑器 配置
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ]
    };
  },
  methods: {
    // 提交
    onSubmit() {
      console.log(this.form);
    },
    // 在富文本编辑器中添加图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //将图片转成二进制
      let formData = new FormData();
      formData.append("files", file);
      //发送请求，上传图片
      const {data} = await this.$store.dispatch("postUpload", formData);
      // 获取图片路径
      const url = this.$axios.defaults.baseURL + data[0].url; // Get url from response
      // 渲染到富文本编辑器
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
    // 选择城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryCitySearch(value, cb) {
      const arr = await this.querySearchAsync(value);
      // 默认选择下拉列表第1项
      if (arr.length > 0) this.form.city = arr[0].value;

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
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;

  .mian {
    width: 750px;

    h2 {
      font-size: 22px;
      font-weight: normal;
    }
    p {
      font-size: 12px;
      color: #999;
      margin: 10px 0;
    }

    .submit-aside {
      margin-left: 10px;
      a {
        color: #ffa500;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  aside {
    width: 200px;
    
    .draft-box{
      padding: 10px;
      border: 1px solid #ddd;

      h4{
        color: #666;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .draft-post-title{
        cursor: pointer;

        &:hover{
          text-decoration: underline;
          color: #ffa500;
        }
      }
      .draft-item{
        margin-bottom: 10px;
        font-size: 14px;

        p{
          font-size: 12px;
          color: #999;
        }
      }

    }
  }
}
</style>