<template>
  <div>
    <com-btns :btns="btns"></com-btns>
    <tmp-info v-if="show" :config="config" :id="id" :view="view"></tmp-info>
  </div>
</template>
<script>
import { testForm, comBtns } from "../../../element/";
import tmpInfo from "../../byElement/tmp/info";
const required = true;
const dao = {
  info() {
    return new Promise((a) => {
      setTimeout(() => {
        a({
          ac: "007",
          input: 1,
          txt: 2,
          number: 1,
          select: 2,
          date: "2020-6-16 12:20:10",
        });
      }, 1000);
    });
  },
  save(data) {
    return new Promise((a) => {
      $c.log("save", data);
      setTimeout(a, 1000);
    });
  },
};
export default {
  components: {
    comForm: testForm,
    comBtns,
    tmpInfo,
  },
  data() {
    const self = this;
    return {
      show: false,
      id: null,
      view: null,
      btns: {
        def: {
          txt: "普通",
          type: "info",
          click() {
            self.show = false;
            self.id = null;
            self.view = null;
            self.$nextTick(() => {
              self.show = true;
            });
          },
        },
        setVal: {
          txt: "修改",
          type: "success",
          click() {
            self.show = false;
            self.id = "2";
            self.view = null;
            self.$nextTick(() => {
              self.show = true;
              $$.msg.show("成功");
            });
          },
        },
        getInfo: {
          txt: "查看",
          click() {
            self.show = false;
            self.id = "2";
            self.view = "1";
            self.$nextTick(() => {
              self.show = true;
            });
          },
        },
        err: {
          txt: "错误",
          type: "danger",
          click() {
            self.$nextTick(() => {
              $$.msg.error("错误");
            });
          },
        },
        warning: {
          txt: "警告",
          type: "warning",
          click() {
            self.$nextTick(() => {
              $$.msg.warn("警告");
            });
          },
        },
      },
      config: {
        form: {
          a: 1,
          b: 2,
          input: {
            txt: "默认输入框",
            rule: { required },
            className: "",
          },
          BigInput: {
            txt: "最大的输入框",
            rule: { required },
            className: "big",
          },
        },
        save: dao.save,
        info: dao.info,
      },
    };
  },
};
</script>
