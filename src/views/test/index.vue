<template>
  <div class="f-c-g">
    <tmp-list :config="config" v-show="$route.matched.length===1" ref="list"></tmp-list>
    <router-view></router-view>
  </div>
</template>
<script>
import tmpList from "@/byElement/tmp/list";
import $ from "@/http";
// import { conSelect, conDate } from "../../../element/";
let dao = {
  getList() {
    return $.post("tmp/list");
  },  
  ptStatus: {
    1: "飞机",
    2: "坦克",
    3: "装甲车",
    4: "导弹",
    5: "火箭"
  }
};
export default {
  components: {
    tmpList
  },
  data() {
    return {
      config: {
        // 模板配置变量
        dataSource: dao.getList, // 数据源
        searchItem: {
          a: { txt: "s1" },
          b: { txt: "s2" }
        },
        pageBtns: {
          add: {
            txt: "add",
            click() {
              $app.$router.push({
                name: "info"
              });
            }
          }
        },
        tableBtns: {
          info: {
            txt: "查看",
            click(e) {
              $$.to({
                path: "info",
                query: {
                  id: e.item.row.id,
                  view: 1
                }
              });
            }
          },
          edit: {
            txt: "编辑",
            click(e) {
              $$.to({
                path: "info",
                query: {
                  id: e.item.row.id
                }
              });
            }
          }
        },
        cols: [
          // 列配置
          {
            txt: "姓名", // 表头文字
            col: "name", // 绑定字段
            sort: true
          },
          {
            txt: "性别",
            col: "sex"
          },
          {
            txt: "年龄",
            col: "age"
          },
          {
            txt: "生日",
            col: "birthday"
          },
          {
            txt: "城市",
            col: "city"
          },
          {
            txt: "地址",
            col: "address"
          },
          {
            txt: "照片",
            col: "photo",
            dataType: "-img"
          },
          {
            txt: "备注",
            col: "remark"
          },
          {
            txt: "姓名", // 表头文字
            col: "name1", // 绑定字段
            sort: true
          },
          {
            txt: "性别",
            col: "sex1"
          },
          {
            txt: "年龄",
            col: "age1"
          },
          {
            txt: "生日",
            col: "birthday1"
          }
        ]
      }
    };
  },
  methods: {
    reload(id, view) {
      if (view) {
        return;
      }
      if (id) {
        this.$refs.list.getData();
      } else {
        this.$refs.list.clear();
      }
    }
  }
};
</script>
