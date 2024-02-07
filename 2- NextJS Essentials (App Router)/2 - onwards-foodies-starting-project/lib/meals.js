import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() { // simulate a promise function
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a promise delay
    // export function getMeals() {
    // throw new Error('Loading meals failed'); // simulate error
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const currentTime = getCurrentTime();
    const filename = `${meal.slug}-${currentTime}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!')
        };
    });
    meal.image = `/images/${filename}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES(
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);
}

function getCurrentTime() {
    var now = new Date();

    var currentHour = now.getHours();
    var currentMinute = now.getMinutes();
    var currentSecond = now.getSeconds();

    function padZero(number) {
        return (number < 10 ? '0' : '') + number;
    }
    var timeString = padZero(currentHour) + '-' + padZero(currentMinute) + '-' + padZero(currentSecond);
    return timeString;
}
