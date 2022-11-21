import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import SEVER_URL from '../setup';



const ConfirmModal = props => {

    const [movieId, setMovieID] = React.useState();
    const [movieName, setMovieName] = React.useState();

    React.useEffect(() => {
        setMovieID(props.data.idPhim)
        setMovieName(props.data.tenPhim)
        console.log(props.data);
    }, []);

    const delMovie = () => {
        console.log("Delete " + movieId);
    }

    return (
        <>
            <div id="confirm" className="modal admin-modal-pos-control" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">

                            <button className="astext pull-right" >
                                <i className="glyphicon glyphicon-remove" onClick={() => props.closeConfirmMedal()}></i>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Bạn có chắc chắn muốn xóa phim <br />
                                {movieName} ?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={() => props.closeConfirmMedal()}>Hủy</button>
                            <button className="btn btn-primary" onClick={delMovie}>Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const DetailModal = props => {

    const [movieName, setMovieName] = React.useState("");
    const [movieYear, setMovieYear] = React.useState("");
    const [movieType, setMovieType] = React.useState("");
    const [movieDescribe, setMovieDescribe] = React.useState("");
    const [inputList, setInputList] = React.useState([]);
    const onAddBtnClick = () => {
        setInputList(inputList.concat(<input key={inputList.length} type="text"
            className="form-control" />));
    };
    React.useEffect(() => {
        setMovieName(props.data.tenPhim)
        setMovieYear(props.data.ngayChieu)
        setMovieType(props.data.theLoai[1].theLoai)
        setMovieDescribe(props.data.moTa)
        props.data.dienVien.map((key, index) => {
            setInputList(inputList.concat(<input key={inputList.length}
                type="text" className="form-control"
                defaultValue={key['tenDienVien']} />)
            )
        })
    }, [])

    const fixData = () => {
        console.log("fix data")
    }

    const InfoPart1 = () => {
        return (
            <>
                <div id="general">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label className="control-label">Tên phim</label>
                                <input type="text"
                                    className="form-control"
                                    value={movieName}
                                    onChange={e => setMovieName(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Năm phát hành</label>
                                        <input type="text"
                                            className="form-control"
                                            value={movieYear}
                                            onChange={e => setMovieYear(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Thời lượng theo phút</label>
                                        <input type="text" className="form-control" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Danh mục</label>
                                <input type="text"
                                    className="form-control"
                                    value={movieType}
                                    onChange={e => setMovieType(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Mô tả</label>
                                <textarea cols="40"
                                    rows="5"
                                    className="form-control"
                                    value={movieDescribe}
                                    onChange={e => setMovieDescribe(e.target.value)} />
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
        return (
            <>
                <div id="actor">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-xs-6">
                                {inputList}
                            </div>
                        </div>
                        <button className='btn-circle' onClick={() => onAddBtnClick()}>+</button>
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
            <div id="Movie-info" className="modal admin-modal-pos-control" style={{ display: 'block' }}>
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
                            <button type="button" data-dismiss="modal" className="btn" onClick={() => props.closeDetailModal()}>Hủy</button>
                            <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => fixData()}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};


const NewModal = props => {

    const [movieName, setMovieName] = React.useState("");
    const [movieYear, setMovieYear] = React.useState("");
    const [movieType, setMovieType] = React.useState("");
    const [movieDescribe, setMovieDescribe] = React.useState("");
    const [inputList, setInputList] = React.useState([]);
    const onAddBtnClick = () => {
        setInputList(inputList.concat(<input key={inputList.length} type="text"
            className="form-control" />));
    };

    const fixData = () => {
        console.log("fix data")
    }

    const InfoPart1 = () => {
        return (
            <>
                <div id="general">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <label className="control-label">Tên phim</label>
                                <input type="text"
                                    className="form-control"
                                    value={movieName}
                                    onChange={e => setMovieName(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Năm phát hành</label>
                                        <input type="text"
                                            className="form-control"
                                            value={movieYear}
                                            onChange={e => setMovieYear(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Thời lượng theo phút</label>
                                        <input type="text" className="form-control" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Danh mục</label>
                                <input type="text"
                                    className="form-control"
                                    value={movieType}
                                    onChange={e => setMovieType(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Mô tả</label>
                                <textarea cols="40"
                                    rows="5"
                                    className="form-control"
                                    value={movieDescribe}
                                    onChange={e => setMovieDescribe(e.target.value)} />
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
        return (
            <>
                <div id="actor">
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="col-xs-6">
                                {inputList}
                            </div>
                        </div>
                        <button className='btn-circle' onClick={() => onAddBtnClick()}>+</button>
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
            <div id="Movie-info" className="modal admin-modal-pos-control" style={{ display: 'block' }}>
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
                            <button type="button" data-dismiss="modal" className="btn" onClick={() => props.closeNewModal()}>Hủy</button>
                            <button type="button" data-dismiss="modal" className="btn btn-primary" onClick={() => fixData()}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};



const MovieListTable = props => {
    const allData = props.allData;
    const tableHead = {
        stt: "Stt",
        tenPhim: "Tên phim",
        theLoai: "Danh mục",
        anh: "Ảnh",
        moTa: "Mô tả",
        ngayChieu: "Năm phát hành",
        func: "Tác vụ"
    };

    const countPerPage = 4;
    const [value, setValue] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [collection, setCollection] = React.useState(cloneDeep(allData.slice(0, countPerPage))
    );
    const searchData = React.useRef(
        throttle(val => {
            const query = val.toLowerCase();
            setCurrentPage(1);
            const data = cloneDeep(
                allData.filter(item => item.tenPhim.toLowerCase().indexOf(query) > -1)
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

    const setImg = props => {
        console.log(props)
        if (props?.duongDanAnh)
            return <img src={props.duongDanAnh} alt="/img/img-not-found.png"></img>
        else
            return <img src="/img/img-not-found.png" alt="khong thay anh" />
    }
    const typeList = props => {
        return props.map((key, i) => <div key={i} >{key["theLoai"]}</div>)
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
    function limit(string = '', limit = 0) {
        return string?.substring(0, limit) || '';
    }
    //  
    const tableRows = rowData => {
        const { key, index } = rowData;
        const tableCell = Object.keys(tableHead);
        const columnData = tableCell.map((keyD, i) => {
            switch (i) {
                case 0:
                    return <td key={i}>{index+1+(currentPage-1)*countPerPage}</td>;
                case 2:
                    return <td key={i}> {typeList(key["theLoai"])} </td>;
                case 3:
                    return <td key={i}> {setImg(key["duongDanAnh"])} </td>;
                case 4:
                    return <td key={i}>{limit(key["moTa"], 200)}</td>;
                case 5:
                    return <td key={i}>{limit(key["ngayChieu"], 4)}</td>;
                case 6:
                    return <td key={i}> <FuncButtons id={key["idPhim"]} /> </td>
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

    const [movieData, setMovieData] = React.useState();
    const [showConfirmMedal, setShowConfirmMedal] = React.useState(false);
    const clickConfirmMedal = props => {
        setMovieData(allData.find(obj => { return obj.idPhim === props }))

        setTimeout(() => {
            setShowConfirmMedal(!showConfirmMedal)
        }, 800);
    };
    const closeConfirmMedal = () => {
        setShowConfirmMedal(!showConfirmMedal)
    }

    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const clickDetailModal = props => {
        setMovieData(allData.find(obj => { return obj.idPhim === props }))

        setTimeout(() => {
            setShowDetailModal(!showDetailModal)
        }, 800);
    };
    const closeDetailModal = () => {
        setShowDetailModal(!showDetailModal)
    }

    const [showNewlModal, setShowNewModal] = React.useState(false);
    const clickNewModal = () => {
        setShowDetailModal(!showDetailModal)
    };
    const closeNewModal = () => {
        setShowNewModal(!showDetailModal)
    }

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
                                onClick={() => clickNewModal()}>+ Thêm</button>
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
            {showConfirmMedal ? <ConfirmModal data={movieData} closeConfirmMedal={closeConfirmMedal} /> : null}
            {showDetailModal ? <DetailModal data={movieData} closeDetailModal={closeDetailModal} /> : null}
            {showNewlModal ? <NewModal closeNewModal={closeNewModal} /> : null}

        </div>
    )
}

function MovieList() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/film/show')
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
                <MovieListTable allData={allData} />
            </div>
        )
    }
}

export default MovieList;