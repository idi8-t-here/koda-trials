# Koda-trials

this is a simple user authentication app made using nextjs14 and supabase.

To run the project locally try command:

$ npm run dev 

Optionally you could also pull the app's docker image from docker hub using docker cli command:

$ docker pull idi8there/koda-trials:v0.3

and run the docker image using command

$ sudo docker run -it --name koda-trial --restart unless-stopped -p:3000:3000 koda-trials:v0.3
