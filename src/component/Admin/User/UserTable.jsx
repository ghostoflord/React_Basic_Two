import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import InputSearch from './InputSreach';
import { callFetchListUser } from '../../../service/api';

const UserTable = () => {
    const [listUser, setListUser] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetchUser();
    }, [current, pageSize]);


    const fetchUser = async () => {
        const query = `current=${current}&pageSize=${pageSize}`;
        const res = await callFetchListUser(query);
        if (res && res.data) {
            setListUser(res.data.result);
            setTotal(res.data.total);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true
        },
        {
            title: 'FullName',
            dataIndex: 'fullName',
            sorter: true,
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
            title: 'Role',
            dataIndex: 'role',
            sorter: true
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {

    };

    return (
        <>
            <Row gutter={[20, 20]}>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        className='def'
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