import React from 'react'
import {remote} from 'electron'
import WebView from './components/webview'
import getPlayer from './helpers/Player'
import config from './config/app'
import classNames from 'classnames'
const {Tray, Menu, screen} = remote;

const propTypes = {};
const defaultProps = {};

class ReactApp extends React.Component {
	constructor(props) {
		super(props);
		this.timeOut = null;
		this.state = {
			locked: remote.getCurrentWindow().isAlwaysOnTop(),
			player: null,
			size: config.initialSize,
			mouseIn: false
		};
	}

	componentDidUpdate() {
		let win = remote.getCurrentWindow();
		win.setAlwaysOnTop(this.state.locked);
		win.setSize(parseInt(config.width * this.state.size), parseInt(config.height * this.state.size + (this.state.locked ? 0 : config.headerHeight)));
		this.buildMenu();
	}

	buildMenu() {
		let tray = remote.getGlobal('tray');
		let contextMenu = Menu.buildFromTemplate([
			{label: 'Lock', type: 'checkbox', enabled: !!this.state.player, checked: this.state.locked, click: this.__lock.bind(this)},
			{label: 'Interactive', type: 'checkbox', enabled: !!this.state.player, checked: this.state.locked, click: this.__lock.bind(this)},
			{type: 'separator'},
			{label: 'Exit', role: 'quit'},
		]);
		tray.setToolTip(config.appName);
		tray.setContextMenu(contextMenu);
	}

	componentDidMount() {
		this.buildMenu();

		let win = remote.getCurrentWindow();
		win.on('minimize', () => {
			if (this.state.locked) {
				win.showInactive();
			}
		});
	}

	__lock() {
		if (!this.state.player) {
			return;
		}
		this.setState({
			locked: !this.state.locked
		})
	}

	_zoomIn() {
		this.setState({
			size: this.state.size + 0.2
		})
	}

	_zoomOut() {
		if (this.state.size <= config.initialSize) {
			return;
		}
		this.setState({
			size: this.state.size - 0.2
		})
	}

	_home() {
		this.setState({
			player: null
		}, () => {
			this.refs.urlInput.value = '';
		})
	}

	_quit() {
		remote.app.quit();
	}

	_listenMouse() {
		clearTimeout(this.timeOut);
		this.setState({
			mouseIn: true
		}, () => {
			this.timeOut = setTimeout(() => {
				this.setState({
					mouseIn: false
				})
			}, 1000)
		});
	}

	_search(event) {
		event.preventDefault();
		this.setState({
			player: getPlayer(this.refs.urlInput.value)
		})
	}

	renderHeader() {
		if (this.state.locked) {
			return null
		}
		return (
			<div className="header">
				<ul className="nav nav-pills">
					<li className="dragable">
						<img title={config.appName} src="assets/images/icon.ico" />
					</li>
					<li>
						<a title="New Link" className="btn btn-default" onClick={this._home.bind(this)} href="#">
							<i className="fa fa-plus-square-o" />
						</a>
					</li>
					<li>
						<a title="Lock" disabled={!this.state.player} className="btn btn-default" onClick={this.__lock.bind(this)} href="#">
							<i className="fa fa-lock" />
						</a>
					</li>
					<li>
						<a title="Zoom in" className="btn btn-info" disabled={this.state.size <= config.initialSize} onClick={this._zoomOut.bind(this)} href="#">
							<i className="fa fa-compress" />
						</a>
					</li>
					<li>
						<a title="Zoom out" className="btn btn-info" onClick={this._zoomIn.bind(this)} href="#">
							<i className="fa fa-expand" />
						</a>
					</li>
					<li className="pull-right">
						<a title="Quit" className="btn btn-danger" onClick={this._quit} href="#">
							<i className="fa fa-power-off" />
						</a>
					</li>
				</ul>
			</div>
		)
	}

	renderControls() {
		if (this.state.player) {
			return null
		}
		return (
			<div className="container-fluid">
				<form onSubmit={this._search.bind(this)}>
					<div className="input-group">
						<input ref="urlInput" type="text" className="form-control" placeholder="Enter URL" />
						<span className="input-group-btn">
						<button className="btn btn-default" type="submit">Go!</button>
					</span>
					</div>
				</form>
			</div>
		)
	}

	renderOverlay() {
		return (
			<div className="overlay" onDoubleClick={this.__lock.bind(this)} onMouseMove={this._listenMouse.bind(this)}>
				<div className={classNames('unlock', {display: this.state.mouseIn})}>
					<a className="icon dragable" href="#" onClick={this.__lock.bind(this)}>
						<i className="fa fa-arrows" />
					</a>
				</div>
			</div>
		)
	}

	renderPlayer() {
		const {locked, player} = this.state;
		if (!player) {
			return null
		}
		return (
			<div>
				{locked && this.renderOverlay()}
				<WebView key={player.url} url={player.url} css={player.css} executeJavaScript={player.js} afterLoad={() => {{this._zoomIn(); this._zoomOut()}}} />
			</div>
		)
	}

	render() {
		return <div>
			{this.renderHeader()}
			<div className="app">
				{this.renderControls()}
				{this.renderPlayer()}
			</div>
		</div>;
	}
}

ReactApp.propTypes = propTypes;
ReactApp.defaultProps = defaultProps;

export default ReactApp;