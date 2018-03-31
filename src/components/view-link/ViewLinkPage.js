import React from "react";
import { connect } from "react-redux";
import Fade from 'material-ui/transitions/Fade';
import { LinearProgress } from "material-ui/Progress";

import EnterPassword from "../common/enter-password/EnterPassword"

import * as linksActions from "../../actions/links.actions";

class ViewLinkPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			accessUrl: null,
			link: null
		};

		this.handlePassword = this.handlePassword.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const accessUrl = nextProps.match.params.accessUrl;
		if (accessUrl && accessUrl !== nextProps.accessUrl) {
			prevState.accessUrl = accessUrl;
		}

		return null;
	}

	handlePassword(password) {
		this.props.getLink(this.state.accessUrl, password);
	}

	render() {
		const { loading } = this.props;
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
							disabled={loading}/>
					}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		accessUrl: state.links.accessUrl,
		loading: state.links.loading,
		error: state.links.error,
		link: state.links.link
	};
}

export default connect(mapStateToProps, { ...linksActions })(ViewLinkPage);