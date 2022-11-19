import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/RequestManager";

export default function RequestsManager() {
    
    const tableHead = {
        stt: "Stt",
        customer: "Phim được yêu cầu",
        account: "Tài khoản",
        time: "thời gian yêu cầu",
        func: "Tác vụ"
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
                allData.filter(item => item.customer.toLowerCase().indexOf(query) > -1)
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

    const acceptRequest=e=>{
        console.log(e)
    }

    const declineRequest=e=>{
        console.log(e)
    }

    const FuncButtons = props => {
        return <div>
            <button className="btn btn-success" onClick={() => acceptRequest(props.stt)}>
                Đồng ý
            </button>
            <button className="btn btn-danger" onClick={() => declineRequest(props.stt)}>
                Từ chối
            </button>
        </div>
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if(i===4) return <td key={i}>{FuncButtons(key["stt"])}</td>;
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
        <div>
            <div className="row toolbar">
                <div className="col-md-8">
                    <h2>Quản lý yêu cầu phim</h2>
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

            <div>
                <div className="table-responsive">
                    <table id='RequestManager-table' className="table table-hover table-bordered">
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
        </div>
    )
}
