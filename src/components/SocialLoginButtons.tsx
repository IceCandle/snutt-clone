import appleIcon from '../assets/apple-icon.png';
import facebookIcon from '../assets/facebook-icon.png';
import googleIcon from '../assets/google-icon.png';
import kakaoIcon from '../assets/kakao-icon.png';

const SocialLoginButtons = () => {
  const handleSocialLogin = (platform: string) => {
    alert(`${platform} login is not implemented yet.`);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-3 mt-10 flex-col justify-start items-start gap-2.5">
      <div className="h-[17px] flex justify-center items-center gap-2.5">
        <div className="grow shrink basis-0 h-[0px] bg-[#c4c4c4] dark:bg-gray-600 border border-[#c4c4c4] dark:border-gray-600"></div>
        <div className="text-[#c4c4c4] dark:text-gray-400 text-sm font-medium font-['Pretendard']">
          SNS 계정으로 계속하기
        </div>
        <div className="grow shrink basis-0 h-[0px] bg-[#c4c4c4] dark:bg-gray-600 border border-[#c4c4c4] dark:border-gray-600"></div>
      </div>
      <div className="mt-4 flex justify-center items-center gap-3">
        <img
          src={kakaoIcon}
          alt="Kakao"
          className="w-11 h-11 rounded-[21.6px] cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => {
            handleSocialLogin('Kakao');
          }}
        />
        <div
          className="w-11 h-11 p-2.5 bg-white dark:bg-gray-800 rounded-full border border-[#c4c4c4] dark:border-gray-600 
            flex justify-center items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
          className="w-11 h-11 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => {
            handleSocialLogin('Facebook');
          }}
        />
        <img
          src={appleIcon}
          alt="Apple"
          className="w-11 h-11 rounded-full cursor-pointer hover:opacity-90 transition-opacity dark:invert"
          onClick={() => {
            handleSocialLogin('Apple');
          }}
        />
      </div>
    </div>
  );
};

export default SocialLoginButtons;
