import {BASE_URL} from '../constants';

export const API_LOGIN = `${BASE_URL}api/login`;
export const API_REGISTER = `${BASE_URL}api/register`;
export const API_LOGOUT = `${BASE_URL}api/logout`;
export const API_PROFILE = `${BASE_URL}api/user/detail`;
export const API_UPDATE_PROFILE = `${BASE_URL}api/updateProfile`;
export const API_CHANGE_AVATAR = `${BASE_URL}api//user/change-avatar`;
export const API_CHANGE_PASSWORD = `${BASE_URL}api/changePassword`;
export const API_CHECK_MAIL_EXITS = `${BASE_URL}api/emailExists`;

export const API_POSTS = `${BASE_URL}api/posts`;

export const API_SEND_FRIENDS_REQUEST = `${BASE_URL}api/friend/send-friend-request`;
export const API_SEARCH_FRIENDS = `${BASE_URL}api/friend/search-friends`;
export const API_ACCEPT_FRIENDS_REQUEST = `${BASE_URL}api/friend/accept-friend-request`;
export const API_REJECT_FRIENDS_REQUEST = `${BASE_URL}api/friend/reject-friend-request`;
export const API_CANCEL_FRIENDS_REQUEST = `${BASE_URL}api/friend/cancel-friend-request`;
export const API_RECEIVER_FRIENDS_REQUEST = `${BASE_URL}api/friend/received-friend-requests`;
export const API_CURRENT_FRIENDS = `${BASE_URL}api/friend/current-friends`;
export const API_SENT_FRIENDS_REQUEST = `${BASE_URL}api/friend/sent-friend-requests`;
export const API_SUGGEST_FRIENDS = `${BASE_URL}api/friend/suggest-friends`;
export const UNFRIEND = `${BASE_URL}api/friend/unfriend`;

export const API_MESSAGE = `${BASE_URL}api/message`;
