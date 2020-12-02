let map = [
  "form",
  "dialog",
  "menu",
  "btns",
  "tableTree",
  "msg",
  "tree",
  "head",
  "cascader",
  "select",
  "table",
  "checkbox",
  "textarea",
  "pwd",
  "editor",
  "switch",
  "upload",
  "date",
  "dateRange",
  "link",
  "uploadimg",
  "inputTest",
  "dtestForm",
  "select2"
];
let routes = [];
for (let r of map) {
  routes.push({
    path: "/" + r,
    name: r,
    component: () => import("@/views/" + r)
  });
}
routes.push(
  {
    path: "/",
    name: "list",
    component: () => import("@/views/test/"),
    children: [
      {
        path: "/info",
        name: "info",
        component: () => import("@/views/test/info")
      }
    ]
  },
  {
    path: "/form",
    name: "form2",
    component: () => import("@/views/form/list"),
    children: [
      {
        path: "index",
        name: "form_index",
        component: () => import("@/views/form/")
      },
      {
        path: "info",
        name: "form_info",
        component: () => import("@/views/form/info")
      },
      {
        path: "test",
        name: "form_test",
        component: () => import("@/views/form/test")
      }
    ]
  }
);
export default routes;
