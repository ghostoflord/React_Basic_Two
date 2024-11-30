import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Modal, notification } from 'antd';
import { callUpdateBook } from '../../../service/api';


const BookModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();


    const onFinish = async (values) => {
        const { _id, thumbnail, slider, mainText, author, price, sold, quantity, category } = values;
        setIsSubmit(true)
        const res = await callUpdateBook(_id, thumbnail, slider, mainText, author, price, sold, quantity, category);
        if (res && res.data) {
            message.success('Cập nhật book thành công');
            setOpenModalUpdate(false);
            await props.fetchBook()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật book"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
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
                // initialValues={dataUpdate}
                >
                    <Form.Item
                        hidden
                        labelCol={{ span: 24 }}
                        label="Id"
                        name="_id"
                        rules={[{ required: true, message: 'Vui lòng nhập Id!' }]}
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
                        label="Tác giả"
                        name="author"
                        rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Giá Tiền"
                        name="price"
                        rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
                    >
                        <Input />
                    </Form.Item><Form.Item
                        labelCol={{ span: 24 }}
                        label="Số Lượng Đã Bán"
                        name="sold"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng đã bán!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Số Lượng"
                        name="quantity"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Thể Loại"
                        name="category"
                        rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
                    >
                        <Input disabled />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default BookModalUpdate;
