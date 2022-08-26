import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { reactLocalStorage } from 'reactjs-localstorage';
import decode from "../utils/decodeToken"


const Profil = (props) => {
    const token = reactLocalStorage.get("token")
    const [user, setUser] = useState('')

    useEffect(async () => {
        if (token) {
            setUser(decode.parseJwt(token))
            console.log(user);

        } else {
            setUser("guest")
        }
    }, [])

    const { register, handleSubmit } = useForm();
    const handleRegistration = async (data) => {
        if (data.password1 != "" || data.password2 != "") {
            if (data.password1 == data.password2) {
                data.password = data.password1
                delete data.password1
                delete data.password2
            } else {
                props.notif.alert("les mot de passe doivent correspondre")
                return
            }
        } else {
            delete data.password1
            delete data.password2
            data.password = ""
        }
        if (data.url_avatar) {
            data.url_avatar = ""
        } else {
            data.url_avatar = JSON.stringify(data.url_avatar)
        }

        axios.put(window.myApi + '/updateUser', data, {
            headers:
                { "x-access-token": token }
        })
            .then(function (response) {
                console.log(response.data);
                window.location = "/home"

            })
            .catch(function (error) {
                props.notif.alert("Erreur, veuillez réessayer ultérieurement")
                console.log(error);
            });


    }

    return (
        <form className="mr-5" onSubmit={handleSubmit(handleRegistration)}>
            <div className="field is-horizontal level mb-6">

                <div className="field-body level-item">
                    <figure class="image is-128x128">
                        <div className="field ">

                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            <input className="input" type="file" {...register('url_avatar')} />
                        </div>
                        <div className="field-label is-normal">
                            <label className="label">Avatar</label>
                        </div>
                    </figure>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Nom</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder={user.lastName} {...register('lastName')} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Prénom</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder={user.firstName} {...register('firstName')} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">E-mail</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left has-icons-right">
                            <input className="input is-success email" type="email" placeholder={user.mail} {...register('mail')} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <span className="icon is-small is-right">
                                <i className="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Pays / ville</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Pays"  {...register('country')} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder="Ville" {...register('town')} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label">
                    <label className="label">Sexe</label>
                </div>
                <div className="field-body">
                    <div className="field is-narrow">
                        <div className="control">
                            <label className="radio">
                                <input type="radio" name="member" {...register('sexe')} value="Homme" />
                                <span className='pl-2' >Homme </span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="member" {...register('sexe')} value="Femme" />
                                <span className='pl-2'>Femme</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="member" {...register('sexe')} value="Transgenre" />
                                <span className='pl-2'>Transgenre</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="member" {...register('sexe')} value="Non-binaire" />
                                <span className='pl-2'>Non-binaire</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Pseudo</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded has-icons-left">
                            <input className="input" type="text" placeholder={user.pseudo} {...register('pseudo')} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Mot de passe</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <p className="control is-expanded ">
                            <input className="input" type="password" readOnly onFocus={(e) => e.target.removeAttribute('readonly')} placeholder="********" {...register('password1')} />
                        </p>
                    </div>
                    <div className="field">
                        <p className="control is-expanded ">
                            <input className="input" type="password" readOnly onFocus={(e) => e.target.removeAttribute('readonly')} placeholder="********" {...register('password2')} />
                        </p>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Téléphone</label>
                </div>
                <div className="field-body">
                    <div className="field is-expanded">
                        <div className="field has-addons">
                            <p className="control">
                                <a className="button is-static">
                                    +33
                                </a>
                            </p>
                            <p className="control is-expanded">
                                <input className="input" type="tel" placeholder="06 00 00 00 00" {...register('phone')} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="field is-horizontal">
                <div className="field-label is-normal">
                    <label className="label">Bio</label>
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <textarea className="textarea" placeholder="Est-ce que j'aime le sport, la bière et le cinéma?" {...register('bio')}></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div className="field is-horizontal">
                <div className="field-label">
                </div>
                <div className="field-body">
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary">
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form >
    )
}

export default Profil