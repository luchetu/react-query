import React, { useState } from 'react';
import { Form, Select, Upload, Button, Row, Col } from 'antd';
import {
    InboxOutlined, ArrowRightOutlined,
    ArrowLeftOutlined, SaveOutlined,
    AuditOutlined, EditOutlined,
    BankOutlined, DatabaseOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { Steps } from 'antd';
import GenerateDynamicForm from './GenerateDynamicForm';
import GenerateForm from './GenerateForm';
import type { FormInstance } from 'antd/es/form';



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

interface FormStep {
    title: string;
    key: string;
    fields: Field[];
    isDynamic?: boolean;
    btnLabel?: string;
}

interface DynamicFormProps {
    formFields: FormStep[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields }) => {
    const [current, setCurrent] = useState(0);
    const formRef = React.useRef<FormInstance>(null);


    const onFinish = (values: any) => {
        console.log('Form values:', values);
    };

    const next = () => {
        const form = formRef.current;

        form.validateFields().then(() => {
            setCurrent(current + 1);
        }).catch((error) => {
            // Handle form validation errors
            console.log('Form validation error:', error);
        });
    };


    const prev = () => {
        setCurrent(current - 1);
    };


    return (
        <>
            <Steps current={current} className="steps">
                {formFields.map((step, stepIndex) => (
                    <Steps.Step
                        key={stepIndex}
                        title={step.title}
                        icon={
                            step.title === 'Case Information' ? (
                                <EditOutlined />
                            ) : step.title === 'Case Details' ? (
                                <AuditOutlined />
                            ) : step.title === 'Case Documents' ? (
                                <DatabaseOutlined />
                            ) : step.title === 'Case Contacts' ? (
                                <PhoneOutlined />
                            ) : step.title === 'Court Details' ? (
                                <BankOutlined />
                            ) : null
                        }
                    />
                ))}
            </Steps>
            <Form onFinish={onFinish} layout="vertical" ref={formRef}>
                <Row className="form-container" gutter={16}>
                    {formFields[current].isDynamic ? (
                        <GenerateDynamicForm formFields={formFields[current]?.fields}
                            btnLabel={formFields[current]?.btnLabel} />
                    ) : (
                        <GenerateForm formFields={formFields[current]?.fields} />
                    )}
                </Row>
                <Form.Item>
                    <Row>
                        <Col span={4}>
                            {current > 0 && (
                                <Button
                                    type="primary"
                                    onClick={prev}
                                    icon={<ArrowLeftOutlined />}
                                >
                                    Previous
                                </Button>
                            )}
                        </Col>

                        <Col offset={16} span={4}>
                            {current < formFields.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={next}
                                    icon={<ArrowRightOutlined />}
                                >
                                    Next
                                </Button>

                            )}
                            {current === formFields.length - 1 && (
                                <Button type="primary" icon={<SaveOutlined />} htmlType="submit">
                                    Submit
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </>
    );
};

export default DynamicForm;
