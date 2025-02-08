from fastapi import FastAPI
from .routes import router

app = FastAPI(
    title="Device and Emission API",
    description="API for device verification and emission recording",
    version="1.0.0"
)

app.include_router(router, prefix="/api/v1")