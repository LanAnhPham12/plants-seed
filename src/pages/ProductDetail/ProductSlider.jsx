import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductSlider.module.css';

const ProductSlider = ({ images }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    const mainSettings = {
        asNavFor: nav2,
        ref: (slider) => setNav1(slider),
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
    };

    const thumbSettings = {
        asNavFor: nav1,
        ref: (slider) => setNav2(slider),
        slidesToShow: images.length < 4 ? images.length : 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        centerMode: true,
        arrows: false,
    };

    return (
        <div className={styles.sliderContainer}>
            <Slider {...mainSettings} className={styles.mainSlider}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Product ${index + 1}`} className={styles.mainImage} />
                    </div>
                ))}
            </Slider>
            <Slider {...thumbSettings} className={styles.thumbSlider}>
                {images.map((image, index) => (
                    <div key={index} className={styles.thumb}>
                        <img src={image} alt={`Thumbnail ${index + 1}`} className={styles.thumbImage} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductSlider;
