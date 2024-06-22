import { Form, Input } from "antd";

export default function Body() {
	return (
		<>
			<Form layout="vertical">
				<Form.Item label="Person 1 Units (KWh)" name="p1-units">
					<Input placeholder="Enter the units consumed by Person 1" />
				</Form.Item>
				<Form.Item label="Person 2 Units (KWh)" name="p2-units">
					<Input placeholder="Enter the units consumed by Person 2" />
				</Form.Item>
				<Form.Item label="Total Units (KWh)" name="total-units">
					<Input placeholder="Enter the total units consumed by the home" />
				</Form.Item>
				<Form.Item label="Total Cost ($)" name="total-cost">
					<Input placeholder="Enter the total cost (doesn't matter what currency you use)" />
				</Form.Item>
			</Form>
		</>
	);
}
