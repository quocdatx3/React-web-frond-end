import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import { allData } from "./fakedata/MoviesList";

const ConfirmModal = React.forwardRef((props, ref) => {
    React.useImperativeHandle(ref, () => ({
        handModal() {
            setIsShow(!isShow);
        }
    }));

    const [isShow, setIsShow] = React.useState(false);
    const handModal = () => {
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
                            <p>Bạn có chắc chắn muốn xóa phim <br />
                                {props.moviename} ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={handModal}>Hủy</button>
                            <button className="btn btn-primary">Xóa</button>
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

    const InfoPart1 = () => {
        return (
            <>
                <div id="general">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label className="control-label">Tên phim</label>
                                <input id="movie-name" name="movie-name" type="text" className="form-control" />
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Năm phát hành</label>
                                        <input id="year" name="year" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Thời lượng theo phút</label>
                                        <input id="time" name="time" type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Danh mục</label>
                                <input id="movie-type" name="movie-type" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Mô tả</label>
                                <textarea id="describe" name="describe" cols="40" rows="5" className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <canvas id="canv1"></canvas>
                            <p>
                                <input type="file" accept="image/*" />
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const InfoPart2 = () => {
        const Input = () => {
            return <div className="form-group">
                <div className="col-xs-6">
                    <input id="movie-name" name="movie-name" type="text" className="form-control" />
                </div>
                <div className="col-xs-4">
                    <input type="file" accept="image/*" />
                </div>
            </div>;
        };
        const [inputList, setInputList] = React.useState([]);
        const onAddBtnClick = event => {
            setInputList(inputList.concat(<Input key={inputList.length} />));
        };
        return (
            <>
                <div id="actor">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-xs-6">
                                <input id="movie-name" name="movie-name" type="text" className="form-control" />
                            </div>
                            <div className="col-xs-4">
                                <input type="file" accept="image/*" />
                            </div>
                        </div>
                        {inputList}
                        <button className='btn-circle' onClick={onAddBtnClick}>+</button>
                    </div>
                </div>
            </>
        )
    }
    const [isPart1, setIsPart1] = React.useState(true);
    const body = () => {
        return isPart1 ? <InfoPart1 /> : <InfoPart2 />
    }
    return (
        <>
            <div id="Movie-info" className="modal admin-modal-pos-control" style={{ display: isShow ? 'block' : 'none' }}>
                <div className="movie-info-modal-control">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <h4 className="panel-title" id="plHeadline">Thêm phim</h4>
                        </div>
                        <div className="panel-body Movie-info-body-size">
                            <div className="text-center btn-container">
                                <button className="dual-btn-left" onClick={() => setIsPart1(true)}>chung</button>
                                <button className="dual-btn-right" onClick={() => setIsPart1(false)}>diễn viên</button>
                            </div>
                            {body()}
                        </div>
                        <div className="panel-footer right-align">
                            <button type="button" data-dismiss="modal" className="btn" onClick={() => handModal()}>Hủy</button>
                            <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => handModal()}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
});

function MovieList () {
    //const [token] =React.useRef(prop.token);
    React.useEffect(() => {
        // PUT request using fetch inside useEffect React hook
        const requestOptions = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'authorization': 'web9nguoi' 
            },
            body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
        };
        fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    const tableHead = {
        stt: "Stt",
        name: "Tên phim",
        type: "Danh mục",
        img: "Ảnh",
        content: "Mô tả",
        year: "Năm phát hành",
        function: "Tác vụ"
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

    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            if (i === 6) return <td key={i}><FuncButtons stt = {key["stt"]}
            name = {key["name"]}/></td>;
            return <td key={i}>{key[keyD]}</td>;
        });

        return <tr key={index}>{columnData}</tr>;
    };
    const FuncButtons = props => {
        return <div>
            <button className="btn btn-primary"onClick={()=>clickFixDetailModal(props.stt)}>
                <span className="glyphicon glyphicon-pencil"></span>
            </button>
            <button className="btn btn-danger" onClick={()=>clickConfirmMedal(props.name)}>
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
    const [confirmModalName,setConfirmModalName] = React.useState("");
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
    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Danh sách phim</h2>
                </div>
                <div className="col-md-4">
                    <div className="find-group search">
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
                            <button className="btn btn-primary"
                                onClick={() => clickDetailModal()}>+ Thêm</button>
                        </div>
                    </span>
                </div>
            </div>

            <div>
                <div className=" center-block">
                    <table id='movielist' className="table table-striped table-bordered custab">
                        <thead>
                            <tr id='movielist-head'>{headRow()}</tr>
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
            </div>
            <ConfirmModal ref={ConfirmModalRef} moviename={confirmModalName} />
            <DetailModal ref={DetailModalRef} />
        </div>
    )
}
export default MovieList;