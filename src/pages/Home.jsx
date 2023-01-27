import { useState } from "react"
import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal";


function Home() {

    const [showModal, setShowModal] = useState(false);

    const authToken = false;

    const handleClick = () => {
        setShowModal(true)
    }

    return (
        <div className="overlay">
            <Nav
                minimal={false}
                authToken={false}
                setShowModal={setShowModal}
                showModal = {showModal}
            />
            <div className='home'>
                <h1>Swipe Rigth</h1>
                <button className='primary-button' onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} />
                )}
            </div>
        </div>
    )
}

export default Home