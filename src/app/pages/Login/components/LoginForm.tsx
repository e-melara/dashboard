import { FC } from 'react'
import { Formik, ErrorMessage } from 'formik'
import { Form, Input, Field } from 'formik-antd'

interface LoginFormProps {}

interface InitialValue {
  username: ''
  password: ''
}

const intialValue: InitialValue = {
  username: '',
  password: '',
}

export const LoginForm: FC<LoginFormProps> = () => {
  const handlerSubmit = () => {}
  return (
    <Formik onSubmit={handlerSubmit} initialValues={intialValue}>
      {({}) => (
        <Form className="login-form">
          <span className="login-form-title">Member Login</span>
        </Form>
      )}
    </Formik>
  )
}
