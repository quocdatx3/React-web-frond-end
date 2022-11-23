import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../Pages/css/style.css"
import "../Pages/css/modal-style.css"
import "../Pages/css/table-style.css"

import { allData } from "./../fakedata/CustomerCare";

const CustomerCareTable = props => {

    const tableHead = {
        stt: "Stt",
        account: "Tài khoản",
        topic: "chủ đề",
        stage: "Mức độ",
        time: "Thời gian",
        func: "Tác vụ"
    };

    const countPerPage = 9;
    const [value] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [collection, setCollection] = React.useState(
        cloneDeep(allData.slice(0, countPerPage))
    );
    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            setCurrentPage(1);
            const data = cloneDeep(
                allData.filter(item => item.account.toLowerCase().indexOf(query) > -1)
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
    const StateSelected = prop => {
        const [value, setValue] = React.useState(prop);

        const handleChange = (e) => {
            setValue(e.target.value);
        };
        return <div>
            <select value={value} onChange={handleChange}>
                <option value="done">Đã hoàn thành</option>
                <option value="progress">Chưa hoàn thành</option>
            </select>
        </div>
    }

    const toDetailPage = e => {
        props.changeData(e);
        props.changePage();
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 3:
                    return <td key={i}>{StateSelected(key[keyD])}</td>;
                case 5:
                    return <td key={i}><button className='astext' onClick={() => toDetailPage(key["stt"])}>Xem chi tiết</button></td>;
                default:
                    return <td key={i}>{key[keyD]}</td>;
            }
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
                <div className="col-md-7">
                    <h2>Chăm sóc khách hàng</h2>
                </div>
            </div>

            <div>
                <div className="table-responsive">
                    <table id='customercare-table' className="table table-hover table-bordered">
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
const CustomerCareDetail = props => {
    const backToTable = () => {
        props.changePage();
    }

    return (
        <div>
            <div className="row toolbar">
                <button className="btn astext" onClick={() => backToTable()}>
                    <i className="glyphicon glyphicon-arrow-left back-btn"></i>
                </button>
                <h2>Chăm sóc khách hàng</h2>
            </div>

        </div>
    )
}

export default function CustomerCare() {
    const [data, setData] = React.useState(true);
    const changeData = (e) => {
        setData(e);
    }

    const [isTable, setIsTable] = React.useState(true);
    const changePage = () => {
        setIsTable(!isTable);
    }
    const page = () => {
        return isTable ? <CustomerCareTable changeData={changeData} changePage={changePage} /> :
            <CustomerCareDetail data={data} changePage={changePage} />
    }
    return (
        <>
            {page()}
        </>
    )
}
