import './login.css'
import {useState} from 'react';
import {postUser,loginUser} from '../../api/user'


// 接收onClose和onLoginSuccess的prop参数
export default function LoginMask({onClose, onLoginSuccess}){
 const [isSignUp,setSignUp] = useState(false);

  function handleSignUp(){
    setSignUp(()=>{ return !isSignUp; });
  }

  // 处理关闭按钮点击事件
  function handleClose() {
    if(onClose) {
      onClose();
    }
  }

  // 登录和注册处理
  async function handleLoginOrSignUp() {
    const phone = document.querySelector('.phoneInput').value;
    const password = document.querySelector('.passwordInput').value;
    const params = {
      username: phone,
      password: password
    };

    if(!isSignUp){
      // 注册逻辑
      try {
        console.log("传递的参数:", params);
        const res = await postUser(params);
        console.log("注册成功响应:", res);

        if (onClose) {
          onClose();
        }
      } catch (error) {
        console.error("注册失败:", error);
        alert("注册失败: " + (error.response?.data?.message || error.message));
      }
    } else {
      // 登录逻辑
      try {
        const res = await loginUser(params);
        console.log("登录成功响应:", res);

        // 存储token到localStorage
        if(res.data && res.data.token){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          console.log('Token已存储');

          // 调用父组件的登录成功回调
          if (onLoginSuccess) {
            onLoginSuccess(res.data.user);
          }
        }

        if(onClose){
          onClose();
        }
      } catch(error) {
        console.error("登录失败:", error);
        alert("登录失败: " + (error.response?.data?.message || error.message));
      }
    }
  }

  return(
    <div className="root">
      <div className="loginTop">
        <span>欢迎{isSignUp?'登录':'注册'}</span>
        <span onClick={handleClose} style={{cursor: 'pointer'}}>X</span>
      </div>
      <div className="loginInputBox">
        <div className="inputBox">
          <div className='userInput phoneInputBox'><span className="phoneSpan">手机号</span>
          <input type="text" placeholder='请输入手机号' className="phoneInput"/>
          </div>
          <input type="password" placeholder='请输入密码' className='userInput passwordInput'/>
        </div>
        <div className="signInOR_out">
          <button className='loginBtn' onClick={handleLoginOrSignUp}>{isSignUp?'登录':'注册'}</button>
          <span onClick={handleSignUp} className='isloginSpan'>{isSignUp?'注册':'登录'}</span>
        </div>
      </div>
    </div>
  )
}
