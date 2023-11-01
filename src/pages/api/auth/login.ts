import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { useCookies } from 'react-cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  
  if (req.method === 'POST') {
    
    try {
      const { data } = await axios.post('/login', req.body)
      setCookie( 'access_token', data.access_token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
  } else {
    res.status(405).end()
  }
}