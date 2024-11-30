import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification, Divider } from 'antd';
import { CloudUploadOutlined, DeleteTwoTone, EditTwoTone, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { callDeleteBook, callFetchListBook } from '../../../service/api';
import BookModalCreate from './BookModelCreate';
import BookDetail from './BookDetail';
import UserModalUpdate from '../User/UserModelUpdate';
import BookModalUpdate from './BookModelUpdate';


const BookTable = () => {
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
    const [total, setTotal] = useState(0);

    // view detail
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataViewDetail, setDataViewDetail] = useState(null);

    //update 
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {
        fetchBook();
    }, [current, pageSize, filter, sortQuery]);

    const fetchBook = async () => {
        let query = `current=${current}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`;
        }
        if (sortQuery) {
            query += `&${sortQuery}`;
        }
        const res = await callFetchListBook(query);
        if (res && res.data) {
            setListBook(res.data.result);
            setTotal(res.data.total);
        }
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true,
            render: (text, record, index) => {
                return (
                    <a href='#' onClick={() => {
                        setDataViewDetail(record);
                        setOpenViewDetail(true);
                    }}>{record._id}</a>
                )
            }
        },
        {
            title: 'Tiêu Đề',
            dataIndex: 'mainText',
            sorter: true
        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',
            sorter: true
        },
        {
            title: 'Giá cả',
            dataIndex: 'price',
            sorter: true,
        },

        {
            title: 'đã bán',
            dataIndex: 'sold',
            sorter: true,
        },

        {
            title: 'số lượng',
            dataIndex: 'quantity',
            sorter: true,
        },

        {
            title: 'loại sách',
            dataIndex: 'category',
            sorter: true,
        },

        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa book"}
                            description={"Bạn có chắc chắn muốn xóa book này ?"}
                            onConfirm={() => handleDeleteBook(record._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer", margin: "0 20px" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>

                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer" }}
                            onClick={() => {
                                setOpenModalUpdate(true);
                                setDataUpdate(record);
                            }}
                        />
                    </>
                )
            }
        }

    ];


    const handleDeleteBook = async (bookId) => {
        const res = await callDeleteBook(bookId);
        if (res && res.data) {
            message.success('Xóa user thành công');
            fetchBook();
        } else {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: res.message
            });
        }
    };

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List Books</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                    // onClick={() => handleExportData()}
                    >Export</Button>

                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                    // onClick={() => setOpenModalImport(true)}
                    >Import</Button>

                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => setOpenModalCreate(true)}
                    >Thêm mới</Button>
                    <Button type='ghost' onClick={() => {
                        setFilter("");
                        setSortQuery("")
                    }}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    {/* <InputSearch
                    //     handleSearch={handleSearch}
                    //     setFilter={setFilter}
                    // /> */}

                </Col>
                <Col span={24}>
                    <Table
                        title={renderHeader}
                        columns={columns}
                        dataSource={listBook}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                            }
                        }
                    />
                </Col>
            </Row>

            <BookModalCreate
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                fetchBook={fetchBook}
            />
            <BookDetail
                openViewDetail={openViewDetail}
                setOpenViewDetail={setOpenViewDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}
            />
            <BookModalUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchBook={fetchBook}
            />
        </>
    )
}
export default BookTable;