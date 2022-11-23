import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";

import "../Pages/css/style.css"
import "../Pages/css/modal-style.css"
import "../Pages/css/table-style.css"

const DetailModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        handModal() {
            setIsShow(!isShow);
        }
    }));
    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
    }

    const data={
        name:"Âm thanh bị rè",

    }

    return (
        <>
            <div id="complaint-info" className="modal admin-modal-pos-control " style={{ display: isShow ? 'block' : 'none' }}>
                <div className="complaint-info-modal-control" >
                    <div className="panel panel-info">
                        <div id="new-tab" className="panel-heading">
                            <h4 className="panel-title" id="plHeadline">{data.name}</h4>
                        </div>
                        <div className="panel-body complaint-info-body-size">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group ">
                                        <label className="control-label">
                                            mô tả
                                        </label>
                                        <textarea className="form-control" cols="30" id="complain-detail" rows="10" disabled/>
                                    </div>
                                    <div className="form-group ">
                                        <label className="control-label ">
                                            Trạng thái
                                        </label>
                                        <select className="select form-control" id="complain-state">
                                            <option value="new">
                                                Mới
                                            </option>
                                            <option value="processing">
                                                Đang sử lý
                                            </option>
                                            <option value="done">
                                                Đã giải quyết
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group ">
                                        <label className="control-label requiredField">
                                            Email
                                            <span className="asteriskField">
                                                *
                                            </span>
                                        </label>
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                Tài khoản:
                                            </div>
                                            <input className="form-control" id="email" name="email"  />
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <label className="control-label ">
                                            Message
                                        </label>
                                        <textarea className="form-control" cols="40" id="message" name="message" rows="10"/>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                            <button className="btn btn-primary ">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer right-align">
                            <button className="btn" onClick={() => handModal()} >Hủy</button>
                            <button className="btn btn-primary" >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});



export default function CustomerComplains() {

    const LongPanel = props => {
        var [isOpen, setIsOpen] = React.useState(false);

        const openPanel = () => {
            setIsOpen(!isOpen);
        }

        return (
            <div className="panel">
                <div className="panel-heading">
                    {props.name}
                </div>
                <div className="panel-body" style={
                    {
                        height: (!isOpen) ? '150px' : '400px',
                        overflow: (!isOpen) ? 'hidden' : 'auto'
                    }
                }>
                    {props.content}
                </div>
                <div className="panel-footer" style={{ display: (!isOpen) ? 'block' : 'none' }}>
                    <button className="astext" onClick={openPanel}><i className="glyphicon glyphicon-menu-down"></i>Xem thêm</button>
                </div>
            </div>
        )
    }
    const allData = [
        {
            id: 1,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 2,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'processing'
        }, {
            id: 3,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 4,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 5,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'processing'
        }, {
            id: 6,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 7,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'processing'
        }, {
            id: 8,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 9,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'processing'
        }, {
            id: 10,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 11,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'processing'
        }, {
            id: 12,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 13,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'processing'
        }, {
            id: 14,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'new'
        }, {
            id: 15,
            name: "âm thanh rè",
            time: "05/06/2022, 10:30",
            state: 'done'
        }
    ]

    const Card = props => {
        const classes = "complain-tab " + props.state;
        return (
            <>
                <div className={classes} onClick={ ()=>clickDetailModal(props.id) }>
                    <div className="complain-name">
                        {props.name}
                    </div>
                    <div className="complain-time">
                        {props.time}
                    </div>
                </div>
            </>
        )
    }

    const [value, setValue] = React.useState("");
    const [collection, setCollection] = React.useState(
        cloneDeep(allData)
    );
    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            const data = cloneDeep(
                allData.filter(item => item.state.toLowerCase().indexOf(query) > -1)
            );
            setCollection(data);
        }, 400)
    );

    const listCard = props => {
        const Data = cloneDeep(collection.filter(item => item.state.toLowerCase().indexOf(props) > -1));
        if (Data.length > 0) {
            return Data.map((key, index) => {
                return <Card
                    key={index}
                    state={key["state"]}
                    time={key["time"]}
                    name={key["name"]}
                />;
            });
        }
        else
            return <h3>Không có dữ liệu</h3>
    };

    
    const [chooseId, setchooseId] = React.useState(null);
    const DetailModalRef = React.useRef(null);
    const clickDetailModal = props => {
        setchooseId(props);
        console.log(props);
        DetailModalRef.current.handModal();
    };

    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-8">
                    <h2>Khiếu nại khách hàng</h2>
                </div>
                <div className="col-md-4 vertical-center">
                    <div className="today-complain-note ">
                        <div>Hôm nay:</div>
                        <div id="new-complain">0</div>
                        <span className="glyphicon glyphicon-volume-up new-icon"></span>
                        <div id="loading-complain">0</div>
                        <span className="glyphicon glyphicon-refresh processing-icon"></span>
                        <div id="done-complain">0</div>
                        <span className="glyphicon glyphicon glyphicon-floppy-disk done-icon"></span>
                    </div>
                </div>
            </div>

            <div className="date-picker-form">
                <label >Ngày</label>
                <input type="date" className='pickdate' />
                <button id="see" name="see" className="btn btn-primary">Xem</button>
            </div>

            <div className="row">
                <div className="col-sm-4">
                    <div className='complain-panels new'>
                        <LongPanel
                            name={
                                <>
                                    <span className="glyphicon glyphicon-volume-up"></span>
                                    <div className="panel-name">Mới</div>
                                </>
                            }
                            content={
                                <>
                                    {listCard('new')}
                                </>
                            }
                        />
                    </div>
                </div>

                <div className="col-sm-4 complain-panels">
                    <div className='complain-panels processing'>
                        <LongPanel
                            name={
                                <>
                                    <span className="glyphicon glyphicon-refresh"></span>
                                    <div className="panel-name"> Đang sử lý </div>
                                </>
                            }
                            content={
                                <>
                                    {listCard('processing')}
                                </>
                            }
                        />
                    </div>
                </div>

                <div className="col-sm-4 complain-panels">
                    <div className='complain-panels done'>
                        <LongPanel
                            name={
                                <>
                                    <span className="glyphicon glyphicon-floppy-disk"></span>
                                    <div className="panel-name">Xong</div>
                                </>
                            }
                            content={
                                <>
                                    {listCard('done')}
                                </>
                            }
                        />
                    </div>
                </div>
            </div>

            <DetailModal ref={DetailModalRef} id={chooseId}/>

        </div>
    )
}
