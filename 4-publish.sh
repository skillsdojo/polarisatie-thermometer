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

echo "Copying the Scratch build to the root of gh-pages"
cp -rf $SCRATCH_SRC_HOME/scratch-gui/build/* .

# Create an index.html file that redirects to the Scratch editor
echo "Creating redirect index.html"
cat > index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0;url=scratch/index.html">
    <title>Redirecting to Scratch Editor</title>
</head>
<body>
    <p>If you are not redirected automatically, follow this <a href="scratch/index.html">link to the Scratch editor</a>.</p>
</body>
</html>
EOL

echo "Adding and committing changes"
git add .
git commit -m "Update Scratch build and add redirect"

echo "Pushing to gh-pages branch"
git push origin gh-pages --force

echo "Returning to original branch"
git checkout -

echo "Cleaning up"
git branch -D gh-pages

echo "Publishing complete!"
echo "Your Scratch fork should now be available at:"
echo "https://<YOUR-USERNAME>.github.io/<REPO-NAME>/"
echo "This will redirect to https://<YOUR-USERNAME>.github.io/<REPO-NAME>/scratch/"
echo "Note: It might take a few minutes for the changes to propagate."