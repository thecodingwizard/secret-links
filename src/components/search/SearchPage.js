import React from "react";
import Typography from "@material-ui/core/Typography";
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { getLink, resetLink } from "../../actions/links.actions";

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
		fontSize: "2rem",
		marginTop: "4rem",
	},
	button: {
		marginTop: "1rem"
	},
	error: {
		color: "red"
	}
};

class SearchPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			search: "",
			password: ""
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!nextProps.loading && !nextProps.error && nextProps.accessUrl === prevState.search) {
			nextProps.history.push(`/links/${nextProps.accessUrl}`);
		}

		return null;
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	onSubmit(e) {
		e.preventDefault();
		this.props.getLink(this.state.search, this.state.password);
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

					{
						this.props.error &&
						<Typography variant="subheading" className={classes.error}>
							Error: {this.props.error}
						</Typography>
					}

					<TextField
						id="search"
						label="Access URL"
						value={this.state.search}
						onChange={this.handleChange('search')}
						helperText="Do not enter slashes"
						margin="dense"
						required
						fullWidth />
					<TextField
						id="password"
						label="Password"
						fullWidth
						value={this.state.password}
						onChange={this.handleChange('password')}
						type="password"
						required
						margin="dense"/>
					
					<Button variant="contained" color="primary" className={classes.button} type="submit">
						Go
					</Button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		loading: state.links.loading,
		error: state.links.error,
		link: state.links.link,
		accessUrl: state.links.accessUrl
	};
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	getLink: (accessUrl, password) => dispatch(getLink(accessUrl, password)),
	resetLink: () => dispatch(resetLink())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchPage));