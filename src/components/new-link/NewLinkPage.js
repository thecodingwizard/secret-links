import React from "react";
import Typography from "material-ui/Typography";
import Fade from 'material-ui/transitions/Fade';
import { LinearProgress } from "material-ui/Progress";
import { withStyles } from 'material-ui/styles';
import NewLinkForm from "./form/NewLinkForm";

const styles = {
	container: {
		position: "relative",
		maxWidth: "30rem",
		margin: "0 auto",
		padding: "1.5rem 1rem"
	},
	title: {
		textAlign: "center",
		fontSize: "2rem"
	}
};

class NewLinkPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(data) {
		console.log(data);
		this.setState({
			loading: true
		});
	}

	render() {
		const { classes } = this.props;
		const { loading } = this.state;
		return (
			<div>
				<Fade
					in={loading}
					style={{
						transitionDelay: loading ? '800ms' : '0ms',
					}}>
					<LinearProgress color="secondary" />
				</Fade>
				<div className={classes.container}>
					<Typography variant="headline" className={classes.title}>
						Create New Link
					</Typography>

					<NewLinkForm onSubmit={this.onSubmit} loading={loading}/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(NewLinkPage);