import { GoogleLogin } from "@react-oauth/google"
import { API_BASE } from "../../config/api"

function GoogleLoginButton() {

    async function handleSuccess(response) {

        try {

            const token = response.credential

            const res = await fetch(`${API_BASE}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token })
            })

            if (!res.ok) {
                throw new Error("Authentication failed")
            }

            const data = await res.json()

            localStorage.setItem("userId", data.userId)

            console.log("Logged in user:", data)

            window.location.reload()

        } catch (error) {

            console.error("Login error:", error)
            alert("Login failed. Please try again.")

        }

    }

    return (

        <div className="flex justify-center w-full">

            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log("Google Login Failed")}
                theme="outline"
                size="large"
                shape="pill"
                text="signin_with"
                width="320"
            />

        </div>

    )

}

export default GoogleLoginButton