const core = require('@actions/core');
const github = require('@actions/github');

const endpoint = "https://collector.asfaload.com/v1/github_action_register_release";

async function main() {
  const token = await core.getIDToken();
  const defaultOptions = {
    headers: {
      'Authorization': token,
    },
    method: 'POST'
  };
  //let releaseId = github.event.release.id;
  console.log("posting to ", endpoint);
  try {
    let body = JSON.stringify({ release: github.context.payload.release, repository: github.context.payload.repository })
    let response = await fetch(endpoint, { ...defaultOptions, body: body });
    console.log("response text:")
    console.log(await response.text())
  } catch (error) {
    core.setFailed(error.message);
  }

}

main();
