import React from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

import "./Pages/css/style.css"

import MovieList from './Pages/MovieList';
import CustomerInfo from './Pages/CustomerInfo';
import Notification from './Pages/Notification';
import PurchaseHistory from './Pages/PurchaseHistory';
import ServicePackManager from './Pages/ServicePackManager';
import Statistic1 from './Pages/Statistic1';
import Statistic2 from './Pages/Statistic2';
import Statistic3 from './Pages/Statistic3';
import AskedQuestions from './Pages/AskedQuestions';
import SalePromotion from './Pages/SalePromotion';
import CustomerCare from './Pages/CustomerCare';
import SubtitlesManager from './Pages/SubtitlesManager';
import CustomerComplains from './Pages/CustomerComplains';
import RequestsManager from './Pages/RequestsManager';
import TypesManager from './Pages/TypesManager';

export default function Adminpage() {
    const dropdown = event => {
        event.currentTarget.classList.toggle('btnactive');
        var dropdownContent = document.getElementById('dropdown-container');
        if (event.currentTarget.classList.contains('btnactive')) {
            dropdownContent.style.display = "block";
        } else {
            dropdownContent.style.display = "none";
        }
    }
    const navigate = useNavigate();
    const toPage = p => {
        navigate(p);
    }
    return (
        <>
            <div>
                <div className="sidenav">
                    <div id="background">
                        <div id="backgroundcover">
                            <div id="sidebarlogo" >
                                <div ><img id="sidebarlogoimg" src="/img/icons8_Doom_Logo_100px 1.png" alt='logo' /></div>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/quan-ly-phim")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/white-1.png" alt='icon' />
                                    Qu???n l?? phim
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/thong-tin-khach-hang")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/people-2.png" alt='icon' />
                                    Th??ng tin kh??ch h??ng
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/thong-bao")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/noti-1.png" alt='icon' />
                                    Th??ng b??o
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/lich-su-giao-dich")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/money1-1.png" alt='icon' />
                                    L???ch s??? giao d???ch
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/goi-dang-ky")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/package-1.png" alt='icon' />
                                    G??i ????ng k??
                                </button>
                            </div>
                            <div className="btn-control">
                                <button id='dropdown-btn' className="dropdown-btn" onClick={dropdown}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/TK1-1.png" alt='icon' />
                                    Th???ng k??
                                    <i className="fa fa-caret-down"></i>
                                </button>
                                <div id='dropdown-container' className="dropdown-container">
                                    <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/phim-xem-nhieu")}> Phim xem nhi???u</button>
                                    <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/phim-yeu-thich-nhat")}> Phim y??u th??ch nh???t</button>
                                    <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/goi-dang-ki-nhieu")}> G??i ????ng k?? nhi???u</button>
                                </div>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/cau-hoi-thuong-gap")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/require-1.png" alt='icon' />
                                    C??u h???i th?????ng g???p
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/chuong-trinh-khuyen-mai")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/KM-1.png" alt='icon' />
                                    Ch????ng tr??nh khuy???n m??i
                                </button>
                            </div>
                            <div className="btn-control" >
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/cham-soc-khach-hang")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/CSKH-1.png" alt='icon' />
                                    Ch??m s??c kh??ch h??ng
                                </button>
                            </div>
                            <div className="btn-control" >
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/phu-de-phim")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/sub-1.png" alt='icon' />
                                    Ph??? ????? cho phim
                                </button>
                            </div>
                            <div className="btn-control" >
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/khieu-lai-khach-hang")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/NotLike-1.png" alt='icon' />
                                    khi???u l???i kh??ch h??ng
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/quan-ly-yeu-cau-phim")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/RequFilm-1.png" alt='icon' />
                                    Qu???n l?? y??u c???u phim
                                </button>
                            </div>
                            <div className="btn-control">
                                <button className="btn-control btn-sidenav" onClick={() => toPage("/admin/quan-ly-phan-loai-phim")}>
                                    <img className="sidenav-icon" src="/img/side-nav-bar-icons/PL-1.png" alt='icon' />
                                    Qu???n l?? Th??? lo???i phim
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <nav className="navbar">
                        <div className="rightside vertical-center">
                            <div>
                                <img id="profile-img" src="/img/Ellipse-1.png" alt='anh dai dien' />
                            </div>
                            <div id="Hi-Admin"> Xin ch??o, Admin</div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className='main'>
                {/* Wrap your Route components in a Routes component */}
                <Routes>
                    <Route path="/" element={<Navigate replace to="/admin/quan-ly-phim" />} />
                    <Route path="/admin/quan-ly-phim" element={<MovieList  />} />
                    <Route path="/admin/thong-tin-khach-hang" element={<CustomerInfo  />} />
                    <Route path="/admin/thong-bao" element={<Notification  />} />
                    <Route path="/admin/lich-su-giao-dich" element={<PurchaseHistory  />} />
                    <Route path="/admin/goi-dang-ky" element={<ServicePackManager  />} />
                    <Route path="/admin/phim-xem-nhieu" element={<Statistic1  />} />
                    <Route path="/admin/phim-yeu-thich-nhat" element={<Statistic2  />} />
                    <Route path="/admin/goi-dang-ki-nhieu" element={<Statistic3  />} />
                    <Route path="/admin/cau-hoi-thuong-gap" element={<AskedQuestions  />} />
                    <Route path="/admin/chuong-trinh-khuyen-mai" element={<SalePromotion  />} />
                    <Route path="/admin/cham-soc-khach-hang" element={<CustomerCare  />} />
                    <Route path="/admin/phu-de-phim" element={<SubtitlesManager  />} />
                    <Route path="/admin/khieu-lai-khach-hang" element={<CustomerComplains  />} />
                    <Route path="/admin/quan-ly-yeu-cau-phim" element={<RequestsManager  />} />
                    <Route path="/admin/quan-ly-phan-loai-phim" element={<TypesManager  />} />
                    <Route path="*" element={
                        <div>
                            <h4>
                                404 PAGE NOT FOUND
                            </h4>
                        </div>
                    }
                    />
                </Routes>
            </div>
        </>
    )
}
