import React, { useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification, InputNumber } from 'antd';
import { callCreateBook } from '../../../service/api';


const BookModalCreate = (props) => {
    const { openModalCreate, setOpenModalCreate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();


    const onFinish = async (values) => {
        const { thumbnail, mainText, author, price, sold, quantity, category } = values;
        setIsSubmit(true)
        const res = await callCreateBook(thumbnail, mainText, author, price, sold, quantity, category);
        if (res && res.data) {
            message.success('Tạo mới book thành công');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchBook()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    return (
        <>

            <Modal
                title="Thêm mới sách"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="thumbnail"
                        name="thumbnail"
                        rules={[{ required: true, message: 'Vui lòng nhập thumbnail!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="slider"
                        name="slider"
                        rules={[{ required: true, message: 'Vui lòng nhập slider!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tiêu đề"
                        name="mainText"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Tác Giả"
                        name="author"
                        rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Giá Cả"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá cả!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Đã Bán"
                        name="sold"
                        rules={[{ required: true, message: 'Vui lòng nhập mặt hàng đã bán!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số Lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Thể Loại"
                        name="category"
                        rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal >
        </>
    );
};

export default BookModalCreate;