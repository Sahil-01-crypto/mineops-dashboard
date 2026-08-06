import React from 'react'

const KPICard = ({ title  , unit , value }) => {
  return (
    <div className="bg-[#182235] border  text-white  border-[#2A3A55] rounded-2xl shadow-black/40 shadow-2xl p-6 w-full">
      <h3 className="uppercase text-xs tracking-widest text-slate-400 font-semibold">
        {title}
      </h3>
      <div className='flex items-end gborder border-[#2A3A55]ap-2 mt-5'>
      <h1 className="text-3xl font-bold mt-3">
        {value}
      </h1>

      <h1>{unit}</h1>
      </div>
    </div>
  );
};

export default KPICard;