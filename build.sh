# #!/bin/sh
# cd ../
# mkdir output
# cp -R ./chaelli/* ./output
# cp -R ./output ./chaelli/

#!/bin/sh

mkdir -p ./output
cp -R ./chaelli/* ./output/
if [ ! -d "./chaelli/output" ]; then
    cp -R ./output ./chaelli/
fi
echo "Output directory created and populated successfully."
ls -al ./output