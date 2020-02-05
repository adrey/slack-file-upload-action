# Slack file upload action

This action uploads file to slack

## Inputs

### `token`

**Required** Slack token

### `path`

**Required** Path to file

### `channel`

Slack channel for upload


### `filename`

Filename of file
   
### `filetype`

A file type identifier.
   
### `initial_comment`

The message text introducing the file in specified channels.
    
### `title`

Title of file
    

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
        uses: adrey/slack-file-upload-action@master
        with:
          token: ${{ secrets.SLACK_TOKEN }}
          path: test.txt
          channel: random
```


