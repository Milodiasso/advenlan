import axios from 'axios';
import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { setUserData } from '../../feature/userSlice';
import decode from "../utils/decodeToken"



const Login = (props) => {
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm();
    const handleRegistration = async (data) => {
        data.userId = Math.floor(Math.random() * 100)
        axios.post(window.myApi + '/login', data)
            .then(function (response) {
                console.log(response.data);
                props.notif.info("Connexion réussit")
                reactLocalStorage.set("token", response.data)
                dispatch(setUserData(decode.parseJwt(response.data)))
                setTimeout(() => {
                    window.location = "/home"
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
                if (error.response?.data == "All input is required") {
                    props.notif.warning("veuillez compléter tous les champs")
                } else {
                    props.notif.alert("saisie incorrect")
                }
            });
    }
    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="auth-bg">
                    <img src="assets/forest_anime.png" alt="forest" />
                </div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 is-big anirm is-size-3">
                        Connexion
                    </div>

                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <div className="form-auth">
                                <form onSubmit={handleSubmit(handleRegistration)}>
                                    <div className="form-group">
                                        <label className="form-control-label">EMAIL</label>
                                        <input type="email" className="form-control" {...register('mail')} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">MOT DE PASSE</label>
                                        <input type="password" className="form-control" {...register('password')} />
                                    </div>

                                    <div className="validation">
                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-12 login-btm login-button">
                                                <button type="submit" className="button is-active is-dark is-large is-rounded anirm">se connecter</button>
                                            </div>
                                        </div>
                                        <div className="text-light has-text-centered">
                                            <a href="/registration"> <p className='is-underlined'>Pour s'inscrire cliquer ici</p></a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>

    )
}

export default Login