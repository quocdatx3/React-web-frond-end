import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
//import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../Pages/css/style.css"
import "../Pages/css/modal-style.css"
import "../Pages/css/table-style.css"

import SEVER_URL from '../../setup';

const Statistic1Table = props => {
    const allData = props.allData
    const tableHead = {
        stt: "#",
        duongDanAnh: "",
        tenPhim: "Phim",
        //type: "Thể loại",
        //tops: "Số lần trong TOP 10",
        luotXem: "Lượt xem"
    };

    const countPerPage = 10;
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

    const [sortOder, setSortOder] = React.useState(true);
    const sortByView = () => {
        const to = countPerPage * currentPage;
        const from = to - countPerPage;
        if (sortOder)
            setCollection(cloneDeep(allData.sort((a, b) => a.luotXem - b.luotXem).slice(from, to)));
        else
            setCollection(cloneDeep(allData.sort((a, b) => -(a.luotXem - b.luotXem)).slice(from, to)));
        setSortOder(!sortOder);
    }
    const setImg = props => {
        console.log(props)
        //if (props?.duongDanAnh)
        return <img src={props} alt="/img/img-not-found.png"></img>
        // else
        //    return <img src="/img/img-not-found.png" alt="khong thay anh" />
    }
    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 0:
                    return <td key={i}>{index + 1 + (currentPage - 1) * countPerPage}</td>
                case 1:
                    return <td key={i}>{setImg(key["duongDanAnh"])}</td>
                default:
                    return <td key={i}>{key[keyD]}</td>
            }
        });

        return <tr key={index}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => {
            if (index === 3) return <td key={index} onClick={() => sortByView()}>{title}</td>
            else return <td key={index}>{title}</td>
        });
    };

    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Thống kê phim xem nhiều</h2>
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

            <div className="table-control-1">
                <div className="table-responsive">
                    <table id='statistic-table-1' className="table table-hover table-bordered">
                        <thead className="table-header-style-1">
                            <tr>{headRow()}</tr>
                        </thead>
                        <tbody>
                            {tableData()}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default function Statistic1() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);
    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/admin/show/film/view/1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setAllData(data)
                });
            // empty dependency array means this effect will only run once (like componentDidMount in classes)
        }, [getData]);

    const resetPage = () => {
        setGetData(!getData);
        setIsLoading(!isLoading);
    }

    if (isLoading  && allData.length < 1) {
        return (
            <div>
                <h2>Loading</h2>
            </div>
        )
    }
    else {
        return (
            <div>
                <Statistic1Table allData={allData} resetPage={resetPage} />
            </div>
        )
    }
}
