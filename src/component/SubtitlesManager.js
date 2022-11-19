import React from 'react'
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import "../css/style.css"
import "../css/modal-style.css"
import "../css/table-style.css"

const SubtitlesListManager = props => {
  const [movieNum, setMovieNum] = React.useState(25)

  const allData = [
    {
      id: 0,
      name: "The Witches",
      img: ""
    },
    {
      id: 1,
      name: "The Doctors",
      img: ""
    },
    {
      id: 2,
      name: "The F*ck",
      img: ""
    },
    {
      id: 3,
      name: "Hospital Playlist",
      img: ""
    },
    {
      id: 4,
      name: "Dream",
      img: ""
    },
    {
      id: 5,
      name: "Nurse",
      img: ""
    },
    {
      id: 6,
      name: "Nurse",
      img: ""
    },
    {
      id: 7,
      name: "Avatar 1",
      img: ""
    },
    {
      id: 8,
      name: "The Doctor Strange",
      img: ""
    },
    {
      id: 9,
      name: "The Witches",
      img: ""
    },
    {
      id: 10,
      name: "Nurse",
      img: ""
    }
  ]
  const countPerPage = 8;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };
  const createSubtitle = e => {
    props.changeData(e);
    props.changePage();
  }
  const Card = props => {
    return (
      <>
        <div className='col-md-3 center-block'>
          <div className='card-subtitles '>
            <h4>{props.name}</h4>
            <img src="/img/img-not-found.png" alt="x" />
            <button onClick={() => createSubtitle(props.id)}>+ Tạo</button>
          </div>
        </div>
      </>
    )
  }
  const listCard = () => {

    return collection.map((key, index) => {
      return <Card
        key={index}
        name={key["name"]}
        img={key["img"]}
        id={key["id"]}
      />;
    });
  };


  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-8">
          <h2>Phụ đề phim</h2>
        </div>
        <div className="col-md-4">
          <div className="find-group">
            <input id="Findinput" name="find" type="text" className="form-control" />
            <span className="fa fa-search field-icon"></span>
          </div>
        </div>
      </div>

      <div>
        <h4>Tổng phim: {movieNum} phim</h4>
      </div>
      <div className='card-display'>
        {listCard()}
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
  )
}

const SubtitlesCreate = props => {
  const backToTable = () => {
    props.changePage();
  }
  return (
    <div>
      <div className="row toolbar">
        <div className="col-md-8">
          <button className="btn astext" onClick={backToTable}>
            <i className="glyphicon glyphicon-arrow-left back-btn"></i>
          </button>
          <h2>Phụ đề phim</h2>
        </div>
      </div>
      <div>
        Đang phát triển, vui lòng quay lại sau
      </div>
    </div>
  )

}

export default function SubtitlesManager() {

  const [data, setData] = React.useState(true);
  const changeData = (e) => {
    setData(e);
  }

  const [isTable, setIsTable] = React.useState(true);
  const changePage = () => {
    setIsTable(!isTable);
  }
  const page = () => {
    return isTable ? <SubtitlesListManager changeData={changeData} changePage={changePage} /> :
      <SubtitlesCreate data={data} changePage={changePage} />
  }
  return (
    <>
      {page()}
    </>
  )
}
