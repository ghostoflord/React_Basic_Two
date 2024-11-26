import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { callFetchListBook } from '../../../service/api';


const BookTable = () => {
    const [listBook, setListBook] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [filter, setFilter] = useState("");
    const [sortQuery, setSortQuery] = useState("");
    const [total, setTotal] = useState(0);
    useEffect(() => {
        fetchBook();
    }, []);

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
            // render: (text, record, index) => {
            //     return (
            //         <a href='#' onClick={() => {
            //             setDataViewDetail(record);
            //             setOpenViewDetail(true);
            //         }}>{record._id}</a>
            //     )
            // }
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

        // {
        //     title: 'Action',
        //     render: (text, record, index) => {
        //         return (
        //             <>

        //                 <Popconfirm>
        //                     <span style={{ cursor: "pointer", margin: "0 20px" }}>
        //                         <DeleteTwoTone twoToneColor="#ff4d4f" />
        //                     </span>
        //                 </Popconfirm>

        //                 <EditTwoTone
        //                     twoToneColor="#f57800" style={{ cursor: "pointer" }}
        //                 />
        //             </>
        //         )
        //     }
        // }

    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            <Table
                className='def'
                columns={columns}
                dataSource={listBook}
                onChange={onChange}
                rowKey="_id"
            //     pagination={
            //         {
            //             current: current,
            //             pageSize: pageSize,
            //             showSizeChanger: true,
            //             total: total,
            //             showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
            //         }
            //     }
            />
        </>
    )

}
export default BookTable;