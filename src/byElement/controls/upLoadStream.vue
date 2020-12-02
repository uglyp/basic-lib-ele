<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    multiple
    action=""
    :on-change="fileChange"
    :on-remove="removeFile"
    :file-list="fileList"
    :auto-upload="false"
    :limit="10"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <span style="font-size:12px;color:red;margin-left:5px"
      >最多可上传10个文件</span
    >
  </el-upload>
</template>
<script>
import control from "../mixins/control";
export default {
  data() {
    return {
      fileList: [],
    };
  },

  //   created() {
  //     if (this.value === null || typeof this.value === "undefined") {
  //       this.val = "";
  //     } else {
  //       this.val = this.value;
  //     }
  //   },
  watch: {
    val: {
      deep: true,
      // immediate: true,
      handler(val, old) {
        if (val.length > 0) {
          //默认第一次回来是字符串  所以要排除
          this.$emit("update:value", val);
          this.$emit("change", val, old, this.rowData);
        } else {
          this.$emit("update:value", "");
          this.$emit("change", "");
        }
      },
    },
    fileList(val) {
      this.val = val;
    },
  },
  computed: {
    returnValue() {
      return this.fileList;
    },
    disabled() {
      return this.config.disabled;
    },
  },
  methods: {
    clear() {
      this.$refs.upload.clearFiles();
      this.val = "";
      this.setValue("");
    },
    setValue(val) {
      this.fileList = [];
      if (typeof val === "object") {
        if (val.length) {
          this.fileList = val.map((r) => {
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
    //on-change：文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    fileChange(file, fileList) {
      let existFile = fileList
        .slice(0, fileList.length - 1)
        .find((f) => f.name === file.name); //如果文件名重复
      if (existFile) {
        this.$message.error("当前文件已经存在!");
        fileList.pop();
      } else {
        this.fileList = fileList;
      }
    },
    //on-remove：文件列表移除文件时的钩子
    removeFile(file, fileList) {
      this.fileList = fileList; //此处fileList为删除文件后，剩余的文件
    },
    //保存上传
    // saveFile() {
    //   let { uploadFiles } = this.$refs.upload;
    //   this.fileData = new FormData();
    //   uploadFiles.forEach((item) => {
    //     if (item.lastModified) {
    //       this.fileData.append("file", item);
    //     }
    //   });
    //   // 此时所有的钩子已经执行完了fileData 中存的是通过校验的数据
    //   // 此时再调用接口上传该数据
    //   let config = {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   };
    //   subFile(this.fileData, config)
    //     .then((res) => {
    //       this.diaFile = false;
    //       //-----可写保存成功后执行的操作，此处省略
    //       this.fjLists = []; //清空
    //     })
    //     .catch((res) => {
    //       //-----可写保存失败后执行的操作，此处省略
    //       this.diaFile = false;
    //     });
    // },
    //取消
    cancelUploadFile() {
      this.fileList = [];
    },
  },
};
</script>
