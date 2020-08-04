# Find Comment
[![CI](https://github.com/peter-evans/find-comment/workflows/CI/badge.svg)](https://github.com/peter-evans/find-comment/actions?query=workflow%3ACI)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Find%20Comment-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=)](https://github.com/marketplace/actions/find-comment)

A GitHub action to find an issue or pull request comment.

The action will output the comment ID of the first comment matching the search criteria.

## Usage

### Find a comment containing the specified string

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v1
        id: fc
        with:
          issue-number: 1
          body-includes: search string 1
```

### Find a comment by the specified author

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v1
        id: fc
        with:
          issue-number: 1
          comment-author: peter-evans
```

### Find a comment containing the specified string AND by the specified author

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v1
        id: fc
        with:
          issue-number: 1
          comment-author: peter-evans
          body-includes: search string 1
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The full name of the repository containing the issue or pull request. | Current repository |
| `issue-number` | The number of the issue or pull request in which to search. | |
| `comment-author` | The GitHub user name of the comment author. | |
| `body-includes` | A string to search for in the body of comments. | |

#### Outputs

The ID of the first matching comment found will be output for use in later steps.
Note that in order to read the step output the action step must have an id.

```yml
      - name: Find Comment
        uses: peter-evans/find-comment@v1
        id: fc
        with:
          issue-number: 1
          body-includes: search string 1
      - run: echo ${{ steps.fc.outputs.comment-id }}
```

### Accessing issues and pull requests in other repositories

You can search the comments of issues and pull requests in another repository by using a [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) instead of `GITHUB_TOKEN`.

## License

[MIT](LICENSE)
