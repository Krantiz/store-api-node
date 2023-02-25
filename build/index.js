"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
const defaultSizes = ["S", "M", "L", "XL"];
const defaultQuality = ["Bad", "Ok", "Good", "Excellent"];
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send("Welcome to Store API");
});
app.post("/create/stock/:items/:stockInEachItemRange/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.items);
    console.log(req.params.stockInEachItemRange);
    const numberOfItems = parseInt(req.params.items);
    const stockInEachItemRange = parseInt(req.params.stockInEachItemRange);
    var dataToSave = [];
    for (var i = 1; i <= numberOfItems; i++) {
        var obj = {
            apparelName: `Apparel ${i}`,
            stock: [],
        };
        for (var j = 1; j <= stockInEachItemRange; j++) {
            var stockObj = {
                code: Math.floor(Math.random() * 1000000000),
                price: Math.floor(Math.random() * 10000),
                size: defaultSizes[Math.floor(Math.random() * defaultSizes.length)],
                quality: defaultQuality[Math.floor(Math.random() * defaultQuality.length)],
            };
            obj["stock"].push(stockObj);
        }
        dataToSave.push(obj);
    }
    const savingData = yield (0, utils_1.saveData)(dataToSave, "warehouse");
    res.send(savingData);
}));
// Role: vendor
// 1. Update quality and price for any one code & size
app.patch("/update/stock/:code/:size/quality-and-price", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = parseInt(req.params.code);
        const size = req.params.size;
        if (!defaultSizes.includes(size)) {
            throw new Error("Invalid size");
        }
        const changes = req.body;
        console.log("changes", changes.quality);
        const originalInformation = (0, utils_1.getData)("warehouse");
        console.log(originalInformation);
        var apparelIndex = null;
        var stockIndex = null;
        originalInformation.map((i, iIndex) => {
            let sIndex = null;
            sIndex = i.stock.findIndex((j, jIndex) => {
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
        const savingData = yield (0, utils_1.saveData)(originalInformation, "warehouse");
        res.send(savingData);
    }
    catch (err) {
        next(err);
    }
}));
// 2. Update quality and price of (n) number of code & size
// Role: User
// 3. Check the stock available of order placed by customer
// 4. Get the some of order placed
app.listen(PORT, () => {
    console.log(`Server Running here 👉 https://localhost:${PORT}`);
});
