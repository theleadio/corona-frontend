# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. We follow a simplified git-flow for our workflow, using `dev`, `staging` and `master` branches
   for development, staging and production site respectively. `dev` branch is used to
   consolidate all the changes from different Pull Request and `staging` branch is for QA before all
   the new changes go live.
2. Please make your Pull Request to `dev` branch.
3. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Translation Process

1. We use a [spreadsheet in Google Sheets](https://docs.google.com/spreadsheets/d/12_yx09THl9qcBboJvvBwPTY63MfKIIB8WzEDstIOI6s/edit#gid=0) to capture the translation to all supported languages,
   so you should start there. When translating, keep in mind these guidelines:
    * Be mindful that what's entered in the spreadsheet will be displayed on the website as it,
      so do not put any comment/remark in the cells. If you want to add a comment, you can use the
      "insert note" or "comment" functions, which will appear when you right-click the cell.
    * Text that are enclosed with `{}` are just placeholders and must not be translated. They will
      be replaced by actual values (e.g. `{number} new cases` will become `5 new cases` if the number
      of cases is 5). Therefore, do not remove the placeholder in the translation and make sure it's
      part of the translated text.
    * You can use the token in different order if it makes sense in the translated language
      (e.g. for `+{number} new cases`, in some alien language, it reads as `sesac +5 wen`, then you
      can write it as `sesac +{number} wen` )
    * Currently, translated text doesn't support line breaks, so all the text needs to be in one line
    * If you need to use quote `"`, please prepend it with a backslash `\` (e.g. `\"text\"` instead
      of `"text"` )

2. If you want to add a new language, please add a new column to the spreadsheet and update the
   translation test with the new locale [here](test/CheckTranslations.spec.js). If you're unsure
   how to do this, then send a message on the #translation Slack channel

3. Our team will regularly run a job to incorporate the translations to the codebase

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at contact@coronatracker.com. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/