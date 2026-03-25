import GoogleLoginButton from "../components/auth/GoogleLoginButton"
import logo from "../assets/logo.png"

function LoginPage() {
    return (
        <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4">
            <div className="premium-card flex flex-col items-center gap-6 w-full max-w-[420px]">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                />
                
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Logic Looper
                </h1>
                
                <p className="text-[var(--text-muted)] text-center text-sm">
                    Solve one logical puzzle every day and build your streak.
                </p>

                <div className="w-full mt-6 flex justify-center">
                    <GoogleLoginButton />
                </div>

                <p className="text-xs text-zinc-600 text-center mt-4 uppercase tracking-widest font-semibold">
                    Powered by Bluestock
                </p>
            </div>
        </div>
    )
}

export default LoginPage