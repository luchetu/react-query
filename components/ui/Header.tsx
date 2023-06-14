import { Row, Layout, Col, Space, Typography } from "antd"

interface headerProps {
    title: string,
    subTitle: string
}

const { Title, Text } = Typography

const Header: React.FC<headerProps> = ({ title, subTitle }) => {

    return (
        <Row>
            <Layout className="all-cards">
                <Row>
                    <Col span={12} style={{ display: "flex", alignItems: "centre" }}>
                        <Space direction="horizontal" align="center" size="small" style={{ width: "100%" }}>
                            <Title level={4} style={{ margin: "0px" }}>{title}</Title>
                            <Text style={{ fontSize: "24px", color: "#92949733", fontWeight: "100" }}>|</Text>
                            <Text>{subTitle}</Text>
                        </Space>
                    </Col>
                </Row>
            </Layout>
        </Row>
    );
}

export default Header