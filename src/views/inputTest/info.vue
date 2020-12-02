<template>
  <tmp-info :config="config"></tmp-info>
</template>
<script>
import {
  testForm,
  comBtns,
  conSelect,
  conNumber,
  conDate,
  conTxt,
  conRadioBox,
  conDateRange,
  conUpload,
  testTable,
  conCheckbox
} from "../../../element/";
import tmpInfo from "../../byElement/tmp/info";
const required = true;
const dao = {
  info() {
    return new Promise(a => {
      setTimeout(() => {
        a({
          ac: "007",
          input: 1,
          txt: 2,
          number: 1,
          select: 2,
          date: "2020-6-16 12:20:10"
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
      config: {
        form: {
          a: 1,
          b: 2,
          txt: {
            txt: "txt",
            el: conTxt
          },
          input: {
            txt: "input",
            rule: { required }
          },
          select: {
            txt: "select",
            el: conSelect,
            config: {
              map: { 1: "飞机", 2: "坦克" }
            },
            change(e) {
              if (e.rowData) {
                // $c.log(e.data, e.rowData.txt);
                e.data.txt = e.rowData.txt;
                e.data.input = e.rowData.txt;
              }
              e.form.checkbox.hidden = e.val === "1";
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
            rule: { required }
          },
          dateRange: {
            txt: "dateRange",
            el: conDateRange
          },
          radioBox: {
            txt: "radioBox",
            el: conRadioBox
          },
          checkbox: {
            txt: "checkbox",
            el: conCheckbox
          },
          upload: {
            txt: "upload",
            el: conUpload
          },
          table: {
            el: testTable,
            className: "big",
            config: {
              edit: true,
              autoAdd: true,
              cols: [
                { col: "s0", txt: "商品", dataType: "w-" },
                { col: "s1", txt: "单价", dataType: "w-$" },
                { col: "s2", txt: "数量", dataType: "w-n" }
              ]
            }
          }
        },
        save: dao.save,
        info: dao.info
      }
    };
  }
};
</script>
