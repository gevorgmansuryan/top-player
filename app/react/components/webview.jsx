import React from 'react'

const propTypes = {};
const defaultProps = {};

class WebView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	_onLoad() {
		this.refs.view.executeJavaScript(this.props.executeJavaScript);
		setTimeout(() => {
            this.props.afterLoad();
            this.setState({
                loading: false
			});
		}, 1000);
	}

	componentDidMount() {
		this.refs.view = this.refs.main.childNodes[0];
		this.refs.view.addEventListener('did-finish-load', this._onLoad.bind(this));
		this.refs.view.addEventListener('did-get-response-details', () => {
            this.refs.view.insertCSS(this.props.css);
		});
	}

	render() {
		const webview = `<webview class="embed-responsive-item" style="height: 100%; width: 100%" id="view" src="${this.props.url}" plugins ></webview>`;
		let styles = {};
		if (this.state.loading) {
            styles.opacity = 0;
		}
		return (
			<div
				style={styles}
				className="embed-responsive embed-responsive-4by3"
				ref="main"
				dangerouslySetInnerHTML={{__html: webview}}
			/>
		);
	}
}

WebView.propTypes = propTypes;
WebView.defaultProps = defaultProps;

export default WebView;