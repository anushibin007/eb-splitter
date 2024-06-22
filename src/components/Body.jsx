import { Button, Descriptions, Form, Input } from "antd";
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
			{canComputeResults() && (
				<>
					<Descriptions title="Statistics" bordered>
						<Descriptions.Item label="Cost per unit ($)" span={3}>
							{resultState["cost-per-unit"]}
						</Descriptions.Item>
						<Descriptions.Item label="Common Units (KWh)" span={1.5}>
							{resultState["common-units"]}
						</Descriptions.Item>
						<Descriptions.Item label="Common Cost per head ($)" span={1.5}>
							{resultState["common-cost-per-head"]}
						</Descriptions.Item>
						<Descriptions.Item
							label="Person 1 Cost ($)"
							span={1.5}
							labelStyle={{ fontWeight: "bold" }}
							contentStyle={{ fontWeight: "bold" }}
						>
							{resultState["p1-cost"]}
						</Descriptions.Item>
						<Descriptions.Item
							label="Person 2 Cost ($)"
							span={1.5}
							labelStyle={{ fontWeight: "bold" }}
							contentStyle={{ fontWeight: "bold" }}
						>
							{resultState["p2-cost"]}
						</Descriptions.Item>
					</Descriptions>
				</>
			)}
			<>
				<Button type="default" danger onClick={resetData}>
					Reset
				</Button>
			</>
			{!canComputeResults() && (
				<>
					<p>Calculations will begin once you enter all the above data</p>
				</>
			)}
		</>
	);
}
