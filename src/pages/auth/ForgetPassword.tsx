import ForgetPasswordForm from "@/components/forms/forget-password";

const ForgetPasswordPage = () => {
  return (
    <>
      <div className="flex flex-col w-full  items-center">
        <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-center mb-8">
          Forget Password
        </h2>
        <ForgetPasswordForm />
      </div>
    </>
  );
};

export default ForgetPasswordPage;
