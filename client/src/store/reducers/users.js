import {
  GET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  TOGGLE_USER_DIALOG,
  SELECT_USER,
  SELECT_ALL_USERS
} from '../types';

const initialState = {
  users: [],
  selectedUsers: [],
  openDialog: false
};

const toggleUserDialog = state => ({
  ...state,
  openDialog: !state.openDialog
});

const selectUser = (state, payload) => {
  const { selectedUsers } = state;

  const selectedIndex = selectedUsers.indexOf(payload);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedUsers, payload);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedUsers.slice(1));
  } else if (selectedIndex === selectedUsers.length - 1) {
    newSelected = newSelected.concat(selectedUsers.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedUsers.slice(0, selectedIndex),
      selectedUsers.slice(selectedIndex + 1)
    );
  }

  return {
    ...state,
    selectedUsers: newSelected
  };
};

const selectAllUsers = state => ({
  ...state,
  selectedUsers: !state.selectedUsers.length
    ? state.users.map(user => user._id)
    : []
});

const getUsers = (state, payload) => ({
  ...state,
  users: payload
});

const addUser = (state, payload) => ({
  ...state,
  users: [...state.users, payload]
});

const updateUser = (state, payload) => ({
  ...state,
  users: [...state.users.filter(user => user._id !== payload._id), payload]
});

const deleteUser = (state, payload) => ({
  ...state,
  users: state.users.filter(user => user._id !== payload),
  selectedUsers: state.selectedUsers.filter(element => element !== payload)
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return getUsers(state, payload);
    case TOGGLE_USER_DIALOG:
      return toggleUserDialog(state);
    case SELECT_USER:
      return selectUser(state, payload);
    case SELECT_ALL_USERS:
      return selectAllUsers(state);
    case ADD_USER:
      return addUser(state, payload);
    case UPDATE_USER:
      return updateUser(state, payload);
    case DELETE_USER:
      return deleteUser(state, payload);
    default:
      return state;
  }
};
