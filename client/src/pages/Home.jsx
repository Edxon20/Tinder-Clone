import { useState } from "react"
import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal";


function Home() {

    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);

    const authToken = false;

    const handleClick = () => {
        setIsSignUp(true)
        setShowModal(true)
        
    }

    return (
        <div className="overlay">
            <Nav
                minimal={false}
                authToken={false}
                setShowModal={setShowModal}
                showModal = {showModal}
                setIsSignUp = {setIsSignUp}
            />
            <div className='home'>
                <h1 className="primary-title">Swipe Rigth</h1>
                <button className='primary-button' onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
                )}
            </div>
        </div>
    )
}

export default Home