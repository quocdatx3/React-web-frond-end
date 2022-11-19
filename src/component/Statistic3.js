import React from 'react'
import DonutChart from 'react-donut-chart';

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

export default function Statistic3() {
    const [subscribers] = React.useState(1692);
    const Data = [
        {
          label: 'Tiêu Chuẩn',
          value: 11,
        },
        {
          label: 'Cao cấp',
          value: 75,
        },
        {
          label: 'Thông thường',
          value: 75,
        },
        {
          label: 'Phim Lẻ',
          value: 75,
        }
      ];
    const Color = ['#f44336',
                    '#e91e63',
                    '#9c27b0',
                    '#673ab7',
                    '#3f51b5',
                    '#2196f3',
                    '#03a9f4',
                    '#00bcd4',
                    '#009688',
                    '#4caf50']
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
                                <input type='month' className="form-control" />
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
                    data={Data}
                    height = {400}
                    width = {400}
                    colors = {Color}
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
