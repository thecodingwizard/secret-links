import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
	container: {
		maxWidth: "25rem",
		margin: "0 auto"
	},
	center: {
		textAlign: "center"
	},
	visitLink: {
		textDecoration: "none",
		marginTop: "1rem",
		display: "block"
	},
	description: {
		textAlign: "center",
		margin: "1rem 0"
	}
};

class LinkInfo extends React.Component {
	render() {
		const { classes, link } = this.props;
		return (
			<div className={classes.container}>
				<Typography variant="headline" className={classes.center}>
					{link.name || "[No Title]"}
				</Typography>
				<Typography className={classes.center}>
					Link: <a href={link.link}>{link.link}</a>
					<br/>
					Access URL: <a href={`/links/${link.accessUrl}`}>{`/links/${link.accessUrl}`}</a>
				</Typography>
				{link.description && <Typography className={classes.description}>{link.description}</Typography>}
				<a href={link.link} className={classes.visitLink}>
					<Button variant="contained" color="primary" fullWidth>
						Visit Link
					</Button>
				</a>
			</div>
		);
	}
}

export default withStyles(styles)(LinkInfo);