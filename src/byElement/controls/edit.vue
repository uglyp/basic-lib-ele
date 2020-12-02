<template>
  <quill-editor v-model="content" ref="myQuillEditor" @focus="onEditorFocus($event)" @blur="onEditorBlur($event)"
    @change="onEditorChange($event)">
  </quill-editor>
</template>
<script>
import control from "../mixins/control";
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
//import 'quill/dist/quill.core.css'
//import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'; // 富文本基于quill
export default {
  mixins: [control],
  components: {
    quillEditor
  },
  data () {
    return {
      editor: null,   // 富文本编辑器对象
      content: `<input type="file">`, // 富文本编辑器默认内容
      editorOption: { //  富文本编辑器配置
        modules: {
          toolbar: '#toolbar'
        },
        theme: 'snow',
        placeholder: '请输入正文'
      },
    }
  },
  mounted () {
    this.editor = this.$refs.myQuillEditor.quill;
  },
  beforeDestroy () {
    this.editor = null;
    delete this.editor;
  },
  methods: {
    // 准备富文本编辑器
    onEditorReady (editor) {
      $c.log(1, editor);
    },
    // 富文本编辑器 失去焦点事件
    onEditorBlur (editor) {
      $c.log(2, editor);
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus (editor) {
      $c.log(3, editor);
    },
    // 富文本编辑器 内容改变事件
    onEditorChange (editor) {
      $c.log(4, editor);
    }
  }
}
</script>
<style lang="scss">
.quill-editor {
  .ql-container {
    height: 400px;
  }
}
</style>