from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

@app.get("/api/v1/hello")
async def hello():
    return {"message": "Hello, World!"}

app.mount("/", StaticFiles(directory="../ui/dist", html=True), name="ui")