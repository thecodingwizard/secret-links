import React from "react";
import { withStyles } from "material-ui/styles"
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

const styles = {
	form: {
		maxWidth: "30rem",
		margin: "0 auto"
	},
	button: {
		width: "100%",
		marginTop: "1.5rem"
	}
}

class NewLinkForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			link: "",
			description: "",
			accessUrl: "",
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
		const { name, link, description, accessUrl, password } = this.state;
		this.props.onSubmit({
			name, link, description, accessUrl, password
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<form className={classes.form} onSubmit={this.onSubmit}>
				<TextField
					id="name"
					label="Name"
					value={this.state.name}
					onChange={this.handleChange('name')}
					fullWidth
					helperText="Encrypted"
					margin="dense"/>
				<TextField
					id="url"
					label="Link"
					value={this.state.link}
					onChange={this.handleChange('link')}
					fullWidth
					required
					helperText="Encrypted"
					margin="dense"/>
				<TextField
					id="description"
					label="Description"
					value={this.state.description}
					onChange={this.handleChange('description')}
					fullWidth
					helperText="Encrypted"
					margin="dense"/>
				<TextField
					id="accessUrl"
					label="Access URL"
					value={this.state.accessUrl}
					onChange={this.handleChange('accessUrl')}
					fullWidth
					required
					helperText="Public"
					margin="dense"/>
				<TextField
					id="password"
					label="Password"
					value={this.state.password}
					onChange={this.handleChange('password')}
					fullWidth
					required
					helperText="Never Stored"
					type="password"
					margin="dense"/>
				<Button variant="raised" color="primary" className={classes.button} type="submit">
					Submit
				</Button>
			</form>
		);
	}
}

export default withStyles(styles)(NewLinkForm);