import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from "material-ui-icons/Search";

import HomePage from "./home/HomePage";
import ViewLinkPage from "./view-link/ViewLinkPage";
import NewLinkPage from "./new-link/NewLinkPage";
import SearchPage from "./search/SearchPage";

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
								<Link to="/">Secret Links</Link>
							</Typography>
							<Link to="/search"
								style={{ textDecoration: 'none', color: "inherit" }}>
								<IconButton color="inherit" aria-label="Search">
									<SearchIcon />
								</IconButton>
							</Link>
						</Toolbar>
					</AppBar>
				</header>
				<main>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/search" component={SearchPage} />
						<Route path="/links/new" component={NewLinkPage} />
						<Route path="/links/:accessUrl" component={ViewLinkPage} />
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;