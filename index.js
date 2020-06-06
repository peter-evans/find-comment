const { inspect } = require("util");
const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const inputs = {
      token: core.getInput("token"),
      repository: core.getInput("repository"),
      issueNumber: core.getInput("issue-number"),
      commentAuthor: core.getInput("comment-author"),
      bodyIncludes: core.getInput("body-includes"),
    };
    core.debug(`Inputs: ${inspect(inputs)}`);

    const repository = inputs.repository
      ? inputs.repository
      : process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repository.split("/");
    core.debug(`repository: ${repository}`);

    const octokit = github.getOctokit(inputs.token);

    const { data: comments } = await octokit.issues.listComments({
      owner: owner,
      repo: repo,
      issue_number: inputs.issueNumber,
    });

    const comment = comments.find((comment) => {
      return (
        (inputs.commentAuthor
          ? comment.user.login === inputs.commentAuthor
          : true) &&
        (inputs.bodyIncludes
          ? comment.body.includes(inputs.bodyIncludes)
          : true)
      );
    });

    if (comment) {
      core.setOutput("comment-id", comment.id.toString());
    } else {
      core.setOutput("comment-id", "");
    }
  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
  }
}

run();
