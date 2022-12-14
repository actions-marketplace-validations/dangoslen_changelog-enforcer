const fs = require('fs')
const versionExtractor = require('../src/version-extractor')

const KEEP_A_CHANGELOG = `
## Unreleased

## [v1.10.0]
- Some changes

## [v1.9.2]
Fixed a bug
`

const CUSTOM = `
* Unreleased

* v1.2.0
- Some changes
`
const VERSION_PATTERN = "^## \\[?((v|V)?\\d*\\.\\d*\\.\\d*-?\\w*|unreleased|Unreleased|UNRELEASED)\\]?"
const CUSTOM_VERSION_PATTERN = "^\\* ((v|V)?\\d*\\.\\d*\\.\\d*-?\\w*|Unreleased)"

describe('the verstion-extractor', () => {

  it('should return all versions via keep a changelog format', () => {
    const versions = versionExtractor.getVersions(VERSION_PATTERN, KEEP_A_CHANGELOG)
    expect(versions).toStrictEqual(['Unreleased', 'v1.10.0', 'v1.9.2'])
  })

  it('should return all versions via custom format', () => {
    const versions = versionExtractor.getVersions(CUSTOM_VERSION_PATTERN, CUSTOM)
    expect(versions).toStrictEqual(['Unreleased', 'v1.2.0'])
  })

})