import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popconfirm, Button, message, notification, Divider } from 'antd';
import InputSearch from './InputSreach';
import { callFetchListUser } from '../../../service/api';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchUser();
    }, [current, pageSize]);


    const fetchUser = async (searchFilter) => {
        setIsLoading(true);
        let query = `current=${current}&pageSize=${pageSize}`;
        if (searchFilter) {
            query += `&${searchFilter}`
        }

        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.total);
        }
        setIsLoading(false)
    }


    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <><button>Delete</button></>
                )
            }
        }

    ];

    const onChange = (pagination, filters, sorter, extra) => {

    };

    const handleSearch = (query) => {
        fetchUser(query)
    }

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch handleSearch={handleSearch} />
                </Col>
                <Col span={24}>
                    <Table
                        // title={renderHeader}
                        className='def'
                        loading={isloading}
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        rowKey="_id"
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total

                            }
                        }
                    />
                </Col>
            </Row>
        </>
    )
}


export default UserTable;