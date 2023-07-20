import React from 'react';
import { Form, Input, Space, Col, Button, Select, DatePicker, Upload, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Dragger } = Upload;

interface Field {
    btnLabel: string
    name: string;
    label: string;
    type: string;
    required?: boolean;
    rules?: {
        required?: boolean;
        message?: string;
    };
    options?: string[];
}

const GenerateDynamicForm: React.FC<{ formFields: Field[] }> = ({ formFields, btnLabel }) => {

    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    return (
        <>
            <Row className="form-container" gutter={16}>
                {formFields.map((field, index) => (
                    <Col key={index} span={field?.span ? field?.span : 12} className="gutter-row">
                        <Form.Item
                            key={index}
                            name={field.name} label={field.label}
                            className='item-parent'
                            rules={[
                                {
                                    required: field.required,
                                    message: field.rules?.message,
                                },
                            ]}
                        >
                            {field.type === 'text' && <Input />}
                            {field.type === 'select' && (
                                <Select>
                                    {field.options?.map((option, optionIndex) => (
                                        <Option key={optionIndex} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                            {field.type === 'textarea' && <Input.TextArea />}
                            {field.type === 'dateTime' && <DatePicker />}
                            {field.type === 'file' && (
                                <Dragger className="file-uploader">
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Dragger>
                            )}
                        </Form.Item>
                    </Col>
                ))}
            </Row>
            <Form.List name="dynamicFields">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={name}>
                                <Row>
                                    <Col span={24}>
                                        <Button style={{ "color": "red" }} type="ghost" onClick={() => remove(name)} block icon={<MinusCircleOutlined />}>
                                            Remove Form
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="form-container" gutter={16}>
                                    {formFields.map((field, index) => (
                                        <Col key={index} span={field?.span ? field?.span : 12} className="gutter-row">
                                            <Form.Item
                                                {...restField}
                                                key={index}
                                                name={field.name} label={field.label}
                                                className='item-parent'
                                                rules={[
                                                    {
                                                        required: field.required,
                                                        message: field.rules?.message,
                                                    },
                                                ]}
                                            >
                                                {field.type === 'text' && <Input />}
                                                {field.type === 'select' && (
                                                    <Select>
                                                        {field.options?.map((option, optionIndex) => (
                                                            <Option key={optionIndex} value={option}>
                                                                {option}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                                {field.type === 'textarea' && <Input.TextArea />}
                                                {field.type === 'dateTime' && <DatePicker />}
                                                {field.type === 'file' && (
                                                    <Dragger className="file-uploader">
                                                        <p className="ant-upload-drag-icon">
                                                            <InboxOutlined />
                                                        </p>
                                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                    </Dragger>
                                                )}
                                            </Form.Item>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                {btnLabel}
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </>
    );
};

export default GenerateDynamicForm;
