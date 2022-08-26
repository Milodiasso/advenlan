import { useEffect, useState } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage';



const Start = (props) => {
    const [allCities, setAllCities] = useState([])
    const [localisation, setLocalisation] = useState([])
    useEffect(() => {
        let myHeaders = new Headers({
            "Content-Type": "application/json",
        });

        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };
        fetch(window.myApi + '/getAllCities', myInit)
            .then((response) => {
                response.json().then((res) => {
                    console.log(res);
                    setAllCities(res)
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function localiseRedirect(elem) {
        if (elem.name == undefined || elem.name == "") {
            props.notif.alert("Veuillez choisir une ville !");
        } else {
            reactLocalStorage.setObject("localisation", elem);
            window.location.href = "/home"
        }
    }

    return (
        <div className="    ">
            <div id="city" className='city'>
                <img src="assets/city_draw.png" alt="city" />
            </div>
            <div className="columns ">
                <div className="column is-12">
                    <p className="title anirm">Choisis ta ville d'aventures !</p>
                </div>
            </div>
            <div className='columns '>
                <div className="column ">
                    <div className="select is-link ">
                        <select className='anirm' onChange={(e) => (setLocalisation(allCities[e.target.value]))}>
                            <option value="">Veuillez choisir une ville</option>
                            {allCities.map((elem, key) => (
                                <option key={key} value={key}> {elem.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <button className='button is-active is-dark is-large is-rounded anirm' onClick={() => localiseRedirect(localisation)}>C'est parti !</button>
                </div>
            </div>
        </div>
    )
}

export default Start