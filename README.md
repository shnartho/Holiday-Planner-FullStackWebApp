🔰 A scalable and production-ready full-stack web application, combining the power of React, Django, and PostgreSQL. Seamlessly deployed and orchestrated with Kubernetes, while leveraging CI/CD using Jenkins and ArgoCD for streamlined development and reliability.<br>
The project can be run and tested 3 different ways, <br>
**🧑‍🔬 Using Minikube 🙍‍♂️Using Docker-Compose 👶In localhost**

 
## Desired CI/CD Workflow
![Application](./images/forGithub1.png)



🟢 **Running Locally**
To run the frontend and backend application locally, Inside current directory you need to run "npm run build" and "npm start". To run the backend, go to /backend and run "python manage.py migrate" and "python manage.py runserver 0.0.0.0:8000". Please make sure you have postgresql or any other rdbms installed and correctly configured in /backend/start_project/settings.py.

![Application](./images/forGithub2.png)
<div style="display: flex; justify-content: space-between;">
  <img src="./images/forGithub3.png" alt="Image 1" width="28%" height="400"/>
  <img src="./images/forGithub4.png" alt="Image 3" width="71%" height="400"/>
</div>

🟢 To run using docker-compose, run **"docker-compose up --build"** in the current directory. Please make sure make sure the database credentials of the docker-compsoe file and /backend/start_project/settings.py match. Also in /backend/entrypoint.sh make sure you use the hostname instead of db-service. After 

<br><br><br>
Trying to test with different tech stacks, therefore....

![WorkInProgressStillWorkingGIF](https://github.com/shnartho/Holiday-Planner-FullStackWebApp/assets/83227963/d07a81b9-6f87-4260-a525-7b76defb2243)

