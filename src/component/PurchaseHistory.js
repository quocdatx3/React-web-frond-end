import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/PurchaseHistory";

const PurchaseHistoryTable = props => {

    const tableHead = {
        stt: "Stt",
        customer: "Khách hàng",
        package: "Gói",
        time: "Thời gian",
        code: "Mã khuyến mãi"
    };
    const countPerPage = 9;
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
                allData.filter(item => item.package.toLowerCase().indexOf(query) > -1)
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
            return <td key={i}>{key[keyD]}</td>;
        });

        return <tr key={index} onClick={() => toDetailPage(key["stt"])}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index}>{title}</td>
        ));
    };

    const toDetailPage = e => {
        props.changeData(e);
        props.changePage();
    }

    return (
        <>
            <div className="row toolbar">
                <div className="col-md-7">
                    <h2>Lịch sử giao dịch</h2>
                </div>
                <div className="col-md-4">
                    <div className="find-group">
                        <input
                            id="Findinput"
                            className="form-control"
                            placeholder="Search"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <span className="fa fa-search field-icon"></span>
                    </div>
                </div>
            </div>

            <div className="form-date-to-date-form">
                <label >Từ ngày</label>
                <input type="date" id="from-date" name="from-date" />
                <label >Từ ngày</label>
                <input type="date" id="from-date" name="from-date" />
                <button id="see" name="see" className="btn btn-primary">Xem</button>
            </div>

            <div className="table-control-1">
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead className="table-header-style-1">
                            <tr>{headRow()}</tr>
                        </thead>
                        <tbody>
                            {tableData()}
                        </tbody>
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
        </>
    );
}

const PurchaseHistoryDetail = props => {
    const backToTable = () => {
        props.changePage();
    }
    const purchaceData = [
        {
            package: "Gói đăng ký",
            customer: "Mã khuyến mãi",
            time: "Ngày giao dịch",
            code: "Tổng tiền"
        }, {
            package: "Gói đăng ký",
            customer: "Mã khuyến mãi",
            time: "Ngày giao dịch",
            code: "Tổng tiền"
        }, {
            package: "Gói đăng ký",
            customer: "Mã khuyến mãi",
            time: "Ngày giao dịch",
            code: "Tổng tiền"
        }
    ]

    const tableHead = {
        package: "Gói đăng ký",
        customer: "Mã khuyến mãi",
        time: "Ngày giao dịch",
        code: "Tổng tiền"
    };

    const [collection, setCollection] = React.useState(
        cloneDeep(purchaceData.slice(0, purchaceData.length))
    );

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            return <td key={i}>{key[keyD]}</td>;
        });

        return <tr key={index}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index}>{title}</td>
        ));
    };

    return (
        <>
            <div id="detail">
                <div className="row toolbar">
                    <button className="btn astext" onClick={() => backToTable()}>
                        <i className="glyphicon glyphicon-arrow-left back-btn"></i>
                    </button>
                    <h2>Lịch sử giao dịch</h2>
                </div>

                <div className="customer-name">
                    <h4>Khách hàng: Nguyễn Việt Hà</h4>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        Thông tin cá nhân
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Số điện thoại</label>
                                    <div className="col-sm-8">
                                        <input id="phone-number" type="number" className="form-control" disabled></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Email</label>
                                    <div className="col-sm-8">
                                        <input id="email" type="email" className="form-control" disabled></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Giới tính</label>
                                    <div className="col-sm-8">
                                        <input id="gender"  className="form-control" disabled></input>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-2"></div>

                            <div className="col-sm-5">
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Hình thức thanh toán</label>
                                    <div className="col-sm-8">
                                        <input id="payment"  className="form-control" disabled></input>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">Ngày đăng ký gói</label>
                                    <div className="col-sm-8">
                                        <input id="registration-date" type="date" className="form-control" disabled></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        Lịch sử
                    </div>
                    <div className="panel-body pur-history">
                        <table className="table table-striped table-borderless">
                            <thead>
                                <tr>
                                    {headRow()}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
export default function PurchaseHistory() {
    const [data, setData] = React.useState(true);
    const changeData = (e) => {
        setData(e);
    }

    const [isTable, setIsTable] = React.useState(true);
    const changePage = () => {
        setIsTable(!isTable);
    }
    const page = () => {
        return isTable ? <PurchaseHistoryTable changeData={changeData} changePage={changePage} /> :
            <PurchaseHistoryDetail data={data} changePage={changePage} />
    }

    return (
        <>
            {page()}
        </>
    )
}
