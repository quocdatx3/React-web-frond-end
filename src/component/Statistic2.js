import React from 'react'
import cloneDeep from "lodash/cloneDeep";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

const Card = props => {

    const setImg = () => {
        if (props.imgURL != null)
            return <img src={props.imgURL} alt="/img/img-not-found.png"></img>
        else
            return <img src="/img/img-not-found.png" alt="/img/img-not-found.png"></img>
    }
    return (
        <div className="row">
            <div className="col-sm-5 num-ranking-control">
                <div className="dot number-control"> {props.stt} </div>
                {setImg()}
            </div>
            <div className="col-sm-6" >
                <div className="name">{props.name}</div>
                <div className="type">{props.type}</div>
                <div className="number">
                    <span className="glyphicon glyphicon-heart" aria-hidden="true" />{props.loves}
                </div>
            </div>
        </div>
    )
}

export default function Statistic2() {

    const allData = [
        {
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 50
        }, {
            stt: 2,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 40
        }, {
            stt: 3,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 35
        }, {
            stt: 4,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 34
        }, {
            stt: 5,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 33
        }, {
            stt: 6,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 31
        }, {
            stt: 7,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 24
        }, {
            stt: 8,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 23
        }, {
            stt: 9,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 22
        }, {
            stt: 10,
            anh: null,
            ten: "Tên phim",
            theLoai: "Thể loại",
            luotYeuThich: 10
        }
    ]

    const [collection] = React.useState(cloneDeep(allData));
    const cardsArrayData = (from, to) => {
        return collection.map((key, index) => {
            if (index >= from && index <= to)
                return <div key={index}>
                    <Card 
                        stt={index + 1}
                        imgURL={key["anh"]}
                        name={key["ten"]}
                        type={key["theLoai"]}
                        loves={key["luotYeuThich"]}
                    />
                </div>;
                else return null;
        });
    };

    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Thống kê phim yêu thích nhất</h2>
                </div>
            </div>

            <div >
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

            <div id="love-ranking">
                <div className='col-md-6'>
                    {cardsArrayData(0, 4)}
                </div>
                <div className='col-md-6'>
                    {cardsArrayData(5, 9)}
                </div>
            </div>
        </div>
    )
}
