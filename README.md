## Overview
The Command Service is responsible for receiving Python code submissions from the frontend, storing job information, and enqueuing job IDs for processing by the Worker Service. This service provides RESTful APIs for code submission and result retrieval.

## Features
- Accepts Python code submissions via a RESTful API.
- Stores submitted code and job metadata.
- Enqueues job IDs for asynchronous processing.
- Provides API to check the execution status and results.

#### API Endpoints
- **Submit Code**
  - **Endpoint**: `POST /submit-code`
  - **Description**: Accepts Python code and returns a job ID.
  - **Request Body**:
    ```json
    {
      "code": "print('Hello, World!')"
    }
    ```
  - **Response**:
    ```json
    {
      "jobId": "1234567890abcdef"
    }
    ```

- **Get Execution Result**
  - **Endpoint**: `GET /exec-result?jobId={jobId}`
  - **Description**: Retrieves the execution status and result of the submitted job.
  - **Response**:
    ```json
    {
      "status": "completed",
      "result": "Hello, World!"
    }
    ```