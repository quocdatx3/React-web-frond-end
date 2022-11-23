import React from 'react'
import cloneDeep from "lodash/cloneDeep";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

import SEVER_URL from '../setup';

const Card = props => {

    const setImg = () => {
        if (props.imgURL != null)
            return <img src={props.imgURL} alt="/img/img-not-found.png"></img>
        else
            return <img src="/img/img-not-found.png" alt="/img/img-not-found.png"></img>
    }
    return (
        <div className="row">
            <div className="col-sm-5 num-ranking-control">
                <div className="dot number-control"> {props.stt} </div>
                {setImg()}
            </div>
            <div className="col-sm-6" >
                <div className="name">{props.name}</div>
                <div className="type">{props.type}</div>
                <div className="number">
                    <span className="glyphicon glyphicon-heart" aria-hidden="true" />{props.loves}
                </div>
            </div>
        </div>
    )
}

const Statistic2Table = props => {
    
    const allData = props.allData

    const [collection] = React.useState(cloneDeep(allData));
    const cardsArrayData = (from, to) => {
        return collection.map((key, index) => {
            if (index >= from && index <= to)
                return <div key={index}>
                    <Card 
                        stt={index + 1}
                        imgURL={key["duongDanAnh"]}
                        name={key["tenPhim"]}
                        type={key["theLoai"]}
                        loves={key["danhGiaPhim"]}
                    />
                </div>;
                else return null;
        });
    };

    return (
        <div>
            <div className="row toolbar">
                <div className="col-md-6">
                    <h2>Thống kê phim yêu thích nhất</h2>
                </div>
            </div>

            <div >
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

            <div id="love-ranking">
                <div className='col-md-6'>
                    {cardsArrayData(0, 4)}
                </div>
                <div className='col-md-6'>
                    {cardsArrayData(5, 9)}
                </div>
            </div>
        </div>
    )
}

export default function Statistic2() {
    const [allData, setAllData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [getData, setGetData] = React.useState(true);

    React.useEffect(
        () => {
            fetch(SEVER_URL + 'apis/admin/show/film/rating/1')
                .then(response => response.json())
                .then(data => {
                    setAllData(data.sort((a, b) => -(a.danhGiaPhim - b.danhGiaPhim)).slice(0, 10));
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
                <Statistic2Table allData={allData} resetPage={resetPage} />
            </div>
        )
    }
}
