const resetTime = 200;
const msg = {
  warn(txt) {
    if (window._curToast) {
      window._curToast.clear()
      setTimeout(() => {
        window._curToast = window.$app.$toast(txt);
      }, resetTime);
    } else {
      window._curToast = window.$app.$toast(txt);
    }

  },
  error(txt) {
    if (window._curToast) {
      window._curToast.clear()
      setTimeout(() => {
        window._curToast = window.$app.$toast.fail(txt);
      }, resetTime);
    } else {
      window._curToast = window.$app.$toast.fail(txt);
    }
  },
  show(txt) {
    if (window._curToast) {
      window._curToast.clear()
      setTimeout(() => {
        window._curToast = window.$app.$toast.success(txt);
      }, resetTime);
    } else {
      window._curToast = window.$app.$toast.success(txt);
    }
  }
};
window.$$.msg = msg;
