import { FC } from 'react'

import './Login.css'
import { ImageLogin, LoginForm } from './components'

export const LoginPage: FC = () => {
  return (
    <>
      <div className="limiter">
        <div className="container-login">
          <div className="wrap-login">
            <ImageLogin />
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}
