import React from 'react';
import { Modal, Input, Button, Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify"


const EmailModal = () => {
    const [visible, setVisible] = React.useState(false);
    const [form] = useForm();
    const auth = getAuth();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        try {
            await form.validateFields();
            const values = form.getFieldsValue();
            console.log('Email:', values.email);

            sendPasswordResetEmail(auth, values.email)
                .then(() => {
                    // Password reset email sent!
                    toast.success(`Send reset mail to ${values.email}`)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });

            form.resetFields();
            setVisible(false);
        } catch (errorInfo) {
            toast.error('Validation failed:', errorInfo);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setVisible(false);
    };

    return (
        <>
            <a className="font-medium text-primary-deep-green hover:text-primary-green cursor-pointer" onClick={showModal}>Forgot your password?</a>
            <Modal
                title="Type you Email to Reset Password"
                visible={visible}
                footer={[
                    <Button key="cancel" onClick={handleCancel} className="border-primary-green">
                        Cancel
                    </Button>,
                    <Button key="ok" onClick={handleOk} className="border-primary-green hover:border-primary-deep-green">
                        OK
                    </Button>,
                ]}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email',
                            },
                        ]}
                    >
                        <Input className='hover:border-primary-green' placeholder="Enter your email" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EmailModal;
