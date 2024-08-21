# Koda-trials

this is a simple user authentication app made using nextjs14 and supabase.

## Installation

To run the project locally try cloning the project and installing any dependecies using command:

    npm install

Optionally you could also pull the app's docker image from docker hub using docker cli command:

    docker pull idi8there/koda-trials:v0.3

## Usage

After installation, to run the project you could use command:

    npm run dev

and if you took to using the docker image you could run it using command:

    docker run -it --name koda-trial --restart unless-stopped -p:3000:3000 koda-trials:v0.3

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
