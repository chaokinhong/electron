import React from 'react'
import { Form, Button, Input, Spin } from 'antd'
import { ContractContext } from '../../context/ContractContext'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const [regForm] = Form.useForm()
  const { createContractObject, navigate } = React.useContext(ContractContext)
  const [spin, setSpin] = React.useState(false)

  const handleSubmit = async e => {
    const contract = await createContractObject()
    try {
      const tx = await contract.registerGenerator(
        e.username,
        e.email,
        e.password,
        e.address
      )
      setSpin(true)
      await tx.wait()
      setSpin(false)
      alert('Registered successfully!')
      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Please connect to the Ethereum network')
    }
  }
  return (
    <Spin spinning={spin} tip='Adding to blockchain...'>
      <div className='mt-40  '>
        <h1 className='m-3'>
          Have an Account? <Link to='/login'>Login</Link>
        </h1>

        <Form form={regForm} onFinish={handleSubmit}>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
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
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Address'
            name='address'
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={regForm.submit}>Register</Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  )
}

export default RegisterForm
