import React, { useEffect, useState } from "react";
import {
    Input,
    Select,
    Form,
    Button,
} from "antd"
import {
    CloseCircleOutlined,
    SearchOutlined
} from "@ant-design/icons"

const { Option } = Select


const SearchFilter = ({
    searchKeys = [],
    defaultSearchKey,
    onChange,
    onClearFilters
}) => {

    const [form] = Form.useForm()

    const selectBefore = (
        <Form.Item
            noStyle
            name="searchKey">
            <Select
                className="select-before"
                style={{ width: "180px" }}
            >
                {
                    searchKeys.map(item => <Option key={item.key} value={item.value}>{item.label}</Option>)
                }
            </Select>
        </Form.Item>
    );
    const handleClear = () => {
        form.resetFields()
        onClearFilters()
    }

    const buttonAfter = (
        <>
            <Form.Item noStyle>
                <Button type="link" htmlType="submit" icon={<SearchOutlined />} />
            </Form.Item>
            <Form.Item noStyle>
                <Button type="link" onClick={handleClear} icon={<CloseCircleOutlined />} />
            </Form.Item>
        </>
    )

    const onFinish = (values) => {
        let val = values.searchValue

        onChange({ [values.searchKey]: val })
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            initialValues={{ searchKey: defaultSearchKey }}
        >
            <Form.Item noStyle name="searchValue" rules={[{ required: true, message: "search phrase is required" }]}>
                <Input
                    placeholder={"Search"}
                    addonBefore={selectBefore}
                    addonAfter={buttonAfter}
                    size="large"
                    className="list-search-input"
                />
            </Form.Item>
        </Form>
    )
}

export default SearchFilter