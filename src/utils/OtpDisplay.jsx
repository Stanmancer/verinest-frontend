{
	!showOtp ? (
		<>
			<button
				onClick={() => setShowOtp(true)}
				className="w-full py-3 bg-blue-900 text-white rounded-md font-medium"
			>
				Enter code manually
			</button>
			<button
				onClick={handleReturnSignIn}
				className="mt-4 text-gray-500 text-sm"
			>
				Back to log in
			</button>
		</>
	) : (
		<>
			<div className="flex justify-center gap-2 mb-4">
				{otp.map((digit, index) => (
					<input
						key={index}
						id={`otp-${index}`}
						type="text"
						value={digit}
						maxLength="1"
						onChange={(e) => handleChange(e.target.value, index)}
						className="w-12 h-12 rounded-lg text-center text-lg outline-none ring-1 focus:ring-2 ring-blue-500"
					/>
				))}
			</div>
			<button
				onClick={handleVerify}
				disabled={isLoading}
				className="w-full py-3 bg-blue-900 text-white rounded-md font-medium disabled:opacity-50"
			>
				{isLoading ? "Verifying..." : "Verify email"}
			</button>
			{message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
			<p className="text-sm text-gray-500 mt-3">
				Didn't receive the email?{" "}
				<button
					onClick={handleResendOTP}
					disabled={resendLoading}
					className="text-blue-600 font-medium"
				>
					{resendLoading ? "Resending..." : "Click to resend"}
				</button>
			</p>
			<button
				onClick={handleReturnSignIn}
				className="mt-4 text-gray-500 text-sm"
			>
				Back to log in
			</button>
		</>
	);
}
