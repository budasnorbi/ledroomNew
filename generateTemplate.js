const { generateTemplateFiles } = require('generate-template-files');

const createConfig = (optionName, entryFolderPath) => ({
  option: optionName,
  entry: {
    folderPath: entryFolderPath,
  },
  stringReplacers: ['__compName__'],
  output: {
    path: './src/__compName__',
  },
});

const SMART_COMPONENT = createConfig('Smart Component', './templates/react-smart-all');
const DUMP_COMPONENT = createConfig('Smart Component', './templates/react-dumb-all');

generateTemplateFiles([
  SMART_COMPONENT,
  DUMP_COMPONENT,
]);
