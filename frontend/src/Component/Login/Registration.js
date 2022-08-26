import React from 'react'
import { useForm } from "react-hook-form";

const axios = require("axios")

const Registration = (props) => {
    const { register, handleSubmit } = useForm();
    const handleRegistration = async (data) => {
        data.userId = Math.floor(Math.random() * 100)
        axios.post(window.myApi + '/createUser', data)
            .then(function (response) {
                console.log(response);
                props.notif.info("Votre compte vient d'être crée, vous pouvez vous connecter")
                setTimeout(() => {
                    window.location.href = window.origin + "/login"
                }, 2000);
            })
            .catch(function (error) {
                if (error.response.data == "user already exist") {
                    props.notif.warning("le compte existe déjà")
                } else {
                    props.notif.danger("une erreur est survenu")
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
                <div className="col-lg-6 col-md-8 register-box">
                    <div className="col-lg-12 login-key">
                        <i className="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div className="col-lg-12 is-big anirm is-size-3">
                        Inscription
                    </div>

                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            
                            <div className="form-auth">
                            <form onSubmit={handleSubmit(handleRegistration)}>
                                <div className="form-group">
                                    <label className="form-control-label">PSEUDO</label>
                                    <input type="text" className="form-control" {...register('pseudo')} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">EMAIL</label>
                                    <input type="email" className="form-control" {...register('mail')} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">MOT DE PASSE</label>
                                    <input type="password" className="form-control" i {...register('password')} />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">CONFIRMATION</label>
                                    <input type="password" className="form-control" i {...register('password')} />
                                </div>

                                <div className="validation">
                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-12 login-btm login-button">
                                            <button type="submit" className="button is-active is-dark is-large is-rounded anirm">s'inscrire</button>
                                        </div>
                                    </div>
                                    <div className="text-light has-text-centered">
                                        <a href="/login"> <p className='is-underlined'>Pour se connecter cliquer ici</p></a>
                                    </div>
                                </div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2 text-light"></div>
                </div>
            </div>
        </div>

    )
}

export default Registration