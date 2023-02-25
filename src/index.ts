import express, { Request, Response, Application, NextFunction } from "express";
var bodyParser = require("body-parser");
import fs from "fs";
import { saveData, getData } from "./utils";

const PORT = process.env.PORT || 3001;
const app: Application = express();
const defaultSizes: any = ["S", "M", "L", "XL"];
const defaultQuality: any = ["Bad", "Ok", "Good", "Excellent"];

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Store API");
});

app.post(
  "/create/stock/:items/:stockInEachItemRange/",
  async (req: Request, res: Response) => {
    console.log(req.params.items);
    console.log(req.params.stockInEachItemRange);
    const numberOfItems: number = parseInt(req.params.items);
    const stockInEachItemRange: number = parseInt(
      req.params.stockInEachItemRange
    );
    var dataToSave: any = [];
    for (var i = 1; i <= numberOfItems; i++) {
      var obj: any = {
        apparelName: `Apparel ${i}`,
        stock: [],
      };
      for (var j = 1; j <= stockInEachItemRange; j++) {
        var stockObj: any = {
          code: Math.floor(Math.random() * 1000000000),
          price: Math.floor(Math.random() * 10000),
          size: defaultSizes[Math.floor(Math.random() * defaultSizes.length)],
          quality:
            defaultQuality[Math.floor(Math.random() * defaultQuality.length)],
        };
        obj["stock"].push(stockObj);
      }
      dataToSave.push(obj);
    }

    const savingData = await saveData(dataToSave, "warehouse");
    res.send(savingData);
  }
);

// Role: vendor
// 1. Update quality and price for any one code & size
app.patch(
  "/update/stock/:code/:size/quality-and-price",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code: number = parseInt(req.params.code);
      const size: String = req.params.size;
      if (!defaultSizes.includes(size)) {
        throw new Error("Invalid size");
      }
      const changes = req.body;
      console.log("changes", changes.quality);
      const originalInformation: any = getData("warehouse");
      console.log(originalInformation);
      var apparelIndex = null;
      var stockIndex = null;
      originalInformation.map((i: any, iIndex: number) => {
        let sIndex = null;
        sIndex = i.stock.findIndex((j: any, jIndex: number) => {
          if (j.code == code && j.size == size) {
            return true;
          }
        });
        console.log("sIndex", sIndex, iIndex);
        if (sIndex != -1) {
          apparelIndex = iIndex;
          stockIndex = sIndex;
        }
      });
      console.log("searchResult", apparelIndex, stockIndex);
      if (apparelIndex && stockIndex) {
        originalInformation[apparelIndex]["stock"][stockIndex].quality =
          changes.quality;
        originalInformation[apparelIndex]["stock"][stockIndex].price =
          changes.price;
      }
      const savingData = await saveData(originalInformation, "warehouse");
      res.send(savingData);
    } catch (err) {
      next(err);
    }
  }
);


// 2. Update quality and price of (n) number of code & size

// Role: User
// 3. Check the stock available of order placed by customer
// 4. Get the some of order placed

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
