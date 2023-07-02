# New York Times API - Class Assignment


## Overview

This project was created for an assignment in CTEC 126 JavaScript at Clark College in the Spring quarter of 2003, for the final project. The concept was to handle multiple APIs to populate a site with details, including the headline and an image if one exists. The APIs involved are for the listing of available sections, the top stories for the front page, and separate links for each of the 50 available sections.

In lieu of creating a standard, modern design I opted create something that more closely mimicked an old physical newspaper. If these were full articles, the columns would not be suitable for reading. However, the API only supplies a headline and an abstract, allowing for a smaller space to be used. To further push it to the old newsprint look, a filter has been added to make the photos appear grayscale. Hovering over them shows them in full color. Clicking anywhere in the area for the article will link you to the full page on the NYT website.

## Use Your Own Key

Visit the NYT Dev page at https://developer.nytimes.com/apis 

Sign up for an account and enable 2 APIs:
- Times Wire API
- Top Stories API

Find the key in nyt.js and replace "YOURKEYHERE" with your API key.

## Assignment Requirements

This assignment will have you develop a web page that displays news stories from the New York Times. The stories will be retrieved using JavaScript fetch() (AJAX) calls to the application programming interface (API) provided by the New York Times.

Your page must allow users to display news from the following sections from the Top Stories API:

- Home (the default news displayed when the page is first loaded)
- Arts
- Business
- Dining
- Fashion
- Health Magazine
- National Opinion
- Politics
- Real Estate
- Science
- Sports
- Technology
- World

## Assignment Details

- Your page must show all of the stories returned from the API.
- An HTML ```<select>``` control should be used that allows a person to select the news section they want to retrieve stories from.
- The stories should be loaded on page load.
- When the user selects another news section, only the stories section of the page should reload. The entire page MUST NOT reload.
- A Refresh button must be provided that allows a person to click it to get the latest stories.
- For each story, the following information must be displayed:
  - The "section" of the newspaper the article appeared in
  - The "title" of the article. Make the title a clickable link to the URL of the story
  - The story "abstract"
  - The story "byline"
  - The "published date" in a format other than the one supplied.
  - One of the multimedia images for the news story
- All of the news stories should be displayed using a "card" styling
- All of your JavaScript code must be in the **js/nyt.js** file
- Your page needs to be styled using the **nyt.css** stylesheet and look professional
- Your HTML and CSS must validate
- You must not have any WAVE errors, alerts or contrast errors
