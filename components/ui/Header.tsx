import { Row, Layout, Col, Space, Typography, Button } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

interface headerProps {
    title: string,
    subTitle: string,
    btnText?: string
}

const { Title, Text } = Typography

const Header: React.FC<headerProps> = ({ title, subTitle, btnText }) => {

    const router = useRouter();
    return (
        <Row>
            <Layout className="all-cards">
                <Row style={{ display: "flex", alignItems: "centre" }}>
                    <Col span={20}>
                        <Space direction="horizontal" align="center" size="small" style={{ width: "100%" }}>
                            <Title level={4} style={{ margin: "0px" }}>{title}</Title>
                            <Text style={{ fontSize: "24px", color: "#92949733", fontWeight: "100" }}>|</Text>
                            <Text>{subTitle}</Text>
                        </Space>
                    </Col>
                    {btnText &&
                        <Col span={4}>
                            <Button
                                type="primary"
                                onClick={() => router.push('/jokes/')}
                                icon={<PlusCircleOutlined />}
                                style={{ marginLeft: "5px" }}
                            >
                                {btnText}
                            </Button>
                        </Col>
                    }
                </Row>
            </Layout>
        </Row>
    );
}

export default Header