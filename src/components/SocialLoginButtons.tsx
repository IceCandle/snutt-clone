import appleIcon from '../assets/apple-icon.png';
import facebookIcon from '../assets/facebook-icon.png';
import googleIcon from '../assets/google-icon.png';
import kakaoIcon from '../assets/kakao-icon.png';

const SocialLoginButtons = () => {
  const handleSocialLogin = (platform: string) => {
    alert(`${platform} login is not implemented yet.`);
  };

  return (
    <div className="w-full px-3 mt-10">
      <div className="w-full max-w-sm mt-8 flex items-center justify-between px-4">
        <div className="flex-grow h-px bg-[#c4c4c4]"></div>
        <span className="px-2 text-sm text-[#c4c4c4] font-medium">
          SNS 계정으로 계속하기
        </span>
        <div className="flex-grow h-px bg-[#c4c4c4]"></div>
      </div>
      <div className="mt-4 flex justify-center items-center gap-3">
        <img
          src={kakaoIcon}
          alt="Kakao"
          className="w-11 h-11 rounded-[21.6px] cursor-pointer"
          onClick={() => {
            handleSocialLogin('Kakao');
          }}
        />
        <div
          className="w-11 h-11 p-2.5 bg-white rounded-full border border-[#c4c4c4] flex justify-center items-center cursor-pointer"
          onClick={() => {
            handleSocialLogin('Google');
          }}
        >
          <img
            src={googleIcon}
            alt="Google"
            className="w-[24.8px] h-[24.8px] rounded-full"
          />
        </div>
        <img
          src={facebookIcon}
          alt="Facebook"
          className="w-11 h-11 cursor-pointer"
          onClick={() => {
            handleSocialLogin('Facebook');
          }}
        />
        <img
          src={appleIcon}
          alt="Apple"
          className="w-11 h-11 rounded-full cursor-pointer"
          onClick={() => {
            handleSocialLogin('Apple');
          }}
        />
      </div>
    </div>
  );
};

export default SocialLoginButtons;
