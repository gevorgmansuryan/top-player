import React from 'react'
import moment from 'moment'

const propTypes = {};
const defaultProps = {};

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const body = this.props.data.map((item, key) => {
			return <tr key={item.player.url + key} onClick={this.props.onSelect.bind(null, item.player)}>
				<td>{item.player.url.substr(0, 35)}</td>
				<td>{moment(item.time).fromNow()}</td>
			</tr>
		});
		return <div>
			<hr />
			<table className="table table-striped table-hover ">
				<thead>
				<tr>
					<th>Date</th>
					<th>Link</th>
				</tr>
				</thead>
				<tbody>
				{body}
				</tbody>
			</table>
		</div>;
	}
}

History.propTypes = propTypes;
History.defaultProps = defaultProps;

export default History;