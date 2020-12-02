<template>
  <el-upload v-if="action" :action="action" :multiple="false" :on-progress="progress" :on-change="change" :on-exceed="exceed" :show-file-list="false" :on-success="onSuccess">
    <el-button size="mini" @click="uploadClick" :disabled="disabled" type="primary" v-text="txt"></el-button>
  </el-upload>
  <el-alert v-else title="当前项目没有配置 fileServer 或 fileToken, 所以上传组件无法正常使用" type="error" :closable="false"></el-alert>
</template>
<script>
import { Upload as elUpload, Button as elButton, Alert as elAlert } from "element-ui";
import control from "../mixins/control";
export default {
  mixins: [control],
  props: {
    daos: Function,
    re: Object
  },
  components: { elUpload, elButton, elAlert },
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
    disabled() {
      return this.cfg.disabled || false;
    },
    txt() {
      return this.cfg.name || "上传";
    }
  },
  methods: {
    progress(){
      this.$emit("startLoad",true)
    },
    uploadClick() {
      this.$emit("uploadClick");
    },
    change(r, fileList) {
      this.$emit("change", r, fileList);
    },
    exceed() {
      $$.msg.error(`超出限制, 最多只能上传${this.limit}个文件`);
    },
    onSuccess(v) {
      this.$emit("outdata", { FILE_URL: v.data.FILE_URL, FILE_NAME: v.data.FILE_NAME });
      // if (this.daos) {
      //   this.daos({ FILE_URL: v.data.FILE_URL, FILE_NM: v.data.FILE_NAME }).then(() => {
      //     this.$emit("getFile", true);
      //     $$.msg.show("导入成功");
      //     this.$root.loads = false
      //   });
      // }
    }
  }
};
</script>
