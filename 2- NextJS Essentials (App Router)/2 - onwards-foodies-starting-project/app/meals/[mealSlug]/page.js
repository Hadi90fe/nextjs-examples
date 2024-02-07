import Image from 'next/image';

import { getMeal } from '@/lib/meals';

import styles from './page.module.css';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  !meal && notFound();

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailPage({ params }) {
  const meal = getMeal(params.mealSlug);
  !meal && notFound();

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  return <>
    <header className={styles.header}>
      <div className={styles.image}>
        <Image src={meal.image} alt={meal.title} fill priority={false} />
      </div>
      <div className={styles.headerText}>
        <h1>{meal.title}</h1>
        <p className={styles.creator}>
          by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
        </p>
        <p className={styles.summary}>
          {meal.summary}
        </p>
      </div>
    </header>
    <main>
      <p className={styles.instructions} dangerouslySetInnerHTML={{
        __html: meal.instructions,
      }}></p>
    </main>
  </>
}