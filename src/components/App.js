import React from "react";
import { Route } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from "material-ui-icons/Search";

import HomePage from "./home/HomePage";
import ViewLinkPage from "./view-link/ViewLinkPage";

class App extends React.Component {
	render() {
		return (
			<div>
				<header>
					<AppBar position="static">
						<Toolbar>
							<IconButton className="toolbar__menu" color="inherit" aria-label="Menu">
								<MenuIcon />
							</IconButton>
							<Typography variant="title" color="inherit" className="toolbar__title">
								Secret Links
							</Typography>
							<IconButton color="inherit" aria-label="Search">
								<SearchIcon />
							</IconButton>
						</Toolbar>
					</AppBar>
				</header>
				<main>
					<Route path="/" exact component={HomePage} />
					<Route path="/links/:linkUrl" component={ViewLinkPage} />
				</main>
			</div>
		);
	}
}

export default App;