const axios = require("axios");
const { User } = require("../models/User");
const { response } = require("express");
const puppeteer = require("puppeteer");
const { LinkedinJobsApi } = require("linkedin-jobs-api");
// const chormium = require('@sparticuz/chromium');
const Job = require("../models/Jobs");


// const jobTitles = [
//   "Software Engineer",
//   "Data Analyst",
//   "Product Manager",
//   "Full Stack Developer",
//   "Machine Learning Engineer",
//   "DevOps Engineer",
//   "UI/UX Designer",
//   "Mobile App Developer",
//   "Blockchain Developer",
//   "Digital Marketing Manager",
//   "Technical Writer",
//   "Business Analyst",
//   "Game Developer",
// ];



// async function getJobs(req, res) {
//   try {
//     const { jobTitle, location } = req.body;

//     if (!jobTitle || !location) {
//       return res.status(400).json({ message: "Job title and location are required" });
//     }

//     // Convert input to lowercase for case-insensitive search
//     const formattedTitle = new RegExp(jobTitle, "i");
//     const formattedLocation = new RegExp(location, "i");

//     // Fetch jobs from MongoDB based on user input
//     let jobs = await Job.find({
//       title: formattedTitle,
//       location: formattedLocation,
//     });

//     // If no matching jobs found, fetch "Software Engineer" jobs in "Delhi"
//     if (jobs.length === 0) {
//       console.log(`❌ No jobs found for "${jobTitle}" in "${location}". Fetching default jobs...`);

//       jobs = await Job.find({
//         title: new RegExp("Software Engineer", "i"),
//         location: new RegExp("Delhi", "i"),
//       });

//       if (jobs.length === 0) {
//         return res.status(404).json({ message: "No jobs found, even for default search" });
//       }
//     }

//     res.json({ totalJobs: jobs.length, jobs });
//   } catch (error) {
//     console.error("❌ Error fetching jobs:", error);
//     res.status(500).json({ message: "Failed to fetch job listings" });
//   }
// }

async function getJobs(req, res) {
    const { jobTitle, location } = req.body;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Open LinkedIn Jobs search page with dynamic title & location
    const url = `https://www.linkedin.com/jobs/search?keywords=${jobTitle}&location=${location}`;
    await page.goto(url, { waitUntil: "load", timeout: 60000 });

    // Extract job details
    const jobs = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".jobs-search__results-list li")
      ).map((job) => {
        const titleElement = job.querySelector(".base-search-card__title");
        const companyElement = job.querySelector(
          ".base-search-card__subtitle a"
        );
        const locationElement = job.querySelector(
          ".job-search-card__location"
        );
        const linkElement = job.querySelector(".base-card__full-link");

        return {
          title: titleElement ? titleElement.innerText.trim() : "N/A",
          company: companyElement ? companyElement.innerText.trim() : "N/A",
          location: locationElement
            ? locationElement.innerText.trim()
            : "N/A",
          link: linkElement ? linkElement.href : "#",
        };
      });
    });

    await browser.close();
    res.json(jobs);
}


async function jobsInterestedIn(req, res, next) {
  // try {
  //   const user = req.body;
  //   const reqUser = await User.findOne({_id : user.id});
  //   const browser = await puppeteer.launch({ headless: true });
  //   const page = await browser.newPage();

  //   // Open LinkedIn Jobs search page with dynamic title & location
  //   const url = `https://www.linkedin.com/jobs/search?keywords=${'Software Developer'}&location=${'India'}`;
  //   await page.goto(url, { waitUntil: "load", timeout: 60000 });

  //   // Extract job details
  //   const jobs = await page.evaluate(() => {
  //     return Array.from(
  //       document.querySelectorAll(".jobs-search__results-list li")
  //     ).map((job) => {
  //       const titleElement = job.querySelector(".base-search-card__title");
  //       const companyElement = job.querySelector(
  //         ".base-search-card__subtitle a"
  //       );
  //       const locationElement = job.querySelector(
  //         ".job-search-card__location"
  //       );
  //       const linkElement = job.querySelector(".base-card__full-link");

  //       return {
  //         title: titleElement ? titleElement.innerText.trim() : "N/A",
  //         company: companyElement ? companyElement.innerText.trim() : "N/A",
  //         location: locationElement
  //           ? locationElement.innerText.trim()
  //           : "N/A",
  //         link: linkElement ? linkElement.href : "#",
  //       };
  //     });
  //   });

  //   await browser.close();
  //   res.json(jobs);

  //   // return res.status(200).json({
  //   //   data: [
  //   //     {
  //   //       id: "1385663960",
  //   //       date_posted: "2025-02-08T06:20:17",
  //   //       date_created: "2025-02-08T07:53:09.374632",
  //   //       title: "Senior Data Engineer",
  //   //       organization: "Discoveries Quintessential",
  //   //       organization_url:
  //   //         "https://www.linkedin.com/company/discoveries-quintessential",
  //   //       date_validthrough: "2025-03-10T06:20:17",
  //   //       locations_raw: [
  //   //         {
  //   //           "@type": "Place",
  //   //           address: {
  //   //             "@type": "PostalAddress",
  //   //             addressCountry: "IN",
  //   //             addressLocality: "New Delhi",
  //   //             addressRegion: null,
  //   //             streetAddress: null,
  //   //           },
  //   //           latitude: 28.632425,
  //   //           longitude: 77.21879,
  //   //         },
  //   //       ],
  //   //       location_type: null,
  //   //       location_requirements_raw: null,
  //   //       salary_raw: null,
  //   //       employment_type: ["FULL_TIME"],
  //   //       url: "https://in.linkedin.com/jobs/view/senior-data-engineer-at-discoveries-quintessential-4145316744",
  //   //       source_type: "jobboard",
  //   //       source: "linkedin",
  //   //       source_domain: "in.linkedin.com",
  //   //       organization_logo:
  //   //         "https://media.licdn.com/dms/image/v2/C560BAQGMc22pjrnVCQ/company-logo_200_200/company-logo_200_200/0/1660201832358?e=2147483647&amp;v=beta&amp;t=gA0aodtUnI0rWSGZYiOXLEr6Q-Db_OKECuWjAi_vYjg",
  //   //       cities_derived: ["Delhi Cantonment"],
  //   //       regions_derived: ["Delhi"],
  //   //       countries_derived: ["India"],
  //   //       locations_derived: ["Delhi Cantonment, Delhi, India"],
  //   //       timezones_derived: ["Asia/Kolkata"],
  //   //       lats_derived: [28.6],
  //   //       lngs_derived: [77.1333],
  //   //       remote_derived: false,
  //   //       recruiter_name: "Namrata Jadhav",
  //   //       recruiter_title:
  //   //         "Recruiter Analyst @Discoveries Quintessential || Master of Commerce",
  //   //       recruiter_url: "https://in.linkedin.com/in/namrata-jadhav-041843277",
  //   //       linkedin_org_employees: 17,
  //   //       linkedin_org_url: null,
  //   //       linkedin_org_size: "11-50 employees",
  //   //       linkedin_org_slogan:
  //   //         "Talent Engineering | Knowing is half the battle",
  //   //       linkedin_org_industry: "Staffing and Recruiting",
  //   //       linkedin_org_followers: 158827,
  //   //       linkedin_org_headquarters: "Panaji, Goa",
  //   //       linkedin_org_type: "Privately Held",
  //   //       linkedin_org_foundeddate: "2022",
  //   //       linkedin_org_specialties: [""],
  //   //       linkedin_org_locations: ["Panaji, Goa 403001, IN"],
  //   //       linkedin_org_description:
  //   //         "At DQ we are envisioning solutions which remove the inefficiencies of the current processes in Talent Acquisition. Finding Intelligent alternates to practices which are bottle necks making the process slow and inefficient. Lastly, we look for implementations which are robust, can stand the pressure of breakneck speed at which technology forces change in all spheres of our lives",
  //   //       linkedin_org_recruitment_agency_derived: true,
  //   //       seniority: "Mid-Senior level",
  //   //     },
  //   //     {
  //   //       id: "1382706774",
  //   //       date_posted: "2025-02-07T14:06:04",
  //   //       date_created: "2025-02-07T16:32:15.289932",
  //   //       title: "Senior Data Engineer",
  //   //       organization: "Tech Economy",
  //   //       organization_url:
  //   //         "https://www.linkedin.com/company/tech-economy-limited",
  //   //       date_validthrough: "2025-03-09T14:06:03",
  //   //       locations_raw: [
  //   //         {
  //   //           "@type": "Place",
  //   //           address: {
  //   //             "@type": "PostalAddress",
  //   //             addressCountry: "IN",
  //   //             addressLocality: "Delhi Cantonment",
  //   //             addressRegion: null,
  //   //             streetAddress: null,
  //   //           },
  //   //           latitude: 28.590015,
  //   //           longitude: 77.136536,
  //   //         },
  //   //       ],
  //   //       location_type: null,
  //   //       location_requirements_raw: null,
  //   //       salary_raw: null,
  //   //       employment_type: ["FULL_TIME"],
  //   //       url: "https://in.linkedin.com/jobs/view/senior-data-engineer-at-tech-economy-4146679235",
  //   //       source_type: "jobboard",
  //   //       source: "linkedin",
  //   //       source_domain: "in.linkedin.com",
  //   //       organization_logo:
  //   //         "https://media.licdn.com/dms/image/v2/C4D0BAQHQ0gjkgfHrxQ/company-logo_200_200/company-logo_200_200/0/1630570389803/tech_economy_partners_logo?e=2147483647&amp;v=beta&amp;t=dsgPftebVC7AHYRYu4y6CAXSA9XDRui46PolgcmSXi0",
  //   //       cities_derived: ["Delhi Cantonment"],
  //   //       regions_derived: ["Delhi"],
  //   //       countries_derived: ["India"],
  //   //       locations_derived: ["Delhi Cantonment, Delhi, India"],
  //   //       timezones_derived: ["Asia/Kolkata"],
  //   //       lats_derived: [28.6],
  //   //       lngs_derived: [77.1333],
  //   //       remote_derived: false,
  //   //       recruiter_name: null,
  //   //       recruiter_title: null,
  //   //       recruiter_url: null,
  //   //       linkedin_org_employees: 3,
  //   //       linkedin_org_url: "https://techeconomy.net",
  //   //       linkedin_org_size: "11-50 employees",
  //   //       linkedin_org_slogan:
  //   //         "Strategic Advisers to Technology-Enabled Companies and Private Equity Investors",
  //   //       linkedin_org_industry: "Business Consulting and Services",
  //   //       linkedin_org_followers: 685,
  //   //       linkedin_org_headquarters: "London, England",
  //   //       linkedin_org_type: "Privately Held",
  //   //       linkedin_org_foundeddate: "",
  //   //       linkedin_org_specialties: ["Technology and Consulting"],
  //   //       linkedin_org_locations: [
  //   //         "16-19 Eastcastle Street, London, England W1W 8DY, GB",
  //   //       ],
  //   //       linkedin_org_description:
  //   //         "Tech Economy is a technology focused specialty consulting firm. We conduct buy-side and sell-side Tech DDs as well as value creation assignments. Our clients include leading global and mid-market PE firms on both sides of the Atlantic, as well as their software and tech enabled portfolio companies. We cover the entire PE ownership lifecycle: from pre-investment technology diligence, post-closing 100-day planning, tech value creation, through to Vendor DD exit preparation.\n\nOur firm works and has deep experience across a wide range of technology segments including, ERP, Healthcare IT, E-commerce, Cybersecurity, E-Learning, IT services, Data Analytics, and AI.\n\nWe know what it takes to run a successful technology company and how to ensure investment transaction completion. We have the expertise, experience, and resources to deliver rapid and actionable output and create lasting value for our clients.",
  //   //       linkedin_org_recruitment_agency_derived: false,
  //   //       seniority: "Mid-Senior level",
  //   //     },
  //   //     {
  //   //       id: "1383475020",
  //   //       date_posted: "2025-02-07T14:02:52",
  //   //       date_created: "2025-02-07T20:26:55.298099",
  //   //       title: "Associate, Data Engineer",
  //   //       organization: "Tech Economy",
  //   //       organization_url:
  //   //         "https://www.linkedin.com/company/tech-economy-limited",
  //   //       date_validthrough: "2025-03-09T14:02:51",
  //   //       locations_raw: [
  //   //         {
  //   //           "@type": "Place",
  //   //           address: {
  //   //             "@type": "PostalAddress",
  //   //             addressCountry: "IN",
  //   //             addressLocality: "Delhi",
  //   //             addressRegion: null,
  //   //             streetAddress: null,
  //   //           },
  //   //           latitude: 28.65195,
  //   //           longitude: 77.23149,
  //   //         },
  //   //       ],
  //   //       location_type: null,
  //   //       location_requirements_raw: null,
  //   //       salary_raw: null,
  //   //       employment_type: ["FULL_TIME"],
  //   //       url: "https://in.linkedin.com/jobs/view/associate-data-engineer-at-tech-economy-4146669408",
  //   //       source_type: "jobboard",
  //   //       source: "linkedin",
  //   //       source_domain: "in.linkedin.com",
  //   //       organization_logo:
  //   //         "https://media.licdn.com/dms/image/v2/C4D0BAQHQ0gjkgfHrxQ/company-logo_200_200/company-logo_200_200/0/1630570389803/tech_economy_partners_logo?e=2147483647&amp;v=beta&amp;t=dsgPftebVC7AHYRYu4y6CAXSA9XDRui46PolgcmSXi0",
  //   //       cities_derived: ["Delhi"],
  //   //       regions_derived: ["Delhi"],
  //   //       countries_derived: ["India"],
  //   //       locations_derived: ["Delhi, Delhi, India"],
  //   //       timezones_derived: ["Asia/Kolkata"],
  //   //       lats_derived: [28.61],
  //   //       lngs_derived: [77.23],
  //   //       remote_derived: false,
  //   //       recruiter_name: null,
  //   //       recruiter_title: null,
  //   //       recruiter_url: null,
  //   //       linkedin_org_employees: 3,
  //   //       linkedin_org_url: "https://techeconomy.net",
  //   //       linkedin_org_size: "11-50 employees",
  //   //       linkedin_org_slogan:
  //   //         "Strategic Advisers to Technology-Enabled Companies and Private Equity Investors",
  //   //       linkedin_org_industry: "Business Consulting and Services",
  //   //       linkedin_org_followers: 698,
  //   //       linkedin_org_headquarters: "London, England",
  //   //       linkedin_org_type: "Privately Held",
  //   //       linkedin_org_foundeddate: "",
  //   //       linkedin_org_specialties: ["Technology and Consulting"],
  //   //       linkedin_org_locations: [
  //   //         "16-19 Eastcastle Street, London, England W1W 8DY, GB",
  //   //       ],
  //   //       linkedin_org_description:
  //   //         "Tech Economy is a technology focused specialty consulting firm. We conduct buy-side and sell-side Tech DDs as well as value creation assignments. Our clients include leading global and mid-market PE firms on both sides of the Atlantic, as well as their software and tech enabled portfolio companies. We cover the entire PE ownership lifecycle: from pre-investment technology diligence, post-closing 100-day planning, tech value creation, through to Vendor DD exit preparation.\n\nOur firm works and has deep experience across a wide range of technology segments including, ERP, Healthcare IT, E-commerce, Cybersecurity, E-Learning, IT services, Data Analytics, and AI.\n\nWe know what it takes to run a successful technology company and how to ensure investment transaction completion. We have the expertise, experience, and resources to deliver rapid and actionable output and create lasting value for our clients.",
  //   //       linkedin_org_recruitment_agency_derived: false,
  //   //       seniority: "Entry level",
  //   //     },
  //   //     {
  //   //       id: "1383475012",
  //   //       date_posted: "2025-02-07T14:02:01",
  //   //       date_created: "2025-02-07T20:26:55.204843",
  //   //       title: "Associate - Data Engineer",
  //   //       organization: "Tech Economy",
  //   //       organization_url:
  //   //         "https://www.linkedin.com/company/tech-economy-limited",
  //   //       date_validthrough: "2025-03-09T14:02:00",
  //   //       locations_raw: [
  //   //         {
  //   //           "@type": "Place",
  //   //           address: {
  //   //             "@type": "PostalAddress",
  //   //             addressCountry: "IN",
  //   //             addressLocality: "Delhi",
  //   //             addressRegion: null,
  //   //             streetAddress: null,
  //   //           },
  //   //           latitude: 28.65195,
  //   //           longitude: 77.23149,
  //   //         },
  //   //       ],
  //   //       location_type: null,
  //   //       location_requirements_raw: null,
  //   //       salary_raw: null,
  //   //       employment_type: ["FULL_TIME"],
  //   //       url: "https://in.linkedin.com/jobs/view/associate-data-engineer-at-tech-economy-4146667519",
  //   //       source_type: "jobboard",
  //   //       source: "linkedin",
  //   //       source_domain: "in.linkedin.com",
  //   //       organization_logo:
  //   //         "https://media.licdn.com/dms/image/v2/C4D0BAQHQ0gjkgfHrxQ/company-logo_200_200/company-logo_200_200/0/1630570389803/tech_economy_partners_logo?e=2147483647&amp;v=beta&amp;t=dsgPftebVC7AHYRYu4y6CAXSA9XDRui46PolgcmSXi0",
  //   //       cities_derived: ["Delhi"],
  //   //       regions_derived: ["Delhi"],
  //   //       countries_derived: ["India"],
  //   //       locations_derived: ["Delhi, Delhi, India"],
  //   //       timezones_derived: ["Asia/Kolkata"],
  //   //       lats_derived: [28.61],
  //   //       lngs_derived: [77.23],
  //   //       remote_derived: false,
  //   //       recruiter_name: null,
  //   //       recruiter_title: null,
  //   //       recruiter_url: null,
  //   //       linkedin_org_employees: 3,
  //   //       linkedin_org_url: "https://techeconomy.net",
  //   //       linkedin_org_size: "11-50 employees",
  //   //       linkedin_org_slogan:
  //   //         "Strategic Advisers to Technology-Enabled Companies and Private Equity Investors",
  //   //       linkedin_org_industry: "Business Consulting and Services",
  //   //       linkedin_org_followers: 698,
  //   //       linkedin_org_headquarters: "London, England",
  //   //       linkedin_org_type: "Privately Held",
  //   //       linkedin_org_foundeddate: "",
  //   //       linkedin_org_specialties: ["Technology and Consulting"],
  //   //       linkedin_org_locations: [
  //   //         "16-19 Eastcastle Street, London, England W1W 8DY, GB",
  //   //       ],
  //   //       linkedin_org_description:
  //   //         "Tech Economy is a technology focused specialty consulting firm. We conduct buy-side and sell-side Tech DDs as well as value creation assignments. Our clients include leading global and mid-market PE firms on both sides of the Atlantic, as well as their software and tech enabled portfolio companies. We cover the entire PE ownership lifecycle: from pre-investment technology diligence, post-closing 100-day planning, tech value creation, through to Vendor DD exit preparation.\n\nOur firm works and has deep experience across a wide range of technology segments including, ERP, Healthcare IT, E-commerce, Cybersecurity, E-Learning, IT services, Data Analytics, and AI.\n\nWe know what it takes to run a successful technology company and how to ensure investment transaction completion. We have the expertise, experience, and resources to deliver rapid and actionable output and create lasting value for our clients.",
  //   //       linkedin_org_recruitment_agency_derived: false,
  //   //       seniority: "Sin experiencia",
  //   //     },
  //   //     {
  //   //       id: "1381713400",
  //   //       date_posted: "2025-02-07T06:20:43",
  //   //       date_created: "2025-02-07T11:28:52.292713",
  //   //       title: "Senior Data Engineer",
  //   //       organization: "Discoveries Quintessential",
  //   //       organization_url:
  //   //         "https://www.linkedin.com/company/discoveries-quintessential",
  //   //       date_validthrough: "2025-03-09T06:20:43",
  //   //       locations_raw: [
  //   //         {
  //   //           "@type": "Place",
  //   //           address: {
  //   //             "@type": "PostalAddress",
  //   //             addressCountry: "IN",
  //   //             addressLocality: "New Delhi",
  //   //             addressRegion: null,
  //   //             streetAddress: null,
  //   //           },
  //   //           latitude: 28.632425,
  //   //           longitude: 77.21879,
  //   //         },
  //   //       ],
  //   //       location_type: null,
  //   //       location_requirements_raw: null,
  //   //       salary_raw: null,
  //   //       employment_type: ["FULL_TIME"],
  //   //       url: "https://in.linkedin.com/jobs/view/senior-data-engineer-at-discoveries-quintessential-4143745332",
  //   //       source_type: "jobboard",
  //   //       source: "linkedin",
  //   //       source_domain: "in.linkedin.com",
  //   //       organization_logo:
  //   //         "https://media.licdn.com/dms/image/v2/C560BAQGMc22pjrnVCQ/company-logo_200_200/company-logo_200_200/0/1660201832358?e=2147483647&amp;v=beta&amp;t=gA0aodtUnI0rWSGZYiOXLEr6Q-Db_OKECuWjAi_vYjg",
  //   //       cities_derived: ["Delhi Cantonment"],
  //   //       regions_derived: ["Delhi"],
  //   //       countries_derived: ["India"],
  //   //       locations_derived: ["Delhi Cantonment, Delhi, India"],
  //   //       timezones_derived: ["Asia/Kolkata"],
  //   //       lats_derived: [28.6],
  //   //       lngs_derived: [77.1333],
  //   //       remote_derived: false,
  //   //       recruiter_name: "Namrata Jadhav",
  //   //       recruiter_title:
  //   //         "Recruiter Analyst @Discoveries Quintessential || Master of Commerce",
  //   //       recruiter_url: "https://in.linkedin.com/in/namrata-jadhav-041843277",
  //   //       linkedin_org_employees: 18,
  //   //       linkedin_org_url: null,
  //   //       linkedin_org_size: "11-50 employees",
  //   //       linkedin_org_slogan:
  //   //         "Talent Engineering | Knowing is half the battle",
  //   //       linkedin_org_industry: "Staffing and Recruiting",
  //   //       linkedin_org_followers: 158563,
  //   //       linkedin_org_headquarters: "Panaji, Goa",
  //   //       linkedin_org_type: "Privately Held",
  //   //       linkedin_org_foundeddate: "2022",
  //   //       linkedin_org_specialties: [""],
  //   //       linkedin_org_locations: ["Panaji, Goa 403001, IN"],
  //   //       linkedin_org_description:
  //   //         "At DQ we are envisioning solutions which remove the inefficiencies of the current processes in Talent Acquisition. Finding Intelligent alternates to practices which are bottle necks making the process slow and inefficient. Lastly, we look for implementations which are robust, can stand the pressure of breakneck speed at which technology forces change in all spheres of our lives",
  //   //       linkedin_org_recruitment_agency_derived: true,
  //   //       seniority: "Mid-Senior level",
  //   //     },
  //   //   ],
  //   // });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(400).json({
  //     error: "Some Error Occured",
  //     err,
  //   });

  // }
  try {
    // const user = req.user;
    // const reqUser = await User.findOne({_id : user.id});

    // Convert input to lowercase for case-insensitive search
    // console.log("hi")
    const formattedTitle = new RegExp('Software Engineer', "i"); 
    const formattedLocation = new RegExp('India', "i"); 

    // Fetch jobs from MongoDB based on user input
    const jobs = await Job.find({
      title: formattedTitle,
      location: formattedLocation,
    });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No matching jobs found" });
    }

    res.json({ totalJobs: jobs.length, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch job listings" });
  }
}
module.exports = {
  getJobs,
  jobsInterestedIn,
};
