import * as github from '@actions/github'

export interface Inputs {
  token: string
  repository: string
  issueNumber: number
  commentAuthor: string
  bodyIncludes: string
  bodyRegex: string
  direction: string
  nth: number
}

export interface Comment {
  id: number
  body?: string
  user: {
    login: string
  } | null
  created_at: string
}

function stringToRegex(s: string): RegExp {
  const m = s.match(/^(.)(.*?)\1([gimsuy]*)$/)
  if (m) return new RegExp(m[2], m[3])
  else return new RegExp(s)
}

export function findCommentPredicate(
  inputs: Inputs,
  comment: Comment
): boolean {
  return (
    (inputs.commentAuthor && comment.user
      ? comment.user.login === inputs.commentAuthor
      : true) &&
    (inputs.bodyIncludes && comment.body
      ? comment.body.includes(inputs.bodyIncludes)
      : true) &&
    (inputs.bodyRegex && comment.body
      ? comment.body.match(stringToRegex(inputs.bodyRegex)) !== null
      : true)
  )
}

export async function findComment(
  inputs: Inputs
): Promise<Comment | undefined> {
  const octokit = github.getOctokit(inputs.token)
  const [owner, repo] = inputs.repository.split('/')

  const parameters = {
    owner: owner,
    repo: repo,
    issue_number: inputs.issueNumber
  }

  const allComments = await octokit.paginate(
    octokit.rest.issues.listComments,
    parameters
  )
  if (inputs.direction == 'last') {
    allComments.reverse()
  }
  const matchingComments = allComments.filter(comment =>
    findCommentPredicate(inputs, comment)
  )

  const comment = matchingComments[inputs.nth]
  if (comment) {
    return comment
  }

  return undefined
}
