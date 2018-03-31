import React from "react";
import { Route } from "react-router-dom";

import HomePage from "./home/HomePage";
import ViewLinkPage from "./view-link/ViewLinkPage";

class App extends React.Component {
	render() {
		return (
			<div>
				<main>
					<Route path="/" exact component={HomePage} />
					<Route path="/links/:linkUrl" component={ViewLinkPage} />
				</main>
			</div>
		);
	}
}

export default App;