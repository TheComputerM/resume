# My Resume and CV

This repository contains my experiences as a developer in the [JSON Resume format](http://jsonresume.org/). 

**TODO: add more projects and publications**

## Testimonials

If you would like to provide a testimonial or recommendation for my resume or CV, please feel free to reach out to me directly or better yet, open a pull request with your testimonial added to the [references section in cv.json](./cv.json) in the following format.

```json
{
  "references": [
    {
      "name": "{{your name}} - {{relation/role}}",
      "reference": "{{your testimonial or recommendation here}}"
    },
    ...
  ]
}
```

Your feedback and support are greatly appreciated!

## Automatic Gist Updates

This repository includes a GitHub Action that automatically updates a public GitHub Gist with the latest version of `cv.json` whenever it's updated on the main branch.

### Setup Instructions

To enable this functionality, you need to configure two GitHub secrets in your repository:

1. **GIST_TOKEN**: A GitHub Personal Access Token with `gist` scope
   - Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with the `gist` scope
   - Copy the token and add it as a repository secret named `GIST_TOKEN`

2. **GIST_ID**: The ID of your public gist
   - Create a new public gist at https://gist.github.com/
   - The gist ID is the alphanumeric string in the URL (e.g., `https://gist.github.com/username/GIST_ID`)
   - Add this ID as a repository secret named `GIST_ID`

Once configured, the workflow will automatically update your gist with `resume.json` whenever `cv.json` is pushed to the main branch.
