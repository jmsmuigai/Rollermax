#!/bin/bash
# Script to copy images from project root to public/images

echo "Copying images to public/images..."

mkdir -p public/images

# Copy PNG images
find . -maxdepth 1 -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) ! -path "./node_modules/*" ! -path "./.git/*" ! -path "./out/*" -exec cp {} public/images/ \;

echo "Images copied to public/images/"
ls -lh public/images/
