import { useCallback, useState } from 'react'
import './App.css'

import {
  LoginSocialGoogle
} from 'reactjs-social-login'
function App() {
  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState(null)

  const onLoginStart = useCallback(() => {
    console.log(provider);
    
  }, [provider])

  const ontest = async (provider,data)=>{
    console.log(data);
    console.log(provider);
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userProfile = await response.json();
      console.log('User Profile:', userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    
  }
//"email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
  return (
  <>
   <LoginSocialGoogle
            isOnlyGetToken   
            client_id={'1094867572386-7k917l8bot2t0765tobts48u9qkkgrd1.apps.googleusercontent.com' || ''}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
             ontest(provider,data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <button>login</button>
            </LoginSocialGoogle>

    
  </>
  )
}

export default App
