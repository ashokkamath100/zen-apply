interface JobPosting {
    _id: { $oid: string };
    company: string;
    job_posting: {
      description: string;
      role: string;
      responsibilities: string[];
      technologies: string[];
      values: string[];
      requirements: {
        experience: string;
        skills: string[];
      };
      benefits: string[];
      salary: {
        range: string;
        notes: string;
      };
      culture: {
        description: string;
        work_culture: string;
      };
    };
  }