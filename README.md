# Slack file upload action

This action uploads file to slack

## Inputs

### `token`

**Required** Slack app token. See [Internal app tokens](https://slack.com/intl/en-ru/help/articles/215770388-Create-and-regenerate-API-tokens#internal-app-tokens)
 Create app
 Add `file:write` permission
 Install app to your workspase
 Invite bot to required channels `/invite <botname>`
 Use bot token from `OAuth & Permissions` page
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


