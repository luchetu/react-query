import React, { useState } from "react";
import { Space, Table, Spin, Tag, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { tableCol } from '../../config/jokes-column.json';
import Header from "../ui/Header";
import { useRouter } from "next/router";
import { useJokesPagination, useJokesFilters } from "../../hooks";
import Link from 'next/link';
import numeral from "numeral";
import { Pagination } from "../../types";
import SearchFilter from "./filters/Search";

const ListJokes: React.FC = () => {
    const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 500 });
    const [filter, setFilter] = useState({});

    const { data: jokes, isError, isLoading } = useJokesPagination(pagination);
    const { data: filteredJokes } = useJokesFilters(filter);

    const data = _.isEmpty(filter) ? jokes : filteredJokes;
    const total = _.isEmpty(filter) ? jokes?.length : filteredJokes?.length;

    const getColumns = () => {
        return tableCol.map((field) => {
            if (field.key === "Views") {
                return {
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    render: (view) => {
                        let color = "";
                        if (view === "") view = 0;
                        if (view >= 0 && view <= 25) color = "tomato";
                        else if (view > 25 && view <= 50) color = "orange";
                        else if (view > 51 && view <= 75) color = "yellow";
                        else {
                            color = "green";
                        }
                        return (
                            <Tag color={color} key={view}>
                                {view}
                            </Tag>
                        );
                    },
                };
            }
            if (field.key === "Title") {
                return {
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    render: (_, record) => (
                        <Link
                            href={{
                                pathname: '/jokes',
                                query: { id: record.id },
                            }}
                        >
                            {record.Author}
                        </Link>
                    ),
                };
            }
            if (field.key === "Body") {
                return {
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    ellipsis: true,
                };
            }
            if (field.key === "CreatedAt") {
                return {
                    title: field.label,
                    key: field.key,
                    dataIndex: field.key,
                    render: (createdAt) => {
                        const date: Date = new Date(createdAt);
                        const options: Intl.DateTimeFormatOptions = {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        };
                        const formattedDate: string = date.toLocaleDateString(
                            'en-KE',
                            options
                        );
                        return formattedDate;
                    },
                };
            }

            return {
                title: field.label,
                dataIndex: field.key,
            };
        });
    };
    const onClearFilters = () => {
        console.log("clear")
        setFilter({});
        setPagination({ page: 1, limit: 10 });
    };
    return (
        <Spin
            indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            spinning={isLoading}
        >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Header title="Jokes" subTitle="List of Jokes" btnText="Add Joke" />

                <Row justify="end">
                    <SearchFilter
                        searchKeys={[
                            { value: "Author", label: "Author" },
                            { value: "Views", label: "Views" },
                            { value: "Title", label: "Title" },
                        ]}
                        defaultSearchKey={"Views"}
                        onChange={(filters) => {
                            setFilter({ ...filters });
                        }}
                        onClearFilters={onClearFilters}
                    />
                </Row>

                <Table
                    bordered={true}
                    columns={getColumns()}
                    dataSource={data}
                    size="small"
                    pagination={{
                        ...pagination,
                        showTotal: (total, range) =>
                            `${numeral(total).format('0,0')} Total`,
                        onChange: (page, pageSize) => {
                            setPagination({ page, limit: pageSize });
                        },
                        total: total,
                        pageSizeOptions: [5, 10, 20, 100, 250, 500],
                    }}
                />
            </Space>
        </Spin>
    );
};

export default ListJokes;