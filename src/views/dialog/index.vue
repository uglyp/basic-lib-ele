<template>
  <div>
    <!-- 消息弹出框 -->
    <!-- <con-btns :btns="btns"></con-btns> -->
    <div class="popup">
      <com-btns :btns="parse('最大弹出框款60%高80%', 'bigs')"></com-btns>
      <com-btns :btns="parse('中等弹出框高度60%', 'midds')"></com-btns>
      <com-btns :btns="parse('中等弹出框高度420', 'midd')"></com-btns>
      <com-btns :btns="parse('小弹出框高度420px', 'small')"></com-btns>
      <com-btns :btns="parse('最小弹出框高度自适应', 'smalls')"></com-btns>
      <!-- dialog -->
      <com-btns :btns="parsed('复杂弹出框最大弹出框款60%高80%', 'bigs')"></com-btns>
      <com-btns :btns="parsed('复杂弹出框中等弹出框高度60%', 'midds')"></com-btns>
      <com-btns :btns="parsed('复杂弹出框中等弹出框高度420', 'midd')"></com-btns>
      <com-btns :btns="parsed('复杂弹出框小弹出框高度420px', 'small')"></com-btns>
      <com-btns :btns="parsed('复杂弹出框最小弹出框高度自适应', 'smalls')"></com-btns>
    </div>
    <com-popup :disConfig="config">
      <template slot="content">
        <com-form :form="formConfig" labelPosition="right" ref="form"></com-form>
      </template>
    </com-popup>
  </div>
</template>
<script>
import { comForm, comBtns, comPopup } from "../../../element/";
export default {
  components: {
    comBtns,
    comPopup,
    comForm,
  },
  data() {
    const self = this;
    return {
      htmls:
        "此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件此操作将永久删除该文件",

      config: {
        open: false,
        size: "bigs",
        title: null,
        save: {
          txt: "确定",
          click() {
            self.config.open = false;
            $$.msg.show("确定");
          },
        },
        cancel: {
          txt: "取消",
          click() {
            self.config.open = false;
            $$.msg.show("取消");
          },
        },
      },
      formConfig: {
        LOGIN_ACCOUNT: { txt: "登录账号", rule: { required: true } },
      },
    };
  },
  methods: {},
  computed: {
    parse() {
      const self = this;
      return function (val, size) {
        return {
          save: {
            txt: val,

            click() {
              let hs = null;
              if (size == "smalls") {
                hs = "提示";
              } else {
                hs = self.htmls;
              }
              $$.$confirm(hs, val, {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true,
                customClass: size ? size : "smalls",
              })
                .then(() => {
                  $$.msg.show("确定");
                })
                .catch(() => {
                  $$.msg.show("取消");
                });
            },
          },
        };
      };
    },
    parsed() {
      const self = this;
      return function (val, size) {
        return {
          save: {
            txt: val,
            click() {
              self.config.title = val;
              $c.log(size);
              self.config.size = size ? size : "smalls";
              self.config.open = true;
            },
          },
        };
      };
    },
  },
};
</script>