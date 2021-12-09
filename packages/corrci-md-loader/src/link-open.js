module.exports = function linkOpen (md) {
    const defaultRender = md.renderer.rules.link_open 
        || function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options)
        }
    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const aIndex = tokens[idx].attrIndex('target')
        
        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank'])
        }
        
        return defaultRender(tokens, idx, options, env, self)
    }    
}