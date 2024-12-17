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

const fs = require('fs-extra')

const VALID_DATATYPES = ['text', 'richtext', 'media', 'container', 'component', 'reference'];

function readManifest (manifestPath) {
  try {
    return JSON.parse(
      fs.readFileSync(manifestPath, { encoding: 'utf8' })
    )
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {}
    } else {
      throw err
    }
  }
}

function writeManifest (manifest, manifestPath) {
  fs.writeJsonSync(manifestPath, manifest, { spaces: 2 })
}

module.exports = {
  readManifest,
  writeManifest,
  VALID_DATATYPES
}
