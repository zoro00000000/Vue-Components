const MarkdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const { slugify } = require('transliteration')
const highlight = require('./highlight')

const parser = new MarkdownIt({
    html: true,
    highlight
}).use(markdownItAnchor, {
    level: 2,
    slugify
})

module.exports = parser
