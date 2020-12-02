<template>
  <el-dialog :visible.sync="isShow" title="导入" class="upload" @closed="close">
    <el-upload
      v-loading="showLoad"
      :limit="1"
      :data="data"
      ref="upload"
      :show-file-list="false"
      drag
      :action="url"
      :accept="accept"
      :file-list="fileList"
      :auto-upload="false"
      :on-success="success"
      :on-progress="over"
      :on-change="change"
      :on-exceed="newFile"
    >
      <template v-if="fileName">
        <i class="el-icon-document-checked file-icon"></i>
        <span class="el-upload__text">
          <em v-text="fileName"></em>
        </span>
      </template>
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <div class="el-upload__tip" slot="tip" v-text="`支持格式:(${accept})`"></div>
    </el-upload>
    <div slot="footer">
      <el-button size="mini" type="primary" @click="submit">上传</el-button>
      <el-button size="mini" @click="isShow = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      fileName: "",
      fullFile: "",
      isShow: false,
      showLoad: false,
      fileList: [],
      data: null,
      u: "",
      url: "",
      oss: null,
      id: ""
    };
  },
  props: {
    accept: String
  },
  created() {},
  methods: {
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    async getOss() {
      this.showLoad = true;
      this.showLoad = false;
    },
    show() {
      this.getOss();
      this.isShow = true;
      this.showLoad = false;
    },
    close() {
      this.$refs.upload.clearFiles();
      this.fileName = "";
      this.isShow = false;
    },
    submit() {
      this.showLoad = true;
      const file = this.$refs.upload.uploadFiles[0];
      this.data = {
        name: file.name,
        chunk: 0,
        chunks: 1
      };
      const random_str = (len = 32) => {
        let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
        let maxPos = chars.length;
        let reStr = "";
        for (let i = 0; i < len; i++) {
          reStr += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return reStr;
      };
      let fileName = random_str(10);
      let suffix = "";
      let suffixIndex = file.name.lastIndexOf(".");
      if (suffixIndex > -1) {
        suffix = file.name.substring(suffixIndex);
      }
      this.fullFile = this.oss.dir + fileName + suffix;
      this.data = {
        name: file.name,
        key: this.fullFile,
        policy: this.oss.policy,
        OSSAccessKeyId: this.oss.accessid,
        success_action_status: 200,
        signature: this.oss.signature
      };
      this.id = this.uuid();
      this.url = this.oss.host;
      if (file) {
        this.$nextTick(() => {
          this.$refs.upload.submit();
        });
      }
    },
    change(file) {
      if (file.status === "ready") {
        this.fileName = file.name;
      }
    },
    newFile(filelist) {
      if (filelist[0]) {
        this.fileName = filelist[0].name;
      }
    },
    over() {
      this.showLoad = false;
    },
    success() {
      this.$emit("success", this.fullFile, this.close);
    }
  }
};
</script>
