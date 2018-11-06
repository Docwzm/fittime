import './errImg'
import './umeng'
import './interceptor'
import './global'
import './staticData'
import './dateFormat'
import './filter'
import './rem'
import './cookie'

import { querystring } from 'vux'
let _from = querystring.parse(location.href.split('?')[1]).from;
//需要优化
setTimeout(() => {
  _czc.push(['_trackEvent', '万圣节', '渠道', '统计'])
  switch (_from) {
    case 'fx':
      _czc.push(['_trackEvent', '万圣节', '渠道', '分享'])
      break;
    case 'rmhd':
      _czc.push(['_trackEvent', '万圣节', '渠道', '热门活动'])
      break;
    case 'sydt':
      _czc.push(['_trackEvent', '万圣节', '渠道', '首页大图'])
      break;
    case 'sywz':
      _czc.push(['_trackEvent', '万圣节', '渠道', '首页文字'])
      break;
    case 'jg':
      _czc.push(['_trackEvent', '万圣节', '渠道', '极光'])
      break;
  }
}, 3000)