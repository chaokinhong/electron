import React from "react";
import { Form, Button, Input, Spin } from "antd";
import { ContractContext } from "../../context/ContractContext";

const LockElectricityForm = () => {

    const [lockForm] = Form.useForm();
    const [spin, setSpin] = React.useState(false);
    const { createContractObject } = React.useContext(ContractContext);




    const handleForm = async (e) => {
        const contract = await createContractObject();
        const id = window.sessionStorage.getItem('generatorId')
        try {
            const tx = await contract.lockElectricityToPool(id, e.quantity)
            setSpin(true)
            await tx.wait();
            setSpin(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Spin spinning={spin} tip='Adding to blockchain'>
            <h2 className="p-2 font-bold text-lg">Lock Electricity and get ETH</h2>
            <div className="flex-none p-10">
                <Form form={lockForm} onFinish={handleForm}>
                    <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Please input your email!" }]}>
                        <Input />
                    </Form.Item>
                    <h2 className="p-4">Estimated Get: {} ETH</h2>
                    <Form.Item>
                        <Button onClick={lockForm.submit}>Submit</Button>
                    </Form.Item>
                </Form>
            </div>

        </Spin>
    )
}

export default LockElectricityForm