import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SwipeableDrawer from 'material-ui/SwipeableDrawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from "material-ui-icons/Search";
import HomeIcon from "material-ui-icons/Home";
import AddIcon from "material-ui-icons/Add";

import HomePage from "./home/HomePage";
import ViewLinkPage from "./view-link/ViewLinkPage";
import NewLinkPage from "./new-link/NewLinkPage";
import SearchPage from "./search/SearchPage";

const styles = {
	list: {
		width: 300,
	},
	resetLink: {
		color: "inherit",
		textDecoration: "none"
	}
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drawerOpen: false
		};
	}

	toggleDrawer = (open) => () => {
		this.setState({
			drawerOpen: open
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<header>
					<AppBar position="static">
						<Toolbar>
							<IconButton className="toolbar__menu" color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
								<MenuIcon/>
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
				<SwipeableDrawer
					open={this.state.drawerOpen}
					onClose={this.toggleDrawer(false)}
    			    onOpen={this.toggleDrawer(true)}>
					<div
						tabIndex={0}
						role="button"
						onClick={this.toggleDrawer(false)}
						onKeyDown={this.toggleDrawer(false)}>
						<div className={classes.list}>
							<List>
								<Link to="/" className={classes.resetLink}>
									<ListItem button>
										<ListItemIcon>
											<HomeIcon />
										</ListItemIcon>
										<ListItemText primary="Home" />
									</ListItem>
								</Link>
								<Link to="/search" className={classes.resetLink}>
									<ListItem button>
										<ListItemIcon>
											<SearchIcon />
										</ListItemIcon>
										<ListItemText primary="Search" />
									</ListItem>
								</Link>
								<Link to="/links/new" className={classes.resetLink}>
									<ListItem button>
										<ListItemIcon>
											<AddIcon />
										</ListItemIcon>
										<ListItemText primary="Create New Link" />
									</ListItem>
								</Link>
							</List>
						</div>
					</div>
				</SwipeableDrawer>
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

export default withStyles(styles)(App);