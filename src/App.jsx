import { useCallback, useState } from 'react'
import './App.css'
import axios from 'axios'
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

      sendbackend(userProfile)
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    
  }
async function sendbackend(profile){
      const {data} =await axios.post('http://localhost:5000/api/users/social',{profile })
      console.log(data);
      setProfile(data)
}
  return (
  <>
   <LoginSocialGoogle
            isOnlyGetToken   
            client_id={(import.meta.env.VITE_GURI) || ''}
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

<br />
{
profile &&
<div>

<img src={profile.picture} alt="" />            
<h2>name {profile.name}</h2>
<h2><code>
  email : {profile.email}
  </code></h2>
</div>
}
    
  </>
  )
}

export default App
