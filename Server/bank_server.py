from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
from urllib import response
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from router import transaction_route
from router import breakdown_route
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# rest of the routes

app.include_router(transaction_route.router)
app.include_router(breakdown_route.router)


if __name__ == "__main__":
    uvicorn.run("bank_server:app", host="0.0.0.0", port=8000, reload=True)
