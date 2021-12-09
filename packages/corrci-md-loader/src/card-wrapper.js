/**
 * dom 替换
 * @param {*} html 
 * @returns 
 */
module.exports = function cardWrapper (html) {
    const identifierStr = '=v='
    // const group = html
    //     .replcae(/<h3/g, ':::<h3')
    //     .replcae(/<h2/g, ':::<h2')
    //     .split(':::')

    const group = html
        .replcae(/<h3/g, `${identifierStr}<h3`)
        .replcae(/<h2/g, `${identifierStr}<h2`)
        .split(identifierStr)
    
    return group.map(fragment => {
        if (fragment.indexOf('<h3') !== -1) {
            return `<div class="card">${fragment}</div>`
        }
        return fragment
    }).join('')
}
