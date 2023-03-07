import express, { Request, Response } from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (request: Request, response: Response) => {
  response.json({
    message: `Welcome to the timeout server. Go to /timeout to have a long running request`,
  });
});

app.get("/timeout/:delay", ({ params }: Request, response: Response) => {
  const delay = params.delay ? parseInt(params.delay as string) : 29;
  setTimeout(() => {
    response.json({
      message: `You waited ${delay} seconds for this response.`,
    });
  }, delay * 1000);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
