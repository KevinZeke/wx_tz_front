import axios from 'axios'
import {service} from '../config/conf'
import Qs from 'qs'

export function isSignToday(userid) {
    return axios.get(service.isSignedTodayUrl, {params: {userid}});
}

export function getCurMonthRecordById(userid) {
    return axios.get(service.curMonRecordUrl, {params: {userid}});
}

export function sign(name, userid, type = 1) {
    return axios.get(service.signUrl, {params: {name, userid, type}})
}

export function signOnduty(name, userid, type = 2) {
    return axios.get(service.signOnDutyUrl, {params: {name, userid, type}})
}

export function getDutyListToday() {
    return axios.get(service.dutyListUrl, {})
}

export function getDutyList(date) {
    return axios.get(service.dutyListUrl, {params: {date}})
}

export function getChujingReport(date) {
    return axios.get(service.chujingReportCheckUrl, {params: {date}})
}

export function addChujingReport(
    accept_datetime,
    accept_object,
    fire_address,
    call_address,
    call_man,
    force,
    fire_obj,
    lose,
    arrived_datetime,
    back_datetime,
    rep_datetime,
    save_measure,
    evaluation,
    advice,
    burned_area

) {
    return axios.post(service.chujingReportAddUrl, Qs.stringify({
        accept_datetime,
        accept_object,
        fire_address,
        call_address,
        call_man,
        force,
        fire_obj,
        lose,
        arrived_datetime,
        back_datetime,
        rep_datetime,
        save_measure,
        evaluation,
        advice,
        burned_area
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
}