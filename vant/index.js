import comList from "../src/byVant/components/list";
import comTabbar from "../src/byVant/components/tabbar";
import comGrid from "../src/byVant/components/grid";
import comForm from "../src/byVant/components/form";
import comTree from "../src/byVant/components/treePopup";
import comSelect from "../src/byVant/components/selectPopup";
import comLoginCse from '../src/byVant/components/app/login'
import comLoginQnlm from '../src/byVant/components/app/login_qnlm'
let comLogin
if (window.config) {
  switch (window.config.unit) {
    case 'cse':
      comLogin = comLoginCse
      break;
    case 'qnlm':
      comLogin = comLoginQnlm
      break;
    default:
      comLogin = comLoginCse
      break
  }
}
import comTabbars from "../src/byVant/components/app/tabbar";
// import comTabbar from '../src/byVant/components/app/tabbar'

import input from "../src/byVant/controls/input";
import radio from "../src/byVant/controls/radio";
import dateRange from "../src/byVant/controls/dateRange";
import uploader from "../src/byVant/controls/uploader";
import checkbox from "../src/byVant/controls/checkbox";
import opinion from "../src/byVant/controls/opinion";
import approve from "../src/byVant/controls/approve";
import txt from "../src/byVant/controls/txt";
import select from "../src/byVant/controls/select";
import selectTree from "../src/byVant/controls/selectTree";
import $ from "../src/http";
import uFile from "../src/utils/file";
import tmpApp from "../src/byVant/tmp/app";
// import comLogin from '..'

const conTxt = txt.name;
const conRadio = radio.name;
const conInput = input.name;
const conSelect = select.name;
const conSelectTree = selectTree.name;
const conOpinion = opinion.name;
const conApprove = approve.name;
const conUploader = uploader.name;
const conCheckbox = checkbox.name;
const conDateRange = dateRange.name;

export {
  uFile,
  tmpApp,
  comList,
  comGrid,
  comForm,
  comTree,
  comTabbar,
  comLogin,
  comTabbars,
  conTxt,
  conInput,
  conRadio,
  comSelect,
  conSelect,
  conOpinion,
  conApprove,
  conUploader,
  conCheckbox,
  conDateRange,
  conSelectTree,
  $
};
