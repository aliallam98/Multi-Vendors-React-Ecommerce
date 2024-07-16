import useForgetPassword from "@/hooks/useForgetPassword";
import CheckEmail from "./CheckEmail";
import CheckOtp from "./CheckOtp";
import ResetPassword from "./ResetPassword";

const ForgetPasswordForm = () => {
  const forgetPassword = useForgetPassword();


  if(forgetPassword.currentStep  === 1){
    return (
        <CheckEmail/>
    )
  }

  if(forgetPassword.currentStep  === 2){
    return (
        <CheckOtp/>
    )
  }

  if(forgetPassword.currentStep  === 3){
    return (
        <ResetPassword/>
    )
  }
};

export default ForgetPasswordForm;

// Component Structure:

// Divide the forget password process into three separate React components:
// Step 1: Enter Email: Validate email format and check if it exists in your user database.
// Step 2: Enter OTP: Send an OTP to the user's email and allow them to input it for verification.
// Step 3: Reset Password: Allow the user to enter a new password, confirm it,
//and submit the updated credentials.
// Use a state management solution (e.g., Redux, Context API, Zustand)
// to manage the current step and data across components.
