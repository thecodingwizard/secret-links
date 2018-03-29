import * as fromActions from "../actions";

const initialState = {
	link: "initial"
};

const linksReducer = (state = initialState, action) => {
	switch(action.type) {
		case fromActions.GET_LINK: {
			return {
				...state,
				link: "hello"
			};
		}
		default: {
			return state;
		}
	}
};

export default linksReducer;