import './Home.css'
import { useState } from 'react';
import ImgBanner1 from '../../assets/img/bannerImg1.jpg'
import ImgBanner2 from '../../assets/img/bannerImg2.jpg'
import ImgBanner3 from '../../assets/img/bannerImg3.jpeg'
import LoginMask from '../../components/login/login.jsx';
import Hot1 from '../../components/hotMusic/hot1/hot1.jsx';
export default function Home() {
  const Imglist = [
    { id: 1, src: ImgBanner1 },
    { id: 2, src: ImgBanner2 },
    { id: 3, src: ImgBanner3 },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImg = Imglist[currentIndex].src;
  // 登录组件显示状态
  const [isLoginMaskShow, setLoginMaskShow] = useState(false);

  // 处理登录组件显示/隐藏
  function handleLoginMaskShow() {
    setLoginMaskShow(() => { return !isLoginMaskShow; });
  }

  // 关闭登录组件的函数
  function closeLoginMask() {
    setLoginMaskShow(false);
  }
  const bannerStyle = {
    backgroundImage: `url(${currentImg})`
  }

  function preImg() {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? Imglist.length - 1 : prevIndex - 1
    );
  }

  function nextImg() {
    setCurrentIndex(prevIndex =>
      prevIndex === Imglist.length - 1 ? 0 : prevIndex + 1
    );
  }

  return (
    <div className='root' >
      {isLoginMaskShow ? (
        <>
          <div className="maskOverlay"></div>
          {/* 传递closeLoginMask函数给LoginMask组件作为onClose prop */}
          <div className="loginMask"><LoginMask onClose={closeLoginMask} /></div>
        </>
      ) : null}
      <div className="banner" style={bannerStyle}>
        <div className='left' onClick={preImg}> {'<'} </div>
        <div className="bannerImage">
          <img src={currentImg} alt="轮播图" className='showImg' />
        </div>
        <div className="dowload">
          <div className="dowloadImg"></div>
          <button className='dowloadBtn'>下载客户端</button>
          <span className='dowloadSlogan'>PC 安卓 iPhone WP iPad Mac 六大客户端</span>
        </div>
        <div className="right" onClick={nextImg}> {'>'} </div>
      </div>
      <div className="contant">
        <div className="mainContent">
          <div className="hot">
            <div className="hotTop">
              <div className='hotTopRight'>
                <div className="hotTitle">热门推荐</div>
                <span className="hotr cnMusic">华语</span>
                <span className="hotr rockMusic">摇滚</span>
                <span className="hotr popMusic">流行</span>
                <span className="hotr folkMusic">民谣</span>
                <span className="hotr elecMusic">电子</span>
              </div>

              <div className='hotTopLeft'>
                <span className="moreInfo">更多</span>
                <div className="hotLabel">-{'>'}</div>
              </div>

            </div>
            <div className="hotContain">
              {/* 组件化 */}
              <Hot1/>


            </div>
          </div>
        </div>
        <div className="rightContent">
          <div className="isloginBox">

            <button className='btnLogin' onClick={handleLoginMaskShow}>立即登录</button>
          </div>
          {/* 组件化 */}
          <div className="singer">
            <div className="singerTitle">
              <span>歌手列表</span>
              <span>查看更多</span>
            </div>
            <div className="singerBox">
              <div className="singerImg">1</div>
              <span className="singerInfo">修改了一点点</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
