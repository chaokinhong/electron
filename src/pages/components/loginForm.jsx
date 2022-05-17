import React from 'react'
import { Form, Input, Button, Spin, message } from 'antd'
import { ContractContext } from '../../context/ContractContext'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  const [loginForm] = Form.useForm()
  const { generatorLoginValidate, navigate } = React.useContext(ContractContext)
  const [spin, setSpin] = React.useState(false)

  const handleForm = e => {
    generatorLoginValidate(e.email, e.password)
  }

  return (
    <Spin spinning={spin} tip='Logging in...'>
      <div className='mt-40 '>
        <h1 className='m-3'>
          Don't Have an Account? <Link to='/register'>Sign up</Link>
        </h1>
        <Form form={loginForm} onFinish={handleForm}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={loginForm.submit}>Log in</Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  )
}

export default LoginForm
