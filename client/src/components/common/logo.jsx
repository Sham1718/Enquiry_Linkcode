const Logo = ({ showDetails = true, width }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center mt-6 leading-none">
        <span className="text-[28px] font-bold tracking-tight text-[#1597E5]">
          Link
          <span className="text-[34px] mt-2 font-bold text-[#65B32E]">
            &gt;
          </span>
        </span>

        <span className="text-[32px] font-semibold tracking-tight text-[#65B32E]">
          code
        </span>

        <sup className="ml-1 mt-[-18px] text-[9px] text-[#65B32E]">
          ®
        </sup>
      </div>

      {showDetails && (
        <>
          <span className="mt-1 ml-[72px] text-[7px] tracking-wide text-gray-500">
            Technologies Pvt. Ltd.
          </span>

          <span className="mt-1 text-[6px] font-medium tracking-wide text-gray-600">
            AN ISO CERTIFIED : 9001 : 2015
          </span>
        </>
      )}
    </div>
  );
};

export default Logo;