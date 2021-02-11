#!/bin/bash
echo "exporting dynamic enviroment variable"

mkdir /etc/nginx/templates
cp /custom/nginx.dev.conf /etc/nginx/templates/default.conf.template
if [ $ssl == "true" ]
then
    export listen="3000 ssl"
else
         export listen="$3000"
fi

echo listen = $listen

exec "$@"