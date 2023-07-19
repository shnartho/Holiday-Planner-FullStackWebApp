👨‍🚒 Backend with Django and Postgres
==================================================

📗 Getting Started | Run In Docker Containers🐟
------------------------------------------------
To run django in docker container, make sure docker in installed in your local machine. As I have already created docker-compose and docker file so you just need to run the docker-compose. The docker compose will create container for django backend and also a postgres container for Database. 

1. Open terminal and run:

        $ cd /path/to/backend/folder

2. Run the docker compose:

        $ docker-compose up --build

3. Open http://127.0.0.1:8000/ in a web browser to view the holiday planner application.✌️

📗 Getting Started | Run Locally 
------------------------------
Here is a simple guide if you wish to run and test my backend (django) in your locally.

1. First you need to create a virtual environment. At the terminal, type
   the following command:

        $ python3 -m venv ./venv

2. Activate the virtual environment:

   $ source ./venv/bin/activate

4. Install development Python dependencies for this project:

        $ pip install -r requirements.txt

5. Start the Django development server:

        $ python manage.py runserver

6. Open http://127.0.0.1:8000/ in a web browser to view the holiday planner application.✌️
