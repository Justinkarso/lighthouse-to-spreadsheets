# Generate batch lighthouse reports in google spreadsheets with Github Gists

## Get Started

```
npm install
```

## Use

1. Make a list of urls that you want to audit. You can use a tool like https://www.seowl.co/sitemap-extractor/

2. Go to routes > generateUrls.js and add your list as an array. You can use the previous tool in combination with this: https://arraythis.com/

3. Add your [Github personal access token](https://github.com/settings/tokens) to a .env file
> Make sure you allow the presonal token to create gists during creation.

```
GITHUB_AUTH_TOKEN=
```

1. Start the app using 

```
npm run dev
```

5. Go to http://localhost:3000
6. Walk through the process of the tool

> Skip next step if we are colleagues. Should be a prepared spreadsheet link in the docs. skip to step 9

7. Create a spreadsheet in  [Google Spreadsheets](https://docs.google.com/spreadsheets)

8. Go to Tools > Script Editor and replace the code that with the following [ImportJSON.gs script](https://raw.githubusercontent.com/bradjasper/ImportJSON/master/ImportJSON.gs) and remember to save and rename the file to ImportJSON.gs

9.  Select column A1 and insert =ImportJSON('your_summary_gist_raw_url")
> Make sure to use the raw gist url.
