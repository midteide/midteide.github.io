import React, { useState, useEffect} from 'react';
import styles2 from './components/moviesearch/Moviesearch.module.css';
import styles from './components/moviesearch/movie.module.css';
import Movies from './components/moviesearch/Movies'

export function Moviesearch() {
  return (
    <div className={`${styles.Movie} ${styles2.Moviesearch}`}>
      <Movies />
    </div>
  );
}


