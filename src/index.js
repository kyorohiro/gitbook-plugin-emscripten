const GitBook   = require('gitbook-core');
const { React } = GitBook;

/**
 * @type {ReactClass}
 */
const EmscriptenBlock = React.createClass({
    propTypes: {
        url:       React.PropTypes.string.isRequired,
    },

    render() {
        const { url } = this.props;

        return (
            <div>{url}</div>
        );
    }
});

module.exports = GitBook.createPlugin({
    activate: (dispatch, getState, { Components }) => {
        dispatch(Components.registerComponent(EmscriptenBlock, { role: 'block:emscripten' }));
    }
});
