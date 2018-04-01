import React from "react";
import { connect } from 'react-redux'
import Typography from "material-ui/Typography";
import Fade from 'material-ui/transitions/Fade';
import { LinearProgress } from "material-ui/Progress";
import { withStyles } from 'material-ui/styles';
import NewLinkForm from "./form/NewLinkForm";
import { createNewLink, resetLink } from "../../actions";

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

		this.state = {};

		this.onSubmit = this.onSubmit.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!nextProps.loading && !nextProps.error && nextProps.accessUrl) {
			nextProps.history.push(`/links/${nextProps.accessUrl}`);
		}

		return null;
	}

	componentWillUnmount() {
		this.props.resetLink();
	}

	onSubmit(data) {
		this.props.createNewLink(data);
	}

	render() {
		const { classes, loading, error } = this.props;
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
					{
						error &&
						<Typography variant="subheading" style={{ color: "red" }}>
							Error: {error}
						</Typography>
					}

					<NewLinkForm onSubmit={this.onSubmit} loading={loading}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	loading: state.links.loading,
	error: state.links.error,
	accessUrl: state.links.accessUrl
});
 
const mapDispatchToProps = (dispatch, ownProps) => ({
	createNewLink: data => dispatch(createNewLink(data)),
	resetLink: () => dispatch(resetLink())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewLinkPage));