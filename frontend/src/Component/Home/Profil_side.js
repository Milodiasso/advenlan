import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import decode from "../utils/decodeToken"

function Profil_side() {
    const [user, setUser] = useState("")
    const token = reactLocalStorage.get("token")

    useEffect(() => {
        if (token) {
            setUser(decode.parseJwt(token))
        } else {
            setUser("")
            console.log("token not found");
        }
    }, [])

    function logout() {
        localStorage.removeItem("token")
        setUser('')
    }


    return (
        <div className="columns m-2 profil">
            {user ?
                <div className="column">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-1by1">
                                <img src="./assets/mago.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4"> {user.pseudo} </p>
                                    {
                                        user.lastName && user.lastName ?
                                            <p className="subtitle is-6">{user?.lastName + ' ' + user?.firstName}</p> :
                                            ""
                                    }
                                </div>
                            </div>

                            <div className="content">
                                {user?.bio}
                                <br />
                            </div>
                            <div className="stats">
                                <figure className="image is-1by1">
                                    <img src="" alt="stats" />
                                </figure>
                            </div>
                        </div>
                        <a href="/profil"> <button className="button is-info is-outlined">Modifier</button></a>
                        <button onClick={logout} className="button is-danger is-outlined">Déconnexion</button>
                    </div>
                </div> :
                <div className="column">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-1by1">
                                <img src="./assets/ghost.png" alt="Ghost" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="text-light has-text-centered">
                                <a href="/registration"> <p className='is-underlined'>Pour s'inscrire cliquer ici</p></a>
                            </div>
                            <div className="text-light has-text-centered">
                                <a href="/login"> <p className='is-underlined'>Pour se connecter cliquer ici</p></a>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >

    )
}


export default Profil_side
