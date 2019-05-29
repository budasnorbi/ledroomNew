const {generateTemplateFiles} = require('generate-template-files');

const createConfig = (optionName, entryFolderPath) => ({
  option: optionName,
  entry: {
    folderPath: entryFolderPath,
  },
  stringReplacers: ['__compName__'],
  output: {
    path: './src/__compName__',
  },
})

const SmartComponentWith_PROPTYPES_REDUX_EMOTION_LOCALUTILS = createConfig(`
1. Smart Component with:
  ✓ Redux
  ✓ PropTypes
  ✓ Emotion(css, styled included)
  ✓ LocalUtils
`, './templates/react-smart-all');

const SmartComponentWith_PROPTYPES_REDUX_EMOTION_EXCLUDE_UTILS = createConfig(`
2. Smart Component with:
  ✓ Redux
  ✓ PropTypes
  ✓ Emotion(css, styled included)
`, './templates/react-smart-exclude-utils');

const SmartComponentWith_PROPTYPES_REDUX_EMOTION_EXCLUDE_UTILS_EMOTION = createConfig(`
3. Smart Component with:
  ✓ Redux
  ✓ PropTypes
`, './templates/react-smart-exclude-utils-emotion');

const DumpComponentWith_PROPTYPES_EMOTION_LOCALUTILS = createConfig(`
4. Dumb Component with:
  ✓ PropTypes
  ✓ Emotion(css, styled included)
  ✓ LocalUtils
`, './templates/react-dumb-localutils');

const DumComponentWith_PROPTYPES_EMOTION_GLOBALUTILS = createConfig(`
5. Dumb Component with:
  ✓ PropTypes
  ✓ Emotion(css, styled included)
  ✓ GlobalUtils
`, './templates/react-dumb-globalutils');

const DumComponentWith_PROPTYPES_EMOTION_GLOBALUTILS_LOCALUTILS = createConfig(`
6. Dumb Component with:
  ✓ PropTypes
  ✓ Emotion(css, styled included)
  ✓ GlobalUtils
  ✓ LocalUtils
`, './templates/react-dumb-bothutils');

generateTemplateFiles([
  // Smart components
  SmartComponentWith_PROPTYPES_REDUX_EMOTION_LOCALUTILS,
  SmartComponentWith_PROPTYPES_REDUX_EMOTION_EXCLUDE_UTILS,
  SmartComponentWith_PROPTYPES_REDUX_EMOTION_EXCLUDE_UTILS_EMOTION,
  // Dumb components 
  DumpComponentWith_PROPTYPES_EMOTION_LOCALUTILS,
  DumComponentWith_PROPTYPES_EMOTION_GLOBALUTILS ,
  DumComponentWith_PROPTYPES_EMOTION_GLOBALUTILS_LOCALUTILS
]);