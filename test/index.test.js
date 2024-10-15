const helpers = require('yeoman-test')
const Generator = require('yeoman-generator')

const UniversalEditorMainGenerator = require('../src/index')
const UniversalEditorActionGenerator = require('../src/generator-add-action-universal-editor')
const UniversalEditorWebAssetsGenerator = require('../src/generator-add-web-assets-universal-editor')
const { utils } = require('@adobe/generator-app-common-lib')

const { defaultExtensionManifest, customExtensionManifest } = require('./test-manifests')

const composeWith = jest.spyOn(Generator.prototype, 'composeWith').mockImplementation(jest.fn())
const prompt = jest.spyOn(Generator.prototype, 'prompt') // prompt answers are mocked by "yeoman-test"
const writeKeyAppConfig = jest.spyOn(utils, 'writeKeyAppConfig').mockImplementation(jest.fn())
const writeKeyYAMLConfig = jest.spyOn(utils, 'writeKeyYAMLConfig').mockImplementation(jest.fn())

beforeEach(() => {
  composeWith.mockClear()
  prompt.mockClear()
  writeKeyAppConfig.mockClear()
  writeKeyYAMLConfig.mockClear()
})

describe('prototype', () => {
  test('exports a yeoman generator', () => {
    expect(UniversalEditorMainGenerator.prototype).toBeInstanceOf(Generator)
  })
})

describe('run', () => {
  const srcFolder = 'src/universal-editor-ui-1'
  const configName = 'universal-editor/ui/1'
  const extConfig = 'ext.config.yaml'
  
  test('test a generator invocation with default code generation', async () => {
    const options = {
      'is-test': true,
      'extension-manifest': defaultExtensionManifest
    }
    await helpers.run(UniversalEditorMainGenerator)
      .withOptions(options)
    expect(prompt).not.toHaveBeenCalled()
    expect(composeWith).toHaveBeenCalledTimes(1)
    expect(composeWith).toHaveBeenCalledWith(
      expect.objectContaining({
        Generator: UniversalEditorWebAssetsGenerator,
        path: 'unknown'
      }),
      expect.any(Object)
    )
    expect(writeKeyAppConfig).toHaveBeenCalledTimes(1)
    expect(writeKeyYAMLConfig).toHaveBeenCalledTimes(4)
    expect(writeKeyAppConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), `extensions.${configName}`, { $include: `${srcFolder}/${extConfig}` })
    expect(writeKeyYAMLConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), global.n(`${srcFolder}/${extConfig}`), 'operations', { view: [{ impl: 'index.html', type: 'web' }] })
    expect(writeKeyYAMLConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), global.n(`${srcFolder}/${extConfig}`), 'actions', 'actions')
    expect(writeKeyYAMLConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), global.n(`${srcFolder}/${extConfig}`), 'web', 'web-src')
  })

  test('test a generator invocation with custom code generation', async () => {
    const options = {
      'is-test': true,
      'extension-manifest': customExtensionManifest
    }
    await helpers.run(UniversalEditorMainGenerator)
      .withOptions(options)
    expect(prompt).not.toHaveBeenCalled()
    expect(composeWith).toHaveBeenCalledTimes(3)
    expect(composeWith).toHaveBeenCalledWith(
      expect.objectContaining({
        Generator: UniversalEditorActionGenerator,
        path: 'unknown'
      }),
      expect.any(Object)
    )
    expect(composeWith).toHaveBeenCalledWith(
      expect.objectContaining({
        Generator: UniversalEditorActionGenerator,
        path: 'unknown'
      }),
      expect.any(Object)
    )
    expect(composeWith).toHaveBeenCalledWith(
      expect.objectContaining({
        Generator: UniversalEditorWebAssetsGenerator,
        path: 'unknown'
      }),
      expect.any(Object)
    )
    expect(writeKeyAppConfig).toHaveBeenCalledTimes(1)
    expect(writeKeyYAMLConfig).toHaveBeenCalledTimes(4)
    expect(writeKeyAppConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), `extensions.${configName}`, { $include: `${srcFolder}/${extConfig}` })
    expect(writeKeyYAMLConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), global.n(`${srcFolder}/${extConfig}`), 'operations', { view: [{ impl: 'index.html', type: 'web' }] })
    expect(writeKeyYAMLConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), global.n(`${srcFolder}/${extConfig}`), 'actions', 'actions')
    expect(writeKeyYAMLConfig).toHaveBeenCalledWith(expect.any(UniversalEditorMainGenerator), global.n(`${srcFolder}/${extConfig}`), 'web', 'web-src')
  })
})
