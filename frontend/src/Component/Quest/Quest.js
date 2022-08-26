import React from 'react'

const Quest = () => {

    let quests = [
        {
            title: "Foot à la pep",
            date: "12/04/2022",
            category: 2,
            description: "recherche plusieurs joueurs pour faire un match de foot à la pep le week-end",
            img: "",
        },
        {
            title: "Bascket à la pep",
            date: "11/04/2022",
            category: 2,
            description: "recherche plusieurs joueurs pour faire un match de basket à la pep le week-end",
            img: "",
        },
        {
            title: "promenade en forêt de haye",
            date: "15/04/2022",
            category: 3,
            description: "recherche plusieurs personnes pour faire une promande le week-end",
            img: "",
        },
        {
            title: "Boire un verre",
            date: "17/04/2022",
            category: 4,
            description: "Venez boire la bonne bière de la taverne",
            img: "",
        },
    ]
    return (
        <div className="quest-caroussel">
            <div className="columns">
                <div className="column  carous">
                    {quests.map((elem) => (
                        <div className="columsn">
                            <div className="column box">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-128x128">
                                            <img src="https://bulma.io/images/placeholders/540x480.png" alt="Placeholder image" />
                                        </figure>
                                    </div>
                                    <div class="card-content">

                                        <div class="content">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                            <a href="#">#css</a> <a href="#">#responsive</a>
                                            <br />
                                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Quest