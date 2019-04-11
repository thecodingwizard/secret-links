import React from "react";
import { connect } from "react-redux";
import Fade from '@material-ui/core/Fade';
import LinearProgress from "@material-ui/core/LinearProgress";

import EnterPassword from "../common/enter-password/EnterPassword"
import LinkInfo from "./link-info/LinkInfo";

import * as linksActions from "../../actions/links.actions";

class ViewLinkPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accessUrl: null
		};

		this.handlePassword = this.handlePassword.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const accessUrl = nextProps.match.params.accessUrl;
		if (accessUrl && nextProps.link && accessUrl !== nextProps.link.accessUrl) {
			// Access URL changed
			nextProps.resetLink();
		}

		return {
			accessUrl
		};
	}

	handlePassword(password) {
		this.props.getLink(this.state.accessUrl, password);
	}

	componentWillUnmount() {
		this.props.resetLink();
	}

	render() {
		const { loading, error } = this.props;
		return (
			<div>
				<Fade
					in={loading}
					style={{
						transitionDelay: loading ? '800ms' : '0ms',
					}}>
					<LinearProgress color="secondary" />
				</Fade>
				<div className="page--padding">
					{
						!this.props.link &&
						<EnterPassword onSubmit={this.handlePassword}
							accessUrl={this.state.accessUrl}
							error={error}
							disabled={loading} />
					}
					{
						this.props.link &&
						<LinkInfo link={this.props.link} />
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		loading: state.links.loading,
		error: state.links.error,
		link: state.links.link
	};
}

export default connect(mapStateToProps, { ...linksActions })(ViewLinkPage);