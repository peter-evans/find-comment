import * as core from '@actions/core'
import * as github from '@actions/github'
import {inspect} from 'util'

interface Inputs {
  token: string
  repository: string
  issueNumber: number
  commentAuthor: string
  bodyIncludes: string
  direction: string
}

interface Comment {
  id: number
  body: string
  user: {
    login: string
  }
}

function findCommentPredicate(inputs: Inputs, comment: Comment): boolean {
  return (
    (inputs.commentAuthor
      ? comment.user.login === inputs.commentAuthor
      : true) &&
    (inputs.bodyIncludes ? comment.body.includes(inputs.bodyIncludes) : true)
  )
}

async function findComment(inputs: Inputs): Promise<Comment | undefined> {
  const octokit = github.getOctokit(inputs.token)
  const [owner, repo] = inputs.repository.split('/')

  const parameters = {
    owner: owner,
    repo: repo,
    issue_number: inputs.issueNumber
  }

  if (inputs.direction == 'first') {
    for await (const {data: comments} of octokit.paginate.iterator(
      octokit.issues.listComments,
      parameters
    )) {
      // Search each page for the comment
      const comment = comments.find(comment =>
        findCommentPredicate(inputs, comment)
      )
      if (comment) {
        return {
          id: comment.id,
          body: comment.body,
          user: {
            login: comment.user.login
          }
        }
      }
    }
  } else {
    // direction == 'last'
    const comments = await octokit.paginate(
      octokit.issues.listComments,
      parameters
    )
    comments.reverse()
    const comment = comments.find(comment =>
      findCommentPredicate(inputs, comment)
    )
    if (comment) {
      return {
        id: comment.id,
        body: comment.body,
        user: {
          login: comment.user.login
        }
      }
    }
  }
  return undefined
}

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      token: core.getInput('token'),
      repository: core.getInput('repository'),
      issueNumber: Number(core.getInput('issue-number')),
      commentAuthor: core.getInput('comment-author'),
      bodyIncludes: core.getInput('body-includes'),
      direction: core.getInput('direction')
    }
    core.debug(`Inputs: ${inspect(inputs)}`)

    const comment = await findComment(inputs)

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
