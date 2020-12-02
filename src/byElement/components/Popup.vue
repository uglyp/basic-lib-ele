<template>
  <el-dialog
    append-to-body
    v-if="show"
    :title="cfg.title"
    :visible.sync="show"
    :destroy-on-close="cfg.destroyOnClose"
    :close-on-click-modal="cfg.closeOnClickModal"
    :custom-class="`popup ${cfg.size || ''}`"
  >
    <slot name="content"></slot>
    <slot></slot>
    <template slot="footer">
      <div v-if="!cfg.onlyRead">
        <el-button
          v-if="cfg.save"
          :disabled="cfg.disabled"
          type="primary"
          :loading="cfg.loading"
          v-text="cfg.save.txt"
          @click="btnClick(cfg.save)"
        ></el-button>
        <el-button
          v-if="cfg.cancel"
          v-text="cfg.cancel.txt"
          @click="btnClick(cfg.cancel)"
        ></el-button>
      </div>
      <div v-else>
        <el-button
          v-if="cfg.close"
          type="primary"
          v-text="cfg.close.txt"
          @click="btnClick(cfg.close)"
        ></el-button>
      </div>
    </template>
  </el-dialog>
  <!-- <el-alert v-else title="弹窗组件没有传入config" type="error" :closable="false"></el-alert> -->
</template>
<script>
import { Dialog, Button, Alert } from "element-ui";
export default {
  name: "comPopup",
  props: {
    disConfig: Object,
    config: Object
  },
  components: {
    elDialog: Dialog,
    elButton: Button,
    elAlert: Alert
  },
  data() {
    return {};
  },
  computed: {
    show: {
      set(v) {
        if (this.disConfig) {
          this.disConfig.open = v;
        }
        if (this.config) {
          this.config.open = v;
        }
      },
      get() {
        return this.cfg.open;
      }
    },
    cfg() {
      let c = Object.assign({}, this.config, this.disConfig);
      if (JSON.stringify(c) === "{}") {
        return null;
      }
      return {
        open: c.open === true,
        size: c.size || "",
        title: c.title,
        closeOnClickModal: c.closeOnClickModal === true,
        destroyOnClose: c.destroyOnClose !== true,
        save: c.save,
        cancel: c.cancel,
        onlyRead: c.onlyRead,
        close: c.close,
        loading: c.loading
      };
    }
  },
  methods: {
    btnClick(btn) {
      if (btn.click) {
        btn.click(this.config || this.disConfig);
      }
    }
  }
};
</script>
