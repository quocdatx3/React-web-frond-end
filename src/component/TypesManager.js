import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/TypesManager";

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
                            <p>Bạn có chắc chắn muốn xóa <br />
                                thể loại {props.moviename} ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => handModal()}>Hủy</button>
                            <button className="btn btn-danger">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
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
            <div id="confirm" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            Thêm thể loại
                            <button className= "astext pull-right" >
                                <i className="glyphicon glyphicon-remove" onClick={() => handModal()}></i></button>
                        </div>
                        <div className="modal-body text-center">
                            <div className="form-group">
                                <label>Tên thể loại:</label>
                                <input id="" name="" type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => handModal()}>Hủy</button>
                            <button className="btn btn-primary" >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});


const FixModal = React.forwardRef((props, ref) => {
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
                            Thêm thể loại
                            <button className="astext pull-right" >
                                <i className="glyphicon glyphicon-remove" onClick={() => handModal()}></i></button>
                        </div>
                        <div className="modal-body text-center">
                            <div className="form-group">
                                <label>Tên thể loại:</label>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => handModal()}>Hủy</button>
                            <button className="btn btn-primary" >Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default function TypesManager() {

    const tableHead = {
        stt: "STT",
        Types: "Thể loại",
        func: "Tác vụ"
    };

    const countPerPage = 4;
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
                    .filter(item => item.Types.toLowerCase().indexOf(query) > -1)
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
            if (i === 2) return <td key={i}><FuncButtons stt={key["stt"]}
                name={key["name"]} /></td>;
            return <td key={i}>{key[keyD]}</td>;
        });

        return <tr key={index}>{columnData}</tr>;
    };
    const FuncButtons = props => {
        return <div>
            <button className="btn btn-primary" onClick={() => clickFixMedal(props.stt)}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-danger" onClick={() => clickConfirmMedal(props.name)}>
                <span className="glyphicon glyphicon-trash"></span>
            </button>
        </div>
    }
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

    const addFunc = () => {

    }
    const AddModalRef = React.useRef(null);
    const clickAddMedal = () => {
        AddModalRef.current.handModal();
    };

    const fixFunc = () => {

    }
    const FixModalRef = React.useRef(null);
    const clickFixMedal = props => {
        FixModalRef.current.handModal();
    };
    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Thể loại phim</h2>
                </div>
                <div className="col-md-4">
                    <div className="find-group">
                        <input id="Findinput" className="form-control"
                            placeholder="tên khách"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <span className="fa fa-search field-icon"></span>
                    </div>
                </div>
                <div className="col-md-2">
                    <span className="pull-left">
                        <div>
                            <button className="btn btn-primary" onClick={()=>clickAddMedal()}>+ Thêm</button>
                        </div>
                    </span>
                </div>
            </div>

            <div>
                <table id='TypeManager' className="table table-striped table-bordered custab">
                    <thead>
                        <tr>{headRow()}</tr>
                    </thead>
                    <tbody>{tableData()}</tbody>
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
            <ConfirmModal ref={ConfirmModalRef} moviename={confirmModalName} />
            <AddModal ref={AddModalRef} func={addFunc} />
            <FixModal ref={FixModalRef} func={fixFunc} />

        </div>
    )
}
