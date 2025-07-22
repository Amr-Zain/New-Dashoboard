import React from 'react';
import AppSkeleton from '../Loader/AppSkeleton';

const TableSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <div className="">
      <div className='flex items-center justify-between gap-4 mb-14 '>
        <AppSkeleton className="!w-64 !h-12" />
        <AppSkeleton className="!w-full !h-12" />
        <AppSkeleton className="!w-64 !h-12" />
        <AppSkeleton className="!w-full !h-12" />
      </div>
      <div className="flex items-center gap-4 mb-5">
        <AppSkeleton width='5rem' height='2.5rem'/>
        <div className='w-full'>
            <AppSkeleton width='13rem' height='2.5rem' />
        </div>
        <div className='w-full'>
            <AppSkeleton width='13rem' height='2.5rem'/>
        </div>
        {/* <div className='w-full'>
            <AppSkeleton width='10rem' height='2.5rem' />
        </div> */}
        <div className='w-full'>
            <AppSkeleton width='13rem' height='2.5rem' />
        </div>
        <AppSkeleton className="!w-28 !h-10" />
      </div>

      {rows.map((_, index) => (
        <div key={`app-table-skeleton_${index}`} className="flex items-center gap-4 mb-5">
          <AppSkeleton className="!w-20 !h-10" />
          <AppSkeleton className="!w-full !h-10" />
          <AppSkeleton className="!w-full !h-10" />
          {/* <AppSkeleton className="!w-full !h-10" /> */}
          <AppSkeleton className="!w-full !h-10" />
          <div className="flex gap-2 justify-center items-center">
            <AppSkeleton className="!w-28 !h-10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
