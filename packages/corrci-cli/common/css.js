import { get } from 'lodash'
import { getCorrciConfig } from './constant'

function getCssLang () {
  const corrciConfig = getCorrciConfig()
  const preprocessor = get(corrciConfig, 'build.css.preprocessor', 'less')
  
  if (preprocessor === 'sass') {
    return 'scss'
  }
  
  return preprocessor
}

export const CSS_LANG = getCssLang()
