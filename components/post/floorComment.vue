<template>
  <div class="floor-cmt">
    <!-- 递归本组件  -->
    <floor
      v-if="commentPar.parent"
      :commentPar="commentPar.parent"
      :count="count-1"
      @handleReply="handleReply"
    />

    <div class="cmt-item">
      <div class="cmt-info">
        <div class="user">
          <img :src="$axios.defaults.baseURL+commentPar.account.defaultAvatar" alt srcset />
          {{commentPar.account.nickname}}
          <i>{{commentPar.updated_at | formatTime}}</i>
        </div>
        <span>{{count}}楼</span>
      </div>
      <div class="cmt-content">
        <div class="cmt-new">
          <p class="cmt-message">{{commentPar.content}}</p>
          <el-row
            type="flex"
            justify="flex-start"
            v-if="commentPar.pics.length>0&&commentPar.pics[0]"
          >
            <div class="emt-pic" v-for="(item,index) in commentPar.pics" :key="index">
              <img :src="$axios.defaults.baseURL+item.url" alt />
            </div>
          </el-row>
          <div class="cmt-ctrl" @mouseover="isReply(commentPar.id)" @mouseleave="replyActive=''">
            <a
              v-if="replyActive==commentPar.id"
              href="javascript:;"
              @click="handleReply(commentPar.id,commentPar.account.nickname)"
            >回复</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "floor",
  props: ["commentPar", "count"],
  data() {
    return {
      replyActive: ""   
    };
  },
  methods: {
    // 弹出回复按钮
    isReply(val) {
      this.replyActive = val;
    },
    // 点击回复, 子评论回复 要一层一层往外传
    handleReply(id, nickname) {
      // 向父组件传递
      this.$emit("handleReply", id, nickname);
    }
  },
  filters: {
    // 过滤时间格式
    formatTime(val) {
      return moment(val).format("YYYY-MM-DD hh:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.floor-cmt {
  .cmt-item {
    padding: 10px;
    padding-bottom: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;

    .cmt-info {
      display: flex;
      justify-content: space-between;
      height: 14px;
      line-height: 14px;
      font-size: 12px;
      margin-bottom: 10px;
      .user {
        display: flex;
        align-items: center;
      }
      img {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-right: 5px;
      }
      i {
        color: #999;
        margin-left: 5px;
      }

      span {
        color: #666;
      }
    }

    .cmt-content {
      padding-left: 10px;

      .cmt-message {
        margin-top: 10px;
      }

      .emt-pic {
        width: 80px;
        height: 80px;
        margin: 10px 5px 0px 0;
        border: 1px dashed #ddd;
        border-radius: 5px;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }

      .cmt-ctrl {
        height: 15px;
        text-align: right;
        a {
          font-size: 12px;
          color: #1e50a2;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>