import {
  Message,
  MessageBox
} from 'element-ui';
const msg = {
  warn(txt) {
    Message({
      dangerouslyUseHTMLString: true,
      type: 'warning',
      message: txt
    });
  },
  error(txt) {
    Message({
      dangerouslyUseHTMLString: true,
      type: 'error',
      message: txt
    });
  },
  show(txt) {
    Message({
      dangerouslyUseHTMLString: true,
      type: 'success',
      message: txt
    });
  }
};
const $confirm = MessageBox.confirm;

window.$$.msg = msg;
window.$$.$confirm = $confirm
