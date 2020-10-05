import * as core from '@actions/core'
import * as github from '@actions/github'
import {inspect} from 'util'

async function run(): Promise<void> {
  try {
    const inputs = {
      token: core.getInput('token'),
      repository: core.getInput('repository'),
      issueNumber: Number(core.getInput('issue-number')),
      commentAuthor: core.getInput('comment-author'),
      bodyIncludes: core.getInput('body-includes')
    }
    core.debug(`Inputs: ${inspect(inputs)}`)

    const [owner, repo] = inputs.repository.split('/')

    const octokit = github.getOctokit(inputs.token)

    const {data: comments} = await octokit.issues.listComments({
      owner: owner,
      repo: repo,
      issue_number: inputs.issueNumber
    })

    const comment = comments.find(comment => {
      return (
        (inputs.commentAuthor
          ? comment.user.login === inputs.commentAuthor
          : true) &&
        (inputs.bodyIncludes
          ? comment.body.includes(inputs.bodyIncludes)
          : true)
      )
    })

    if (comment) {
      core.setOutput('comment-id', comment.id.toString())
      core.setOutput('comment-body', comment.body)
    } else {
      core.setOutput('comment-id', '')
      core.setOutput('comment-body', '')
    }
  } catch (error) {
    core.debug(inspect(error))
    core.setFailed(error.message)
  }
}

run()
