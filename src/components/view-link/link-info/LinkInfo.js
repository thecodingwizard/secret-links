import React from "react";
import { withStyles } from 'material-ui/styles';
import Typography from "material-ui/Typography";

const styles = {
	container: {
		maxWidth: "25rem",
		margin: "0 auto"
	},
	center: {
		textAlign: "center"
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
				<Typography>
					<p className={classes.center}>
						Link: <a href={link.link}>{link.link}</a>
						<br/>
						Access URL: <a href={`/links/${link.accessUrl}`}>{`/links/${link.accessUrl}`}</a>
					</p>
					{link.description && <p>{link.description}</p>}
				</Typography>
			</div>
		);
	}
}

export default withStyles(styles)(LinkInfo);