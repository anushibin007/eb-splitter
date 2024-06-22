import { Descriptions, Form, Input } from "antd";
import { useEffect } from "react";
import { useState } from "react";

export default function Body() {
	const defaultInputState = {
		"p1-units": 0,
		"p2-units": 0,
		"total-units": 0,
		"total-cost": 0,
	};
	const [inputState, setInputState] = useState(defaultInputState);
	const [resultState, setResultState] = useState({ "cost-per-unit": 0 });
	const handleInputStateChange = (e) => {
		const stateName = e.target.name;
		const stateValue = e.target.value;
		setInputState((oldState) => {
			return { ...oldState, [stateName]: stateValue };
		});
	};
	const updateResultState = () => {
		const costPerUnit = inputState["total-cost"] / inputState["total-units"];
		setResultState((oldState) => {
			return { ...oldState, "cost-per-unit": costPerUnit };
		});
	};
	useEffect(() => {
		console.log(inputState);
		updateResultState();
		console.log(resultState);
	}, [inputState]);
	return (
		<>
			<Form layout="vertical">
				<Form.Item label="Person 1 Units (KWh)">
					<Input
						name="p1-units"
						value={inputState["p1-units"]}
						type="number"
						min={0}
						placeholder="Enter the units consumed by Person 1"
						onChange={handleInputStateChange}
					/>
				</Form.Item>
				<Form.Item label="Person 2 Units (KWh)">
					<Input
						name="p2-units"
						value={inputState["p2-units"]}
						type="number"
						min={0}
						placeholder="Enter the units consumed by Person 2"
						onChange={handleInputStateChange}
					/>
				</Form.Item>
				<Form.Item label="Total Units (KWh)">
					<Input
						name="total-units"
						value={inputState["total-units"]}
						type="number"
						min={0}
						placeholder="Enter the total units consumed by the home"
						onChange={handleInputStateChange}
					/>
				</Form.Item>
				<Form.Item label="Total Cost ($)">
					<Input
						name="total-cost"
						value={inputState["total-cost"]}
						type="number"
						min={0}
						placeholder="Enter the total cost (doesn't matter what currency you use)"
						onChange={handleInputStateChange}
					/>
				</Form.Item>
			</Form>
			<Descriptions title="Statistics" bordered>
				<Descriptions.Item label="Cost per unit">
					{resultState["cost-per-unit"]}
				</Descriptions.Item>
			</Descriptions>
		</>
	);
}
