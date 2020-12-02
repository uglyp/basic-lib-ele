const linkTo = (path, query = {}, method) => {
  if (window.$app) {
    if (window.$app.$router) {
      if (path !== window.$app.$route.path || JSON.stringify(query) !== JSON.stringify(window.$app
          .$route.query)) {
        if (typeof path === 'object') {
          window.$app.$router[method](path)
        } else {
          window.$app.$router[method]({
            path,
            query
          })
        }
      } else {
        $c.warn('无效的跳转, 跳转路径和当前路径一致');
      }
    } else {
      $c.error('vue-router 加载失败');
    }
  } else {
    $c.error('$app 加载失败');
  }
}
window.$to = (path, query = {}) => linkTo(path, query, 'push')
window.$$.to = (path, query = {}) => linkTo(path, query, 'push')
window.$$.rto = (path, query = {}) => linkTo(path, query, 'replace')
window.$$.reload = () => {
  const {
    matched,
  } = $r || {};
  const m = matched[matched.length - 2]
  const {
    instances
  } = m || {};
  const {
    default: d
  } = instances || {};
  const {
    reload
  } = d
  reload && reload()
}
window.$$.back = () => {
  let {
    matched,
    params
  } = $r;
  let m = matched[matched.length - 2]
  if (m) {
    let path = m.path
    for (let k in params) {
      path = path.replace(`:${k}`, `${[params[k]]}`);
    }
    window.$app.$router.replace(path + '/')
    return m
  } else {
    $$.msg.warn('没有上一级了')
  }
}
