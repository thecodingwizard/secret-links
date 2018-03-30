import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";

const middleware = process.env.NODE_ENV !== "production"
	? [
		require("redux-immutable-state-invariant").default()
	]
	: [];

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		process.env.NODE_ENV !== "production"
			? require("redux-devtools-extension").composeWithDevTools(
				applyMiddleware(...middleware)
			)
			: applyMiddleware(...middleware)
	);
}