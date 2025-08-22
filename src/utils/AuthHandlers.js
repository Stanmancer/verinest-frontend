import { validateEmail } from "./validators";

export async function handleEmailSignIn({
	e,
	email,
	password,
	setErrors,
	setIsLoading,
	navigate,
}) {
	e.preventDefault();

	if (!email || !password) {
		const errs = {};
		if (!email) errs.email = "Email is required";
		if (!password) errs.password = "Password is required";
		setErrors(errs);
		return;
	}

	if (!validateEmail(email)) {
		setErrors({ email: "Please enter a valid email address" });
		return;
	}

	setIsLoading(true);
	setErrors({});

	try {
		const response = await fetch(
			"https://verinest.up.railway.app/api/auth/login",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include", // ensure cookie is included
			}
		);

		const data = await response.json();
		console.log("API Response:", data);

		if (response.ok) {
			localStorage.setItem("token", data.token); // backend should be returning this
			navigate("/dashboard");
		} else {
			setErrors({ form: data.message || "Sign in failed" });
		}
		console.log("API Response:", data);
	} catch (err) {
		setErrors({ form: "Network error during sign in", err });
		console.log(err);
	} finally {
		setIsLoading(false);
	}
}

export async function handleEmailSignUp({
	e,
	fullName,
	userName,
	signUpEmail,
	signUpPassword,
	signUpPasswordError,
	signUpPasswordConfirm,
	signUpPasswordConfirmError,
	referralCode,
	setSignUpEmailError,
	setIsLoading,
	setErrors,
	toggleEmailVerify,
	toggleEmailSignUp,
}) {
	e.preventDefault();

	if (
		!fullName ||
		!userName ||
		!signUpEmail ||
		!signUpPassword ||
		!signUpPasswordConfirm
	) {
		if (!signUpEmail) setSignUpEmailError("Email is required");
		return;
	}

	if (!validateEmail(signUpEmail)) {
		setSignUpEmailError("Please enter a valid email address");
		return;
	}

	if (signUpPasswordError || signUpPasswordConfirmError) {
		return;
	}

	setIsLoading(true);
	setErrors({});

	try {
		const response = await fetch(
			"https://verinest.up.railway.app/api/auth/register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: fullName,
					username: userName,
					email: signUpEmail,
					password: signUpPassword,
					passwordConfirm: signUpPasswordConfirm,
					referral_code: referralCode || undefined,
				}),
				credentials: "include", // ensure cookie is included
			}
		);

		const data = await response.json();

		if (response.ok) {
			// Handle successful sign up
			console.log("Sign up successful:", data);
			toggleEmailSignUp();
			toggleEmailVerify();
		} else if (response.status === 409) {
			// Account already exists
			setErrors({
				form: data.message || "Account already exists. Please sign in.",
			});
		} else {
			// Handle sign up error
			setErrors({ form: data.message || "Sign up failed" });
			console.error("Sign up failed");
		}
	} catch (err) {
		setErrors({ form: "Network error during sign up", err });
	} finally {
		setIsLoading(false);
	}
}

export async function handleGoogleSignIn({
	setErrors,
	setIsLoading,
	setUser,
	navigate,
}) {
	setIsLoading(true);
	setErrors({});

	try {
		// Replace with real Google OAuth integration
		const response = await fetch("/api/auth/google");
		const data = await response.json();

		if (response.ok) {
			setUser(data.data.user);
			navigate("/dashboard");
		} else {
			setErrors({ google: data.message || "Google sign-in failed" });
		}
	} catch (err) {
		setErrors({ google: "Network error during Google sign-in", err });
	} finally {
		setIsLoading(false);
	}
}

export function handleSignOut({ setUser, navigate }) {
	try {
		// clear user state
		setUser(null);

		// optionally clear localStorage/sessionStorage if you store tokens
		localStorage.removeItem("token");

		// send user back to Landing page
		navigate("/");
	} catch (err) {
		console.error("Error signing out:", err);
	}
}
