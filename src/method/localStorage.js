export function setLocalStorage(key, value, days) {
  // 设置过期原则
  if (!value) {
    localStorage.removeItem(key)
  } else {
    var Days = days || 1; // 默认保留1天
    var exp = new Date();
    localStorage[key] = JSON.stringify({
      value,
      expires: exp.getTime() + Days * 24 * 60 * 60 * 1000
    })
  }
}

export function getLocalStorage(key) {
  try {
    let o = JSON.parse(localStorage[key])
    if (!o || o.expires < Date.now()) {
      return false
    } else {
      return o.value
    }
  } catch (e) {
    // 兼容其他localstorage
    console.log(e)
    return localStorage[key]
  } finally {
  }
}

