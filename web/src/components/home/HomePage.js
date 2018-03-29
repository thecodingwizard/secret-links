import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
	render() {
		return (
			<div>
				Home Page
				<br/>
				<Link to="/links/pandadevgroup">Example Link</Link>
			</div>
		);
	}
}

export default HomePage;