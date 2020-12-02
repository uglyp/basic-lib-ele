## 使用教程

1. 项目搭建

- 使用 vue-cli3\* 创建项目

2. 手动引入 basic-lib-ele 框架

- Web 端选择 element 部分
- 移动端选择 vant 部分

3. 初始化

- 手动引入 basic-init 初始化工具
- package.json scripts 上加入  
  ` "init": "babel-node --presets env ./node_modules/qh-init/"`

4. 路由配置

- 在项目根目录下建立 map.js 文件,到处 map 变量, 通过 map 变量配置页面层级关系,, 然后通过`npm run int` 命令初始化项目, `_routre.js`文件为路由文件

5. 组件

- PC 端使用 element-ui 作为 UI 框架,移动端则是 vant. 在 main 中可以选择全局加载,也可以选择按需加载,app.vue 中可以加载公共的头部和左侧菜单

6. 根据业务选择模版

- 项目中建立 tmp 文件夹, 建议直接从框架中复制 list,info 模版并且修改引用路径, 项目中如果有需要也可以自行封装

7. 根据业务配置模版

- 列表模版需要配置查询条件, 数据源, ,表头配置; 详情模版需要配置展示字段, 获取和保存方法

8. 选择控件

- 根据具体业务, 参照数据和原型图选择控件, 传入 form.config 的 el 属性

9. 与后端交互

- 根据前期需求会议和开发方案沟通结构, 根据接口文档进行接口调用. 接口有固定格式错误状态一般不会带回业务层处理

10. 打包部署

- `npm run build` 部署后参考 nginx 知识整合项目中 proxy 节点中的服务配置, nginx 注意路径中/的意义

# 表单 (form)

渲染一个标准表单

#### 文件:[byElement/components/Form.vue](../blob/master/src/byElement/components/Form1.vue)

#### 引用名称: comForm

##### 维护者: @abobo84

### 参数:

| 参数名     | 说明                                                                                                             | 类型   | 默认值 |
| :--------- | :--------------------------------------------------------------------------------------------------------------- | :----- | :----: |
| size       | 表单尺寸                                                                                                         | string |   -    |
| labelWidth | 文本宽度                                                                                                         | string |   -    |
| readOnly   | 是否只读                                                                                                         | bool   | false  |
| disabled   | 是否不可编辑                                                                                                     | bool   |   -    |
| on         | 响应事件                                                                                                         | json   |   {}   |
| form       | 表单项(主要配置), json 内的 key 代表控件绑定数据和获取数据的 key,json 单独对象的配置参照 [form-item](#form-item) | json   |   {}   |

#### form-item

| 参数名 | 说明                                             | 类型                     | 默认值         |
| :----- | :----------------------------------------------- | :----------------------- | :------------- |
| txt    | 文本标签                                         | string                   | -              |
| right  | 右侧 tip                                         | string/object(txt,style) | -              |
| bottom | 底部 tip                                         | string/object(txt,style) | -              |
| top    | 顶部 tip                                         | string/object(txt,style) | -              |
| el     | 控件                                             | [控件](controls)         | [input](input) |
| change | 控件值变更事件                                   | function                 | -              |
| config | 控件配置(具体配置内容根据参考当前使用控件的文档) | json                     | -              |
| rule   | 表单验证                                         | json                     | -              |

### 方法:

| 方法名    | 说明                   | 入参                                                 | 返回值                                               |
| :-------- | :--------------------- | :--------------------------------------------------- | :--------------------------------------------------- |
| getDatas  | 获取 json 格式表单内容 | key:获取 key, 不传则获取全部                         | 有 key 则返回单一值得,没有则返回整个表单的 json 数据 |
| setDatas  | 设置表单内容           | data:绑定值;key:绑定的 key                           | -                                                    |
| valiDates | 表单校验               | key:校验字段(字符或数组);callback:通过校验的回调函数 | -                                                    |
| submit    | 校验并在成功后提交表单 | callback:校验成功回调;success:提交成功回调           | -                                                    |
| $con      | 获取表单内控件对象     | key:获取控件的 key                                   | -                                                    |
