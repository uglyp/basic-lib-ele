<template>
  <div>
    <tmp-list :config="config" v-show="$route.matched.length===1"></tmp-list>
    <router-view></router-view>
  </div>
</template>
<script>
import tmpList from "@/byElement/tmp/list";
import $ from "@/http";
// import { conSelect, conDate } from "../../../element/";
let dao = {
  getList() {
    return $.post("/tmp/list");
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
                  id: e.item.row.ID,
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
                  id: e.item.row.ID
                }
              });
            }
          }
        },
        cols: [
          // 列配置
          {
            width: 130,
            txt: "姓名", // 表头文字
            col: "name", // 绑定字段
            sort: true
          },
          {
            width: 82,
            txt: "性别",
            col: "sex"
          },
          {
            width: 50,
            txt: "年龄",
            col: "age"
          },
          {
            width: 87,
            txt: "生日",
            col: "birthday"
          },
          {
            width: 98,
            txt: "城市",
            col: "city"
          },
          {
            width: 98,
            txt: "地址",
            col: "address"
          },
          {
            width: 87,
            txt: "照片",
            col: "photo",
            dataType:'-img'
          },
          {
            width: 87,
            txt: "备注",
            col: "remark"
          }
        ]
      }
    };
  }
};
</script>
