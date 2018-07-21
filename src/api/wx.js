
import axios from 'axios'
import {wx} from '../config/conf'

export function getJssdkConfig(url) {

    return axios.get(wx.jssdkConfUrl,{params:{url}});

}

export function getAccountInfo() {
    return axios.get(wx.accountInfoUrl);
}