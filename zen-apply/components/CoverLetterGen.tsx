"use client";
import React from "react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import axios from "axios";
const CoverLetterGen = () => {
  const [resume, setResume] = useState();
  const [job, setJob] = useState();
  const [coverLetter, setCoverLetter] = useState();

  function handleFileChange(event) {
    console.log("handing file change!");
    setResume(event.target.files[0]);
  }

  function handleJobChange(event) {
    console.log("handing job change");
    setJob(event.target.value);
    console.log(job);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("job", job);
    formData.append("resume", resume);
    formData.append("resumeName", resume.name);

    const url = "http://127.0.0.1:5000/coverLetter";

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      let processedText = response.data.replace(/\\n/g, '\n') //.replace(/\\u0027/g, "'");
      setCoverLetter(processedText);
    });
    console.log("cover letter after split: ", coverLetter);
  }

  const classN = "rounded-2xl p-4 text-sm";

  return (
    <div className="text-base min-h-screen m-auto w-1/2 flex flex-col">
      <form className=" flex flex-col gap-4 border border-white rounded-2xl p-4">
        <label className="text-base">Job Description</label>
        <textarea
          className="rounded-2xl p-4 text-sm h-80 text-black"
          placeholder="Enter job description"
          onChange={handleJobChange}
        ></textarea>
        <label className='text-white'>Resume</label>
        <input
          onChange={handleFileChange}
          type="file"
          className={classN + "text-white flex-grow-0"}
        ></input>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="border border-white rounded-2xl w-1/6 right-0 m-auto"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="">
        <h1 className="text-base">Generated Cover Letter</h1>
        <textarea
          className="w-full text-black text-sm rounded-lg h-dvh p-6"
          value={coverLetter}
        >
          {/* {coverLetter !== undefined ? (coverLetter.map((line, index) => (
            <p key={index}>{line}</p>
          ))): (<p></p>)} */}
        </textarea>
      </div>
    </div>
  );
};

export default CoverLetterGen;
