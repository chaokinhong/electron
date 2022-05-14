import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { ContractContext } from '../../../context/ContractContext';


const LoginForm = () => {
    const [loginForm] = Form.useForm();
    const { generatorLoginValidate } = React.useContext(ContractContext);

    const handleForm = (e) => {
        generatorLoginValidate(e.email, e.password)

    }


    return (

        <div className="flex-none ">
            <Form form={loginForm} onFinish={handleForm}>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your email!" }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button onClick={loginForm.submit}>Submit</Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default LoginForm;