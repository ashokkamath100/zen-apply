import React from "react";

const JobCard = () => {
  return (
    <div className="basis-1/3 border border-white p-4 text-sm rounded-2xl">
      <div className="flex flex-row justify-between">
        <div>Image</div>
        <div className="border border-white rounded-lg p-2"> Full Time</div>
      </div>
      <div>Full stack Software Engineer - Fintech/Flexibility</div>
      <div className="flex flex-row gap-2">
        <div>Hopper</div>
        <div>⚪</div>
        <div>Remote in USA</div>
      </div>
    </div>
  );
};

export default JobCard;
