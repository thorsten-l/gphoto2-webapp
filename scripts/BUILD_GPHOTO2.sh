#!/bin/bash

PREFIX="/opt/gphoto2"

sudo apt install -y libpopt-dev libcdk5-dev libreadline-dev libreadline8 \
  libncurses-dev libncurses5-dev libncurses5

rm -fr gphoto2
git clone  https://github.com/thorsten-l/gphoto2.git
cd gphoto2
autoreconf --install --symlink
export LD_LIBRARY_PATH=$PREFIX/lib
export CFLAGS="-I$PREFIX/include"
export LDFLAGS="-L$PREFIX/lib -R$PREFIX/lib"
./configure --prefix=$PREFIX
make
make install
