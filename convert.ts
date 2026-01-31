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
    location: entry.location,
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
  awards: (entry: (typeof cv.awards)[number]) => ({
    bullet: `**${entry.title}**: ${entry.summary}`,
  }),
  volunteer: (entry: (typeof cv.volunteer)[number]) => ({
    company: entry.organization,
    position: entry.position,
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
      experience: [
        ...cv.work.map(converter.work),
        ...cv.volunteer.map(converter.volunteer),
      ].sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
      ),
      publications: cv.publications.map(converter.publication),
      activities: [
        ...cv.awards.map(converter.awards),
        {
          bullet:
            "Maintainer for repositories with a total sum of over **2k stars on GitHub** along with contributions to many open-source projects, organizations and communitites.",
        },
      ],
    },
  },

  design: {
    theme: "engineeringresumes",
  },
};

await Bun.file("./rendercv.yaml").write(YAML.stringify(rendercv, null, 2));
