from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.future import select
from models import AutoModels

engine = create_async_engine(
    "postgresql+asyncpg://postgres:postgres@db:5432/dvdrental",
    echo=True,
    future=True,
)

auto_models = None

async def lifespan(app):
    print("startup")
    global auto_models
    auto_models = await AutoModels.create(engine)
    yield
    print("shutdown")

app = FastAPI(lifespan=lifespan)

@app.get("/api/v1/hello")
async def root():
    return {"message": "Hello World"}

@app.get("/api/v1/films")
async def films():
    Film = await auto_models.get("film")
    results = []
    async with AsyncSession(engine) as session:
        films = await session.execute(select(Film))
        for film in films.scalars().all():
            results.append(
                {
                    "title": film.title,
                    "description": film.description,
                    "id": film.film_id,
                }
            )
    return results

@app.get("/api/v1/film/{id}")
async def film_details(id: int):
    Film = await auto_models.get("film")
    async with AsyncSession(engine) as session:
        query = select(Film).where(Film.film_id == id)
        result = await session.execute(query)
        film = result.scalars().first()

        if film:
            return {
                "film_id": film.film_id,
                "title": film.title,
                "description": film.description,
                "release_year": film.release_year,
                "language_id": film.language_id,
                "rental_duration": film.rental_duration,
                "rental_rate": str(film.rental_rate),
                "length": film.length,
                "replacement_cost": str(film.replacement_cost),
                "rating": film.rating,
                "last_update": film.last_update.isoformat(),
                "special_features": film.special_features,
                "fulltext": film.fulltext,
            }
        else:
            raise HTTPException(status_code=404, detail="Film not found")

@app.get("/film/{id}", response_class=HTMLResponse)
async def film(id: int):
    with open("../ui/dist/film.html") as file:
        return file.read()

app.mount("/", StaticFiles(directory="../ui/dist", html=True), name="ui")