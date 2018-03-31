import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import "./HomePage.css"

class HomePage extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				Home Page
				<br/>
				<Link to="/links/pandadevgroup">Example Link</Link>

				<Link to="/links/new">
					<Button variant="fab" color="secondary" aria-label="add" className="home__fab">
						<AddIcon />
					</Button>
				</Link>
			</div>
		);
	}
}

export default HomePage;