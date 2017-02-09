import React from 'react'

const propTypes = {};
const defaultProps = {};

class WebView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_onLoad() {
		this.refs.view.executeJavaScript(this.props.executeJavaScript, );
		this.refs.view.insertCSS(this.props.css);
		setTimeout(this.props.afterLoad, 1000);
	}

	componentDidMount() {
		this.refs.view = this.refs.main.childNodes[0];
		this.refs.view.addEventListener('did-finish-load', this._onLoad.bind(this));
	}

	render() {
		const webview = `<webview class="embed-responsive-item" style="height: 100%; width: 100%" id="view" src="${this.props.url}" plugins ></webview>`;
		return <div className="embed-responsive embed-responsive-4by3" ref="main" dangerouslySetInnerHTML={{__html: webview}}></div>;
	}
}

WebView.propTypes = propTypes;
WebView.defaultProps = defaultProps;

export default WebView;