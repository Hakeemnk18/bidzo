
import LoginForm from "./LoginForm";

interface HocProps {
  Component: React.ComponentType<any>;
}
const AuthPage = ({ Component }: HocProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="bg-white rounded-xl shadow-lg flex w-[90%] max-w-4xl overflow-hidden">
        {/* Left: Image */}
        <div className="w-1/2 bg-blue-100 p-4 flex justify-center items-center">
          <img src="/images/Gemini_Generated_Image_dt7yu2dt7yu2dt7y-removebg-preview.png" alt="Shop" className="max-w-full" />
        </div>

        {/* Right: Form */}
        <div className="w-1/2 p-8">
          <Component/>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
