#!/bin/bash

PREFIX="/opt/gphoto2"

while ( true )
do
  "$PREFIX/bin/gphoto2-webapi" --keep --server 
done
