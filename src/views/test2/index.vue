<template>
  <div class="list-page">
    <div class="list-table">
      <con-table :config="config"></con-table>
    </div>
  </div>
</template>
<script>
import conTable from "@/byElement/controls/table/";
import $ from "@/http";
let dao = {
  getList(s) {
    return $.post("project/l", s);
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
    conTable
  },
  data() {
    // const self = this;
    return {
      config: {
        check: true,
        // 模板配置变量
        dataSource: dao.getList, // 数据源
        maps: {
          ptStatus: dao.ptStatus
        },
        cols: [
          // 列配置
          {
            width: 130,
            viewName: "计划名称", // 表头文字
            colName: "NM", // 绑定字段
            sort: true
          },
          {
            width: 82,
            viewName: "检验类型",
            colName: "TYPE_NM"
          },
          {
            width: 150,
            viewName: "机号/零部件编码",
            colName: "PART_CODE"
          },
          {
            width: 98,
            viewName: "计划开始日期",
            colName: "START_DATE"
          },
          {
            width: 98,
            viewName: "计划结束日期",
            colName: "END_DATE"
          },
          {
            width: 87,
            viewName: "船级社",
            colName: "CLUB_NM"
          },
          {
            width: 87,
            viewName: "船东",
            colName: "OWNER_NM"
          },
          {
            width: 87,
            viewName: "船厂",
            colName: "SHIPYARD_NM"
          },
          {
            width: 70,
            viewName: "计划状态",
            colName: "STATE_CODE",
            dataType: "m--ptStatus"
          }
        ],
        pageBtns: {
          add: {
            // 新增按钮配置
            txt: "新增",
            click() {
              $$.to("info");
            }
          }
        },
        tableBtns: {
          edit: {
            // 按钮配置
            txt: "修改", // 按钮的文本
            click(e) {
              $$.to({
                name: "info",
                query: {
                  t: e.item.row.NM
                }
              });
            }
          },
          del: {
            txt: "删除",
            click(e) {
              $$.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                type: "warning"
              })
                .then(() => {
                  e.reload();
                })
                .catch(() => {
                  e.reSelect();
                });
            }
          }
        }
      }
    };
  }
};
</script>
