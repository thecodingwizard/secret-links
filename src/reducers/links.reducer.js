import * as fromActions from "../actions";

const initialState = {
	link: "initial",
	linkUrl: null,
	loading: false
};

const linksReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.CREATE_NEW_LINK: {
			return {
				...state,
				loading: true
			};
		}
		default: {
			return state;
		}
	}
};

export default linksReducer;