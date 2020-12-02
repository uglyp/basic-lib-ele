<template>
  <div class="upForm upload_test info-page">
    <com-form :form="config" ref="configForm"></com-form>
    <com-btns :btns="configBtn"></com-btns>
    <com-form :form="configs" ref="configsForm"></com-form>
    <com-btns :btns="configsBtn"></com-btns>
    <com-form :form="configMu" ref="configMuForm"></com-form>
    <com-btns :btns="configMuBtn"></com-btns>
    <com-form :form="configsMu" ref="configsMuForm"></com-form>
    <com-btns :btns="configsMuBtn"></com-btns>
    <com-form :form="configsHv" :readOnly="true" ref="configsHvForm"></com-form>
    <com-form :form="configsAv" :readOnly="true" ref="configsAvForm"></com-form>
  </div>
</template>
<script>
import { comForm, conUpload2, comBtns } from "../../../element/";
export default {
  components: {
    comForm,
    comBtns,
  },
  mounted() {
    this.$refs.configsForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
        },
      ],
    });
    this.$refs.configsMuForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
        },
        {
          TITLE:
            "789789798798797999999999999999999999999999999999999999999999.pdf",
          FILE_NAME:
            "789789798798797999999999999999999999999999999999999999999999.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/XuCwVWoAMsPe9FVZSHma.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/XuCwVWoAMsPe9FVZSHma.pdf",
        },
      ],
    });
    this.$refs.configsHvForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
        },
        {
          TITLE:
            "789789798798797999999999999999999999999999999999999999999999.pdf",
          FILE_NAME:
            "789789798798797999999999999999999999999999999999999999999999.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/XuCwVWoAMsPe9FVZSHma.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/XuCwVWoAMsPe9FVZSHma.pdf",
        },
      ],
    });
    this.$refs.configsAvForm.setDatas({
      FILE: [
        {
          TITLE: "1.pdf",
          FILE_NAME: "1.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/ymDOXFXCZEPOogYPZpN9.pdf",
        },
        {
          TITLE:
            "789789798798797999999999999999999999999999999999999999999999.pdf",
          FILE_NAME:
            "789789798798797999999999999999999999999999999999999999999999.pdf",
          URL: "//file.qnlm.ac/qhcs/200622/XuCwVWoAMsPe9FVZSHma.pdf",
          FILE_URL: "//file.qnlm.ac/qhcs/200622/XuCwVWoAMsPe9FVZSHma.pdf",
        },
      ],
    });
  },
  data() {
    const self = this;
    return {
      config: {
        FILE: {
          txt: "文件单选上传",
          el: conUpload2,
          className: "defaultClass",
          config: {
            multiple: false,
            canDownload: true,
          },
        },
      },
      configs: {
        FILE: {
          txt: "有值文件单选上传",
          className: "defaultClass",
          el: conUpload2,
          config: {
            multiple: false,
            canDownload: true,
          },
        },
      },
      configMu: {
        FILE: {
          txt: "文件多选上传",
          className: "defaultClass",
          el: conUpload2,
          config: {
            multiple: true,
            canDownload: true,
          },
        },
      },
      configsMu: {
        FILE: {
          txt: "有值文件多选上传",
          className: "defaultClass",
          el: conUpload2,
          config: {
            multiple: true,
            canDownload: true,
          },
        },
      },
      configsHv: {
        FILE: {
          txt: "只读文件下载",
          className: "defaultClass",
          el: conUpload2,
          config: {
            multiple: true,
            canDownload: true,
          },
        },
      },
      configsAv: {
        FILE: {
          txt: "只读文件查看",
          className: "defaultClass",
          el: conUpload2,
          config: {
            multiple: true,
            canDownload: false,
          },
        },
      },
      configBtn: {
        save: {
          txt: "单选上传取值",
          click() {
            window.$$.msg.show(self.$refs.configForm.getDatas().FILE);
            $c.log(self.$refs.configForm.getDatas().FILE);
          },
        },
      },
      configsBtn: {
        save: {
          txt: "有初始值单选上传取值",
          click() {
            window.$$.msg.show(self.$refs.configsForm.getDatas().FILE);
            $c.log(self.$refs.configsForm.getDatas().FILE);
          },
        },
      },
      configMuBtn: {
        save: {
          txt: "多选上传取值",
          click() {
            window.$$.msg.show(self.$refs.configMuForm.getDatas().FILE);
            $c.log(self.$refs.configMuForm.getDatas().FILE);
          },
        },
      },
      configsMuBtn: {
        save: {
          txt: "有值多选上传取值",
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
.upload_test .btns {
  margin-bottom: 25px;
}
</style>
