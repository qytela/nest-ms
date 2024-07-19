#!/bin/bash

# Open a new terminal for api-gateway
gnome-terminal -- bash -c "nx serve api-gateway; exec bash"

# Open a new terminal for auth-service
gnome-terminal -- bash -c "nx serve auth-service; exec bash"

# Open a new terminal for movie-service
gnome-terminal -- bash -c "nx serve movie-service; exec bash"

# Open a new terminal for log-service
gnome-terminal -- bash -c "nx serve log-service; exec bash"
