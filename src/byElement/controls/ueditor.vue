<template>
  <div v-loading="load" :id="mathId">
    <vue-ueditor-wrap
      v-if="showUe"
      v-model="val"
      :destroy="true"
      :config="myConfig"
      @ready="ready"
      ref="vuw"
    ></vue-ueditor-wrap>
  </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import control from "../mixins/control";
const RndNum = n => {
  var rnd = "";
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 100);
  }
  return rnd;
};
export default {
  data() {
    const { fileServer, fileToken } = window.config;
    const myConfig = {
      elementPathEnabled: true,
      wordCount: false, //是否开启字数统计
      myWordRule: true, //是否开启word的统计规则
      maximumWords: 1000000,
      autoHeightEnabled: false,
      autoFloatEnabled: false,
      initialFrameHeight: "320",
      initialFrameWidth: "100%",
      serverUrl: `${fileServer}/upb?token=${fileToken}`,
      //图片配置
      imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif"],
      imageActionName: "uploadimage",
      imageUrlPrefix: "",
      imageFieldName: "file",
      imageCompressEnable: true,
      imageCompressBorder: 1600,
      //视频配置
      videoActionName: "uploadvideo",
      videoFieldName: "file",
      videoPathFormat: "",
      videoUrlPrefix: "",
      videoMaxSize: 102400000,
      videoAllowFiles: [
        ".flv",
        ".swf",
        ".mkv",
        ".avi",
        ".rm",
        ".rmvb",
        ".mpeg",
        ".mpg",
        ".ogg",
        ".ogv",
        ".mov",
        ".wmv",
        ".mp4",
        ".webm",
        ".mp3",
        ".wav",
        ".mid"
      ],
      //文件配置
      fileActionName: "uploadfile",
      fileFieldName: "file",
      filePathFormat: "",
      fileUrlPrefix: "",
      fileMaxSize: 51200000,
      fileAllowFiles: [
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".bmp",
        ".flv",
        ".swf",
        ".mkv",
        ".avi",
        ".rm",
        ".rmvb",
        ".mpeg",
        ".mpg",
        ".ogg",
        ".ogv",
        ".mov",
        ".wmv",
        ".mp4",
        ".webm",
        ".mp3",
        ".wav",
        ".mid",
        ".rar",
        ".zip",
        ".tar",
        ".gz",
        ".7z",
        ".bz2",
        ".cab",
        ".iso",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".pdf",
        ".txt",
        ".md",
        ".xml"
      ],

      UEDITOR_HOME_URL: "/plugin/bdueditorv1.0/",
      toolbars: [
        [
          "fullscreen",
          "source",
          "|",
          "undo",
          "redo",
          "|",
          "bold",
          "italic",
          "underline",
          "fontborder",
          "strikethrough",
          "superscript",
          "subscript",
          "removeformat",
          "formatmatch",
          "autotypeset",
          "blockquote",
          "pasteplain",
          "|",
          "forecolor",
          "backcolor",
          "insertorderedlist",
          "insertunorderedlist",
          "selectall",
          "cleardoc",
          "|",
          "rowspacingtop",
          "rowspacingbottom",
          "lineheight",
          "|",
          "customstyle",
          "paragraph",
          "fontfamily",
          "fontsize",
          "|",
          "directionalityltr",
          "directionalityrtl",
          "indent",
          "|",
          "justifyleft",
          "justifycenter",
          "justifyright",
          "justifyjustify",
          "|",
          "touppercase",
          "tolowercase",
          "|",
          "link",
          "unlink",
          "anchor",
          "|",
          "imagenone",
          "imageleft",
          "imageright",
          "imagecenter",
          "|",
          "simpleupload",
          "insertimage",
          "emotion",
          "insertvideo",
          "music",
          "attachment",
          "map",
          "gmap",
          "insertframe",
          "insertcode",
          "webapp",
          "pagebreak",
          "template",
          "background",
          "|",
          "horizontal",
          "date",
          "time",
          "spechars",
          "snapscreen",
          "wordimage",
          "|",
          "inserttable",
          "deletetable",
          "insertparagraphbeforetable",
          "insertrow",
          "deleterow",
          "insertcol",
          "deletecol",
          "mergecells",
          "mergeright",
          "mergedown",
          "splittocells",
          "splittorows",
          "splittocols",
          "charts",
          "|",
          "print",
          "preview",
          "searchreplace",
          "drafts",
          "help"
        ]
      ]
    };
    return {
      mathId: "ueditor" + RndNum(6),
      editor: null,
      myConfig,
      load: true,
      showUe: false
    };
  },
  components: {
    VueUeditorWrap
  },
  mounted() {
    this.showUe = true;
  },
  mixins: [control],
  created() {
    if (this.value === null || typeof this.value === "undefined") {
      this.val = "";
    } else {
      this.val = this.value;
    }
  },
  computed: {
    returnValue() {
      return this.val;
    },
    disabled() {
      return this.config.disabled;
    }
  },
  methods: {
    ready(editorInstance) {
      this.load = false;
      this.disabled && editorInstance.setDisabled();
      editorInstance.addListener("blur", () => {
        // $c.log(212)
        var content = editorInstance.getContentLength(true);
        window.sessionStorage.setItem("countNum", content);
      });
    }
  }
};
</script>
<style lang="scss">
.edui-editor {
  line-height: 1;
}
/deep/ .edui-default .edui-editor-toolbarbox {
  position: relative !important;
}
/deep/ .edui1_toolbarbox {
  position: relative !important;
}
</style>
