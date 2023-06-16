import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Layout, Row, Popconfirm } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { useDeleteJoke, useUpdateJoke, useJoke, useCreateJoke } from "../../hooks";
import { Joke } from "../../types";
import { useRouter } from "next/router";

const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

interface JokeFormProps {
    joke: Joke;
}

const JokesForm: React.FC<JokeFormProps> = ({ joke }) => {

    const [form] = Form.useForm();
    const router = useRouter()

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        deleteJokeMutation.mutate(joke);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        form.setFieldsValue(joke);
    }, [joke, form]);


    const createJokeMutation = useCreateJoke();


    const deleteJokeMutation = useDeleteJoke();
    const updateJokeMutation = useUpdateJoke();

    const onFinish = (data: Joke) => {
        if (joke?.id) {
            data.id = joke?.id
            updateJokeMutation.mutate(data)
        }
        else {
            createJokeMutation.mutate(data);
        }

    };

    const handleClose = () => {
        return router.push('jokes/list');
    }


    return (
        <Form
            form={form}
            name="jokesForm"
            onFinish={onFinish}
            initialValues={joke}

        >
            <Layout className="all-cards ">
                <div>
                    <h3>
                        {joke?.id
                            ? "Edit Joke"
                            : "Create Joke"}
                    </h3>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                name="Title"

                                rules={[
                                    { required: true, message: "Please enter the title of your joke" },

                                ]}
                                style={{ marginRight: "10px" }}
                            >
                                <Input className="input" placeholder="Title" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="Author"
                                rules={[
                                    { required: true, message: "Please enter Author's Name" },

                                ]}
                                style={{ marginRight: "10px" }}
                            >
                                <Input className="input" placeholder="Author" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Form.Item
                                name="Body"
                                rules={[
                                    { required: true, message: "Please enter the Joke" },

                                ]}
                                style={{ marginRight: "10px" }}
                            >
                                <TextArea className="input" placeholder="Joke" />
                            </Form.Item>
                        </Col>
                    </Row>

                </div>
                <Row style={{ marginTop: "20px", gap: "20px" }}>
                    <Col span={2}>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" size="large">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                    {!joke?.id &&
                        <Col span={2}>
                            <Form.Item>
                                <Button block htmlType="reset" size="large" style={{ backgroundColor: "#f5222d", color: "white" }}>
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                    }
                    {joke?.id &&
                        <>
                            <Col span={2}>
                                <Form.Item>
                                    <Button block type="default" size="large" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item>
                                    <Popconfirm
                                        title="Delete the Joke"
                                        description={`Are you sure to delete this ${joke.Title}`}
                                        open={open}
                                        onConfirm={handleOk}
                                        okButtonProps={{ loading: confirmLoading }}
                                        onCancel={handleCancel}
                                    >
                                        <Button
                                            block

                                            size="large"
                                            style={{ backgroundColor: "#f5222d", color: "white" }}
                                            onClick={showPopconfirm}
                                        >
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </Form.Item>
                            </Col>
                        </>
                    }
                </Row>
            </Layout>

        </Form>

    );
}

export default JokesForm