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
    const [id, setID] = React.useState()
    const [name, setName] = React.useState()

    React.useEffect(() => {
        setName(props.data.tieuDeChuongTrinhKhuyenMai)
        setID(props.data.idChuongTrinhKhuyenMai)
    }, [props.data])

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
                            <p>Bạn có chắc chắn muốn xóa chương trình khuyến mãi {name} không?</p>
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

    const [id, setID] = React.useState("")
    const [name, setName] = React.useState('')
    const [target, setTarget] = React.useState('')
    const [startTime, setStartTime] = React.useState('')
    const [stopTime, setStopTime] = React.useState('')
    const [state, setState] = React.useState('')
    const [voulcher, setVoulcher] = React.useState('')
    const [content, setContent] = React.useState('')
    const [imgURL, setImgURL] = React.useState('')

    React.useEffect(() => {
        setName(props.data.tieuDeChuongTrinhKhuyenMai)
        setID(props.data.idChuongTrinhKhuyenMai)
        setTarget(props.data.doiTuongKhuyenMai)
        setStartTime(props.data.thoiGianBatDau)
        setStopTime(props.data.thoiGianKetThuc)
        setState(props.data.trangThai)
        setVoulcher(props.data.maKhuyenMai)
        setContent(props.data.noiDungChuongTrinhKhuyenMai)
        setImgURL(props.data.anhDaiDien)
    }, [props.data])

    const [isSee, setIsSee] = React.useState(true);
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
                <button type="button" className="btn btn-primary" onClick={() => updateData()}>Lưu</button>
            </>
        )
    }
    /** updateData **/
    const updateData = async () => {
        try {
            const response = await
                fetch(SEVER_URL + 'apis/promotion/update', {
                    method: 'POST',
                    body: JSON.stringify({
                        idChuongTrinhKhuyenMai: id,        
                        tieuDeChuongTrinhKhuyenMai: name,
                        noiDungChuongTrinhKhuyenMai: content,
                        doiTuongKhuyenMai: target,
                        thoiGianBatDau: startTime,
                        thoiGianKetThuc: stopTime,
                        trangThai: state,
                        maKhuyenMai: voulcher,
                        anhDaiDien: null
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
                                    <input
                                        value={name} onChange={e => setName(e.target.value)}
                                        className="form-control" disabled={isSee} type="text" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Đối tượng áp dụng</label>
                                <div className="col-sm-8">
                                    <input
                                        value={target} onChange={e => setTarget(e.target.value)}
                                        className="form-control" disabled={isSee} type="text" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Thời gian bắt đầu</label>
                                <div className="col-sm-8">
                                    <input
                                        value={startTime?.substring(0, 10) || ""} onChange={e => setStartTime(e.target.value)}
                                        type="date" className="form-control" disabled={isSee} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Thời gian kết thúc</label>
                                <div className="col-sm-8">
                                    <input
                                        value={stopTime?.substring(0, 10) || ""} onChange={e => setStopTime(e.target.value)}
                                        type="date" className="form-control" disabled={isSee} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Trạng thái</label>
                                <div className="col-sm-8">
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input
                                                checked={(state === "Đang kinh doanh") || false}
                                                onChange={e => setState(e.target.value)}
                                                type="radio" className="custom-control-input"
                                                value="Đang kinh doanh" disabled={isSee} />
                                            <label className="custom-control-label">Kinh doanh</label>
                                        </div>
                                    </div>
                                    <div className="custom-controls-stacked">
                                        <div className="custom-control custom-radio">
                                            <input
                                                checked={(state === "Ngừng kinh doanh") || false}
                                                onChange={e => setState(e.target.value)}
                                                type="radio" className="custom-control-input"
                                                value="Ngừng kinh doanh" disabled={isSee} />
                                            <label className="custom-control-label">Ngừng kinh doanh</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Mã khuyến mãi</label>
                                <div className="col-sm-8">
                                    <input
                                        value={voulcher} onChange={e => setVoulcher(e.target.value)}
                                        type="text" className="form-control" disabled={isSee} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Chi tiết chương trình</label>
                                <div className="col-sm-8">
                                    <textarea
                                        value={content} onChange={e => setContent(e.target.value)}
                                        cols="40" rows="5" className="form-control" disabled={isSee} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Ảnh</label>
                                <div className="col-sm-8">
                                    <input
                                        type="image" className="form-control" disabled={isSee} />
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

const SalePromotionTable = props => {
    const allData = props.allData
    const tableHead = {
        stt: "STT",
        tieuDeChuongTrinhKhuyenMai: "Chương trình khuyến mãi",
        doiTuongKhuyenMai: "Đối tượng áp dụng",
        thoiGian: "Thời gian áp dụng",
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
                allData.filter(item => item.tieuDeChuongTrinhKhuyenMai.toLowerCase().indexOf(query) > -1)
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
            <button className="btn btn-primary" onClick={() => clickFixDetailModal(props.id)}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-danger" onClick={() => clickConfirmMedal(props.id)}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        </div>
    }

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        function applyTime(start = "", stop = "") {
            var strt = start?.substring(0, 10) || ''
            var stp = stop?.substring(0, 10) || ''
            return strt + "/" + stp
        }

        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 0:
                    return <td key={i}>{index + 1 + (currentPage - 1) * countPerPage}</td>;
                case 3:
                    return <td key={i}>
                        {applyTime(key["thoiGianBatDau"], key["thoiGianKetThuc"])}</td>
                case 5:
                    return <td key={i}><FuncButtons stt={key["idChuongTrinhKhuyenMai"]} /></td>
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
        setModalData(allData.find(obj => { return obj.idPhim === props }));
        ConfirmModalRef.current.handModal();
    };

    const DetailModalRef = React.useRef(null);
    const clickFixDetailModal = props => {
        setModalData(allData.find(obj => { return obj.idPhim === props }));
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

            <ConfirmModal ref={ConfirmModalRef} data={modalData} />
            <DetailModal ref={DetailModalRef} data={modalData} />
            <AddModal ref={AddModalRef} resetPage={props.resetPage} />

        </div>
    )
}

export default function SalePromotion() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/promotion/show')
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
                <SalePromotionTable allData={allData} resetPage={resetPage} />
            </div>
        )
    }
}
