#!/bin/bash

PREFIX="/opt/gphoto2"
VERSION="2.5.30"

sudo apt install -y libltdl-dev libusb-1.0-0-dev libusb-1.0-0 libusb-0.1-4 libusb-dev \
  libxml2 libxml2-dev libcurl4-gnutls-dev libcurl3-gnutls libgd-dev libgd3 libexif12 libexif-dev

wget https://github.com/gphoto/libgphoto2/releases/download/v$VERSION/libgphoto2-$VERSION.tar.gz
rm -fr libgphoto2-$VERSION
tar xf libgphoto2-$VERSION.tar.gz

cd libgphoto2-$VERSION
./configure --prefix=$PREFIX
make
make install
