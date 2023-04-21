import * as core from '@actions/core'
import {Inputs, findComment} from './find'
import {inspect} from 'util'

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

async function run(): Promise<void> {
  try {
    const inputs: Inputs = {
      token: core.getInput('token'),
      repository: core.getInput('repository'),
      issueNumber: Number(core.getInput('issue-number')),
      commentAuthor: core.getInput('comment-author'),
      bodyIncludes: core.getInput('body-includes'),
      bodyRegex: core.getInput('body-regex'),
      direction: core.getInput('direction'),
      nth: Number(core.getInput('nth'))
    }
    core.debug(`Inputs: ${inspect(inputs)}`)

    const comment = await findComment(inputs)

    if (comment) {
      core.setOutput('comment-id', comment.id.toString())
      core.setOutput('comment-body', comment.body)
      core.setOutput('comment-author', comment.user ? comment.user.login : '')
      core.setOutput('comment-created-at', comment.created_at)
    } else {
      core.setOutput('comment-id', '')
      core.setOutput('comment-body', '')
      core.setOutput('comment-author', '')
      core.setOutput('comment-created-at', '')
    }
  } catch (error) {
    core.debug(inspect(error))
    core.setFailed(getErrorMessage(error))
  }
}

run()
