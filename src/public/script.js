const API_URL_SCRAPE = "http://localhost:3000/api/scrape/?keyword=";


document.getElementById("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();  
    const keyword = document.getElementById("keyword").value.trim();  
    alert(keyword);
    if (!keyword) {
        alert("Please enter an item to search");
        return;
    }
    try {
        const response = await axios.get(API_URL_SCRAPE + keyword);
        
        document.getElementById("keyword").value = "";
        
        const items = response.data;

        const bodyContent = document.getElementById("body-content");
        bodyContent.innerHTML = "";

        items.forEach(item => {
            const div = document.createElement("div");
            div.innerHTML = `
                <h1>${item.title}</h1>
                <p>${item.price}</p>
                <p>${item.rating}</p>
                <a href="${item.link}" target="_blank">Link</a>
            `;
            bodyContent.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching items:", error);
        alert("There was an error fetching the items. Please try again.");
    }
});




