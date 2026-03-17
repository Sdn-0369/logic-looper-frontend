import GoogleLoginButton from "../components/auth/GoogleLoginButton"
import logo from "../assets/logo.png"

function LoginPage() {

  return (

    <div className="min-h-screen bg-brand-gray flex items-center justify-center font-primary">

      <div className="bg-white shadow-lg rounded-xl p-12 flex flex-col items-center gap-6 w-[420px]">

        <img 
          src={logo}
          alt="Bluestock Logo"
          className="h-10 mb-4"
        />

        <h1 className="text-3xl font-semibold text-brand-dark">
          Logic Looper
        </h1>

        <p className="text-gray-500 text-center font-secondary">
          Solve one logical puzzle every day and build your streak
        </p>

        <div className="w-full mt-4">
          <GoogleLoginButton />
        </div>

        <p className="text-xs text-gray-400 text-center font-secondary mt-2">
          Powered by Bluestock
        </p>

      </div>

    </div>

  )

}

export default LoginPage