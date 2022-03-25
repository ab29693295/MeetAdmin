
import React, {Component} from 'react';
import {  DatePicker } from 'antd';
import 'moment/locale/zh-cn';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;
export default class TimeSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChange=this.onChange.bind(this)
    }
    //不能选择日期
    disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().subtract(1, 'day')
    }
    //不能选择时间
    disabledRangeTime(date) {
        let hours = moment().hours();//0~23
        let minutes = moment().minutes();//0~59
        if(date==null){
            return {
                disabledHours: () => range(0,24),
                disabledMinutes: () => range(0,60)
            };
        }
        if (date && moment(date).date() === moment().date() ) {
            return {
                disabledHours: () => range(0,hours),
                disabledMinutes: () => {
                    if(hours== moment(date).hours()){
                        return range(0,minutes)
                    }else{
                        return []
                    }
                }
            };
        }

        function range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        }
    }
    onChange(date){
        this.props.onChange(date)
    }
    render() {
        // console.log(this.props.value)
        return (
            <>
                <RangePicker
                    value={this.props.value}
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    locale={locale}
                    disabledDate={this.disabledDate}
                    disabledTime={this.disabledRangeTime}
                    onChange={this.onChange}
                />
                </>
        )
    }
}