import * as fromActions from "../actions";

const initialState = {
	link: "initial",
	linkUrl: null,
	loading: false,
	error: ""
};

const linksReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.CREATE_NEW_LINK:
		case fromActions.GET_LINK: {
			return {
				...state,
				loading: true
			};
		}
		case fromActions.CREATE_NEW_LINK_SUCCESS: {
			return {
				...state,
				loading: false
			};
		}
		case fromActions.CREATE_NEW_LINK_FAIL: {
			return {
				...state,
				loading: false,
				error: action.message
			};
		}
		case fromActions.GET_LINK_SUCCESS: {
			return {
				...state,
				loading: false,
				link: action.link
			}
		}
		case fromActions.GET_LINK_FAIL: {
			return {
				...state,
				loading: false,
				error: action.message
			};
		}
		default: {
			return state;
		}
	}
};

export default linksReducer;