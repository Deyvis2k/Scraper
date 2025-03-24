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
exports.fetchAmazonResult = fetchAmazonResult;
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
/// link constante para a amazon
//  onde serao feitas as buscas
//  = item pesquisado
const AMAZON_URL_CONSTANT = "https://www.amazon.com/s?k=";
/// 
/// Busca itens na amazon com base no item pesquisado, retorna um array de produtos
/// 
function fetchAmazonResult(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `${AMAZON_URL_CONSTANT}${encodeURIComponent(keyword)}`;
            console.log(`fetching ${url}`);
            const response = yield axios_1.default.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
                },
                responseEncoding: "utf-8"
            });
            const dom = new jsdom_1.JSDOM(response.data);
            const document = dom.window.document;
            /// array para armazenar os produtos
            const products = [];
            /// seleciona o container principal
            const mainContainer = document.querySelector("div.s-main-slot.s-result-list.s-search-results.sg-row");
            /// caso não houver main cointener
            // quer dizer que o item pesquisado nao foi encontrado
            // ou houve um erro no scrape, se sim apenas joga um array vazio
            if (!mainContainer) {
                console.log("No main container found");
                return [];
            }
            const items = mainContainer.querySelectorAll("div.s-result-item");
            console.log(`found ${items.length} items`);
            items.forEach((item) => {
                var _a, _b, _c, _d, _e;
                /// para cada item encontrado:
                /// seleciona o titulo, preco, avaliacao e link
                let titleElement = item.querySelector("h2.a-size-medium.a-color-base.a-text-normal span");
                const priceElement = item.querySelector("span.a-price span.a-offscreen");
                const ratingElement = item.querySelector("i.a-icon-star-small span.a-icon-alt");
                const linkElement = item.querySelector("a.a-link-normal.a-text-normal");
                /// dependendo do campo de pesquisa
                //  o titulo pode ser encontrado em diferentes elementos
                //  então se nao for encontrado, tenta outro
                if (!titleElement) {
                    titleElement = item.querySelector("h2.a-size-base-plus.a-color-base.a-text-normal");
                }
                /// se mesmo assim nao for encontrado
                //  então não há oque fazer
                //  e apenas pula esse item
                if (!titleElement || !linkElement) {
                    console.log("No title or link found");
                    return;
                }
                ///se tudo der certo, adiciona o produto ao array
                // assumo que os elementos nao serao nulos
                // pois ja foi verificado
                products.push({
                    title: (_a = titleElement === null || titleElement === void 0 ? void 0 : titleElement.textContent) === null || _a === void 0 ? void 0 : _a.trim(),
                    price: (_c = (_b = priceElement === null || priceElement === void 0 ? void 0 : priceElement.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : "N/A",
                    rating: (_e = (_d = ratingElement === null || ratingElement === void 0 ? void 0 : ratingElement.textContent) === null || _d === void 0 ? void 0 : _d.trim()) !== null && _e !== void 0 ? _e : "N/A",
                    link: `https://amazon.com${linkElement.getAttribute("href")}`
                });
            });
            /// imprime quantos produtos foram encontrados
            //  e retorna o array
            console.log(`fetched ${products.length} products`);
            return products;
        }
        catch (error) {
            /// caso ocorra algum erro inesperado
            //  retorna um array vazio
            console.log(error);
            return [];
        }
    });
}
