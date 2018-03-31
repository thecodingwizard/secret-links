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

		this.handleClick = this.handleClick.bind(this);
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleClick(e) {
		e.preventDefault();
		this.props.onSubmit(this.state.password);
	}

	render() {
		return (
			<form className="enter-password">
				<Typography variant="headline" className="enter-password__title">
					Enter Password
				</Typography>
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
					<Button variant="raised" size="large" color="primary" onClick={this.handleClick} type="submit">
						Submit
					</Button>
				</div>
			</form>
		);
	}
}