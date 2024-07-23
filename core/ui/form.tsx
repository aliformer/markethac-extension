import React, { useEffect, useState } from 'react';

const ConfigForm = ({ submitHandler, finished}) => {
  const [pageTo, setPageTo] = useState(2);
  const [pageFrom, setPageFrom] = useState(1)
  const [sort, setSort] = useState(false);
  const [offset, setOffset] = useState(80);

  const handlePageFromChange = (e) => setPageFrom(e.target.value);
  const handlePageToChange = (e) => setPageTo(e.target.value)
  const handleSortChange = (e) => setSort(e.target.checked);
  const handleOffsetChange = (e) => setOffset(e.target.value);
  const [isDone, setIsDone] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDone(false)
    const response = await submitHandler({
      pageFrom,
      pageTo,
      offset,
      ...(sort ? { sort: 1 } : { sort: 0 })
    })
    return
  };

  useEffect(() => {
    if(finished > 0){
      setIsDone(true)
    } 
  },[finished])

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
        className="w-full flex justify-center items-center   px-3 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline
          transition ease-in duration-200 text-center text-base shadow-md  focus:ring-2 focus:ring-offset-2 max-w-md
          "
      >
        {!isDone && (<svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
          </path>
        </svg>)}
        Submit
      </button>
    </form>

  );
};

export default ConfigForm;