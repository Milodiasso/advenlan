import React from 'react';
import Carousel from 'react-elastic-carousel';

const images = [];
images.push()
for (let i = 1; i < 5; i++) {
    const element = "assets/m (" + i + ").jpg"
    images.push(element)
}


const Caroussel = () => {

    const breakPoints = [
        { width: 600, itemsToShow: 1 },
        { width: 450, itemsToShow: 2 },
        { width: 200, itemsToShow: 3 },
        { width: 250, itemsToShow: 4 },
        { width: 200, itemsToShow: 5 },

    ]

    return (
        <div className="slide-container  boxed mr-4 "  >
            <Carousel itemsToShow={3} loop="infinite" enableAutoPlay={false} >
                {images.map((val, key) =>
                    <div key={key} className="columns px-5 is-12 medieval-paper hauteur mx-3   ">
                        <div className="column mx-5 mt-6 ">
                            <p className="  px-5 anirm" >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quisquam dolor eaque quis nobis, ex ea saepe, cumque animi quasi rerum? Inventore amet aspernatur eum recusandae dolores dolorem eaque cumque.
                            </p>
                        </div>
                    </div>
                )}
            </Carousel>
        </div>
    )

}


export default Caroussel;
