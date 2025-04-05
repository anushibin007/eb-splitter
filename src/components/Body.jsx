import { Button, Row, Col, Descriptions, Divider, Form, Input, Typography } from "antd";
const { Title, Text } = Typography;
import { useEffect } from "react";
import { useState } from "react";

export default function Body() {
	const defaultInputState = {
		"p1-units": 0,
		"p2-units": 0,
		"total-units": 0,
		"total-cost": 0,
	};
	const defaultResultState = {
		"cost-per-unit": 0,
		"common-units": 0,
		"common-cost-per-head": 0,
		"p1-cost": 0,
		"p2-cost": 0,
	};
	const persistInputDataToLocalStorage = () => {
		localStorage.setItem("inputState", JSON.stringify(inputState));
	};
	const getInitialInputState = () => {
		const storedInputState = JSON.parse(localStorage.getItem("inputState"));
		if (storedInputState) {
			return storedInputState;
		}
		return defaultInputState;
	};
	const [inputState, setInputState] = useState(getInitialInputState());
	const [resultState, setResultState] = useState(defaultResultState);
	const handleInputStateChange = (e) => {
		const stateName = e.target.name;
		const stateValue = e.target.value;
		setInputState((oldState) => {
			return { ...oldState, [stateName]: Number(stateValue) };
		});
	};
	const canComputeResults = () => {
		return Object.values(inputState).every((value) => value !== 0);
	};
	const updateResultState = () => {
		// Skip calculations if any of input state value is 0
		if (!canComputeResults()) {
			return;
		}
		const costPerUnit = inputState["total-cost"] / inputState["total-units"];
		const unitsCommon =
			inputState["total-units"] - inputState["p1-units"] - inputState["p2-units"];
		const costCommonPerHead = (unitsCommon * costPerUnit) / 2;
		const costP1 = costCommonPerHead + costPerUnit * inputState["p1-units"];
		const costP2 = costCommonPerHead + costPerUnit * inputState["p2-units"];
		setResultState((oldState) => {
			return {
				"cost-per-unit": costPerUnit,
				"common-units": unitsCommon,
				"common-cost-per-head": costCommonPerHead,
				"p1-cost": costP1,
				"p2-cost": costP2,
			};
		});
	};
	useEffect(() => {
		updateResultState();
		persistInputDataToLocalStorage();
	}, [inputState]);
	const resetData = () => {
		setInputState(defaultInputState);
		setResultState(defaultResultState);
	};
	const roundNumber = (num) => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	};
	return (
		<>
			<Row>
				<Col>
					<Title level={5}>Enter data</Title>
				</Col>
			</Row>
			<Row align="middle">
				<Col>
					<Form style={{ marginTop: "10px" }} labelCol={{ span: 16 }}>
						<Form.Item label="Units consumed by Person 1 (KWh)">
							<Input
								name="p1-units"
								value={inputState["p1-units"]}
								type="number"
								min={0}
								placeholder="Enter the units consumed by Person 1"
								onChange={handleInputStateChange}
							/>
						</Form.Item>
						<Form.Item label="Units consumed by Person 2 (KWh)">
							<Input
								name="p2-units"
								value={inputState["p2-units"]}
								type="number"
								min={0}
								placeholder="Enter the units consumed by Person 2"
								onChange={handleInputStateChange}
							/>
						</Form.Item>
						<Form.Item label="Total Units as per the bill (KWh)">
							<Input
								name="total-units"
								value={inputState["total-units"]}
								type="number"
								min={0}
								placeholder="Enter the total units consumed by the home"
								onChange={handleInputStateChange}
							/>
						</Form.Item>
						<Form.Item label="Total Cost as per the bill ($)">
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
					<>
						<Button type="default" danger onClick={resetData}>
							Reset
						</Button>
					</>
				</Col>
			</Row>
			<Divider />
			{canComputeResults() && (
				<>
					<Row>
						<Col flex="auto">
							<Descriptions title="Calculations" bordered>
								<Descriptions.Item label="Cost per unit ($)" span={3}>
									{roundNumber(resultState["cost-per-unit"])}
								</Descriptions.Item>
								<Descriptions.Item label="Common Units (KWh)" span={1.5}>
									{roundNumber(resultState["common-units"])}
								</Descriptions.Item>
								<Descriptions.Item label="Common Cost per head ($)" span={1.5}>
									{roundNumber(resultState["common-cost-per-head"])}
								</Descriptions.Item>
							</Descriptions>
						</Col>
					</Row>
					<Row>
						<Col>
							<Title level={5}>Results</Title>
						</Col>
					</Row>
					<Row justify="space-around">
						<Col>
							<Text>
								Person 1 has to pay{" "}
								<Text code strong>
									${roundNumber(resultState["p1-cost"])}
								</Text>
							</Text>
						</Col>
						<Col>
							<Text>
								Person 2 has to pay{" "}
								<Text code strong>
									${roundNumber(resultState["p2-cost"])}
								</Text>
							</Text>
						</Col>
					</Row>
				</>
			)}
			{!canComputeResults() && (
				<>
					<Text italic>
						Calculations will automatically begin once you enter all of the above data
					</Text>
				</>
			)}
		</>
	);
}
