#!/bin/bash
set -e

echo "Verifying location of Scratch source is known"
if [ -z "$SCRATCH_SRC_HOME" ]; then
    echo "Error: SCRATCH_SRC_HOME environment variable is not set."
    exit 1
fi

echo "Checking that Scratch has been patched"
if [ ! -f "$SCRATCH_SRC_HOME/patched" ]; then
    echo "Scratch has not yet been patched. Run ./0-setup.sh"
    exit 1
fi

# allow this script to be run from other locations, despite the
#  relative file paths used in it
if [[ $BASH_SOURCE = */* ]]; then
  cd -- "${BASH_SOURCE%/*}/" || exit
fi

echo "Commit any changes"
git add your-scratch-extension
git add dependencies
git commit -m "Update" || true
git push origin master || true

echo "Building the Scratch fork"
./2-build.sh

echo "Preparing gh-pages branch"
git checkout gh-pages || git checkout -b gh-pages

echo "Preparing a publish folder"
if [ -d "scratch" ]; then
  rm -rf ./scratch/*
else
  mkdir scratch
fi

echo "Publishing the Scratch fork"
cp -rf $SCRATCH_SRC_HOME/scratch-gui/build/* ./scratch/.

echo "Committing and pushing changes"
git add .
git commit -m "Update Scratch build" || true
git push origin gh-pages

echo "Returning to original branch"
git checkout -

echo "Your extension is now available in the gh-pages branch."
echo "It should be accessible at: https://<USERNAME>.github.io/<REPO-NAME>/scratch/index.html"