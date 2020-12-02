<template>
  <div class="info-page" v-if="config">
    <div>
      <slot name="top"></slot>
      <com-form :form="config.form" ref="form" :readOnly="!!itemView">
        <template v-slot:last-item>
          <el-form-item class="last"></el-form-item>
        </template>
      </com-form>
    </div>
    <com-btns :btns="btns"></com-btns>
  </div>
  <el-alert v-else title="请传入config配置" type="error" show-icon :closable="false"></el-alert>
</template>
<script>
import { testForm, comBtns } from "../../../element/";
import { FormItem, Alert } from "element-ui";
export default {
  components: {
    comForm: testForm,
    elFormItem: FormItem,
    elAlert: Alert,
    comBtns,
  },
  props: {
    config: Object,
    id: String,
    view: String,
  },
  computed: {
    itemId() {
      return this.id || this.$route.query.id || this.$route.params.id;
    },
    itemView() {
      return (
        this.view || this.$route.query.view * 1 || this.$route.params.view * 1
      );
    },
    btns() {
      let b = {};
      let { btns, save } = this.config;
      if (save && !this.itemView && (!btns || !btns._save)) {
        b._save = {
          txt: "保存",
          click: () => {
            let $form = this.$refs.form;
            $form.valiDates(null, () => {
              $form.load = true;
              let data = $form.getDatas();
              save(data)
                .then(() => {
                  $form.load = false;
                  $$.msg.show("保存成功");
                  $$.back();
                })
                .catch(() => {
                  $form.load = false;
                });
            });
          },
        };
      }
      b = Object.assign(b, btns);
      b._back = {
        txt: "返回",
        type: "info",
        click: $$.back,
      };
      return b;
    },
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.itemId * 1 && this.config.info) {
        let $form = this.$refs.form;
        $form.load = true;
        this.config
          .info(this.itemId)
          .then((r) => {
            $form.load = false;
            this.$refs.form.setDatas(r);
          })
          .catch(() => {
            $form.load = false;
          });
      }
    },
  },
};
</script>
