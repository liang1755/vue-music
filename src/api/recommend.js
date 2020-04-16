import jsonp from '../common/js/jsonp'
import { commonParams,options} from './config'
import axios from 'axios'

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({},commonParams,{
        platform :'yqq.json',
        hostUin: 0,
        needNewCode: 0,
        inCharset: 'utf8',
        format: 'json',
    })
    return jsonp(url,data,options)
}
