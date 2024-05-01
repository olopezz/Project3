# Use the latest Python image as the base image
FROM python:latest

# Set the working directory to /app/task-manager
WORKDIR /app/task-manager

# Copy the contents of the project directory to /app on the container
COPY task-manager/ /app/task-manager/

# Install Poetry
RUN pip install poetry

# Install project dependencies using Poetry
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Set the entrypoint command to launch the server using uvicorn
CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
