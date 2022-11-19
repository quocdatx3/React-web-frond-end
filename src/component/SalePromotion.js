import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/saleprogs";

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
                            <p>Bạn có chắc chắn muốn xóa câu hỏi <br />
                                "{props.name}" ?</p>
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
            <div id="sale-promotion" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="sale-promotion-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> {head()} chương trình khuyến mãi</h4>
                        </div>

                        <div className="panel-body">

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Tên chương trình khuyến mãi</label>
                                <div className="col-sm-8">
                                    <input id="name" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Đối tượng áp dụng</label>
                                <div className="col-sm-8">
                                    <input id="target" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Thời gian áp dụng</label>
                                <div className="col-sm-8">
                                    <input id="time" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Trạng thái</label>
                                <div className="col-sm-8">
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input id="prog-state_0" type="radio" className="custom-control-input" value="progress" />
                                            <label className="custom-control-label">Kinh doanh</label>
                                        </div>
                                    </div>
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input id="prog-state_1" type="radio" className="custom-control-input" value="stop" />
                                            <label className="custom-control-label">Ngừng kinh doanh</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Mã khuyến mãi</label>
                                <div className="col-sm-8">
                                    <input id="voucher" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Chi tiết chương trình</label>
                                <div className="col-sm-8">
                                    <textarea id="Detail" cols="40" rows="5" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Ảnh</label>
                                <div className="col-sm-8">
                                    <input id="img" type="image" alt='a' className="form-control" />
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
            <div id="sale-promotion" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="sale-promotion-modal-control center-block">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline"> Thêm câu hỏi</h4>
                        </div>
                        <div className="panel-body">

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Tên chương trình khuyến mãi</label>
                                <div className="col-sm-8">
                                    <input id="name" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Đối tượng áp dụng</label>
                                <div className="col-sm-8">
                                    <input id="target" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Thời gian áp dụng</label>
                                <div className="col-sm-8">
                                    <input id="time" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Trạng thái</label>
                                <div className="col-sm-8">
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input id="prog-state_0" type="radio" className="custom-control-input" value="progress" />
                                            <label className="custom-control-label">Kinh doanh</label>
                                        </div>
                                    </div>
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input id="prog-state_1" type="radio" className="custom-control-input" value="stop" />
                                            <label className="custom-control-label">Ngừng kinh doanh</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Mã khuyến mãi</label>
                                <div className="col-sm-8">
                                    <input id="voucher" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Chi tiết chương trình</label>
                                <div className="col-sm-8">
                                    <textarea id="Detail" cols="40" rows="5" className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Ảnh</label>
                                <div className="col-sm-8">
                                    <input id="img" type="image" alt='a' className="form-control" />
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

export default function SalePromotion() {

    const tableHead = {
        stt: "STT",
        saleprogs: "Chương trình khuyến mãi",
        target: "Đối tượng áp dụng",
        applytime: "Thời gian áp dụng",
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
                allData.filter(item => item.saleprogs.toLowerCase().indexOf(query) > -1)
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

    const FuncButtons = props => {
        return <div>
            <button className="btn btn-primary" onClick={() => clickFixDetailModal(props.stt)}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-danger" onClick={() => clickConfirmMedal(props.stt)}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        </div>
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if (i === 5) return <td key={i}><FuncButtons stt={key["stt"]} /></td>;
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
                    <h2>Chương trình khuyến mãi</h2>
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

            <div>
                <div className="table-responsive">
                    <table id='Sale-promo-table' className="table table-hover table-bordered">
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

            <ConfirmModal ref={ConfirmModalRef} name={confirmModalName} />
            <DetailModal ref={DetailModalRef} />
            <AddModal ref={AddModalRef} />

        </div>
    )
}
