import express, {Request, Response} from "express";
import cors from "cors";
import path from "path";
import {fetchAmazonResult} from "../scraper/scraper";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
const _abs_path = path.join(__dirname, "../../src");
app.use(express.static(path.join(_abs_path, "public")));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(_abs_path, "views", "content", "index.html"));
});

app.get("/api/scrape/", async (req: Request, res: Response) => {
    const keyword = req.query.keyword as string;
    console.log(keyword);

    if(!keyword || keyword.trim() === "") {
        res.status(400).json({error: "Keyword is required"});
        return;
    }
    const result = await fetchAmazonResult(keyword as string);
    res.json(result);   
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});


