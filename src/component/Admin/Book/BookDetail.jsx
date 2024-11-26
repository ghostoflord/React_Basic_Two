import { Badge, Descriptions, Drawer } from "antd";
import moment from 'moment';
import { FORMAT_DATE_DISPLAY } from "../../../util/constant";

const BookDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }
    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions
                    title="Thông tin book"
                    bordered
                    column={2}
                >
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tiêu Đề">{dataViewDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác Giả">{dataViewDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá Cả">{dataViewDetail?.price}</Descriptions.Item>
                    <Descriptions.Item label="Đã Bán">{dataViewDetail?.sold}</Descriptions.Item>
                    <Descriptions.Item label="Số Lượng">{dataViewDetail?.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Loại Sách" span={2}>{dataViewDetail?.category}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {moment(dataViewDetail?.createdAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Updated At">
                        {moment(dataViewDetail?.updatedAt).format(FORMAT_DATE_DISPLAY)}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}
export default BookDetail;