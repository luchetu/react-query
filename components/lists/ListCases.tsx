import React, { useState } from "react";
import { Space, Table, Spin, Tag, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { tableCol } from '../../config/cases-column.json';
import Header from "../ui/Header";
import { useRouter } from "next/router";
import Link from 'next/link';
import numeral from "numeral";
import { Pagination } from "../../types";
import SearchFilter from "./filters/Search";

const ListCases: React.FC = () => {



    return (
        <Spin
            indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
            spinning={false}
        >
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Header title="Cases" subTitle="List of Cases" btnText="Add Case" />

                {/* <Row justify="end">
                    <SearchFilter
                        searchKeys={[
                            { value: "Author", label: "Author" },
                            { value: "Views", label: "Views" },
                            { value: "Title", label: "Title" },
                        ]}
                        defaultSearchKey={"Views"}
                        onChange={ }
                    />
                </Row> */}

                <Table
                    bordered={true}
                    columns={[]}
                    dataSource={[]}
                    size="small"

                />
            </Space>
        </Spin>
    );
};

export default ListCases;