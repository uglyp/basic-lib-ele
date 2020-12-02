<template>
  <el-alert v-if="lack" :title="`缺少配置${lack}`" type="error" :closable="false"></el-alert>
  <el-upload
    v-else
    class="upload-file"
    :accept="lastConfig.accept"
    v-loading="load"
    :file-list="fileList"
    :action="action"
    :multiple="lastConfig.multiple"
    :on-success="success"
    :before-upload="before"
    :on-error="err"
    :on-remove="remove"
    ref="upload"
    :on-exceed="exceed"
    :disabled="disabled"
    :on-change="change"
  >
    <el-button size="small" type="primary" :disabled="disabled">选择附件</el-button>
  </el-upload>
</template>
<script>
import control from "../mixins/control";
import { Upload, Button, Alert } from "element-ui";
export default {
  components: {
    elUpload: Upload,
    elButton: Button,
    elAlert: Alert
  },
  mixins: [control],
  data() {
    const { fileServer, fileToken } = window.config;
    return {
      load: false,
      action: `${fileServer}/up?token=${fileToken}&wm=0`,
      fileList: [],
      filesName: [],
      filesUrl: []
    };
  },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
  },
  computed: {
    lack() {
      if (!window.config.fileServer) {
        return "fileServer";
      } else if (!window.config.fileToken) {
        return "fileToken";
      } else {
        return;
      }
    },
    lastConfig() {
      const c = this.config;
      const multiple = typeof c.multiple === "undefined" || c.multiple;
      const accept = c.accept;
      return {
        accept,
        multiple,
        limit: multiple ? this.limit : 1
      };
    },
    returnValue() {
      let list = [];
      for (let i = 0; i < this.filesName.length; i++) {
        list.push({
          FILE_NM: this.filesName[i],
          FILE_URL: this.filesUrl[i]
        });
      }
      list.FILE_NM = this.filesName.join(",");
      list.FILE_URL = this.filesUrl.join(",");
      return list;
    },
    btnDisabled() {
      return !this.lastConfig.multiple && !!this.filesName.length;
    },
    disabled() {
      return this.config.disabled;
    }
  },
  methods: {
    clear() {
      this.$refs.upload.clearFiles();
      this.val = "";
      this.setValue("");
    },
    change() {
      this.val = this.filesName.length;
    },
    setValue(v) {
      this.fileList = [];
      this.filesName = [];
      this.filesUrl = [];
      if (typeof v === "object") {
        if (v.length) {
          this.fileList = v.map(r => {
            this.filesName.push(r.FILE_NM);
            this.filesUrl.push(r.FILE_URL);
            r.name = r.FILE_NM;
            return r;
          });
        }
      }
      this.change();
    },
    success(re, file) {
      if (re && re.result) {
        this.load = false;
        let { data } = re;
        if (this.lastConfig.multiple) {
          this.filesName.push(data.FILE_NAME);
          this.filesUrl.push(data.FILE_URL);
        } else if (this.lastConfig.limit === 1) {
          this.fileList = [file];
          this.filesName = [data.FILE_NAME];
          this.filesUrl = [data.FILE_URL];
        }
        if (this.config && this.config.onFile) {
          this.config.onFile({
            FILE_NM: this.filesName.join(","),
            FILE_URL: this.filesUrl.join(",")
          });
        }
      }
    },
    exceed() {
      // $c.log(1, file, fileList, this.fileList)
      // this.$message.error('只能上传一个文件, 如需替换请先删除当前文件');
    },
    before(file) {
      return new Promise((resolve, reject) => {
        if (
          this.lastConfig.accept &&
          this.lastConfig.accept.indexOf(file.type) < 0
        ) {
          let fmts = [];
          for (let str of this.lastConfig.accept.split(",")) {
            fmts.push(str.substring(str.indexOf("/") + 1));
          }
          this.$message.error(
            `上传失败, 只支持[ ${fmts.join(", ")} ]格式的文件`
          );
          reject();
        } else if (file.size > 200 * 1024 * 1024) {
          this.$message.error("上传失败, 文件不能大于200M");
          reject();
        } else if (this.filesName.filter(r => r === file.name).length) {
          if (this.lastConfig.multiple) {
            this.$message.error("上传失败, 文件名重复");
          }
          reject();
        } else {
          resolve();
          this.load = true;
        }
      });
    },
    remove(file) {
      if (!file) {
        return;
      }
      let { FILE_NM, FILE_URL } = file;
      if (!FILE_NM && file.response && file.response.data) {
        FILE_NM = file.response.data.FILE_NAME;
        FILE_URL = file.response.data.FILE_URL;
      }
      if (FILE_NM) {
        this.filesName = this.filesName.filter(r => r !== FILE_NM);
        this.filesUrl = this.filesUrl.filter(r => r !== FILE_URL);
        if (this.config && this.config.onFile) {
          this.config.onFile({
            FILE_NM: this.filesName.join(","),
            FILE_URL: this.filesUrl.join(",")
          });
        }
      }
    },
    err(err, file) {
      $c.error(err, file);
      this.load = false;
      this.$message.error("文件上传失败");
    }
  }
};
</script>
