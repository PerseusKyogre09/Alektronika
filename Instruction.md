# Setting Up the Development Environment

## Creating a Virtual Environment

1. Open your terminal or command prompt.
2. Navigate to your project directory:
    ```sh
    cd /c:/Users/palpr/Programming_Projects/Unnamed
    ```
3. Create a virtual environment:
    ```sh
    python -m venv venv
    ```
4. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

## Installing Requirements

1. Ensure the virtual environment is activated.
2. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

## Running the Flask App

1. Ensure the virtual environment is activated.
2. Navigate to the backend directory:
    ```sh
    cd backend
    ```
3. Run the Flask application:
    ```sh
    python app.py
    ```

Your Flask app should now be running. Open your web browser and navigate to `http://127.0.0.1:5000` to see it in action.