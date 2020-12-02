const appCall = (appStr) => {
  //$c.log(appStr,'两个方法传过来的参数')
  var u = window.navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  if (isAndroid) {
    /* global QHBridge */
    if (QHBridge) {
      try {
        QHBridge.call(appStr)
      } catch (err) {
        window.alert('app功能注册失败, 无法使用')
      }
    } else {
      $c.error('QHBridge对象查找失败')
      $$.msg.error('QHBridge对象查找失败')
    }
  }
}
const setAliasCallback = e => {
  $c.log(e)
}
window.setAliasCallback = window.setAliasCallback || setAliasCallback;
window.$$.mobile = {
  /**
   * 注册极光推送
   */
  setAlias(OPENID) {
    //$c.log('这是极光推送的方法')
    if (!OPENID) {
      window.alert('OPENID获取失败, 推送功能无法使用')
      return
    }
    const config = {
      action: 'setAlias',
      data: {
        alias: OPENID,
        callback: 'setAliasCallback'
      }
    }
    // '{"action":"setAlias","data":{"alias":"{OPENID}","callback":"setAliasCallback"}}'
    // appCall(JSON.stringify(config));
    appCall(JSON.stringify(config));
  },
  /**
   * 设置角标
   */
  swetIconBadge(mark) {
    //$c.log(mark,'这是设置角标的方法')
    const config = {
      action: 'setBadgeNumber',
      data: `${mark}`
    }
    // '{"action":"setIconBadge","data":"' + mark + '"}'
    appCall(JSON.stringify(config));
  },
}
