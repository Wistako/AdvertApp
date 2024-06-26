// selectors
export const getUser = ({ user }) => user;

// actions
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

// reducer
const user  = (statePart = null, action) => {
  switch (action.type) {
    case LOG_IN: {
      return action.payload;
    }
    case LOG_OUT: {
      return null;
    }
    default:
      return statePart;
  }
};

export default user;