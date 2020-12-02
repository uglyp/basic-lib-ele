<template>
  <div class="selectForm">
    <com-form :form="config" ref="configForm"></com-form>
    <com-btns :btns="configBtn"></com-btns>
    <com-form :form="configMu" ref="configMuForm"></com-form>
    <com-btns :btns="configMuBtn"></com-btns>
    <com-form :form="conHvfig" ref="configHvForm"></com-form>
    <com-btns :btns="configHvBtn"></com-btns>
    <com-form :form="configHvMu" ref="configHvMuForm"></com-form>
    <com-btns :btns="configHvMuBtn"></com-btns>
  </div>
</template>
<script>
import { comForm, conSelect, comBtns } from "../../../element/";
export default {
  components: {
    comForm,
    comBtns,
  },
  data() {
    const self = this;

    return {
      config: {
        USER: {
          txt: "测试下拉框",
          el: conSelect,
          config: {
            map: {
              0: "是",
              1: "否",
            },
          },
        },
      },
      configMu: {
        USER: {
          txt: "测试多选下拉框",
          el: conSelect,
          config: {
            multiple: true,
            map: {
              0: "是",
              1: "否",
              2: "是不是",
              3: "否不否",
              4: "是否",
              5: "否是",
              6: "是是",
              7: "否否",
            },
          },
        },
      },
      conHvfig: {
        USER: {
          txt: "有值测试下拉框",
          el: conSelect,
          config: {
            map: {
              0: "是",
              1: "否",
            },
          },
        },
      },
      configHvMu: {
        USER: {
          txt: "测试多选下拉框",
          el: conSelect,
          config: {
            multiple: true,
            map: {
              0: "是",
              1: "否",
              2: "是不是",
              3: "否不否",
              4: "是否",
              5: "否是",
              6: "是是",
              7: "否否",
            },
          },
        },
      },
      configBtn: {
        save: {
          txt: "单选取值",
          click() {
            window.$$.msg.show(self.$refs.configForm.getDatas().USER);
          },
        },
      },
      configMuBtn: {
        save: {
          txt: "多选取值",
          click() {
            window.$$.msg.show(self.$refs.configMuForm.getDatas().USER);
          },
        },
      },
      configHvBtn: {
        save: {
          txt: "初始值单选取值",
          click() {
            window.$$.msg.show(self.$refs.configHvForm.getDatas().USER);
          },
        },
      },
      configHvMuBtn: {
        save: {
          txt: "初始值单选取值",
          click() {
            window.$$.msg.show(self.$refs.configHvMuForm.getDatas().USER);
          },
        },
      },
    };
  },
  mounted() {
    this.$refs.configHvForm.setDatas({
      USER: "1",
    });
    this.$refs.configHvMuForm.setDatas({
      USER: "1,3,5",
    });
  },
};
</script>
<style>
.selectForm {
  margin-top: 10px;
  margin-left: 10px;
}
.selectForm .btns {
  margin-bottom: 18px;
}
</style>