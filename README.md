# Find Comment
[![CI](https://github.com/peter-evans/find-comment/workflows/CI/badge.svg)](https://github.com/peter-evans/find-comment/actions?query=workflow%3ACI)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Find%20Comment-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/find-comment)

A GitHub action to find an issue or pull request comment.

The action will output the comment ID of the comment matching the search criteria.

## Usage

### Find the first comment containing the specified string

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          body-includes: search string 1
```

### Find the first comment by the specified author

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          comment-author: peter-evans
```

### Find the first comment containing the specified string AND by the specified author

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          comment-author: peter-evans
          body-includes: search string 1
```

### Find the first comment matching the specified regular expression

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          body-regex: '^.*search string 1.*$'
```

### Find the last comment containing the specified string

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          body-includes: search string 1
          direction: last
```

### Find the nth comment containing the specified string

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          body-includes: search string 1
          nth: 1 # second matching comment (0-indexed)
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The full name of the repository containing the issue or pull request. | `github.repository` (Current repository) |
| `issue-number` | The number of the issue or pull request in which to search. | |
| `comment-author` | The GitHub user name of the comment author. | |
| `body-includes` | A string to search for in the body of comments. | |
| `body-regex` | A regular expression to search for in the body of comments. | |
| `direction` | Search direction, specified as `first` or `last` | `first` |
| `nth` | 0-indexed number, specifying which comment to return if multiple are found | 0 |

#### Outputs

The `comment-id`, `comment-body`, `comment-author` and `comment-created-at` of the matching comment found will be output for use in later steps.
They will be empty strings if no matching comment was found.
Note that in order to read the step outputs the action step must have an id.

Tip: Empty strings evaluate to zero in GitHub Actions expressions.
e.g. If `comment-id` is an empty string `steps.fc.outputs.comment-id == 0` evaluates to `true`.

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v2
        id: fc
        with:
          issue-number: 1
          body-includes: search string 1
      - run: |
          echo ${{ steps.fc.outputs.comment-id }}
          echo ${{ steps.fc.outputs.comment-body }}
          echo ${{ steps.fc.outputs.comment-author }}
          echo ${{ steps.fc.outputs.comment-created-at }}
```

### Accessing issues and pull requests in other repositories

You can search the comments of issues and pull requests in another repository by using a [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.

## License

[MIT](LICENSE)
