import * as fromActions from "../actions";

const initialState = {
	link: null,
	loading: false,
	error: null,
	accessUrl: null
};

const linksReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.CREATE_NEW_LINK:
		case fromActions.GET_LINK: {
			return {
				...state,
				loading: true,
				link: null
			};
		}
		case fromActions.CREATE_NEW_LINK_SUCCESS: {
			return {
				...state,
				loading: false,
				accessUrl: action.accessUrl,
				error: null
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
				link: action.link,
				accessUrl: action.link.accessUrl,
				error: null
			}
		}
		case fromActions.GET_LINK_FAIL: {
			return {
				...state,
				loading: false,
				error: action.message,
				link: null
			};
		}
		case fromActions.RESET_LINK: {
			return {
				...state,
				link: null,
				error: null,
				loading: false,
				accessUrl: null
			};
		}
		default: {
			return state;
		}
	}
};

export default linksReducer;