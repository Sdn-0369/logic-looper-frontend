import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1009394833394-lr0ltttd4oa3dej5rpllh5fquvlcpld9.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)