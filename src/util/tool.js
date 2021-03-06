export const dateFormat = (time,fmt = 'YYYY-MM-DD HH:mm:ss') => {
    let date = time;
    if(typeof time != "object"){
        date = new Date(time)
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}


/**
 *
 * 获取系统类型
 * @export
 * @returns
 */
export const getPlatform = () => {
    const ua = navigator.userAgent
    const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      return 'android'
    } else if (isiOS) {
      return 'ios'
    }
    return ''
  }

  export function checkEnv() {
    var mHost = window.location.hostname
    return {
       "cdn.lifesense.com": "online"
    }[mHost] || 'dev'
 }