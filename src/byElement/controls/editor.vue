<template>
  <div class="full" ref="el"></div>
</template>
<script>
import control from "../mixins/control";
import ckeditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
export default {
  mixins: [control],
  created() {},
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      loader: null,
      editor: null,
      begin: false
    };
  },
  methods: {
    clear() {
      this.val = "";
      this.editor.setData(this.val);
    },
    setValue(v) {
      this.val = v;
      if (this.editor) {
        this.editor.setData(v);
      }
      // this.editor && this.editor.setData(v);
    },
    init() {
      if (!this.editor && !this.begin) {
        this.begin = true;
        // this.editor = 1;
        const { fileServer, fileToken } = window.config;
        class UploadAdapter {
          constructor(loader) {
            this.loader = loader;
          }
          upload() {
            //重置上传路径
            return new Promise(resolve => {
              this.loader.file.then(r => {
                const data = new window.FormData();
                data.append("file", r);
                axios.post(`${fileServer}/up?token=${fileToken}&wm=0`, data).then(res => {
                  if (res && res.data && res.data.result && res.data.data) {
                    $c.log(213, res.data.data.FILE_URL);
                    resolve({
                      default: res.data.data.FILE_URL
                    });
                  } else {
                    $c.error("文件上传失败", res);
                  }
                });
              });
            });
          }
        }
        ckeditor
          .create(this.$refs.el, {
            removePlugins: ["MediaEmbed"],
            language: "zh-cn"
          })
          .then(editor => {
            editor.plugins.get("FileRepository").createUploadAdapter = loader => {
              return new UploadAdapter(loader);
            };
            this.editor = editor;
            let txt = editor.getData();
            if (this.val !== txt) {
              editor.setData(this.val || "");
            }
            editor.model.document.on("change:data", () => {
              this.val = editor.getData();
            });
          })
          .catch(err => {
            $c.log(err);
          });
      }
    }
  }
};
</script>
