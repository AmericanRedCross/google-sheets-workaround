

[Tabletop.js](https://github.com/jsoma/tabletop) was a great way to take a Google Spreadsheet and makes it easily accessible through JavaScript. Google has shut down the infrastructure that Tabletop relies on.

It doesn't seem possible anymore to load the data directly from a Sheet into the browser via JavaScript.

One workaround seems to be prepending 'https://cors-anywhere.herokuapp.com/' to the Google URL. However, that server is only provided to easily and quickly try out [CORS Anywhere](https://www.npmjs.com/package/cors-anywhere). And at this time I don't want to host my own instance of CORS Anywhere.

Another workaround seems to be using a server to download the data and save it somewhere more easily accessible. So we're going to use a Travis-CI build (run daily), to fetch the data from a collection of Google Sheets and save it to a GitHub repository.

For the Travis-CI connection, a GitHub personal access token with 'public_repo - Access public repositories' permissions created and added via `travis encrypt GH_TOKEN=my_github_token --add env.matrix` as described in the [Travis-CI docs](https://docs.travis-ci.com/user/environment-variables#Encrypting-environment-variables).