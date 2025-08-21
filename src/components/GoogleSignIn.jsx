import GoogleIcon from "/assets/googleicon.svg";
import { handleGoogleSignIn } from "../utils/AuthHandlers";

export default function GoogleSignIn({
	setErrors,
	setIsLoading,
	setUser,
	navigate,
}) {
	return (
		<button
			className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 mb-1 hover:bg-gray-50 transition-colors"
			type="button"
			onClick={() =>
				handleGoogleSignIn({
					setErrors,
					setIsLoading,
					setUser,
					navigate,
				})
			}
		>
			<img src={GoogleIcon} alt="Google Icon" />
			<span className="text-[#2F3431]">Sign in with Google</span>
		</button>
	);
}
