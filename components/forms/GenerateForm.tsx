import React from 'react';
import { Form, Input, Col, Select, DatePicker, Upload, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Dragger } = Upload;

interface Field {
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


const GenerateForm: React.FC<{ formFields: Field[] }> = ({ formFields }) => {

    return (
        <Row className="form-container" gutter={16}>
            {formFields.map((field, index) => (
                <Col key={index} span={field?.span ? field?.span : 12} className="gutter-row">
                    <Form.Item
                        key={index}
                        name={field.name}
                        label={field.label}
                        className='item-parent'
                        rules={[
                            {
                                required: field?.required,
                                message: field.rules?.message,
                            },
                        ]}
                    >
                        {field.type === 'text' && <Input className="ant-input" />}
                        {field.type === 'select' && (
                            <Select className="ant-select-selector">
                                {field.options?.map((option, optionIndex) => (
                                    <Option key={optionIndex} value={option}>
                                        {option}
                                    </Option>
                                ))}
                            </Select>
                        )}
                        {field.type === 'textarea' && <Input.TextArea className="ant-input" />}
                        {field.type === 'dateTime' && <DatePicker placeholder='' className="ant-picker" />}
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
    );
};

export default GenerateForm;
