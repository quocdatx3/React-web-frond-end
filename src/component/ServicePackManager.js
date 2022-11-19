import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/ServicePackage";

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

                            <button className="astext pull-right" >
                                <i className="glyphicon glyphicon-remove" onClick={() => handModal()}></i></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Bạn có chắc chắn muốn ngừng cung cấp <br />
                                gói đăng ký "{props.name}" ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => handModal()}>Hủy</button>
                            <button className="btn btn-danger" >Vô hiệu hóa</button>
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
            <div id="service-pack-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="service-pack-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> {head()} gói đăng ký</h4>
                        </div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-xs-4">Tên gói</label>
                                <div className="col-xs-8">
                                    <input id="service-pack-name" type="text" className="form-control" value="Cao cấp"
                                        disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Giá tiền</label>
                                <div className="col-xs-8">
                                    <input id="price" name="price" type="text" className="form-control" value="200.000 đ/tháng" disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Độ phân giải màn hình</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" name="resolution" value="hd-resolotion" checked="checked" disabled />
                                        Độ phân giải HD
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="resolution" value="4K-resolution" checked="checked" disabled />
                                        Độ phân giải 4K
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Xem trên các thiết bị</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="phone" checked="checked" disabled />
                                        Điện thoại
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="tablet" checked="checked" disabled />
                                        Máy tính bảng
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="computer" checked="checked" disabled />
                                        Máy tính
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="device-types" value="tv" checked="checked" disabled />
                                        TV
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Số máy được xem cùng lúc</label>
                                <div className="col-xs-8">
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" value="1" />
                                        1
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" value="2" />
                                        2
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" value="4" />
                                        4
                                    </label>
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
            <div id="service-pack-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="service-pack-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> Thêm gói đăng ký</h4>
                        </div>
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-xs-4">Tên gói</label>
                                <div className="col-xs-8">
                                    <input id="service-pack-name" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Giá tiền</label>
                                <div className="col-xs-8">
                                    <input id="price" name="price" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-xs-4">Độ phân giải màn hình</label>
                                <div className="col-xs-8">
                                    <label className="checkbox">
                                        <input type="checkbox" name="resolution" value="hd-resolotion" />
                                        Độ phân giải HD
                                    </label>
                                    <label className="checkbox">
                                        <input type="checkbox" name="resolution" value="4K-resolution" />
                                        Độ phân giải 4K
                                    </label>
                                </div>
                            </div>
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
                            <div className="form-group">
                                <label className="control-label col-xs-4">Số máy được xem cùng lúc</label>
                                <div className="col-xs-8">
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" value="1" />
                                        1
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" value="2" />
                                        2
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="device-number" value="4" />
                                        4
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer right-align">
                            <button type="button" className="btn" onClick={() => handModal()}>Hủy</button>
                            <button type="button" className="btn btn-primary" onClick={() => handModal()}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

export default function ServicePackManager() {

    const tableHead = {
        name: "Gói",
        price: "Giá tiền",
        rehd: "Độ phân giải HD",
        re4k: "Độ phân giải 4k",
        muldevice: "Xem trên nhiều thiết bị",
        state: "Trạng thái",
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
                allData.filter(item => item.name.toLowerCase().indexOf(query) > -1)
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

    const Checkbox = prop => {
        if (prop)
            return <input type="checkbox" defaultChecked disabled />
        else
            return <input type="checkbox" disabled />
    }

    const FuncButtons = props => {
        return <div>
            <button className="btn btn-primary" onClick={() => clickFixDetailModal(props.stt)}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-danger" onClick={() => clickConfirmMedal(props.name)}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        </div>
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 2:
                    return <td key={i}>{Checkbox(key[keyD])}</td>;
                case 3:
                    return <td key={i}>{Checkbox(key[keyD])}</td>;
                case 4:
                    return <td key={i}>{Checkbox(key[keyD])}</td>;
                case 6:
                    return <td key={i}><FuncButtons stt={key["stt"]} name={key["name"]} /></td>;
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

    const [confirmModalName, setConfirmModalName] = React.useState("");
    const ConfirmModalRef = React.useRef(null);
    const clickConfirmMedal = props => {
        setConfirmModalName(props);
        ConfirmModalRef.current.handModal();
    };

    const DetailModalRef = React.useRef(null);
    const clickDetailModal = () => {
        DetailModalRef.current.handModal();
    };
    const clickFixDetailModal = props => {
        //set taget info should take for table
        DetailModalRef.current.handModal();
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

            <ConfirmModal ref={ConfirmModalRef} name={confirmModalName} />
            <DetailModal ref={DetailModalRef} />
            <AddModal ref={AddModalRef} />
        </div>
    )
}
