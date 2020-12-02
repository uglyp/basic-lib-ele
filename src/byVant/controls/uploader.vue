<template>
  <van-uploader
    class="qh-file"
    v-model="files"
    multiple
    :after-read="afterRead"
    :disabled="readonly"
  >
    <van-button v-if="!readonly" type="info" class="check">选取文件</van-button>
    <van-button v-if="!readonly" type="default" @click.stop="clear" color="#666" class="clear">清除所有</van-button>
    <ul v-if="readonly" class="file-list" id="file-list">
      <li v-for="(f, k) in formValue" :key="k" @click="down(f)">
        <a class="file" :href="f.DOCVIEW_URL">
          <van-icon class-prefix="my-icon" name="iconfujian" color="#6caffb"></van-icon>
          <span class="name" v-text="f.FJMC"></span>
        </a>
      </li>
    </ul>
    <span v-if="!formValue || !formValue.length">无</span>
  </van-uploader>
</template>
<script>
import $ from "../../http";
import uFile from "../../utils/file";
export default {
  name: "conUploader",
  props: {
    c: Object,
    value: Array,
    readonly: Boolean,
  },
  data() {
    return {
      files: [],
      formValue: [],
    };
  },
  created() {
    if (this.value) {
      this.formValue = this.value;
    }
  },
  mounted() {
    const isFile = (a) => {
      if (a && a.href && a.href.lastIndexOf(".") > -1) {
        let file = a.href.substring(a.href.lastIndexOf(".") + 1);
        let data = "";
        if (file === "pdf") {
          a.setAttribute("data-pdf", a.href);
          a.href = "javascript:;";
          a.target = "";
          return;
        }
        //  else if (['dcsapi', 'jpg', 'jpeg', 'png', 'txt'].includes(file)) { }
        else if (["ppt", "pptx", "xls", "xlsx", "doc", "docx"].includes(file)) {
          if (a.href.indexOf("file.app") != -1) {
            if (a.href.indexOf("dcsapi") == -1) {
              data = `http://dcsapi.com/?k=43358682667496243290451&url=${a.href}`;
            } else {
              data = a.href;
            }
          } else if (a.href.indexOf("www.qnlm") != -1) {
            if (a.href.indexOf("dcsapi") == -1) {
              data = `http://dcsapi.com/?k=43358682667496243217967&url=${a.href}`;
            } else {
              data = a.href;
            }
          } else {
            if (a.href.indexOf("dcsapi") == -1) {
              data = `http://dcsapi.com/?k=43358682667496243222679&url=${a.href}`;
            } else {
              data = a.href;
            }
          }
        } else {
          data = a.href;
        }
        let appPar = { action: "openUrl", data };
        a.href = "javascript:;";
        a.target = "";
        a.setAttribute("data-par", JSON.stringify(appPar));
      }
    };
    let c = window.document.getElementById("file-list");
    if (c) {
      let links = c.getElementsByClassName("file");
      for (let a of links) {
        isFile(a);
      }
      c.addEventListener("click", (e) => {
        if (e.target.className === "file") {
          $app.pdf = e.target.getAttribute("data-pdf");
          if (!$app.pdf) {
            var u = window.navigator.userAgent;
            var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //
            let par = e.target.getAttribute("data-par");
            try {
              if (isAndroid) {
                /* global QHBridge */

                QHBridge.call(par);
              } else if (isiOS) {
                // ios
              }
            } catch (e) {
              $$.error(e);
            }
          }
        }
      });
    }
  },
  methods: {
    clear() {
      this.files = [];
      this.formValue = [];
    },
    down(f) {
      uFile.down(f.DOCVIEW_URL);
    },
    afterRead(file) {
      let fd = new window.FormData();
      fd.append("file", file.file);
      $.file("up", fd)
        .then((r) => {
          this.formValue.push(r);
        })
        .catch((err) => {
          $c.log(456, err);
        });
    },
  },
};
</script>
Ï
