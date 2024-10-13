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

echo "Building the Scratch fork"
./2-build.sh

echo "Creating and switching to a new gh-pages branch"
git checkout --orphan gh-pages
git rm -rf .

echo "Preparing a publish folder"
mkdir -p scratch

echo "Copying the Scratch build to the publish folder"
cp -rf $SCRATCH_SRC_HOME/scratch-gui/build/* ./scratch/

echo "Adding and committing changes"
git add scratch
git commit -m "Update Scratch build"

echo "Pushing to gh-pages branch"
git push origin gh-pages --force

echo "Returning to original branch"
git checkout -

echo "Cleaning up"
git branch -D gh-pages

echo "Publishing complete!"
echo "Your Scratch fork should now be available at:"
echo "https://<YOUR-USERNAME>.github.io/<REPO-NAME>/scratch/"
echo "Note: It might take a few minutes for the changes to propagate."