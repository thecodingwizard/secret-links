import React from "react";
import Typography from "material-ui/Typography";
import { withStyles } from 'material-ui/styles';
import NewLinkForm from "./form/NewLinkForm";

const styles = {
	title: {
		textAlign: "center",
		fontSize: "2rem"
	}
};

class NewLinkPage extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Typography variant="headline" className={classes.title}>
					Create New Link
				</Typography>
				<NewLinkForm />
			</div>
		);
	}
}

export default withStyles(styles)(NewLinkPage);