import { Button, Col, Row, Typography } from "antd";
import HelpModal from "./HelpModal";
import { useState } from "react";
const { Title, Text } = Typography;

export default function Header() {
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
	return (
		<>
			<Row align="middle" justify="space-between" gutter={[16, 16]}>
				<Col>
					<Title style={{ margin: "0px" }}>⚡️ WattSplit</Title>
					<Text italic>The only calculator you need to split electricity bills</Text>
				</Col>
				<Col>
					<Button onClick={() => setIsHelpModalOpen(true)}>
						How to calculate individual units?
					</Button>
				</Col>
			</Row>
			<HelpModal isModalOpen={isHelpModalOpen} setIsModalOpen={setIsHelpModalOpen} />
		</>
	);
}
