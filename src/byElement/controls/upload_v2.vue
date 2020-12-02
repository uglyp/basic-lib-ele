<template>
  <div class="el-upload-v2">
    <div v-if="readOnly" class="upload_readonly">
      <template v-if="fileList && fileList.length">
        <span v-for="i in fileList" class="downFont" :key="i[lastConfig.name]">
          <a
            v-if="!config.canDownload && i[lastConfig.name]"
            :href="i[lastConfig.url]"
            :download="i[lastConfig.name]"
            v-text="i[lastConfig.name]"
          ></a>
          <a
            v-else
            href="javascript:;"
            @click="canDownload({ FILE_NM: i[lastConfig.name], FILE_URL: i[lastConfig.url] })"
            v-text="i[lastConfig.name]"
          ></a>
          <i class="split"></i>
        </span>
      </template>
      <template v-else>
        <span>-</span>
      </template>
    </div>
    <div v-else>
      <el-upload
        :file-list="fileList"
        :action="action"
        :on-success="success"
        :before-upload="before"
        :on-error="err"
        :multiple="config.multiple"
        :on-remove="remove"
        :limit="config.limit"
        ref="upload"
        :on-change="change"
        :accept="config.accept"
        :disabled="disabled || needCongfig"
        :on-preview="canDownload"
      >
        <el-button size="small" type="primary" :disabled="disabled || needCongfig"
          >选择附件</el-button
        >
      </el-upload>
    </div>
  </div>
</template>
<script>
import { Upload, Button } from "element-ui";
import control from "../mixins/control";
import files from "../../utils/file";
export default {
  mixins: [control],
  components: {
    ElUpload: Upload,
    ElButton: Button
  },
  watch: {
    fileList: {
      deep: true,
      handler(val) {
        $c.log(val);
        this.listMus = [];
        val.map(v => {
          let jsp = {};
          jsp[this.lastConfig.name] = v[this.lastConfig.name];
          jsp[this.lastConfig.url] = v[this.lastConfig.url];
          this.listMus.push(jsp);
        });
      }
    }
  },
  data() {
    const { fileServer, fileToken } = window.config;
    let needCongfig = false;
    if (!fileServer) {
      $$.msg.error("config.fileServer 配置缺失,文件上传功能无法使用");
      needCongfig = true;
    } else if (!fileToken) {
      $$.msg.error("config.fileToken 配置缺失,文件上传功能无法使用");
      needCongfig = true;
    }
    return {
      needCongfig,
      listMus: [],
      action: `${fileServer}/up?token=${fileToken}&wm=0`,
      fileList: [],
      filesUrl: [],
      filesName: [],
      fileMenu: []
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
    returnValue() {
      return JSON.stringify(this.listMus);
    },
    disabled() {
      return this.config.disabled;
    },
    lastConfig() {
      const config = this.config;
      const url = typeof config.url === "undefined" ? "FILE_URL" : config.url;
      const name = typeof config.name === "undefined" ? "FILE_NAME" : config.name;
      return {
        url,
        name
      };
    }
  },
  methods: {
    canDownload(file) {
      if (this.config.canDownload) {
        files.down(file.FILE_URL);
      }
    },
    clear() {
      this.$refs.upload.clearFiles();
      this.val = "";
      this.setValue("");
    },
    change(file, fileList) {
      this.val = this.fileMenu.length;
      if (fileList.length > 1 && !this.config.multiple) {
        // alert(111);
        this.fileMenu = [];
        fileList.splice(0, 1);
      }
      if (this.val && this.form) {
        //this.form.clearValidate(this.dataKey);
      }
    },
    setValue(val) {
      this.fileList = [];
      if (typeof val === "object") {
        if (val.length) {
          this.fileList = val.map(r => {
            for (let s in r) {
              if (!r[s]) {
                r[s] = "";
              }
            }
            this.fileMenu.push(r);
            this.val = r[this.lastConfig.name];
            r.name = r[this.lastConfig.name];
            r.url = r[this.lastConfig.url];
            // let obj = {};
            // obj["FILE_NM"] = r.FILE_NM || r.FILE_NAME;
            // this.val = obj["FILE_NM"];
            // obj["FILE_URL"] = r.FILE_URL;
            return r;
          });
        }
      }
    },
    success(re, file) {
      if (re && re.result) {
        file.response.data[this.lastConfig.name] = file.response.data.FILE_NAME;
        file.response.data[this.lastConfig.url] = file.response.data.FILE_URL;
        file.response.data["name"] = file.response.data.FILE_NAME;
        file.response.data["url"] = file.response.data.FILE_URL;
        if (!this.config.multiple) {
          this.fileList = [file.response.data];
        } else {
          this.fileList.push(file.response.data);
        }
        if (this.config && this.config.onFile) {
          this.config.onFile({
            FILE_NM: this.filesName.join(","),
            FILE_URL: this.filesUrl.join(",")
          });
        }
      }
    },
    before(file) {
      return new Promise((resolve, reject) => {
        if (file.size > 200 * 1024 * 1024) {
          window.$$.msg.error("上传失败, 文件不能大于200m");
          reject();
        } else if (this.repeat(file)) {
          window.$$.msg.error("上传失败, 文件名重复");
          reject();
        } else {
          resolve();
        }
      });
    },
    remove(file) {
      if (file && file.status === "success") {
        let stas = this.fileMenu.filter(age => {
          return age[this.lastConfig.name] != file.name;
        });
        this.fileList = stas;
      }
    },
    err(err) {
      window.$$.msg.error(err);
    },
    //判断名称是否重复
    repeat(file) {
      let repeatSat = false;
      for (let i of this.fileMenu) {
        if (i[this.lastConfig.name] == file.name) {
          repeatSat = true;
          break;
        }
      }
      return repeatSat;
    }
  }
};
</script>
