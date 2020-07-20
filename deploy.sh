#!/bin/bash

NODE_ENV=production npm run build && \
cd build && \
ln -s index.html 200.html && \
surge # requires login credentials
