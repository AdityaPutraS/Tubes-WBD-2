sudo docker stop bankpro
sudo docker build -t bankpro:dev .
sudo docker run --name bankpro -d -v ${PWD}:/app -v /app/node_modules -p 3000:3000 --rm bankpro:dev'
