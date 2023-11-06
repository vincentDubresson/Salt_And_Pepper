'use client';

import { useContext } from 'react';
import './globals.scss';
import styles from './page.module.scss';
import { AppContext } from './context/AppContext';

export default function Home() {
  const test = useContext(AppContext)?.test;

  return (
    <main className={styles.main}>
      <h1>{ test }</h1>
    </main>
  );
}
