import { create } from "zustand";

type ForgetPasswordStore = {
  currentStep: 1 | 2 | 3;
  isEmailExist: boolean;
  setEmailExist: (v: string) => void;
  isOTPCorrect: boolean;
  setOTPCorrect: (v: string) => void;
  userData: {
    email: string;
    otp: string;
    password: string;
  };
};

const useForgetPassword = create<ForgetPasswordStore>((set) => ({
  userData: {
    email: "",
    otp: "",
    password: "",
  },
  currentStep: 1,
  isEmailExist: false,
  isOTPCorrect: false,
  setEmailExist: (v) =>
    set((state) => ({
      currentStep: 2,
      isEmailExist: true,
      userData: { ...state.userData, email: v },
    })),
  setOTPCorrect: (v) =>
    set((state) => ({
      currentStep: 3,
      isOTPCorrect: true,
      userData: { ...state.userData, otp: v },
    })),
}));

export default useForgetPassword;
