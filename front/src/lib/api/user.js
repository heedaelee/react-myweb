import axios from 'axios'
import queryString from 'query-string'

export const getProfile = username => axios.get(`/api/profile/${username}`)