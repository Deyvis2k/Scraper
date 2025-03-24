import axios from "axios";
import { JSDOM } from "jsdom";

/// link constante para a amazon
//  onde serao feitas as buscas
//  = item pesquisado
const AMAZON_URL_CONSTANT = "https://www.amazon.com/s?k=";

/// 
/// Interface para os produtos
/// melhora a leitura do codigo
//  e evita erros de tipagem

interface Product{
    title: string;
    price: string;
    rating: string;
    link: string;
}

/// 
/// Busca itens na amazon com base no item pesquisado, retorna um array de produtos
/// 
async function fetchAmazonResult(keyword: string): Promise<Product[]> {
    try{
        const url = `${AMAZON_URL_CONSTANT}${encodeURIComponent(keyword)}`;
        console.log(`fetching ${url}`);
        
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
            },
            responseEncoding: "utf-8"
        });
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        /// array para armazenar os produtos
        const products: Product[] = [];
        /// seleciona o container principal
        const mainContainer = document.querySelector("div.s-main-slot.s-result-list.s-search-results.sg-row");
        /// caso não houver main cointener
        // quer dizer que o item pesquisado nao foi encontrado
        // ou houve um erro no scrape, se sim apenas joga um array vazio
        if(!mainContainer) {
            console.log("No main container found");
            return [];
        }

        const items = mainContainer.querySelectorAll("div.s-result-item");
        console.log(`found ${items.length} items`);
        items.forEach((item) => {
            /// para cada item encontrado:
            /// seleciona o titulo, preco, avaliacao e link
            let titleElement = item.querySelector("h2.a-size-medium.a-color-base.a-text-normal span");
            const priceElement = item.querySelector("span.a-price span.a-offscreen");
            const ratingElement = item.querySelector("i.a-icon-star-small span.a-icon-alt");
            const linkElement = item.querySelector("a.a-link-normal.a-text-normal");

            /// dependendo do campo de pesquisa
            //  o titulo pode ser encontrado em diferentes elementos
            //  então se nao for encontrado, tenta outro
            if(!titleElement) {
                titleElement = item.querySelector("h2.a-size-base-plus.a-color-base.a-text-normal");
            }
            /// se mesmo assim nao for encontrado
            //  então não há oque fazer
            //  e apenas pula esse item
            if(!titleElement || !linkElement) {
                console.log("No title or link found");
                return;
            }
            ///se tudo der certo, adiciona o produto ao array
            // assumo que os elementos nao serao nulos
            // pois ja foi verificado
            products.push({
                title: titleElement?.textContent?.trim()!,
                price: priceElement?.textContent?.trim() ?? "N/A",
                rating: ratingElement?.textContent?.trim() ?? "N/A",
                link: `https://amazon.com${linkElement.getAttribute("href")}`
            });
        });
        /// imprime quantos produtos foram encontrados
        //  e retorna o array
        console.log(`fetched ${products.length} products`);
        return products;
    }catch(error: unknown){
        /// caso ocorra algum erro inesperado
        //  retorna um array vazio
        console.log(error);
        return [];
    }
}


export {
    fetchAmazonResult
}
