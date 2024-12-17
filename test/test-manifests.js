/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const defaultExtensionManifest = {
  "name": "Universal Editor Test Extension",
  "id": "universal-editor-test-extension",
  "description": "Test Extension for AEM Universal Editor",
  "version": "0.0.1"
}

const customExtensionManifest = {
  "name": "Universal Editor Test Extension",
  "id": "universal-editor-test-extension",
  "description": "Test Extension for AEM Universal Editor",
  "version": "0.0.1",
  "headerMenuButtons": [
    {
      "label": "Import",
      "needsModal": true,
      "id": "import"
    }
  ],
  "rightPanelRails": [
    {
      "header": "Display",
      "id": "display"
    }
  ],
  "runtimeActions": [
    {
      "name": "import"
    },
    {
      "name": "export"
    }
  ]
}

/*
const demoExtensionManifest = {
  "name": "Slack Import/Export Extension Demo",
  "id": "slack-import-export-extension-demo",
  "description": "Demo Extension to showcase import/export functionality using custom buttons within AEM Content Fragment Console",
  "version": "1.0.0",
  "templateFolder": "slack-demo",
  "actionBarButtons": [
    {
      "label": "Export to Slack",
      "needsModal": true,
      "id": "export-to-slack"
    }
  ],
  "headerMenuButtons": [
    {
      "label": "Slack Settings",
      "needsModal": true,
      "id": "slack-settings"
    }
  ],
  "runtimeActions": [
    {
      "name": "export-to-slack"
    },
    {
      "name": "get-slack-config"
    },
    {
      "name": "get-slack-channels"
    },
    {
      "name": "import-from-slack"
    },
    {
      "name": "create-new-fragments"
    }
  ],
  "templateInputs": {
    "LOG_LEVEL": "debug",
    "SLACK_WEBHOOK": "$SLACK_WEBHOOK",
    "SLACK_CHANNEL": "$SLACK_CHANNEL",
    "SLACK_OAUTH_TOKEN": "$SLACK_OAUTH_TOKEN"
  },
  "templateDotEnvVars": ["SLACK_WEBHOOK", "SLACK_CHANNEL", "SLACK_OAUTH_TOKEN"]
}
*/
module.exports = {
  defaultExtensionManifest,
  customExtensionManifest,
  //demoExtensionManifest
}