import warehouse from "./data/warehouse.json";
import orders from "./data/orders.json";
import fs from "fs";

// saving data functions
export function saveData(data: any, file: string): string {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(
    require("path").resolve(__dirname, `./data/${file}.json`),
    stringifyData
  );
  return "Data saved!";
}

// fetching data functions
export function getData(file: string): string {
  const jsonData: any = fs.readFileSync(require("path").resolve(__dirname, `./data/${file}.json`));
  return JSON.parse(jsonData);
}

exports.utils = { saveData, getData };
