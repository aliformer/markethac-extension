import React, { useState } from 'react';

const ConfigForm = ({submitHandler}) => {
  const [pageTo, setPageTo] = useState(2);
  const [pageFrom, setPageFrom] = useState(1)
  const [sort, setSort] = useState(false);
  const [offset, setOffset] = useState(80);

  const handlePageFromChange = (e) => setPageFrom(e.target.value);
  const handlePageToChange = (e) => setPageTo(e.target.value) 
  const handleSortChange = (e) => setSort(e.target.checked);
  const handleOffsetChange = (e) => setOffset(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitHandler({
      pageFrom,
      pageTo,
      offset,
      ...(sort ? {sort:1} :{sort:0}) 
    })
    return 
  };

  return (
  
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-6 flex flex-row gap-2">
         <div className='flex flex-col'>
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="page">
            Page From 
          </label>
          <input
            id="pageStart"
            name="page"
            type='number'
            value={pageFrom}
            onChange={handlePageFromChange}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-red-200"
          >
          </input>
          </div>
          <div className='flex flex-col'>
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="page">
            Page To
          </label>
          <input
            id="pageStart"
            name="page"
            type='number'
            value={pageTo}
            onChange={handlePageToChange}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-red-200"
          >
          </input>
        </div>
</div>
        <div className="mb-6 flex flex-row gap-2 w-full">
        <div className='flex flex-col basis-1/2'>
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="offset">
            Offset
          </label>
          <input
            id="offset"
            name="offset"
            type='number'
            value={offset}
            onChange={handleOffsetChange}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-red-200"
          />
        </div>
        <div className='flex flex-col basis-1/2'>
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="sort">
            Sort
          </label>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="sort"
              name="sort"
              checked={sort}
              onChange={handleSortChange}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="sort" className="ml-2 text-sm text-gray-600">
              Ascending Sort
            </label>
          </div>
         
          </div>
     
        </div>


        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>

  );
};

export default ConfigForm;