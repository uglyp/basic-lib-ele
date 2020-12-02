<template>
  <el-alert v-if="lack" :title="`缺少配置${lack}`" type="error" :closable="false"></el-alert>
  <div v-else class="upload-img">
    <div v-if="readonly" class="view">
      <img v-for="(i, o) in fileList" :src="i[lastConfig.url]" :key="o" />
    </div>
    <div v-else>
      <el-upload
        v-loading="load"
        :action="action"
        :file-list="fileList"
        :multiple="lastConfig.multiple"
        :limit="lastConfig.limit"
        :on-success="success"
        :before-upload="before"
        :on-error="err"
        :show-file-list="false"
        :on-remove="remove"
        :on-change="change"
        ref="upload"
        :accept="lastConfig.accept"
        :disabled="disabled"
      >
        <el-button size="small" type="primary" :disabled="disabled">{{ this.txt }}</el-button>
        <div slot="tip" class="tip-pan">
          <p class="tip" v-text="lastConfig.tip"></p>
          <div class="ts-pan" v-for="(i, o) in fileList" :key="o">
            <img :src="i[lastConfig.url]" v-if="i[lastConfig.url]" class="up-img" />
            <span @click="clear(i[lastConfig.url])">删除</span>
          </div>
        </div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import control from "../mixins/control";
import { Upload, Button } from "element-ui";
export default {
  isView: true,
  mixins: [control],
  data() {
    const { fileServer, fileToken } = window.config;
    return {
      readonly: false,
      listMus: [],
      load: false,
      action: `${fileServer}/up?token=${fileToken}&wm=0`,
      fileList: [],
      filesUrl: [],
      filesName: [],
      fileMenu: [],
      imageUrl: "",
      unedit: !!window.config.unedit
    };
  },
  components: {
    ElUpload: Upload,
    ElButton: Button
  },
  watch: {
    fileList: {
      deep: true,
      handler(val) {
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
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
    this.readonly = this.form.rdOnly;
  },
  computed: {
    lack() {
      // let keys = ["fileServer", "fileToken"];
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
      const multiple = typeof c.multiple === "undefined" ? true : c.multiple;
      const accept = c.accept || "image/gif,image/jpeg,image/png";
      const radio = this.config.radio;
      const radioTag = this.config.radioTag;
      const tip = this.config.tip;
      const url = typeof c.url === "undefined" ? "FILE_URL" : c.url;
      const name = typeof c.name === "undefined" ? "FILE_NAME" : c.name;
      return {
        tip,
        radio,
        radioTag,
        accept,
        multiple,
        limit: multiple ? this.limit : 2,
        url,
        name
      };
    },
    txt() {
      if (!this.lastConfig.multiple) {
        if (this.fileList.length == 1) {
          return "重新选择";
        } else {
          return "选择图片";
        }
      } else {
        return "选择图片";
      }
    },
    returnValue() {
      return this.listMus;
    },
    disabled() {
      return this.config.disabled;
    }
  },
  methods: {
    change(file, list) {
      if (this.val && this.form && this.form.clearValidate) {
        this.form.clearValidate(this.dataKey);
      }
      this.val = list;
      // this.$emit("change", this.val);
    },
    clear(file) {
      this.fileList = this.fileList.filter(v => {
        return v[this.lastConfig.url] != file;
      });
    },
    setValue(val) {
      val.map(o => {
        if (this.fileList && this.fileList.length != 0) {
          this.fileList.map(p => {
            if (p[this.lastConfig.url] != o[this.lastConfig.url]) {
              this.fileList.push(o);
            }
          });
        } else {
          this.fileList.push(o);
        }
      });
    },
    success(re, file) {
      this.load = false;
      //this.val = file.response.data.URL;
      file.response.data[this.lastConfig.name] = file.response.data.FILE_NAME;
      file.response.data[this.lastConfig.url] = file.response.data.FILE_URL;
      if (!this.lastConfig.multiple) {
        this.fileList = [file.response.data];
      } else {
        this.fileList.push(file.response.data);
      }
    },
    before(file) {
      this.load = true;
      return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        const err = msg => {
          this.$message.error(msg);
          this.load = false;
          reject();
        };
        if (this.lastConfig.accept && this.lastConfig.accept.indexOf(file.type) < 0) {
          // 图片格式校验
          let fmts = [];
          for (let str of this.lastConfig.accept.split(",")) {
            fmts.push(str.substring(str.indexOf("/") + 1));
          }
          err(`上传失败, 只支持[ ${fmts} ]格式的文件`);
        } else if (file.size > 200 * 1024 * 1024) {
          // 图片大小校验
          err("上传失败, 文件不能大于200m");
        } else {
          reader.onload = e => {
            const image = new window.Image();
            image.onload = () => {
              let { width, height } = image;
              if (this.lastConfig.radio && width / height !== this.lastConfig.radio) {
                // 图片尺寸校验
                err(
                  `上传失败, 请上传宽高比为 ${this.lastConfig.radio} : 1 的图片 ${
                    this.lastConfig.radioTag ? ` (推荐尺寸: ${this.lastConfig.radioTag})` : ""
                  }`
                );
              } else {
                resolve();
              }
            };
            image.onerror = () => {
              err("上传失败, 这不是一个有效的图片文件");
            };
            image.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    },
    remove() {
      // -
    },
    err() {
      this.load = false;
      this.$message.error("文件上传失败");
    }
  }
};
</script>
