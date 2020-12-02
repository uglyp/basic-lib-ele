const err = (e) => {
  if (e === 'cancel') {
    return
  } else if (window.config && window.config.debug) {
    $$.msg.error(e);
  } else if (e !== 'cancel') {
    $c.error(e || '错误, 无原因');
  }
}
window.$$.err = err;
