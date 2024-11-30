import { Descriptions, Modal, Table } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import * as XLSX from 'xlsx';
import { useState } from "react";
import testimport from './testimport.xlsx?url';
import { callCreateBook } from "../../../service/api";

const { Dragger } = Upload;
const BookImport = (props) => {
    const { setOpenModalImport, openModalImport } = props;
    const [dataExcel, setDataExcel] = useState([])

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 1000);
    };



    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onload = function (e) {
                        const data = new Uint8Array(reader.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        const sheet = workbook.Sheets[workbook.SheetNames[0]];
                        // const json = XLSX.utils.sheet_to_json(sheet);
                        const json = XLSX.utils.sheet_to_json(sheet, {
                            header: ["mainText", "author", "phone", "sold", "quantity", "category"],
                            range: 1 //skip header row
                        });
                        if (json && json.length > 0) setDataExcel(json)
                    }
                }
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        const data = dataExcel.map(item => {
            item.password = '123456';
            return item;
        })
        const res = await callCreateBook(data);
        if (res.data) {
            notification.success({
                description: `Success: ${res.data.countSuccess}, Error: ${res.data.countError}`,
                message: "Upload thành công",
            })
            setDataExcel([]);
            setOpenModalImport(false);
            props.fetchBook();
        } else {
            notification.error({
                description: res.message,
                message: "Đã có lỗi xảy ra",
            })
        }
    }


    return (
        <>
            <Modal title="Import data user"
                width={"50vw"}
                open={openModalImport}
                onOk={() => handleSubmit()}
                onCancel={() => {
                    setOpenModalImport(false);
                    setDataExcel([]);
                }}
                okText="Import data"
                okButtonProps={{
                    disabled: dataExcel.length < 1
                }}
                maskClosable={false}
            >
                <Dragger
                    {...propsUpload}
                    showUploadList={dataExcel.length > 0}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single upload. Only accept .csv, .xls, .xlsx . or
                        &nbsp;  <a onClick={e => e.stopPropagation()} href={testimport} download>Download Sample File</a>
                    </p>
                </Dragger>
                <div style={{ paddingTop: 20 }}>
                    <Table
                        dataSource={dataExcel}
                        title={() => <span>Dữ liệu upload:</span>}
                        columns={[
                            { dataIndex: 'mainText', title: 'Tiêu đề' },
                            { dataIndex: 'author', title: 'Tác Giả' },
                            { dataIndex: 'phone', title: 'số điện thoại' },
                            { dataIndex: 'sold', title: 'Số lương đã bán' },
                            { dataIndex: 'quantity', title: 'Số lượng' },
                            { dataIndex: 'category', title: 'thể loại' },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}

export default BookImport;
