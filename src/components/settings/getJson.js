import axios from 'axios'
import { apiEndpoints } from '@/api'

export const getPromos = async (token) => {
  try {
    const conf = {
      params: {
        state: true
      },
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    }
    const response = await axios.get(apiEndpoints.promo, conf)
    return response.data
  } catch (error) {
    console.error('Error retrieving promo codes: ', error)
  }
}
