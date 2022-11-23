import React from 'react'
import DonutChart from 'react-donut-chart';

import "../Pages/css/style.css"
import "../Pages/css/modal-style.css"
import "../Pages/css/table-style.css"

import SEVER_URL from '../../setup';

export default function Statistic3() {
    const [data,setData] = React.useState([])
    const [subscribers,setSubscribers] = React.useState(1692);
    const [month,setMonth] = React.useState()
    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/admin/show/hotSubscription/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                    const filtereData=data.map((key,index)=>{
                       return {label:key["tenGoi"],value:key["soLanDangKi"]} }
                        )
                    console.log(filtereData)
                    setData(filtereData)
                    setSubscribers(filtereData.reduce((total,currentItem) =>  total = total + currentItem.value , 0 ))
                });
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, [month]);

    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Thống kê gói đăng ký nhiều</h2>
                </div>
            </div>

            <div>
                <div className="row datepicker">
                    <div className='col-sm-6'>
                        <div className="form-group">
                            <div className='input-group date' id='datetimepicker3'>
                                <input type='month' className="form-control" 
                                value={month||""}  onChange={e=>{setMonth(e.currentTarget.value)}}
                                />
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-search"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className=".content-justify-center">
                <div className="chart-place">
                <DonutChart
                    data={data}
                    height = {400}
                    width = {400}
                    legend = {false}
                />
                </div>
            </div>

            <div>
                Tổng số người đăng ký / tháng: {subscribers}
            </div>
        </div>
    )
}
