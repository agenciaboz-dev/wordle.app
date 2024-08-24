#!/bin/bash

ssh_profile="root@agenciaboz"
user="agenc2280"
domain="agenciaboz.com.br"
subdomain="bozletrando.agenciaboz.com.br"

path="/home/${domain}/${subdomain}"

npx vite build
echo 'Uploading build to server'
scp -r dist/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
