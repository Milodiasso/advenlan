import React, { useEffect, useState } from 'react'
import Map from './Map'
import Profil_side from './Profil_side'
import Chat from './Chat'
import Caroussel from './CarousselQuest.js'


const Home = (props) => {
    const [user, setUser] = useState('')
    useEffect(() => {
        // setTimeout(() => {
        //     props.setToken("lol")

        // }, 500)
        // setTimeout(() => {
        //     console.log(props.token)

        // }, 3000)

    }, [])
    return (
        <div className="home ">
            <div id="city" className='city'>
                <img src="assets/forest_anime.png" alt="city" />
            </div>
            <div className="profil_side">
                <Profil_side notif={props.notif} setUser={props.setUser} />
            </div>
            <div className="page">
                <div className="columns">
                    <div className="column">
                        {/* <p className="is-7 has-text-italic">Welcome to Questland</p> */}
                    </div>
                </div>
                <div className="map_city columns mr-2">
                    <div className="column">
                        <Map />
                    </div>
                    <div className="column">
                        <Chat notif={props.notif} user={user} />
                    </div>
                </div>
                {/* <h1 className='title'>Quêtes actuelles</h1> */}
                <div className="columns ">
                    <div className="column level">
                        <div className="buttons level-item is-rounded ">
                            <button class="button is-warning is-light anirm is-size-3">Les Quêtes du Jour</button>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <Caroussel />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
