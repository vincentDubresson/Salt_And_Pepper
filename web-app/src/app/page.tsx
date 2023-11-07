'use client';

import { useContext } from 'react';
import './globals.scss';
import styles from './page.module.scss';
import { AppContext } from '../context/AppContext';

export default function Home() {
  const recipesLoading = useContext(AppContext)?.recipesLoading;
  const recipes = useContext(AppContext)?.recipes;
  console.log(recipes);

  return (
    <main className={styles.main}>
      <h1>Hello</h1>
      {recipesLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {recipes &&
            recipes.map((recipe: any) => (
              <li key={recipe.node.id}>{recipe.node.label}</li>
            ))}
        </ul>
      )}
    </main>
  );
}
