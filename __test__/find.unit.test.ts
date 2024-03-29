import {findCommentPredicate, findMatchingComment} from '../src/find'

describe('findCommentPredicate tests', () => {
  test('find by bodyIncludes', async () => {
    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'not-exist',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)
  })

  test('find by bodyRegex', async () => {
    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: '',
          bodyRegex: '^.*Kansas.*$',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: '',
          bodyRegex: '^.*not-exist.*$',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)
  })

  test('find by author', async () => {
    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: '',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'toto',
          bodyIncludes: '',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)
  })

  test('find by bodyIncludes and author', async () => {
    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: 'not-exist',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'toto',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)
  })

  test('find by bodyRegex and author', async () => {
    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: '',
          bodyRegex: '^.*Kansas.*$',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: '',
          bodyRegex: '/^.*KaNsAs.*$/i',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: '',
          bodyRegex: '^.*not-exist.*$',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)

    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'toto',
          bodyIncludes: '',
          bodyRegex: '^.*Kansas.*$',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(false)
  })

  test('find by bodyIncludes, bodyRegex and author', async () => {
    expect(
      findCommentPredicate(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: 'dorothy',
          bodyIncludes: 'feeling',
          bodyRegex: '^.*Kansas.*$',
          direction: 'direction',
          nth: 0
        },
        {
          id: 1,
          node_id: 'tornado',
          body: `Toto, I've a feeling we're not in Kansas anymore.`,
          user: {login: 'dorothy'},
          created_at: '2020-01-01T00:00:00Z'
        }
      )
    ).toEqual(true)
  })
})

describe('findMatchingComment tests', () => {
  // Note: Use `testComments.slice()` to avoid mutating the original array.
  const testComments = [
    {
      id: 1,
      node_id: 'tornado',
      body: `Toto, I've a feeling we're not in Kansas anymore.`,
      user: {login: 'dorothy'},
      created_at: '2020-01-01T00:00:00Z'
    },
    {
      id: 2,
      node_id: 'poppies',
      body: `You've always had the power, my dear. You just had to learn it for yourself.`,
      user: {login: 'glinda'},
      created_at: '2020-01-01T00:00:00Z'
    },
    {
      id: 3,
      node_id: 'rubyslippers',
      body: `I'll get you, my pretty, and your little dog too!`,
      user: {login: 'wicked-witch'},
      created_at: '2020-01-01T00:00:00Z'
    },
    {
      id: 4,
      node_id: 'auntieem',
      body: `Toto, I've a feeling we're not in Kansas anymore.`,
      user: {login: 'dorothy'},
      created_at: '2020-01-01T00:00:00Z'
    },
    {
      id: 5,
      node_id: 'verybadwizard',
      body: `I'll get you, my pretty, and your little dog too!`,
      user: {login: 'wicked-witch'},
      created_at: '2020-01-01T00:00:00Z'
    }
  ]

  test('no comments', async () => {
    expect(
      findMatchingComment(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'first',
          nth: 0
        },
        []
      )
    ).toEqual(undefined)
  })

  test('find with search direction first', async () => {
    expect(
      findMatchingComment(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'first',
          nth: 0
        },
        testComments.slice()
      )?.id
    ).toEqual(1)
  })

  test('find with search direction last', async () => {
    expect(
      findMatchingComment(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'last',
          nth: 0
        },
        testComments.slice()
      )?.id
    ).toEqual(4)
  })

  test('find nth with search direction first', async () => {
    expect(
      findMatchingComment(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'first',
          nth: 1
        },
        testComments.slice()
      )?.id
    ).toEqual(4)
  })

  test('find nth with search direction last', async () => {
    expect(
      findMatchingComment(
        {
          token: 'token',
          repository: 'repository',
          issueNumber: 1,
          commentAuthor: '',
          bodyIncludes: 'Kansas',
          bodyRegex: '',
          direction: 'last',
          nth: 1
        },
        testComments.slice()
      )?.id
    ).toEqual(1)
  })
})
