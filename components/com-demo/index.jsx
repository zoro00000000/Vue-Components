export const DemoProps = {
    type: {
        type: String,
        default: ''
    }
}

const ComDemo = () => {
    const DemoComponents = {}
    return {
        name: 'ComDemo',
        props: DemoProps,
        components: DemoComponents,
        render () {
            return (
                <div>这是个demo组件</div>
            )
        }
    }
}

export default ComDemo
