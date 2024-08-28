import React from 'react'

const JobsPage = () => {
  return (
    <div className='w-full max-w-fit mx-8'>
        <div className='text-lg my-4'>
            Search All Jobs
        </div>
        <div className='flex flex-row w-1/2 text-sm text-base justify-between my-4'>
            <input className='w-96 rounded-lg text-sm p-2' placeholder='🔍 Search for roles, companies, or locations'>
            
            </input>

            <button className='text-black bg-white rounded-lg p-2'>
                Experience Level 🔽
            </button>
            <button className='text-black bg-white rounded-lg p-2'>
                Category 🔽
            </button>
            <button className='text-black bg-white rounded-lg p-2'>
                Education 🔽
            </button>
            <button className='text-black bg-white rounded-lg p-2'>
                Location 🔽
            </button>
        </div>
        <div className='grid grid-cols-9 gap-x-2 break-words'>
            <div className='col-start-1 col-end-4 text-wrap m-4 border border-white rounded-2xl p-4'>
                <div className='text-sm p-4 border border-white rounded-2xl mb-4'>
                    <div>Position Title</div>
                    <div>Company Name</div>
                    <div>Salary</div>
                    <div>Location</div>
                </div>
                <div className='text-sm p-4 border border-white rounded-2xl mb-4'>
                    <div>Position Title</div>
                    <div>Company Name</div>
                    <div>Salary</div>
                    <div>Location</div>
                </div>
                <div className='text-sm p-4 border border-white rounded-2xl mb-4'>
                    <div>Position Title</div>
                    <div>Company Name</div>
                    <div>Salary</div>
                    <div>Location</div>
                </div>
                <div className='text-sm p-4 border border-white rounded-2xl mb-4'>
                    <div>Position Title</div>
                    <div>Company Name</div>
                    <div>Salary</div>
                    <div>Location</div>
                </div>
            </div>
            <div className='col-start-4 col-span-6'>
                <div className='grid grid-cols-5 grid-rows-2 gap-2'>
                    <div className='col-start-1 col-end-3 row-start-1 row-end-2 border border-white rounded-2xl p-4'>
                        Showing 21 of 9500 job sljf;alsjdfasdjf;alsdjf;asdjf;alsdjf;ajfa;sldfjas;ldfalsdfja;sldfjas;df
                    </div>
                    <div className='col-start-3 col-span-3 row-start-1 row-end-2 border border-white rounded-2xl p-4'>
                        Showing 21 of 9500 job sljf;alsjdfasdjf;alsdjf;asdjf;alsdjf;ajfa;sldfjas;ldfalsdfja;sldfjas;df
                    </div>
                    <div className='col-start-1 col-span-6 row-start-2 border border-white rounded-2xl p-4'>
                        Company
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default JobsPage ; 