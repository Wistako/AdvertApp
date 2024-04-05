import { API_URL } from "../config";

// selectors
export const getAdverts = ({ adverts }) => adverts.data;
export const getRequest = ({ adverts }) => adverts.request;
export const getSearchResult = ({ adverts }) => adverts.searchResult;

export const getAdvertById = ({ adverts }, advertId) => adverts.data.find(advert => advert._id === advertId);

// action name creator
const reducerName = "adverts";
const createActionName = name => `app/${reducerName}/${name}`;

// action types

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

export const LOAD_ADVERTS = createActionName("LOAD_ADVERTS");
export const ADD_ADVERT = createActionName("LOAD_ADVERT");
export const UPDATE_ADVERT = createActionName("UPDATE_ADVERT");
export const DELETE_ADVERT = createActionName("DELETE_ADVERT");
export const SEARCH_ADVERT = createActionName("SEARCH_ADVERT");

export const startRequest = payload => ({ type: START_REQUEST, payload });
export const endRequest = payload => ({ type: END_REQUEST, payload });
export const errorRequest = payload => ({ type: ERROR_REQUEST, payload });

export const loadAdverts = payload => ({ type: LOAD_ADVERTS, payload });
export const addAdvert = payload => ({ type: ADD_ADVERT, payload });
export const updateAdvert = payload => ({ type: UPDATE_ADVERT, payload });
export const deleteAdvert = payload => ({ type: DELETE_ADVERT, payload });
export const searchAdvert = payload => ({ type: SEARCH_ADVERT, payload });

/* thunk creators */
export const loadAdvertsRequest = () => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await fetch(`${API_URL}/api/ads`);
      res = await res.json();
      dispatch(loadAdverts(res));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const addAdvertRequest = advert => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await fetch(`${API_URL}/api/ads`, {
        method: "POST",
        Credential: 'include',
        body: advert
      });
      res = await res.json();
      dispatch(addAdvert(res));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const updateAdvertRequest = advert => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await fetch(`${API_URL}/api/ads/${advert.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(advert)
      });
      res = await res.json();
      dispatch(updateAdvert(res));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
}

export const deleteAdvertRequest = id => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await fetch(`${API_URL}/api/ads/${id}`, {
        method: "DELETE"
      });
      res = await res.json();
      dispatch(deleteAdvert(res));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const searchAdvertRequest = searchPhrase => {
  return async dispatch => {
    dispatch(startRequest());
    try {
      let res = await fetch(`${API_URL}/api/ads/search/${searchPhrase}`);
      res = await res.json();
      dispatch(searchAdvert(res));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
}

/* reducer */

const adverts = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ADVERTS:
      return { ...state, data: action.payload };
    case ADD_ADVERT:
      return { ...state, data: [...state.data, action.payload] };
    case UPDATE_ADVERT:
      return {
        ...state,
        data: state.data.map(advert =>
          advert.id === action.payload.id ? action.payload : advert
        )
      };
    case DELETE_ADVERT:
      return {
        ...state,
        data: state.data.filter(advert => advert._id !== action.payload.id)
      };
    case SEARCH_ADVERT:
      return { ...state, searchResult: action.payload };

    case START_REQUEST:
      return { ...state, request: { pending: true, error: null } };
    case END_REQUEST:
      return { ...state, request: { pending: false, error: null } };
    case ERROR_REQUEST:
      return { ...state, request: { pending: false, error: action.payload } };
    default:
      return state;
  }
};

export default adverts;
