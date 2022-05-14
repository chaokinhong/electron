import React from "react";
import { Form, Button, Input } from "antd";
import { ContractContext } from "../../../context/ContractContext";

const RegisterForm = () => {
  const [regForm] = Form.useForm();
  const {createContractObject} = React.useContext(ContractContext);

 

  const handleSubmit = async (values) => {
    
    const contract = await createContractObject();
    console.log(contract)
  };
  return (
    <div className="flex ">
      <div className="flex-none w-1/6 m-10 ">
        <Form form={regForm} onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your quantity!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your quantity!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button onClick={regForm.submit}>Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
