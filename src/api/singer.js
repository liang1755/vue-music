import jsonp from '../common/js/jsonp'
import { commonParams,options} from './config'
// import axios from 'axios'

export function getSingerList(){
    // const url = "/api/getSingerList"
    // const data = Object.assign({},commonParams,{
    //     '-': 'getUCGI'+(Math.random()+"").replace("0.",""),
    //     'g_tk': 5381,
    //     'loginUin': 0,
    //     'hostUin': 0,
    //     'format': 'json',
    //     'inCharset': 'utf8',
    //     'outCharset': 'utf-8',
    //     'notice': 0,
    //     'platform': 'yqq.json',
    //     'needNewCode': 0,
    //     'data': {
    //         "comm":{
    //             "ct":24,
    //             "cv":0
    //         },
    //         "singerList":{
    //             "module":"Music.SingerListServer",
    //             "method":"get_singer_list",
    //             "param":{
    //                 "area":-100,
    //                 "sex":-100,
    //                 "genre":-100,
    //                 "index":-100,
    //                 "sin":0,
    //                 "cur_page":1
    //             }
    //         }
    //     }
    // })

    
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })

    // return axios.get(url,{
    //     params:data
    // }).then((res)=>{
    //     return Promise.resolve(res.data)
    // })

    return jsonp(url,data,options)
}

export function getSingerDetail(singerId){
  //2020-3-5更新的接口需要在服务端伪造域名
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({},commonParams,{
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: singerId
    })
    return jsonp(url,data,options)
}