# Structure and deployment 

## Structure 

hackaton (git repo):
    -cmd (backend and apis written in Go)
    -Memifier (frontend in React Native with expo)

## Deployment 

for backend and api:
    - "cd cmd"
    - "go run main.go"

for frontend (NOTE: you will need EXPO GO on your phone to scan the qr code or an android emulator on your pc):
    - "cd Memifier"
    - "npm install" (for all the dependenciaes)
    - "npx expo start" or "npx expo start --tunnel"
    -*Press a to open android emulator or scan the qr code with EXPO GO *