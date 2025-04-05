import Body from "./components/Body";
import Header from "./components/Header";
import "./App.css";

function App() {
	return (
		<>
			<Header />
			<div
				id="container"
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "20px",
				}}
			>
				<Body />
			</div>
		</>
	);
}

export default App;
