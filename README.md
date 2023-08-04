🔰 A scalable and production-ready full-stack web application, combining the power of React, Django, and PostgreSQL. Seamlessly deployed and orchestrated with Kubernetes, while leveraging CI/CD using Jenkins and ArgoCD for streamlined development and reliability.<br> <br>
🏃‍♂️ Running and Testing the Project in 3 Different Ways: <br>
**🧑‍🔬 Using Minikube 🙍‍♂️Using Docker-Compose 👶On localhost**

 
#### CI/CD Workflow
![Application](./images/forGithub1.jpeg)

## Execute and Evaluate the Web Application
🟢 **Using Minikube** <br>To run using minikube, make sure you have minikube installed in your mahchine. If your minikube running on docker driver, use these command **Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All** and **minikube config set driver hyperv**. The deploy the frontend, backend and database in minikube kubernetes cluster go to ./kubernetes-deployment and run,<br> 
`kubectl apply -f db-service.yaml -f db-deployment.yaml`
<br>`kubectl apply -f backend-config.yaml backend-service.yaml -f backend-deployment.yaml`
<br>`kubectl apply -f frontend-config.yaml frontend-service.yaml -f frontend-deployment.yaml`

![minikube](./images/minikube-front.png)
<div style="display: flex; justify-content: space-between;">
  <img src="./images/minikubeip.png" alt="Image 1" width="22%" height="80"/>
  <img src="./images/minikube-back.png" alt="Image 3" width="77%" height="400"/>
</div>

🟢 **Using Docker-Compose** <br>To run using docker-compose, run **"docker-compose up --build"** in the current directory. Please make sure make sure the database credentials of the docker-compsoe file and /backend/start_project/settings.py match. Also in /backend/entrypoint.sh make sure you use the hostname instead of db-service.
![docker-compose](./images/docker-compose.png)

🟢 **Running On Localhost**
<br>To run the frontend and backend application locally, Inside current directory you need to run "npm run build" and "npm start". To run the backend, go to /backend and run "python manage.py migrate" and "python manage.py runserver 0.0.0.0:8000". Please make sure you have postgresql or any other rdbms installed and correctly configured in /backend/start_project/settings.py.

![Application](./images/forGithub2.png)
<div style="display: flex; justify-content: space-between;">
  <img src="./images/forGithub3.png" alt="Image 1" width="28%" height="400"/>
  <img src="./images/forGithub4.png" alt="Image 3" width="71%" height="400"/>
</div>

## Automate Software Delivery

<br><br><br>
Trying to test with different tech stacks, therefore....

![WorkInProgressStillWorkingGIF](https://github.com/shnartho/Holiday-Planner-FullStackWebApp/assets/83227963/d07a81b9-6f87-4260-a525-7b76defb2243)

