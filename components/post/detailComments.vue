<template>
  <div class="detail-comments">
    <h3 class="comment-title">评论</h3>
    <!-- tag标签。在回复评论时出现 -->
    <el-tag
      v-if="tag.name"
      closable
      :disable-transitions="false"
      @close="handleClose()"
      :type="tag.type">
      {{tag.name}}
    </el-tag>
    <el-input type="textarea" ref="input" :rows="2" placeholder="说点什么吧" v-model="commentText" resize="none"></el-input>
    <el-row class="submit" type="flex" justify="space-between">
      <el-upload
        :action="$axios.defaults.baseURL+'/upload'"
        name="files"
        list-type="picture-card"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        ref="upload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <div class="btn">
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-row>

    <!-- 评论列表 -->
    <div class="no-comments" v-if="comments.length==0">
      暂无评论，赶紧抢占沙发！！！
    </div>

    <div class="cmt-list" v-else>
      <div class="cmt-item" v-for="(item, index) in comments" :key="index">
        <div class="cmt-info">
          <div class="user">
            <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt srcset />
            {{item.account.nickname}}
            <i>{{item.updated_at | formatTime}}</i>
          </div>
          <span>{{item.parentCount}}楼</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-new">
            
            <!-- 父评论列表组件 -->
            <FloorComment v-if="item.follow" :commentPar="item.parent" :count="item.parentCount-1" @handleReply="handleReply"/>

            <p class="cmt-message">{{item.content}}</p>
            <el-row type="flex" justify="flex-start" v-if="item.pics.length>0&&item.pics[0]">
              <div class="emt-pic"  v-for="(item,index) in item.pics" :key="index">
                <img :src="$axios.defaults.baseURL+item.url" alt="" >
              </div>
            </el-row>
            <div class="cmt-ctrl" @mouseover="isReply(index)" @mouseleave="replyActive=''">
              <a v-if="replyActive===index" href="javascript:;" @click="handleReply(item.id,item.account.nickname)">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <el-pagination
      class="paging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[3, 5, 10, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import FloorComment from "@/components/post/floorComment"

export default {
  components: {FloorComment},
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      commentText: "",  // 输入框的值
      pics: [], // 图片
      follow: '',   // 回复id
      comments: [], // 评论数量
      replyActive: '',  // 回复激活状态
      tag: { name: '', type: 'info' },    // 回复@tag标签
      pageIndex: 1, // 当前页码
      pageSize: 3, // 当前页数
      total: 0 // 评论总数

    };
  },
  methods: {
    // 删除已上传的图片
    handleRemove(file, fileList) {
      // 得到上传图片的图片信息
      this.pics = fileList.map(el =>  el.response[0]);
    },
    // 上传图片成功
    handleSuccess(res, file, fileList) {
      console.log(fileList);
      // 得到上传图片的图片信息
      this.pics = fileList.map(el => el.response[0]);
    },
    // 改变每页页数
    handleSizeChange(val) {
      this.pageSize = val;
      // 调用当前文章的评论方法
      this.handleGetComments()
    },
    // 当前页码
    handleCurrentChange(val) {
      this.pageIndex = val;
      // 调用当前文章的评论方法
      this.handleGetComments()
    },

    // 当前文章的评论
    async handleGetComments() {
      // 要请求评论的参数
      let params = {
        post: this.id,
        _start: (this.pageIndex - 1) * this.pageSize,
        _limit: this.pageSize
      };

      // 获取请求结果，
      const { data,total } = (await this.$store.dispatch("getPostComments", {params})).data;
      this.comments = data;
      this.total=total;

      // 通过调用递归函数getParentLen， 得到每个评论的父评论数量
      this.comments.forEach(el => el.parentCount=this.getParentLen(1,el));
      
      // 向父组件，传递评论总数量的值
      this.$emit('handleTotal', this.total)
    },

    // 提交评论按钮
    async handleSubmit() {
      // 获取token
      const {userInfo: { token }} = this.$store.state;

      // 要发布评论的参数
      const data = {
        post: this.id,
        pics: this.pics,
        content: this.commentText
      };

      // 判断回复id是否存在，要回复某个评论时，必须带有回复id
      if(this.follow) data.follow=this.follow;

      // 得到请求结果
      const { data:{message} } = await this.$store.dispatch("postPostComments", {data,token});
      //  提示信息
      this.$message.success(message);

      // 清除现有数据，
      this.$refs.upload.clearFiles();
      this.commentText=''
      this.tag.name=''

      // 调用当前文章的评论方法
      this.handleGetComments()
    },

    // 弹出回复按钮
    isReply(val){
      this.replyActive=val
    },

    // 点击回复，id 为要回复的用户id,nickname 为用户名
    handleReply(id,nickname){
      this.tag.name='@'+nickname;
      this.follow=id;
      // 获取文本域焦点
      this.$refs.input.focus()
    },
    // 关闭tag标签
    handleClose(){
      this.tag.name='';
      this.follow=''
    },

    //统计子评论数，通过递归查询
    getParentLen(i,item){
      return item.follow ? this.getParentLen(i+1,item.parent) : i;
    },

  },
  watch: {
    // 监听文章id 的变化
    id() {
      this.handleGetComments();
    }
  },
  mounted() {
    this.handleGetComments();
  },
};
</script>

<style lang="less" scoped>
.detail-comments {
  .comment-title {
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  /deep/.el-tag--light{
    margin-bottom: 10px;
  }
  .submit {
    margin: 10px 0 20px;

    .btn {
      width: 60px;

      /deep/.el-button--primary {
        width: 100%;
        padding: 10px 0;
      }
    }
  }

  .no-comments{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #999;
    border: 1px dashed #ddd;

  }
  .cmt-list {
    border: 1px solid #ddd;

    .cmt-item {
      padding: 20px;
      padding-bottom: 10px;
      border-bottom: 1px dashed #ddd;

      .cmt-info {
        display: flex;
        justify-content: space-between;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        margin-bottom: 10px;
        .user{
          display: flex;
          align-items: center;
        }
        img {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          margin-right: 5px;
        }
        i{
          color: #999;
          margin-left: 5px;
        }
      }

      .cmt-content {
        padding-left: 20px;

        .cmt-message {
          margin-top: 10px;
        }

        .emt-pic{
          width: 80px;
          height: 80px;
          margin: 10px 5px 0px 0;
          border: 1px dashed #ddd;
          border-radius: 5px;
          overflow: hidden;

          img{
            width: 100%;
            height: auto;
            object-fit: cover;
          }
        }

        .cmt-ctrl{
          height: 15px;
          text-align: right;
          a{
            font-size: 12px;
            color: #1e50a2;
            
            &:hover{
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .paging{
    margin-top: 10px;
  }
}
</style>