import React from "react";
import { Form, Button, Input, Spin } from "antd";
import { ContractContext } from "../../../context/ContractContext";

const RegisterForm = () => {
  const [regForm] = Form.useForm();
  const { createContractObject } = React.useContext(ContractContext);
  const [spin, setSpin] = React.useState(false);



  const handleSubmit = async (e) => {

    const contract = await createContractObject();
    try {
      const tx = await contract.registerGenerator(e.email, e.password, e.address)
      setSpin(true)
      await tx.wait();
      setSpin(false)
    } catch (error) {
      console.log(error);
      alert("Please connect to the Ethereum network");
    }

  };
  return (
    <Spin spinning={spin} tip='Adding to blockchain...'>

        <div className="flex-none  ">
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
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please input your address!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button onClick={regForm.submit}>Submit</Button>
            </Form.Item>
          </Form>
        </div>
   
    </Spin>
  );
};

export default RegisterForm;
