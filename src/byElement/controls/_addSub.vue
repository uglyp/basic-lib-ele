<template>
  <div>
    <div v-for="(i, index) in formatData" :key="index" class="asImgBox">
      <el-input
        v-model="formatData[index]"
        :disabled="disabled"
        :placeholder="config.placeholder || '请输入'"
      ></el-input>
      <img v-if="index == 0" @click="add" src="../assets/img/add.png" class="asImg" />
      <img v-else @click="sub(index)" src="../assets/img/sub.png" class="asImg" />
    </div>
  </div>
</template>
<script>
import control from "../mixins/control";
export default {
  mixins: [control],
  data() {
    return {
      formatData: []
    };
  },
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
  },
  watch: {
    val: {
      deep: true,
      handler(val, old) {
        if (val == "") {
          this.formatData = [""];
        } else {
          this.formatData = val.split(",");
        }
        this.$emit("update:value", val);
        this.$emit("change", val, old, this.rowData);
      }
    },
    formatData: {
      deep: true,
      handler(val) {
        this.val = val.join(",");
      }
    }
  },
  computed: {
    returnValue() {
      return this.formatData.filter(val => val && val.trim());
    },
    disabled() {
      return this.config.disabled;
    }
  },
  methods: {
    focus() {
      let input = this.$refs.input.$el.getElementsByTagName("INPUT");
      input[0] && input[0].select();
    },
    add() {
      this.val += ",";
    },
    sub(index) {
      this.formatData.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.asImgBox {
  position: relative;
  margin-bottom: 18px;
}
.asImg {
  height: 20px;
  vertical-align: middle;
  position: absolute;
  top: 7px;
  right: -29px;
  cursor: pointer;
}
.asImgBox:last-of-type {
  margin-bottom: 0;
}
</style>
