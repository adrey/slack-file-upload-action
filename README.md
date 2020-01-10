# Slack file upload action

This action uploads file to slack

## Inputs

### `token`

**Required** Slack token

### `path`

**Required** Path to file

### `channel`

Slack channel for upload

## Example usage

```
on: [push]

jobs:
  slack_upload_job:
    runs-on: ubuntu-latest
    name: Upload test file
    steps:
      - name: Checkout
        uses: actions/checkout@v1
      - run: echo "Test file " > test.txt
      - name: Upload to slack step
        uses: ./ # Uses an action in the root directory
        with:
          token: ${{ secrets.SLACK_TOKEN }}
          path: test.txt
          channel: random
```


