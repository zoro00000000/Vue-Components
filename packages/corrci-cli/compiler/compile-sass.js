const { renderSync } = require('sass')

async function compileSass (filePath) {
  const { css } = renderSync({ file: filePath })
  return css
}

exports.compileSass = compileSass
