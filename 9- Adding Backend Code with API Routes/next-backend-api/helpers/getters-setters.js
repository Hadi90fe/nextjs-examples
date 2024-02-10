import fs from "node:fs";
import path from "node:path";


// Interacting with database logic

export function getDataFilePath() {
    return path.join(process.cwd(), "data", "dummy-data.json");
}

// GETTERS (To serve - server side rendering)
export async function getData() {
    const filePath = getDataFilePath();
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// SETTERS (To set or store data comming from client side generally)
export async function setData(element) {
    const newElement = {
        id: new Date().toISOString(),
        email: element.email,
        text: element.text,
    };
    const filePath = getDataFilePath();
    const data = await getData();
    data.push(newElement);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return newElement;
}
