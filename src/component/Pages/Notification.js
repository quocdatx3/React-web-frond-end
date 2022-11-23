import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../Pages/css/style.css"
import "../Pages/css/modal-style.css"
import "../Pages/css/table-style.css"

import SEVER_URL from '../../setup';


const ConfirmModal = props => {

    const sendNotification = () => {
        console.log("sendNotification " + props.data);

        props.closeConfirmMedal();
        props.closeDetailModal();
    }

    return (
        <>
            <div id="confirm" className="modal admin-modal-pos-control" style={{ display: 'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button className="astext pull-right">
                                <i className="glyphicon glyphicon-remove" onClick={() => props.closeConfirmMedal()}></i></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Bạn có chắc chắn muốn gửi<br />
                                thông báo ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => props.closeConfirmMedal()}>Hủy</button>
                            <button className="btn btn-primary" onClick={() => sendNotification()}>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const DetailModal = props => {
    
    console.log(props.data);
    const [showConfirmMedal, setShowConfirmMedal] = React.useState(false);
    const clickConfirmMedal = () => {
        setShowConfirmMedal(!showConfirmMedal)
    };
    const closeConfirmMedal = () => {
        setShowConfirmMedal(!showConfirmMedal)
    }
    const sentNotice = () => {
        clickConfirmMedal();
    }
    return (
        <>
            <div id="notification-info" className="modal admin-modal-pos-control" style={{ display: 'block'}}>
                <div className="notification-info-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="noti-headline">{props.data.tieuDeThongBao}</h4>
                            <button className="astext pull-right" >
                                <i className="glyphicon glyphicon-remove" onClick={() => props.closeDetailModal()}></i>
                            </button>
                        </div>
                        <div className="panel-body">
                            <p>{props.data.noiDungThongBao}
                            </p>

                        </div>
                        <div className="panel-footer text-center">
                            <button type="button" className="btn btn-primary" onClick={() => sentNotice()}>Gửi thông báo</button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmMedal ? <ConfirmModal data={props.data.idThongBao} closeConfirmMedal={closeConfirmMedal} closeDetailModal={props.closeDetailModal}/> : null}
        </>
    )
};

const AddModal = props => {

    const addNotice = () => {
        console.log("addNotice " + props);
        props.closeNewModal();
    }

    return (
        <>
            <div id="notification-info" className="modal admin-modal-pos-control" style={{ display: 'block' }}>
                <div className="notification-info-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline">Tạo thông báo</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <div className="col-8">
                                    <input  className="form-control" placeholder="Tiêu đề" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="">
                                    <textarea cols="40" rows="15" className="form-control" placeholder="Nội dung" />
                                </div>
                            </div>

                            <div className="panel-footer right-align">
                                <button type="button" className="btn" onClick={()=>props.closeNewModal()}>Hủy</button>
                                <button type="button" className="btn btn-primary" onClick={()=>addNotice()}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

const NotificationTable = props =>{
    const allData = props.allData;

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
                    .filter(item => item.tieuDeThongBao.toLowerCase().indexOf(query) > -1)
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
    function limit(string = '', limit = 0) {
        return string?.substring(0, limit) || '';
    }
    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if (i === 1)
                return <td key={i}>
                    <h4>{key["tieuDeThongBao"]}</h4>
                    <p>{limit(key["noiDungThongBao"],200)}</p>
                </td>;
            return <td key={i}>{<span className="glyphicon glyphicon-star"></span>}</td>;
        });

        return <tr key={index} onClick={() => clickDetailModal(key["idThongBao"])}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index}>{title}</td>
        ));
    };


    const [noticeData, setNoticeData] = React.useState();

    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const clickDetailModal = props => {
        setNoticeData(allData.find(obj => { return obj.idThongBao === props }))

        setTimeout(() => {
            setShowDetailModal(!showDetailModal)
        }, 800);
    };
    const closeDetailModal = () => {
        setShowDetailModal(!showDetailModal)
    }

    const [showNewlModal, setShowNewModal] = React.useState(false);
    const clickNewModal = () => {
        setShowNewModal(!showNewlModal)
    };
    const closeNewModal = () => {
        setShowNewModal(!showNewlModal)
    }


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
                            <button className="btn btn-primary" onClick={() => clickNewModal()}>+ Tạo</button>
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
            {showDetailModal ? <DetailModal data={noticeData} closeDetailModal={closeDetailModal} /> : null}
            {showNewlModal? <AddModal closeNewModal={closeNewModal}/> :null}
        </div>

    )
}


export default function Notification() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/notification/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                    setAllData(data);
                    setIsLoading(!isLoading);
                });
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, [getData]);

    const resetPage = () => {
        setGetData(!getData);
        setIsLoading(!isLoading);
    }

    if (isLoading) {
        return (
            <div>
                <h2>Loading</h2>
            </div>
        )
    }
    else {
        return (
            <div>
                <NotificationTable allData={allData} />
            </div>
        )
    }
}
