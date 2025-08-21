import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import UsernameForm from "./components/UsernameForm";

function App() {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/setUsername" element={<UsernameForm />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
}

export default App;
