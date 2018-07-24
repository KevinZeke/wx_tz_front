import axios from 'axios'
import {service} from '../config/conf'

export function isSignToday(userid) {
    return axios.get(service.isSignedTodayUrl, {params: {userid}});
}

export function getCurMonthRecordById(userid) {
    return axios.get(service.curMonRecordUrl, {params: {userid}});
}

export function sign(name, userid, type = 1) {
    return axios.get(service.signUrl, {params:{name, userid, type}})
}

export function signOnduty(name, userid, type = 2) {
    return axios.get(service.signOnDutyUrl, {params:{name, userid, type}})
}

export function getDutyListToday() {
    return axios.get(service.dutyListUrl, {})
}