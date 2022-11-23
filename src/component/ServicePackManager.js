import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import SEVER_URL from '../setup';

const ConfirmModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        handModal() {
            setIsShow(!isShow);
        }
    }));
    const [id, setId] = React.useState()
    const [name, setName] = React.useState()
    React.useEffect(() => {
        setName(props.data.tenGoi);
        setId(props.data.idGoi);
    }, [props.data])

    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
    }


    const confirm = async () => {
        try {
            const response = await
                fetch(SEVER_URL + 'apis/subscription/delete/' + id, {
                    method: 'POST',
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
            handModal();
            props.resetPage();
        }
    };

    return (
        <>
            <div id="confirm" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button className="astext pull-right" >
                                <i className="glyphicon glyphicon-remove" onClick={() => handModal()}></i></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Bạn có chắc chắn muốn ngừng cung cấp <br />
                                gói đăng ký "{name}" ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => handModal()}>Hủy</button>
                            <button className="btn btn-danger" onClick={() => confirm()}>Vô hiệu hóa</button>
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

    const [id, setId] = React.useState('')
    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [quality, setQuality] = React.useState('')
    const [state, setState] = React.useState('')
    React.useEffect(() => {
        console.log(props.data);
        setName(props.data.tenGoi);
        setPrice(props.data.giaTien);
        setQuality(props.data.chatLuong);
        setId(props.data.idGoi);
        setState(props.data.trangThai);
    }, [props.data])

    /** Show/Hide Modal **/
    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
        props.resetPage();
    }
    /** updateData **/
    const updateData = async () => {
        try {
            const response = await
                fetch(SEVER_URL + 'apis/subscription/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        idGoi: id,
                        tenGoi: name,
                        giaTien: price,
                        trangThai: state,
                        chatLuong: quality
                        
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
            handModal()
        }
    };

    return (
        <>
            <div id="service-pack-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="service-pack-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> Sửa gói đăng ký</h4>
                        </div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-xs-4">Tên gói</label>
                                <div className="col-xs-8">
                                    <input 
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Giá tiền</label>
                                <div className="col-xs-8">
                                    <input type="number" className="form-control" value={price}
                                        onChange={e => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Độ phân giải màn hình</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" value="hd-resolotion"
                                            checked={quality === "HD"}
                                            onChange={() => {
                                                setQuality("HD")
                                            }} />
                                        Độ phân giải HD
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" value="4K-resolution"
                                            checked={quality === "4K"}
                                            onChange={() => {
                                                setQuality("4K")
                                            }} />
                                        Độ phân giải 4K
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" value="CLC-resolution"
                                            checked={quality === "2K"}
                                            onChange={() => {
                                                setQuality("2K")
                                            }} />
                                        Độ phân giải CLC
                                    </label>
                                </div>
                            </div>
                            {/* 
                            <div className="form-group">
                                <label className="control-label col-xs-4">Xem trên các thiết bị</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="phone" />
                                        Điện thoại
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="tablet" />
                                        Máy tính bảng
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="computer" />
                                        Máy tính
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="tv" />
                                        TV
                                    </label>
                                </div>
                            </div>
                            */}
                            <div className="form-group">
                                <label className="control-label col-xs-4">trạng thái</label>
                                <div className="col-xs-8">
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" 
                                        value="1" checked={state==="1"} 
                                        onChange={e=>{setState(e.currentTarget.value)}} />
                                        Hoạt động
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" 
                                        value="0" checked={state==="0"} 
                                        onChange={e=>{setState(e.currentTarget.value)}} />
                                        Ngừng
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer right-align">
                            <button className="btn-sm btn-warning" onClick={() => updateData()}>
                                <i className="glyphicon glyphicon-edit"></i>
                            </button>
                            <button className="btn-sm btn-danger" onClick={() => handModal()}>
                                <i className="glyphicon glyphicon-remove"></i>
                            </button>
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

    const [name, setName] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [quality, setQuality] = React.useState('')
    const [state, setState] = React.useState('')

    /** Show/Hide Modal **/
    const [isShow, setIsShow] = React.useState(false);
    const handModal = event => {
        setIsShow(!isShow);
        //props.resetPage();
    }
    /** createData **/
    const creatData = async () => {
        try {
            const response = await
                fetch(SEVER_URL + 'apis/subscription/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        tenGoi: name,
                        giaTien: price,
                        trangThai: state,
                        chatLuong: quality
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
            handModal()
            props.resetPage()
        }
    };

    return (
        <>
            <div id="service-pack-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="service-pack-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> Sửa gói đăng ký</h4>
                        </div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-xs-4">Tên gói</label>
                                <div className="col-xs-8">
                                    <input 
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Giá tiền</label>
                                <div className="col-xs-8">
                                    <input type="number" className="form-control" value={price}
                                        onChange={e => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Độ phân giải màn hình</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" value="hd-resolotion"
                                            onChange={() => {
                                                setQuality("HD")
                                            }} />
                                        Độ phân giải HD
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" value="4K-resolution"
                                            onChange={() => {
                                                setQuality("4K")
                                            }} />
                                        Độ phân giải 4K
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" value="CLC-resolution"
                                            onChange={() => {
                                                setQuality("2K")
                                            }} />
                                        Độ phân giải CLC
                                    </label>
                                </div>
                            </div>
                            {/*
                            <div className="form-group">
                                <label className="control-label col-xs-4">Xem trên các thiết bị</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="phone" />
                                        Điện thoại
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="tablet" />
                                        Máy tính bảng
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="computer" />
                                        Máy tính
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="tv" />
                                        TV
                                    </label>
                                </div>
                            </div>
                            */}
                            <div className="form-group">
                                <label className="control-label col-xs-4">trạng thái</label>
                                <div className="col-xs-8">
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" 
                                        value="1" checked={state==="1"} 
                                        onChange={e=>{setState(e.currentTarget.value)}} />
                                        Hoạt động
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" 
                                        value="0" checked={state==="0"} 
                                        onChange={e=>{setState(e.currentTarget.value)}} />
                                        Ngừng
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer right-align">
                            <button className="btn-sm btn-warning" onClick={() => creatData()}>
                                <i className="glyphicon glyphicon-edit"></i>
                            </button>
                            <button className="btn-sm btn-danger" onClick={() => handModal()}>
                                <i className="glyphicon glyphicon-remove"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

const ServicePackManagerTable = props => {

    const allData = props.allData

    const tableHead = {
        tenGoi: "Gói",
        giaTien: "Giá tiền",
        rehd: "Độ phân giải HD",
        re4k: "Độ phân giải 4k",
        muldevice: "Độ phân giải CLC",
        trangThai: "Trạng thái",
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
                allData.filter(item => item.tenGoi.toLowerCase().indexOf(query) > -1)
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

    function Checkbox(stra = "", strb = "") {
        if (stra === strb)
            return <input type="checkbox" defaultChecked disabled />
        else
            return <input type="checkbox" disabled />
    }

    const FuncButtons = props => {
        return <div>
            <button className="btn btn-primary" onClick={() => clickDetailModal(props.id)}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-danger" onClick={() => clickConfirmMedal(props.id)}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        </div>
    }
    function setTrangThai(string="") {
        console.log(string)
        if (string === '1')
            return "Hoạt động"
        else
            return "Ngừng"
    }
    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 2:
                    return <td key={i}>{Checkbox(key["chatLuong"], "HD")}</td>;
                case 3:
                    return <td key={i}>{Checkbox(key["chatLuong"], "4K")}</td>;
                case 4:
                    return <td key={i}>{Checkbox(key["chatLuong"], "2K")}</td>;
                case 5:
                    return <td key={i}>{setTrangThai( key["trangThai"] )}</td>;
                case 6:
                    return <td key={i}><FuncButtons id={key["idGoi"]} /></td>;
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

    const [modalData, setModalData] = React.useState("");
    const ConfirmModalRef = React.useRef(null);
    const clickConfirmMedal = props => {
        setModalData(allData.find(obj => { return obj.idGoi === props }));

        setTimeout(() => {
            ConfirmModalRef.current.handModal();
        }, 300);
    };

    const DetailModalRef = React.useRef(null);
    const clickDetailModal = props => {
        setModalData(allData.find(obj => { return obj.idGoi === props }));
        setTimeout(() => {
            DetailModalRef.current.handModal();
        }, 300);
    };

    const AddModalRef = React.useRef(null);
    const clickAddModal = () => {

        AddModalRef.current.handModal();
    };

    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Danh sách gói đăng kí</h2>
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
                <div className="col-md-2">
                    <span className="pull-left">
                        <div>
                            <button className="btn btn-primary" onClick={() => clickAddModal()}>+ Thêm</button>
                        </div>
                    </span>
                </div>
            </div>

            <div className="center-block">
                <table id="pack-tb" className="table table-striped custab table-bordered">
                    <thead>
                        <tr>{headRow()}</tr>
                    </thead>
                    <tbody>
                        {tableData()}
                    </tbody>
                </table>
            </div>
            <div className="col-md-12 text-right">
                <Pagination
                    pageSize={countPerPage}
                    onChange={updatePage}
                    current={currentPage}
                    total={allData.length}
                />
            </div>

            <ConfirmModal ref={ConfirmModalRef} data={modalData} resetPage={props.resetPage} />
            <DetailModal ref={DetailModalRef} data={modalData} resetPage={props.resetPage} />
            <AddModal ref={AddModalRef} resetPage={props.resetPage} />
        </div>
    )
}


export default function ServicePackManager() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/subscription/show')
                .then(response => response.json())
                .then(data => {
                    setAllData(data);
                    setIsLoading(!isLoading);
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
                <ServicePackManagerTable allData={allData} resetPage={resetPage} />
            </div>
        )
    }
}
