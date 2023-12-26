import './App.css';
import { useState, useEffect } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import {  getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { auth, app } from './firebase-config'


const db = getFirestore(app)

function App() {

    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
      const q = query(collection(db, "messages"), orderBy("timestamp"))
      const unsubscribe = onSnapshot(q, snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
      return unsubscribe
    }, [])

    useEffect(() => {
      onAuthStateChanged(auth, user => {
        if(user){
          setUser(user)
        }
        else {
          setUser(null)
        }
      })
    }, [])

    const sendMessage = async () => {
      await addDoc(collection(db, "messages"), {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
        text: newMessage,
        timestamp: serverTimestamp()
      })
      setNewMessage("")
    }

    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider()

      try{
        const result = await signInWithPopup(auth, provider);
      }
      catch(err){
        console.log(err);
      }
    }

    return (
      <div className="App">
        {user ? (
          <>
            <div className='LogInfo'> 
              <p>Logged in as {user.displayName}</p>
              <button onClick={() => auth.signOut()} id='logout'>Logout</button>
            </div>

            {messages.map(msg => (
              <div key={msg.id} className='messageBox'> 
                <img 
                  src={msg.data.photoURL}
                />
                {msg.data.text}
              </div>
            ))}

            <input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
             <button onClick={sendMessage}>Send Message</button>
          </>
        ):
          <button onClick={handleGoogleLogin}>Sign-In With Google</button>
        }
      </div>
  )
}
export default App;
