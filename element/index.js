/**公共组件,con前缀 */
import testTable from "../src/byElement/controls/table/";
import tableForForm from "../src/byElement/controls/tableForForm/";
import tableCol from "../src/byElement/controls/tableCol/";
import testForm from "../src/byElement/components/Form";
import testMore from "../src/byElement/components/MoreSubassembly";
import conTable from "../src/byElement/controls/table/";
import conInput from "../src/byElement/controls/input";
import conNumber from "../src/byElement/controls/number";
import conSelect from "../src/byElement/controls/select";
import conSelect2 from "../src/byElement/controls/select2";
import conQuickDate from "../src/byElement/controls/quickDate";
import conTabs from "../src/byElement/controls/tabs";
import conSelectBox from "../src/byElement/controls/selectBox";
import conDate from "../src/byElement/controls/date";
import conDateRange from "../src/byElement/controls/dateRange";
import conCascader from "../src/byElement/controls/cascader";
import conAreas from "../src/byElement/controls/areas";
import conUpload from "../src/byElement/controls/upload";
import conUpload2 from "../src/byElement/controls/upload_v2";
import conUploadImg from "../src/byElement/controls/upload_image";
import conLink from "../src/byElement/controls/link";
import conTxt from "../src/byElement/controls/txt";
import conUEditor from "../src/byElement/controls/ueditor";
import conEdit from "../src/byElement/controls/edit";
import conCheckbox from "../src/byElement/controls/checkbox";
import conCompositeCom from "../src/byElement/controls/compositeCom";
import conRadioBox from "../src/byElement/controls/radiobox";
import conRadioList from "../src/byElement/controls/radioList";
import conColor from "../src/byElement/controls/color";
import conMultiple from "../src/byElement/controls/multipleTable";
import conPassword from "../src/byElement/controls/password";
import conSwitch from "../src/byElement/controls/switch";
import comPopup from "../src/byElement/components/Popup";
import comHeader from "../src/byElement/components/app/Header";
import comForm from "../src/byElement/components/Form";
import comErr from "../src/byElement/components/app/Err";
import comLoad from "../src/byElement/components/app/Load";
import comBtns from "../src/byElement/components/Btns";
import comMenu from "../src/byElement/components/app/Menu";
import comUpload from "../src/byElement/components/Upload";
import comTree from "../src/byElement/components/Tree";
import comFooter from "../src/byElement/components/app/Footer";
import noAccess from "../src/byElement/components/app/noAccess";
import comLogin from "../src/byElement/components/app/Login";
/**公共类库, u前缀 */
import uFormatter from "../src/utils/formatter";
import uFile from "../src/utils/file";
import uTree from "../src/utils/tree";
import uDate from "../src/utils/date";
import controls_p from "../package.json";
import $ from "../src/http";
import axios from "axios";
import tmpApp from "../src/byElement/tmp/app";
import tmpList from "../src/byElement/tmp/list";
import tmpInfo from "../src/byElement/tmp/info";
import cseHeader from "../src/byElement/components/header/cse";
import uldFoc from "../src/byElement/controls/uploadForCmposite";
// let comHeader;
// if (window.config) {
//   switch (window.config.unit) {
//     case 'cse':
//       comHeader = comHeaderCse
//       break;
//     case 'qnlm':
//       comHeader = comHeaderQnlm
//       break;
//     default:
//       comHeader = comHeaderDef
//       break
//   }
// }
export {
  comFooter,
  comPopup,
  comHeader,
  testTable,
  testForm,
  testMore,
  // conAddsub,
  // comHeaderCse,
  // comHeaderQnlm,
  noAccess,
  comMenu,
  comForm,
  comErr,
  comLoad,
  comBtns,
  comTree,
  conUploadImg,
  conUpload2,
  comUpload,
  conInput,
  conNumber,
  conPassword,
  conSelect,
  conSelectBox,
  conTable,
  conMultiple,
  conDate,
  conTxt,
  conCheckbox,
  conRadioBox,
  conRadioList,
  uFormatter,
  conQuickDate,
  conTabs,
  conDateRange,
  conCascader,
  conLink,
  controls_p,
  conAreas,
  conUpload,
  // conEditor,
  conUEditor,
  conEdit,
  conSwitch,
  uFile,
  uTree,
  uDate,
  $,
  axios,
  comLogin,
  tmpApp,
  tmpList,
  tmpInfo,
  conColor,
  cseHeader,
  conSelect2,
  conCompositeCom,
  tableForForm,
  uldFoc,
  tableCol
};
