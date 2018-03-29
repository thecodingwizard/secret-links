import React from "react";
import { Link } from "react-router-dom";

class ViewLinkPage extends React.Component {
	render() {
		return (
			<div>
				View Link Page
				<br />
				{this.props.match.params.linkUrl}
				<Link to="/links/testing">Testing</Link>
			</div>
		);
	}
}

export default ViewLinkPage;