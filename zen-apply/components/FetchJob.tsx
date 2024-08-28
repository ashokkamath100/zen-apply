'use client'
import React, { useEffect, useState } from 'react';


const JobComponent: React.FC = () => {
  const [job, setJob] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch("/api/jobs");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: JobPosting = await response.json();
        console.log("data:", data);
        setJob(data);
      } catch (error: any) {
        console.error("Error fetching job:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, []);

  if (loading) {
    return <p>Loading job data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      {job ? (
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-md p-6">
          {job.company && <h1 className="text-2xl font-bold mb-4">{job.company}</h1>}
          <div className={`transition-all ${expanded ? 'h-auto' : 'h-48 overflow-hidden'}`}>
            {Object.entries(job.job_posting).map(([key, value]) => {
              if (!value) return null;

              if (Array.isArray(value)) {
                return (
                  <div key={key} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 capitalize">{key}</h3>
                    <ul className="list-disc list-inside">
                      {value.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              }

              if (typeof value === 'object' && value !== null) {
                return (
                  <div key={key} className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 capitalize">{key}</h3>
                    {Object.entries(value).map(([subKey, subValue]) => (
                      subValue && (
                        <div key={subKey}>
                          <strong>{subKey}:</strong> {subValue}
                        </div>
                      )
                    ))}
                  </div>
                );
              }

              return (
                <div key={key} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 capitalize">{key}</h3>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={toggleExpanded}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none"
            >
              {expanded ? 'Show Less ▲' : 'Show More ▼'}
            </button>
          </div>
        </div>
      ) : (
        <p>No job data available</p>
      )}
    </div>
  );
};

export default JobComponent;
