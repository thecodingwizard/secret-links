import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		position: "fixed",
		bottom: "1.5rem",
		right: "1.5rem",
		[theme.breakpoints.down("sm")]: {
			bottom: "1rem",
			right: "1rem",
		}
	}
});

class HomePage extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				Home Page
				<br/>
				<Link to="/links/pandadevgroup">Example Link</Link>

				<Link to="/links/new">
					<Button variant="fab" color="secondary" aria-label="add" className={classes.button}>
						<AddIcon />
					</Button>
				</Link>
			</div>
		);
	}
}

export default withStyles(styles)(HomePage);