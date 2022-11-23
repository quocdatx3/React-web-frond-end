import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../Pages/css/style.css"
import "../Pages/css/modal-style.css"
import "../Pages/css/table-style.css"

import SEVER_URL from '../../setup';

const RequestsManagerTable = props => {

    const allData = props.allData

    const tableHead = {
        stt: "Stt",
        phimYeuCau: "Phim được yêu cầu",
        //account: "Tài khoản",
        ngayYeuCau: "thời gian yêu cầu",
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

    const acceptRequest = async (id) => {
        try {
            const response = await
                fetch(SEVER_URL + 'apis/request/update/status', {
                    method: 'POST',
                    body: JSON.stringify({
                        idYeuCau: id,
                        trangThai: "daDuyet"
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));
        } catch (err) {
            console.log(err.message);
        } finally {
            props.resetPage()
        }
    };

    const declineRequest = async (id) => {
        try {
            const response = await
                fetch(SEVER_URL + 'apis/request/update/status', {
                    method: 'POST',
                    body: JSON.stringify({
                        idYeuCau: id,
                        trangThai: "huy"
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));
        } catch (err) {
            console.log(err.message);
        } finally {
            props.resetPage()
        }
    };


    const FuncButtons = props => {
        return <div>
            <button className="btn btn-success" onClick={() => acceptRequest(props)}>
                Đồng ý
            </button>
            <button className="btn btn-danger" onClick={() => declineRequest(props)}>
                Từ chối
            </button>
        </div>
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 0:
                    return <td key={i}>{index+1+(currentPage-1)*countPerPage}</td>;
                case 3:
                    return <td key={i}>{FuncButtons(key["idYeuCau"])}</td>;
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

export default function RequestsManager() {

    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/request/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                    setAllData(data.filter(function(p){return p.trangThai === "dangCho"}));
                    setIsLoading(!isLoading);
                    console.log(data)
                });
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, [getData]);

    const resetPage = () => {
        setGetData(!getData);
        setIsLoading(true);
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
                <RequestsManagerTable allData={allData} resetPage={resetPage} />
            </div>
        )
    }


}
