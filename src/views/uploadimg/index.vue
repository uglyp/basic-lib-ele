<template>
  <div class="info-page">
    <div class="upimgForm uploadimg_test">
      <com-form :form="config" ref="configForm"></com-form>
      <com-btns :btns="configBtn"></com-btns>
      <com-form :form="configs" ref="configsForm"></com-form>
      <com-btns :btns="configsBtn"></com-btns>
      <com-form :form="configMu" ref="configMuForm"></com-form>
      <com-btns :btns="configMuBtn"></com-btns>
      <com-form :form="configsMu" ref="configsMuForm"></com-form>
      <com-btns :btns="configsMuBtn"></com-btns>
      <com-form :form="configAv" :readOnly="true" ref="configAvForm"></com-form>
    </div>
  </div>
</template>
<script>
import { comForm, conUploadImg, comBtns } from "../../../element/";
export default {
  components: {
    comBtns,
    comForm,
  },
  mounted() {
    this.$refs.configMuForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200624/HVVm6VDuihXusOsoycWB.jpg",
          FILE_URL: "//file.qnlm.ac/qhcs/200624/HVVm6VDuihXusOsoycWB.jpg",
        },
      ],
    });
    this.$refs.configsMuForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200624/HVVm6VDuihXusOsoycWB.jpg",
          FILE_URL: "//file.qnlm.ac/qhcs/200624/HVVm6VDuihXusOsoycWB.jpg",
        },
        {
          TITLE: "2.pdf",
          FILE_NAME: "2.pdf",
          URL: "//file.qnlm.ac/qhcs/200624/LbpoWhJdjujrAqsIjFoB.jpg",
          FILE_URL: "//file.qnlm.ac/qhcs/200624/LbpoWhJdjujrAqsIjFoB.jpg",
        },
      ],
    });
    this.$refs.configAvForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200624/HVVm6VDuihXusOsoycWB.jpg",
          FILE_URL: "//file.qnlm.ac/qhcs/200624/HVVm6VDuihXusOsoycWB.jpg",
        },
        {
          TITLE: "2.pdf",
          FILE_NAME: "2.pdf",
          URL: "//file.qnlm.ac/qhcs/200624/LbpoWhJdjujrAqsIjFoB.jpg",
          FILE_URL: "//file.qnlm.ac/qhcs/200624/LbpoWhJdjujrAqsIjFoB.jpg",
        },
      ],
    });
  },
  data() {
    const self = this;
    return {
      config: {
        FILE: {
          txt: "图片多选上传",
          el: conUploadImg,
          className: "imageSize",
          config: {
            multiple: true,
          },
        },
      },
      configs: {
        FILE: {
          txt: "图片单选上传",
          el: conUploadImg,
          className: "imageSize",
          config: {
            multiple: false,
          },
        },
      },
      configMu: {
        FILE: {
          txt: "有值单选上传",
          el: conUploadImg,
          className: "imageSize",
          config: {
            multiple: false,
          },
        },
      },
      configsMu: {
        FILE: {
          txt: "有值多选上传",
          el: conUploadImg,
          className: "imageSize",
          config: {
            multiple: true,
          },
        },
      },
      configAv: {
        FILE: {
          txt: "文件预览",
          el: conUploadImg,
          className: "imageSize",
          config: {
            multiple: true,
          },
        },
      },
      configBtn: {
        save: {
          txt: "图片多选取值",
          click() {
            window.$$.msg.show(self.$refs.configForm.getDatas().FILE);
            $c.log(self.$refs.configForm.getDatas().FILE);
          },
        },
      },
      configsBtn: {
        save: {
          txt: "图片单选取值",
          click() {
            window.$$.msg.show(self.$refs.configsForm.getDatas().FILE);
            $c.log(self.$refs.configsForm.getDatas().FILE);
          },
        },
      },
      configMuBtn: {
        save: {
          txt: "有值单选取值",
          click() {
            window.$$.msg.show(self.$refs.configMuForm.getDatas().FILE);
            $c.log(self.$refs.configMuForm.getDatas().FILE);
          },
        },
      },
      configsMuBtn: {
        save: {
          txt: "有值多选取值",
          click() {
            window.$$.msg.show(self.$refs.configsMuForm.getDatas().FILE);
            $c.log(self.$refs.configsMuForm.getDatas().FILE);
          },
        },
      },
    };
  },
};
</script>
<style>
.uploadimg_test .btns {
  margin-bottom: 25px;
}
</style>
