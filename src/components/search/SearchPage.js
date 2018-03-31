import React from "react";
import { connect } from 'react-redux'
import Typography from "material-ui/Typography";
import Fade from 'material-ui/transitions/Fade';
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";
import { withStyles } from 'material-ui/styles';

const styles = {
	container: {
		position: "relative",
		maxWidth: "30rem",
		margin: "0 auto",
		padding: "1.5rem 1rem",
		textAlign: "center",
	},
	title: {
		textAlign: "center",
		fontSize: "2rem"
	},
	button: {
		marginTop: "1rem"
	}
};

class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: ""
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	onSubmit(e) {
		e.preventDefault();
		this.props.history.push(`/links/${this.state.search}`);
	}
	
	render() {
		const { classes, loading } = this.props;
		return (
			<div>
				<Fade
					in={loading}
					style={{
						transitionDelay: loading ? '800ms' : '0ms',
					}}>
					<LinearProgress color="secondary" />
				</Fade>
				<form className={classes.container} onSubmit={this.onSubmit}>
					<Typography variant="headline" className={classes.title}>
						Go To Link
					</Typography>

					<TextField
						id="search"
						label="Access URL"
						value={this.state.search}
						onChange={this.handleChange('search')}
						helperText="Do not enter slashes"
						margin="normal"
						fullWidth />
					
					<Button variant="raised" color="primary" className={classes.button}>
						Go
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	loading: state.links.loading,
	error: state.links.error
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchPage));