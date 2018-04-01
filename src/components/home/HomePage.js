import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from 'material-ui/styles';
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import AddIcon from "material-ui-icons/Add";

const styles = theme => ({
	container: {
		maxWidth: "30rem",
		margin: "0 auto",
		padding: "1.5rem 1rem",
		textAlign: "center",
	},
	title: {
		textAlign: "center",
		fontSize: "2rem",
		marginBottom: "1rem"
	},
	button: {
		margin: theme.spacing.unit,
		position: "fixed",
		bottom: "1.5rem",
		right: "1.5rem",
		[theme.breakpoints.down("sm")]: {
			bottom: "1rem",
			right: "1rem",
		}
	},
	text: {
		margin: "1rem 0"
	}
});

class HomePage extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				<div className={classes.container}>
					<Typography variant="headline" className={classes.title}>
						Secret Links
					</Typography>
					<Typography className={classes.text}>
						A simple Progressive Web App that lets you encrypt links.
					</Typography>
					<Typography className={classes.text}>
						Try it out! Start by clicking the "+" button on the bottom right corner.
					</Typography>
				</div>

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