npm run build --prod
rsync -au  -r ./www/ ubuntu@catalearn.com:~/catalearn/release/dashboard/