import React, { useState } from "react";
import { Button, Col, Form, Input, Layout, Row, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import TextArea from "antd/es/input/TextArea";
import { useDeleteJoke, useUpdateJoke, useJoke, useCreateJoke } from "../../hooks";
import { Joke } from "../../types";



const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;


const JokesForm: React.FC = () => {

    const [form] = Form.useForm();
    const router = useRouter();

    const { id } = router.query;
    const { data: joke, isLoading } = useJoke(id);

    console.log(joke)

    const createJokeMutation = useCreateJoke();


    const deleteJokeMutation = useDeleteJoke();
    const updateJokeMutation = useUpdateJoke();

    const onFinish = (data: Joke) => {
        id ? updateJokeMutation.mutate(data) : createJokeMutation.mutate(data);
    };


    const handleDeleteJoke = (data: Joke) => {
        deleteJokeMutation.mutate(data);
    };



    return (
        <Spin indicator={loadingIcon} spinning={id ? isLoading : false}>
            <Form
                form={form}
                name="jokesForm"
                onFinish={onFinish}
                initialValues={id && !isLoading ? joke : {}}
            >
                <Layout className="all-cards ">
                    <div>
                        <h3>
                            {id
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
                        {!id &&
                            <Col span={2}>
                                <Form.Item>
                                    <Button block htmlType="reset" size="large" style={{ backgroundColor: "#f5222d", color: "white" }}>
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Col>
                        }
                        {id &&
                            <>
                                <Col span={2}>
                                    <Form.Item>
                                        <Button block type="default" size="large">
                                            Close
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={2}>
                                    <Form.Item>
                                        <Button block htmlType="submit" size="large" style={{ backgroundColor: "#f5222d", color: "white" }}>
                                            Delete
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </>
                        }
                    </Row>
                </Layout>

            </Form>
        </Spin>
    );
}

export default JokesForm