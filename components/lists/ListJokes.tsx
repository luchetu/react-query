import React, { useCallback } from "react";
import {
    Row,
    Space,
    Table,
    Spin,
    Col,
    Tag,
    Typography,
    Button,
} from 'antd';
import {
    LoadingOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import _ from 'lodash';
import { tableCol } from '../../config/jokes-column.json';
import Header from "../ui/Header";
import { useRouter } from "next/router";
import { useJokes } from "../../hooks";
import Link from 'next/link'

const { Text } = Typography



const ListJokes: React.FC = () => {

    const initialPagination = { current: 1, pageSize: 10 };
    const router = useRouter();

    const { data: jokes, isError, isLoading } = useJokes();

    const onAuthorClick = (data) => {
        console.log(data)
    }

    //return the table columns
    const getColumns = () => {
        return tableCol.map((field) => {

            //add views tag on the table
            if (field.key == "Views") {
                return ({
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    render: (view) => {
                        let color = "";
                        if (view == "") view = 0
                        if (view >= 0 && view <= 25) color = "tomato"
                        else if (view > 25 && view <= 50) color = "orange"
                        else if (view > 51 && view <= 75) color = "yellow"
                        else {
                            color = "green"
                        }
                        return (
                            <Tag color={color} key={view}>
                                {view}
                            </Tag>
                        )
                    },
                }
                )
            }
            if (field.key == "Title") {
                return ({
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    render: (_, record) => <Link href={{
                        pathname: '/jokes',
                        query: { id: record.id },
                    }}>{record.Author}</Link>

                })
            }
            if (field.key == "CreatedAt") {
                return ({
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    render: (createdAt) => {
                        const date: Date = new Date(createdAt);

                        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
                        const formattedDate: string = date.toLocaleDateString('en-KE', options);
                        return (

                            formattedDate

                        )
                    },
                }
                )

            }

            return {
                title: field.label,
                dataIndex: field.key,
            };

        })

    }

    return (
        <Spin
            indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            spinning={isLoading}
        >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Header title="Jokes" subTitle="List of Jokes" />
                <Row justify="end">
                    <div>
                        <Button
                            type="primary"
                            onClick={() => router.push('/jokes/')}
                            icon={<PlusCircleOutlined />}
                            style={{ marginLeft: "5px" }}
                        >
                            Add Joke
                        </Button>
                    </div>
                </Row>
                <Table
                    columns={getColumns()}
                    dataSource={jokes}
                //   pagination={{
                //     ...filtersPagination.pagination,
                //     showTotal: (total, range) => `${numeral(total).format('0,0')} ${lang("total")}`,
                //     total: getTotalCount(),
                //     onChange: (page, pageSize) => {
                //       setFiltersPagination(prevState => {
                //         return { ...prevState, pagination: { current: page, pageSize } }
                //       })
                //     },
                //     pageSizeOptions: [10, 20, 50, 100, 250, 500]
                //   }}
                />

            </Space>
        </Spin>
    )
}
export default ListJokes