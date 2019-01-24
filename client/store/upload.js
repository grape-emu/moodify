import axios from 'axios'

// action types
export const GET_IMAGE_UPLOAD = 'GET_IMG_UPLOAD'

// action creators
export const getImageUpload = file => ({type: GET_IMAGE_UPLOAD, file})

//thunk creators
export const receiveImageUpload = file => {
  return async dispatch => {
    const {data} = await axios.get('/api/s3/post_file')
    dispatch(getImageUpload(data))
  }
}

const initialState = {
  file: null
}

const upload = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGE_UPLOAD:
      // stuff definitely happens here
      return something
    default:
      return state
  }
}

export default upload
