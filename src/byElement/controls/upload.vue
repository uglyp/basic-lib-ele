<template>
  <el-upload
    v-if="action"
    :action="action"
    :file-list="list"
    :list-type="type"
    :multiple="multiple"
    :limit="limit"
    :on-change="change"
    :on-remove="remove"
    :on-exceed="exceed"
    :before-upload="before"
  >
    <el-button size="small" :disabled="disabled" type="primary" v-text="`选择${txt}`"></el-button>
    <div slot="tip" class="el-upload__tip" v-text="cfg.tip"></div>
  </el-upload>
  <el-alert
    v-else
    title="当前项目没有配置 fileServer 或 fileToken, 所以上传组件无法正常使用"
    type="error"
    :closable="false"
  ></el-alert>
</template>
<script>
import { Upload as elUpload, Button as elButton, Alert as elAlert } from "element-ui";
import control from "../mixins/control";
// import file from "../../utils/file";
// const { fileServer, fileToken } = window.config;
export default {
  mixins: [control],
  components: { elUpload, elButton, elAlert },
  // data() {
  //   return {
  //   };
  // },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = [];
    } else {
      this.val = this.value;
    }
  },
  computed: {
    action() {
      const { fileServer, fileToken } = window.config;
      if (fileServer && fileToken) {
        return `${fileServer}/up?token=${fileToken}&wm=0`;
      } else {
        return null;
      }
    },
    cfg() {
      return this.config || {};
    },
    type() {
      return this.cfg.isImg ? "picture" : "text";
    },
    disabled() {
      return this.cfg.disabled || false;
    },
    txt() {
      return this.cfg.isImg ? "图片" : "附件";
    },
    multiple() {
      // $c.log(this.cfg.limit > 1);
      return this.cfg.limit > 1;
    },
    limit() {
      // $c.log();
      return this.cfg.limit || 0;
    },
    list: {
      set(val) {
        this.val = val;
      },
      get() {
        if (this.val) {
          return this.val.map(r => {
            if (r.FILE_URL) {
              return {
                name: r.FILE_NM || `tmp_${Math.random()}`,
                url: r.FILE_URL
              };
            } else {
              return r;
            }
          });
        } else {
          return [];
        }
      }
    },
    returnValue() {
      return this.list.map(r => {
        if (r.response) {
          return {
            FILE_NM: r.response.data.FILE_NAME,
            FILE_URL: r.response.data.FILE_URL
          };
        } else {
          return {
            FILE_NM: r.name,
            FILE_URL: r.url
          };
        }
      });
    }
  },
  methods: {
    remove(r, fileList) {
      if (r && r.status === "success") {
        this.list = fileList;
      }
    },
    change(r, fileList) {
      //$c.log("change", r, fileList, r.response);
      if (r.response) {
        const { code, result, message } = r.response;
        if (code * 1 === 200 && result) {
          if (this.limit <= 1) {
            // $c.log(fileList, fileList.slice(1));
            this.list = fileList.slice(-1);
          } else {
            this.list = fileList;
          }
        } else {
          $$.msg.error(message);
          fileList.pop();
        }
      } else if (!r) {
        // $$.msg.error("上传失败");
        // this.$nextTick(() => {
        //   fileList.pop();
        // });
        $c.error(r);
      }
    },
    // err(err, file, list) {
    //   $c.log(123, list);
    // },
    before() {
      // $c.log(r);
    },
    exceed() {
      // $c.log("exceed", files, fileList);
      $$.msg.error(`超出限制, 最多只能上传${this.limit}个文件`);
    }
  }
};
</script>
