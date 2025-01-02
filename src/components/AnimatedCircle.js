import React from 'react';
import styles from './AnimatedCircle.module.css'; // Importez les styles en tant que module

const AnimatedCircle = ({ size, top, left, className }) => {
    const style = {
        width: size || '50px', // Taille par défaut
        height: size || '50px', // Taille par défaut
        top: top || '20px',     // Position par défaut
        left: left || '20px',   // Position par défaut
    };

    return <div className={`${styles.animatedCircle} ${styles[className]}`} style={style}></div>;
};

export default AnimatedCircle;
