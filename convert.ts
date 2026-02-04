import { YAML } from "bun";
import cv from "./cv.json";

const converter = {
  profiles: (entry: (typeof cv.basics.profiles)[number]) => ({
    network: entry.network,
    username: entry.username,
  }),
  education: (entry: (typeof cv.education)[number]) => ({
    institution: entry.institution,
    degree: entry.studyType,
    area: entry.area,
    start_date: entry.startDate,
    end_date: entry.endDate,
  }),
  work: (entry: (typeof cv.work)[number]) => ({
    company: entry.name,
    position: entry.position,
    start_date: entry.startDate,
    end_date: entry.endDate,
    location: entry.location === "Remote" ? undefined : entry.location,
    summary: entry.summary,
    highlights: entry.highlights,
  }),
  publication: (entry: (typeof cv.publications)[number]) => ({
    title: entry.name,
    authors: entry.authors,
    doi: entry.url.slice("https://doi.org/".length),
    url: entry.url,
    journal: entry.publisher,
    date: entry.releaseDate,
  }),
  projects: (entry: (typeof cv.projects)[number]) => ({
    name: `[${entry.name}](${entry.url})`,
    start_date: entry.startDate,
    end_date: entry.endDate,
    summary: entry.description,
    highlights: entry.highlights,
  }),
  awards: (entry: (typeof cv.awards)[number]) => ({
    name: `${entry.title} @ ${entry.awarder}`,
    date: entry.date,
    summary: entry.summary,
  }),
  volunteer: (entry: (typeof cv.volunteer)[number]) => ({
    name: `${entry.position} @ ${entry.organization}`,
    start_date: entry.startDate,
    end_date: entry.endDate,
    summary: entry.summary,
    highlights: entry.highlights,
  }),
};

const rendercv = {
  cv: {
    name: cv.basics.name,
    headline: cv.basics.label,
    location: `${cv.basics.location.city}, ${cv.basics.location.countryCode}`,
    website: cv.basics.url,
    social_networks: cv.basics.profiles
      .filter((profile) => ["LinkedIn", "GitHub"].includes(profile.network))
      .map(converter.profiles),
    sections: {
      education: cv.education.map(converter.education),
      experience: cv.work.map(converter.work),
      publications: cv.publications.map(converter.publication),
      projects: cv.projects.map(converter.projects),
      activities: [
        ...cv.volunteer.map(converter.volunteer),
        ...cv.awards.map(converter.awards),
      ],
    },
  },
  design: {
    theme: "engineeringresumes",
  },
};

const outputFilename = process.argv[2] || "./rendercv.yaml";
await Bun.file(outputFilename).write(YAML.stringify(rendercv, null, 2));
console.log(`YAML file written to: ${outputFilename}`);
