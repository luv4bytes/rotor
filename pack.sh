#!/usr/bin/bash

GREEN="\e[32m"
BLUE="\e[34m"
END_COLOR="\e[0m"

cd src 
printf "${GREEN}Removing js directory... "
rm -rf js
printf "Done\n${END_COLOR}"
printf "${GREEN}Starting tsc...${END_COLOR}"
tsc
printf "${GREEN}Done\n${END_COLOR}"
cd ..

printf "${GREEN}Creating publish directory... "
rm -rf publish
mkdir -p publish
printf "Done\n${END_COLOR}"

printf "${GREEN}Packing... "
pwd
zip -r -FS publish/rotor.zip icons src _locales manifest.json -x "*.git*" -x "assets*" -x "LICENSE*" -x "*.sh" -x "README*" -x "publish*" > /dev/null
printf "Done\n${END_COLOR}"
printf "${BLUE}+++++ READY TO PUBLISH +++++\n${END_COLOR}"