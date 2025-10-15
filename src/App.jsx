import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home/Home.jsx'
import LoginMask from './components/login/login.jsx'

function App() {
  const [islogin, setIslogin] = useState(false)
  const [showLoginMask, setShowLoginMask] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  // 组件挂载时检查本地存储的登录状态
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (token && user) {
      setIslogin(true)
      setUserInfo(JSON.parse(user))
    }
  }, [])

  // 处理登录按钮点击
  const handleLoginClick = () => {
    if (islogin) {
      // 退出登录
      handleLogout()
    } else {
      // 显示登录弹窗
      setShowLoginMask(true)
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIslogin(false)
    setUserInfo(null)
    console.log('已退出登录')
  }

  // 处理登录成功
  const handleLoginSuccess = (userData) => {
    setIslogin(true)
    setUserInfo(userData)
    setShowLoginMask(false)
    console.log('登录成功', userData)
  }

  // 关闭登录弹窗
  const closeLoginMask = () => {
    setShowLoginMask(false)
  }

  return (
    <>
      <div className="top">
        <div className="menuBtn">发现音乐</div>
        <div className="menuBtn">我的音乐</div>
        <div className="menuBtn">关注</div>
        <div className="menuBtn">商场</div>
        <div className="menuBtn">音乐人</div>
        <div className="menuBtn">云推歌</div>
        <div className="menuBtn">下载客户端</div>

        <div className='search'><div>logo</div><input type="text"/></div>
        <div className="createSpace">创作者中心</div>
        <div
          className="loginBtn"
          onClick={handleLoginClick}
          style={{cursor: 'pointer'}}
        >
          {islogin ? (userInfo ? `欢迎, ${userInfo.username}` : '退出登录') : '登录'}
        </div>
      </div>

      <div className="contain">
        <Home islogin={islogin} userInfo={userInfo} />
      </div>

      {/* 登录弹窗 */}
      {showLoginMask && (
        <LoginMask
          onClose={closeLoginMask}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  )
}

export default App
