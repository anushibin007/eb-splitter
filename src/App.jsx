import Body from "./components/Body";
import Header from "./components/Header";

function App() {
	return (
		<>
			<div
				id="container"
				style={{
					maxWidth: "1200px",
					margin: "0 auto",
					padding: "20px",
				}}
			>
				<Header />
				<Body />
			</div>
		</>
	);
}

export default App;
