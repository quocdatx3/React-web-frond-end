import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/Notification";


const ConfirmModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        handModal() {
            setIsShow(!isShow);
        }
    }));

    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
    }
    
    return (
        <>
            <div id="confirm" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button className="astext pull-right">
                                <i className="glyphicon glyphicon-remove" onClick={() => handModal()}></i></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Bạn có chắc chắn muốn gửi<br />
                                thông báo ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => handModal()}>Hủy</button>
                            <button className="btn btn-primary" onClick={()=>props.func()}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

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

    const sentNotice = ()=>{
        props.func();
        handModal();
    }
    return (
        <>
            <div id="notification-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="notification-info-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="noti-headline">{props.headline}</h4>
                        </div>
                        <div className="panel-body">
                            <p>{props.content}
                            </p>

                        </div>
                        <div className="panel-footer text-center">
                            <button type="button" className="btn btn-primary" onClick={() => sentNotice()}>Gửi thông báo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

const AddModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        handModal() {
            setIsShow(!isShow);
        }
    }));

    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
    }

    return (
        <>
            <div id="notification-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="notification-info-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline">Tạo thông báo</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-8">
                                    <input id="noti-headline" name="noti-headline" type="text" className="form-control" placeholder="Tiêu đề" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="">
                                    <textarea id="noti- content" name="noti-content" cols="40" rows="15" className="form-control" placeholder="Nội dung"/>
                                </div>
                            </div>

                            <div className="panel-footer right-align">
                                <button type="button" className="btn" onClick={()=>handModal()}>Hủy</button>
                                <button type="button" className="btn btn-primary" onClick={()=>props.func}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default function Notification() {
    const tableHead = {
        star: "",
        headline: ""
    };

    const countPerPage = 4;
    const [value, setValue] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [collection, setCollection] = React.useState(
        cloneDeep(allData.slice(0, countPerPage))
    );
    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            setCurrentPage(1);
            const data = cloneDeep(
                allData
                    .filter(item => item.headline.toLowerCase().indexOf(query) > -1)
                    .slice(0, countPerPage)
            );
            setCollection(data);
        }, 400)
    );

    React.useEffect(() => {
        if (!value) {
            updatePage(1);
        } else {
            searchData.current(value);
        }
    }, [value]);

    const updatePage = p => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(cloneDeep(allData.slice(from, to)));
    };

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if (i === 1) return <td key={i}><h4>{key["headline"]}</h4><p>{key["content"]}</p></td>;
            return <td key={i}>{key[keyD]}</td>;
        });

        return <tr key={index} onClick={()=>clickDetailModal(key["headline"])}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index}>{title}</td>
        ));
    };
    /* confim modal */
    const ConfirmModalRef = React.useRef(null);
    const confirmModalFunc = () => {
        console.log("confirm.");
    }
    const clickConfirmMedal = () => {
        ConfirmModalRef.current.handModal();
    };
    /* Detail Modal */
    const DetailModalRef = React.useRef(null);
    const clickDetailModal = props => {
        DetailModalRef.current.handModal();
    };
    const DetailModalFunc = () => {
        console.log("confirm.");
    }
    
    /* Add Modal */
    const AddModalRef = React.useRef(null);
    const AddModalFunc = () => {
        console.log("add");
    }
    const clickAddModal = () => {
        AddModalRef.current.handModal();
    };
    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Thông báo</h2>
                </div>
                <div className="col-md-4">
                    <div className="find-group">
                        <input id="Findinput" className="form-control"
                            placeholder="Tiêu đề"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <span className="fa fa-search field-icon"></span>
                    </div>
                </div>
                <div className="col-md-2">
                    <span className="pull-left">
                        <div>
                            <button className="btn btn-primary" onClick={()=>clickAddModal()}>+ Tạo</button>
                        </div>
                    </span>
                </div>
            </div>

            <div className="table-control-2 center-block">
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>{headRow()}</tr>
                        </thead>
                        <tbody className="notification-table">{tableData()}</tbody>
                    </table>
                </div>
            </div>

            <div className="col-md-12 text-right">
                <Pagination
                    pageSize={countPerPage}
                    onChange={updatePage}
                    current={currentPage}
                    total={allData.length}
                />
            </div>
            <ConfirmModal ref={ConfirmModalRef} func ={confirmModalFunc}/>
            <DetailModal ref={DetailModalRef} func={clickConfirmMedal} />
            <AddModal  ref={AddModalRef} func={AddModalFunc} />
        </div>

    )
}
