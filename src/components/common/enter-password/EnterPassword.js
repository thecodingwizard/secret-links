import React from "react";
import Typography from "material-ui/Typography";
import TextField from "material-ui/TextField";
import "./EnterPassword.css";

export default class EnterPassword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			password: ""
		};
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		return (
			<div className="enter-password">
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
					margin="normal"/>
			</div>
		);
	}
}