from fastapi import FastAPI
from fastapi.responses import JSONResponse
from .routes import router
from .initialization import verify_env_variables, verify_nillion_connection

app = FastAPI(
    title="Secret Vault API",
    description="API for managing encrypted key pairs in a distributed vault",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_event():
    # Verify environment variables
    env_ok, env_message = verify_env_variables()
    if not env_ok:
        raise Exception(f"Initialization failed: {env_message}")

    # Verify Nillion connection
    conn_ok, conn_message = verify_nillion_connection()
    if not conn_ok:
        raise Exception(f"Initialization failed: {conn_message}")

    print("Initialization successful!")

@app.get("/health")
async def health_check():
    """Check if the API and Nillion connections are healthy."""
    env_ok, env_message = verify_env_variables()
    conn_ok, conn_message = verify_nillion_connection()

    if env_ok and conn_ok:
        return JSONResponse(
            content={
                "status": "healthy",
                "environment": env_message,
                "nillion_connection": conn_message
            },
            status_code=200
        )
    else:
        return JSONResponse(
            content={
                "status": "unhealthy",
                "environment": env_message,
                "nillion_connection": conn_message
            },
            status_code=503
        )

app.include_router(router, prefix="/api/v1", tags=["vault"])