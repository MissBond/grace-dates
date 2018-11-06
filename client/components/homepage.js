import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';


    const HomePage = () => (
        <main className="core">
            <article className="left">
                <Carousel>
                    <Carousel.Item>
                        <img className="carousel-img"
                        src="https://preview.ibb.co/nkQiTV/grace-dates-home2.jpg"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel-img" src="https://preview.ibb.co/ednK2q/grace-dates-home1-copy.jpg"/>
                    </Carousel.Item>
                    <Carousel.Item>
                       <img className="carousel-img" src="https://preview.ibb.co/gB0NNq/grace-dates-home3-copy.jpg"/>
                    </Carousel.Item>
                </Carousel>

            </article>
            <article className="right"></article>
        </main>

    );
    export default HomePage
