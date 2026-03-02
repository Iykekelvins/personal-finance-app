import ForgotPassword from "@/_pages/auth/forgot-password"
import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Forgot Password"
}

const ForgotPasswordpage = () => {
  return (
    <ForgotPassword/>
  )
}

export default ForgotPasswordpage