import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { handleSignOut } from "../utils/AuthHandlers.js";

// Import SVG icons
import dashboardIcon from "/assets/dashboard.svg";
import propertiesIcon from "/assets/properties.svg";
import walletIcon from "/assets/wallet.svg";
import transactionsIcon from "/assets/transactions.svg";
import rewardIcon from "/assets/reward.svg";
import settingsIcon from "/assets/settings.svg";
import helpIcon from "/assets/help.svg";
import logoutIcon from "/assets/logout.svg";
import bellIcon from "/assets/bellIcon.svg";
import userIcon from "/assets/user.svg";
import verinestlogo2 from "/assets/verinestlogo2.svg";
import eyeOpen from "/assets/eye-open.svg";
import eyeClosed from "/assets/eye-closed.svg";

export default function Dashboard() {
	const { user, setUser } = useAuth();
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState("Dashboard");
	const [missionTab, setMissionTab] = useState("General");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [balanceVisible, setBalanceVisible] = useState(false);
	const [currentStreak, setCurrentStreak] = useState(0);
	const [maxStreak, setMaxStreak] = useState(0);
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Sidebar menu items with SVG icons
	const menuItems = [
		{ name: "Dashboard", icon: dashboardIcon },
		{ name: "Properties", icon: propertiesIcon },
		{ name: "Wallet", icon: walletIcon },
		{ name: "Transactions", icon: transactionsIcon },
		{ name: "Reward", icon: rewardIcon },
		{ name: "Settings", icon: settingsIcon },
		{ name: "Help/Support", icon: helpIcon },
	];

	// Calculate reward for a specific day
	const calculateReward = (day) => {
		return day <= 5 ? 5 : 10;
	};

	// Calculate total rewards earned
	const totalRewards = () => {
		let total = 0;
		for (let i = 1; i <= currentStreak; i++) {
			total += calculateReward(i);
		}
		return total;
	};

	// Fetch user data from API
	const fetchUserData = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				"https://verinest.up.railway.app/api/users/me",
				{
					credentials: "include",
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch user data");
			}

			const data = await response.json();

			if (data.status === "success") {
				setUserData(data.data.user);

				// Calculate streak based on account creation date
				const accountCreationDate = new Date(data.data.user.createdAt);
				const daysSinceCreation = Math.floor(
					(new Date() - accountCreationDate) / (1000 * 60 * 60 * 24)
				);
				setCurrentStreak(Math.min(daysSinceCreation, 7));
				setMaxStreak(daysSinceCreation > 7 ? daysSinceCreation : 7);
			}
		} catch (err) {
			setError(err.message);
			console.error("Error fetching user data:", err);
		} finally {
			setLoading(false);
		}
	};

	// Initialize user data on component mount
	// useEffect(() => {
	// 	if (user) {
	// 		fetchUserData();
	// 	}
	// }, [user]);

	useEffect(() => {
		async function loadCurrentUser() {
			setLoading(true);

			try {
				const token = localStorage.getItem("token");
				if (!token) {
					navigate("/login");
					return;
				}

				const res = await fetch(
					"https://verinest.up.railway.app/api/users/me",
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				const result = await res.json();
				console.log("API /me response:", result);

				if (res.ok && result.data?.user) {
					setUser(result.data.user);
					setUserData(result.data.user);
					setLoading(false); // <-- important
				} else {
					navigate("/login");
				}
			} catch (err) {
				console.error("Error:", err);
				navigate("/login");
			} finally {
				setLoading(false);
			}
		}

		if (!user) {
			loadCurrentUser();
		} else {
			setLoading(false);
			setUserData(user);
		}
	}, [user, setUser, navigate]);

	const toggleBalanceVisibility = () => {
		setBalanceVisible(!balanceVisible);
	};

	const handleLogout = () => {
		handleSignOut({ setUser, navigate });
	};

	if (loading) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl">Loading...</h1>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl text-red-600">Error: {error}</h1>
					<button
						onClick={fetchUserData}
						className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen bg-slate-50 relative">
			{/* Mobile Overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-[#d1cfcfc0]  bg-opacity-50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${
			sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
		}`}
			>
				<div className="p-4 lg:p-6 flex items-center justify-between">
					<img
						src={verinestlogo2}
						alt="VeriNest Logo"
						className="h-8"
					/>
					{/* Mobile close button */}
					<button
						className="lg:hidden text-white p-1 rounded hover:bg-slate-800 transition"
						onClick={() => setSidebarOpen(false)}
					>
						✕
					</button>
				</div>

				<div className="px-4 py-2 flex items-center gap-3 bg-slate-800 mx-4 rounded-lg">
					<div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
						<span className="text-white font-semibold">
							{userData?.name
								? userData.name.charAt(0).toUpperCase()
								: "U"}
						</span>
					</div>
					<div>
						<p className="text-sm font-medium">
							{userData?.name || "User"}
						</p>
						<p className="text-xs text-slate-400">
							Trust Score: {userData?.trust_score || 0}
						</p>
					</div>
				</div>

				<nav className="flex-1 px-4 py-6">
					<ul className="space-y-2">
						{menuItems.map((item) => (
							<li
								key={item.name}
								onClick={() => {
									setActiveTab(item.name);
									setSidebarOpen(false);
								}}
								className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-sm lg:text-base
                  ${
						activeTab === item.name
							? "bg-[#113c5e] font-semibold text-white"
							: "hover:bg-slate-700"
					}`}
							>
								<img
									src={item.icon}
									alt={item.name}
									className="w-5 h-5"
								/>
								{item.name}
							</li>
						))}
						<li
							onClick={handleLogout}
							className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition text-sm lg:text-base hover:bg-slate-700 mt-4"
						>
							<img
								src={logoutIcon}
								alt="Logout"
								className="w-5 h-5"
							/>
							Logout
						</li>
					</ul>
				</nav>

				<div className="p-4 border-t border-slate-800">
					<div className="flex items-center justify-between text-slate-400 text-sm">
						<span>App Version</span>
						<span>v1.2.0</span>
					</div>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 flex flex-col min-w-0">
				{/* Header */}
				<div className="flex justify-between items-center p-4 lg:p-6 bg-white shadow-sm">
					{/* Mobile menu button */}
					<button
						className="lg:hidden p-2 text-slate-600 rounded-md hover:bg-slate-100 transition"
						onClick={() => setSidebarOpen(true)}
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>

					<div className="flex-1 max-w-md mx-4 lg:mx-0">
						{/* Search bar removed as requested */}
					</div>

					<div className="flex items-center gap-4">
						<div className="relative">
							<button className="p-2 rounded-full hover:bg-slate-100 transition relative">
								<img
									src={bellIcon}
									alt="Notifications"
									className="w-6 h-6"
								/>
								<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
									3
								</span>
							</button>
						</div>

						<div className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition">
							<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
								<img
									src={userIcon}
									alt="User"
									className="w-5 h-5"
								/>
							</div>
							<span className="hidden md:block text-sm font-medium">
								{userData?.name || "User"}
							</span>
						</div>
					</div>
				</div>

				{/* Scrollable Content */}
				<div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
					{/* Welcome Header with Streak Info */}
					<div className="bg-[#113c5e] text-white p-6 rounded-2xl">
						<h1 className="text-2xl font-bold mb-2">
							Welcome back, {userData?.name || "User"}!
						</h1>
						<p className="opacity-90 mb-4">
							Keep your streak going! Login daily to earn bonus
							VTS tokens.
						</p>

						<div className="flex items-center gap-6">
							<div className="text-center">
								<p className="text-sm opacity-80">
									Current Streak
								</p>
								<p className="text-3xl font-bold">
									{currentStreak} days
								</p>
							</div>

							<div className="h-12 w-px bg-white opacity-30"></div>

							<div className="text-center">
								<p className="text-sm opacity-80">Max Streak</p>
								<p className="text-3xl font-bold">
									{maxStreak} days
								</p>
							</div>

							<div className="h-12 w-px bg-white opacity-30"></div>

							<div className="text-center">
								<p className="text-sm opacity-80">
									Total Earned
								</p>
								<p className="text-3xl font-bold">
									{totalRewards()} VTS
								</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* VTS Balance Card */}
						<div className="p-6 bg-white rounded-2xl shadow-sm">
							<div className="flex justify-between items-center mb-4">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 bg-[#113c5e] rounded-full flex items-center justify-center">
										<span className="text-white font-bold text-lg">
											V
										</span>
									</div>
									<span className="text-lg font-medium text-slate-800">
										VTS Balance
									</span>
								</div>
								<button
									className="p-1 rounded cursor-pointer transition-all duration-300"
									onClick={toggleBalanceVisibility}
								>
									<img
										src={
											balanceVisible ? eyeOpen : eyeClosed
										}
										alt="Toggle visibility"
										className="w-6 h-6"
									/>
								</button>
							</div>

							<div className="mb-6">
								{balanceVisible ? (
									<>
										<span className="text-3xl font-bold text-slate-800">
											{userData?.trust_score || 0}.00
										</span>
										<span className="text-lg text-slate-600 ml-2">
											VTS
										</span>
									</>
								) : (
									<div className="flex items-center h-10">
										<span className="text-2xl font-bold text-slate-800">
											••••
										</span>
									</div>
								)}
							</div>

							<div className="flex gap-3">
								<button className="flex-1 py-3 rounded-full bg-[#113c5e] text-white hover:bg-[#0c2a44] transition text-sm font-medium">
									View Transactions
								</button>
							</div>
						</div>

						{/* Streak Rewards Card */}
						<div className="p-6 bg-white rounded-2xl shadow-sm">
							<h2 className="text-lg font-medium text-slate-800 mb-4">
								Daily Login Rewards
							</h2>
							<div className="grid grid-cols-7 gap-2 mb-4">
								{[1, 2, 3, 4, 5, 6, 7].map((day) => (
									<div
										key={day}
										className={`flex flex-col items-center p-2 rounded-lg ${
											day <= currentStreak
												? "bg-green-100"
												: "bg-slate-100"
										}`}
									>
										<span className="text-sm font-medium">
											Day {day}
										</span>
										<span className="text-xs">
											{calculateReward(day)} VTS
										</span>
										<div
											className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
												day <= currentStreak
													? "bg-green-500 text-white"
													: "bg-slate-300"
											}`}
										>
											{day <= currentStreak ? "✓" : day}
										</div>
									</div>
								))}
							</div>
							<p className="text-sm text-slate-600">
								Login consecutively to claim higher rewards.
								Current bonus: {calculateReward(currentStreak)}{" "}
								VTS
							</p>
						</div>
					</div>

					{/* Missions/Tasks Section */}
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 pb-0 gap-4">
							<h2 className="text-lg font-medium text-slate-800">
								Available Missions
							</h2>
							<div className="flex bg-slate-100 rounded-lg overflow-hidden w-full sm:w-auto">
								<button
									onClick={() => setMissionTab("General")}
									className={`flex-1 sm:flex-none px-6 py-2 text-sm font-medium transition ${
										missionTab === "General"
											? "bg-[#113c5e] text-white"
											: "bg-transparent text-slate-600 hover:text-slate-800"
									}`}
								>
									General
								</button>
							</div>
						</div>

						<div className="p-6 space-y-4">
							{/* Daily VeriNest Task */}
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-slate-50 gap-2 sm:gap-0">
								<div className="flex-1">
									<span className="text-slate-800 text-sm font-medium">
										Daily VeriNest Twitter/Community Task
									</span>
									<p className="text-slate-500 text-xs mt-1">
										Earn 5 VTS for engaging with our
										community
									</p>
								</div>
								<button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
									Go <span>→</span>
								</button>
							</div>

							{/* Real Estate Quiz */}
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-slate-50 gap-2 sm:gap-0">
								<div className="flex-1 flex items-center gap-3">
									<div className="w-5 h-5 bg-slate-200 rounded flex items-center justify-center">
										<svg
											className="w-3 h-3 text-slate-600"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div>
										<span className="text-slate-800 text-sm font-medium">
											Real Estate Quiz
										</span>
										<p className="text-slate-500 text-xs mt-1">
											Test your knowledge and earn 10 VTS
										</p>
									</div>
								</div>
								<button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap flex items-center gap-1">
									Start <span>→</span>
								</button>
							</div>
						</div>
					</div>

					{/* Recent Activity */}
					<div className="bg-white rounded-2xl shadow-sm overflow-hidden">
						<div className="p-6 border-b border-slate-200">
							<h2 className="text-lg font-medium text-slate-800">
								Recent Activity
							</h2>
						</div>
						<div className="p-6 space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
										<svg
											className="w-5 h-5 text-blue-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<p className="text-sm font-medium text-slate-800">
											Daily Login Reward
										</p>
										<p className="text-xs text-slate-500">
											Streak day {currentStreak}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium text-green-600">
										+{calculateReward(currentStreak)} VTS
									</p>
									<p className="text-xs text-slate-500">
										Today
									</p>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
										<svg
											className="w-5 h-5 text-green-600"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<p className="text-sm font-medium text-slate-800">
											Task Completed
										</p>
										<p className="text-xs text-slate-500">
											Twitter Engagement
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium text-green-600">
										+5 VTS
									</p>
									<p className="text-xs text-slate-500">
										2 days ago
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
