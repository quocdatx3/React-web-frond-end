import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import SEVER_URL from '../setup';

const DetailModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        handModal() {
            setIsShow(!isShow);
        }
    }));

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phonenumber, setPhonenumber] = React.useState("");
    const [birthday, setBirthday] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [id, setId] = React.useState();

    React.useEffect(() => {
        console.log(props.data)
        if (props?.data) {
            setId(props.data.idNguoiDung)
            setGender(props.data.gioiTinh)
            setBirthday(props.data.ngaySinh?.substring(0, 10))
            setEmail(props.data.email)
            setName(props.data.tenDayDu)
        }
    }, [props.data])

    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
    }

    const SeeInfo = () => {
        return (
            <>
                <button className="btn-sm btn-warning" onClick={() => setIsSee(false)}>
                    <i className="glyphicon glyphicon-edit"></i>
                </button>
                <button className="btn-sm btn-danger" onClick={() => handModal()}>
                    <i className="glyphicon glyphicon-remove"></i>
                </button>
            </>
        );
    }
    const FixInfo = () => {
        return (
            <>
                <button type="button" className="btn" onClick={() => setIsSee(true)}>Hủy</button>
                <button type="button" className="btn btn-primary" onClick={() => handModal()}>Lưu</button>
            </>
        )
    }
    const [isSee, setIsSee] = React.useState(true);
    const foot = () => {
        return isSee ? <SeeInfo /> : <FixInfo />
    }
    const head = () => {
        return isSee ? "Xem" : "Sửa"
    }
    return (
        <>
            <div id="customer-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="customer-info-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> {head()} thông tin khách hàng</h4>
                        </div>
                        <div className="panel-body">
                            <div className="form-group row">
                                <label className="col-sm-4">Tên khách hàng</label>
                                <div className="col-sm-8">
                                    <input
                                        value={name} onChange={e => setName(e.target.value)}
                                        type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4">Email</label>
                                <div className="col-sm-8">
                                    <input
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        type="email" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4">Số điện toại</label>
                                <div className="col-sm-8">
                                    <input
                                        value={phonenumber} onChange={e => setPhonenumber(e.target.value)}
                                        type="number" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4">Ngày sinh</label>
                                <div className="col-sm-8">
                                    <input
                                        value={birthday} onChange={e => setBirthday(e.target.value)}
                                        type="date" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4">Giới tính</label>
                                <div className="col-sm-8">
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input checked={gender === 'Nam'}
                                                onChange={e => setGender(e.target.value)}
                                                type="radio" className="custom-control-input" value='Nam' />
                                            <label className="custom-control-label">Nam</label>
                                        </div>
                                    </div>
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input checked={gender === 'Nữ'}
                                                onChange={e => setGender(e.target.value)}
                                                type="radio" className="custom-control-input" value='Nữ' />
                                            <label className="custom-control-label">Nữ</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer right-align">
                            {foot()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

const CustomerInfoTable = props => {

    const allData = props.allData;

    const tableHead = {
        stt: "STT",
        tenDayDu: "Khách hàng",
        email: "Email",
        //phonenumber: "Số điện thoại",
        ngaySinh: "Ngày sinh",
        gioiTinh: "Giới tính"
    };

    const countPerPage = 10;
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
                    .filter(item => item.tenDayDu.toLowerCase().indexOf(query) > -1)
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
            switch (i) {
                case 0:
                    return <td key={i}>{index + 1 + (currentPage - 1) * countPerPage}</td>;
                case 3:
                    return <td key={i}>{limit(key[keyD], 10)}</td>;
                default:
                    return <td key={i}>{key[keyD]}</td>;
            }
        });

        return <tr key={index} onClick={() => clickDetailModal(key["idNguoiDung"])}>{columnData}</tr>;
    };

    const tableData = () => {
        return collection.map((key, index) => tableRows({ key, index }));
    };

    const headRow = () => {
        return Object.values(tableHead).map((title, index) => (
            <td key={index}>{title}</td>
        ));
    };

    const [modalData, setModalData] = React.useState();

    const DetailModalRef = React.useRef(null);
    const clickDetailModal = props => {
        setModalData(allData.find(obj => { return obj.idNguoiDung === props }))

        DetailModalRef.current.handModal();
    };
    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-7">
                    <h2>Thông tin khách hàng</h2>
                </div>
                <div className="col-md-4">
                    <div className="find-group search">
                        <input id="Findinput" className="form-control"
                            placeholder="tên khách"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <span className="fa fa-search field-icon"></span>
                    </div>
                </div>
            </div>

            <div className="table-control-1 center-block">
                <div className="table-responsive">
                    <table id='customers-info-table' className="table table-hover table-bordered">
                        <thead className="table-header-style-1">
                            <tr>{headRow()}</tr>
                        </thead>
                        <tbody>{tableData()}</tbody>
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
            <DetailModal ref={DetailModalRef} data={modalData} />
        </div>
    )
}
export default function CustomerInfo() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/user/show')
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

    if (isLoading && allData.length < 1) {
        return (
            <div>
                <h2>Loading</h2>
            </div>
        )
    }
    else {
        return (
            <div>
                <CustomerInfoTable allData={allData} resetPage={resetPage} />
            </div>
        )
    }
}

