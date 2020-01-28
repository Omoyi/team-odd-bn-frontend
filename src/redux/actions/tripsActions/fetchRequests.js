import {
  FETCH_REQUESTS_SUCCESS,
  FETCH_REQUESTS_ERROR,
  FETCH_COMMENTS_SUCCESS,
  FETCH_SINGLE_REQUEST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_ERROR,
  UPDATE_COMMENT_INPUT,
  DELETE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  PAGINATION,
} from '../../actionTypes/tripActionTypes';
import apiCall from '../../../helpers/apiCall';
import {
  notificationError,
  notificationSuccess,
} from '../../../helpers/notificationPopUp';
import errorProcessor from '../../../helpers/errorProcessor';
import Paginate from '../../../helpers/Paginate';

export const updateCommentInputAction = (data) => ({
  type: UPDATE_COMMENT_INPUT,
  payload: data,
});
export const paginationAction = (data) => {
  if (data.data.length < data.paginationEnd) {
    data.paginationStart = data.data.length - 5;
    data.paginationEnd = data.data.length;
  }
  if (data.paginationEnd < 5) {
    data.paginationStart = 0;
    data.paginationEnd = 5;
  }


  return {
    type: PAGINATION,
    payload: data,
  };
};


export const commonAsyncAction = (url, actionType) => async (dispatch) => {
  try {
    const options = {
      headers: {
        token: localStorage.getItem('token'),
      },
    };
    const fetchRequestsResponse = await apiCall.get(url, options);
    dispatch({
      type: actionType,
      payload: fetchRequestsResponse.data,
    });
  } catch (error) {
    const err = errorProcessor(error);
    err.map((e) => notificationError(e));
    dispatch({
      type: FETCH_REQUESTS_ERROR,
      payload: error.response.data,
    });
  }
};
export const fetchRequestsAction = () => commonAsyncAction('/trips', FETCH_REQUESTS_SUCCESS);
export const fetchSingleRequestsAction = (tripRequestId) => commonAsyncAction(`/trips/${tripRequestId}`, FETCH_SINGLE_REQUEST_SUCCESS);
export const fetchRequestCommentsAction = (tripRequestId) => commonAsyncAction(`/trips/${tripRequestId}/comments`, FETCH_COMMENTS_SUCCESS);
export const postCommentsAction = (tripRequestId, data) => async (dispatch) => {
  try {
    const url = `/trips/${tripRequestId}/comment`;
    const options = {
      headers: {
        token: localStorage.getItem('token'),
      },
    };
    const fetchRequestsResponse = await apiCall.post(url, data, options);
    notificationSuccess(fetchRequestsResponse.data.message);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: fetchRequestsResponse.data,
    });
  } catch (error) {
    const err = errorProcessor(error);
    err.map((e) => notificationError(e));
    dispatch({
      type: CREATE_COMMENT_ERROR,
      payload: error.response.data,
    });
  }
};
export const deleteCommentAction = (commentId) => async (dispatch) => {
  try {
    const url = `/trips/delete/${commentId}`;
    const options = {
      headers: {
        token: localStorage.getItem('token'),
      },
    };
    const fetchRequestsResponse = await apiCall.delete(url, options);
    notificationSuccess(fetchRequestsResponse.data.message);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: fetchRequestsResponse.data,
    });
  } catch (error) {
    const err = errorProcessor(error);
    err.map((e) => notificationError(e));
    dispatch({
      type: DELETE_COMMENT_ERROR,
      payload: error.response.data,
    });
  }
};
