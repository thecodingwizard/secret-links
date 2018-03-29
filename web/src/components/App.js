import React from "react";
import Button from 'material-ui/Button';
import { Route } from "react-router-dom";

import HomePage from "./home/HomePage";
import ViewLinkPage from "./view-link/ViewLinkPage";

class App extends React.Component {
	render() {
		return (
			<div>
				<Button variant="raised" color="primary">
					Hello World!
				</Button>
				<main>
					<Route path="/" exact component={HomePage} />
					<Route path="/links/:linkUrl" component={ViewLinkPage} />
				</main>
			</div>
		);
	}
}

export default App;