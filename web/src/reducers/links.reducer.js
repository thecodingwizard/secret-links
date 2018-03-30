import * as fromActions from "../actions";

const initialState = {
	link: "initial",
	linkUrl: null
};

const linksReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.GET_LINK: {
			return {
				...state,
				link: "hello",
				linkUrl: action.accessUrl
			};
		}
		default: {
			return state;
		}
	}
};

export default linksReducer;