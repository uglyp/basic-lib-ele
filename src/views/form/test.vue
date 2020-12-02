<template>
  <div>
    <div @click="clickdiv">打发阿斯顿发</div>
    <com-btns :btns="btns"></com-btns>
    <!-- <tmp-info v-if="show" :config="config" :id="id" :view="view"></tmp-info> -->
    <com-form :form="form" ref="form"></com-form>
  </div>
</template>
<script>
import {
  testForm,
  comBtns,
  conSelect,
  conNumber,
  conDate,
  testMore,
  conUEditor,
  conCascader
} from "../../../element/";
import tmpInfo from "../../byElement/tmp/info";
const required = true;
const dao = {
  info() {
    return new Promise(a => {
      setTimeout(() => {
        a({
          addMore1: [
            { ID: 1, VALUE: 1 },
            { ID: 2, VALUE: 2 },
            { ID: 3, VALUE: 1 }
          ],
          addMore2: [
            {
              DATA_STATUS: 1,
              ID: 68,
              VALUE: "部件1"
            },
            {
              DATA_STATUS: 1,
              ID: 69,
              VALUE: "部件2"
            }
          ],
          addMore4: [
            { ID: 1, VALUE: "我是富文本编辑器1" },
            { ID: 2, VALUE: "我是富文本编辑器2" }
          ],
          number: 2132132,
          date: "2020-6-16"
        });
      }, 1000);
    });
  },
  save(data) {
    return new Promise(a => {
      $c.log("save", data);
      setTimeout(a, 1000);
    });
  }
};
export default {
  components: {
    comForm: testForm,
    comBtns,
    tmpInfo
  },
  data() {
    // const self = this;
    return {
      show: true,
      id: null,
      view: null,
      btns: {
        def: {
          txt: "普通",
          type: "info",
          click() {}
        },
        setVal: {
          txt: "绑定数据",
          type: "success"
        }
      },
      form: {
        addMore1: {
          txt: "addMore1",
          el: testMore,
          config: {
            max: 3, //最大可增加几个
            stamp: true, //组件前面 是否加1.2.3
            addEl: {
              el: conSelect,
              config: { map: { 1: "飞机", 2: "坦克" } }
            }
          },
          // change(e) {
          //   $c.log(e.$from.setDatas("number", 121), "eeeeeeeeeeee");
          //   e.$from.setDatas("number", 121);
          // },
          rule: { required }
        },
        addMore2: {
          txt: "addMore2",
          el: testMore,
          config: {
            addEl: {
              config: { disabled: false }
            }
          },
          rule: { required }
        },
        addMore3: {
          txt: "addMore3",
          el: testMore,
          config: {
            max: 3,
            addEl: {
              el: conCascader,
              placeholder: ["第一", "第二", "第三"],
              config: {}
            }
          }
        },
        addMore4: {
          txt: "addMore4",
          el: testMore,
          className: "big",
          config: {
            stamp: true,
            addEl: {
              el: conUEditor
            }
          },
          rule: { required }
        },
        number: {
          txt: "number",
          el: conNumber,
          rule: { required }
        },
        date: {
          txt: "date",
          el: conDate,
          rule: { required },
          config: { type: "date" }
        }
      }
    };
  },
  methods: {
    clickdiv() {
      this.getInfo();
    },
    getInfo() {
      dao
        .info(this.id)
        .then(r => {
          $c.log(r, "********************************************");
          this.$refs.form.setDatas(r);
        })
        .catch(() => {});
    }
  },
  mounted() {
    // this.getInfo();
  }
};
</script>
