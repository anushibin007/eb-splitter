import { List, Modal, Tag, Typography } from "antd";
const { Title, Text } = Typography;

const linksData16A = [
	{
		title: "Tapo TP-Link P110 Mini 16A Smart Wi-Fi Plug",
		url: "https://amzn.to/44c8hZn",
		recommended: true,
	},
	{
		title: "QUBO 16A Wifi + BT Smart Plug",
		url: "https://amzn.to/3E90yRe",
	},
	{
		title: "Wipro 16A Wi-Fi Smart Plug with Energy Monitoring",
		url: "https://amzn.to/4i2CZr4",
	},
];

const linksData10A = [
	{
		title: "QUBO 10A Wifi + BT Smart Plug",
		url: "https://amzn.to/3FRCX88",
		recommended: true,
	},
	{
		title: "Wipro 10A smart plug with Energy monitoring",
		url: "https://amzn.to/42sVctr",
	},
];

export default function HelpModal({ isModalOpen, setIsModalOpen }) {
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Modal
				title="How to calculate individual units?"
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
			>
				<Text>
					To calculate the electricity consumption of specific devices, you'll need to use
					a <Text strong>smart plug with energy monitoring capabilities</Text>. Here are
					the top picks:
				</Text>
				<Title level={5} style={{ marginBottom: "0px" }}>
					16 A Plugs
				</Title>
				<Text>For AC, geysers, etc</Text>
				<List
					bordered
					size="small"
					style={{ marginTop: "10px" }}
					dataSource={linksData16A}
					renderItem={(item) => (
						<List.Item>
							<a href={item.url} target="_blank">
								{item.title}
							</a>
							{item.recommended && <Tag color="green">Recommended</Tag>}
						</List.Item>
					)}
				></List>
				<Title level={5} style={{ marginBottom: "0px" }}>
					10 A Plugs
				</Title>
				<Text>For computers, laptops, fridge, washing machine, television, etc</Text>
				<List
					bordered
					size="small"
					style={{ marginTop: "10px" }}
					dataSource={linksData10A}
					renderItem={(item) => (
						<List.Item>
							<a href={item.url} target="_blank">
								{item.title}
							</a>
							{item.recommended && <Tag color="green">Recommended</Tag>}
						</List.Item>
					)}
				></List>
			</Modal>
		</>
	);
}
