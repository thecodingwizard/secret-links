import React from "react";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import "./EnterPassword.css";

export default class EnterPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: ""
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
		this.props.onSubmit(this.state.password);
	}

	render() {
		return (
			<form className="enter-password" onSubmit={this.onSubmit} autoComplete="off">
				<Typography variant="headline" className="enter-password__title">
					Enter Password
				</Typography>
				<Typography variant="subheading" className="enter-password__subtitle">
					Requesting /{this.props.accessUrl}
				</Typography>
				{
					this.props.error &&
					<Typography variant="subheading" className="enter-password__error">
						Error: {this.props.error}
					</Typography>
				}
				<TextField
					id="password"
					label="Password"
					fullWidth
					value={this.state.password}
					onChange={this.handleChange('password')}
					type="password"
					className="enter-password__input"
					required
					margin="normal"/>
				<div className="enter-password__submit">
					<Button variant="raised" size="large" color="primary" type="submit" fullWidth disabled={this.props.disabled}>
						Submit
					</Button>
				</div>
			</form>
		);
	}
}