# GTA SA 3D Skins

## Summary
GTA San Andreas 3D Skins is a web app where users can view all the GTA San Andreas characters in 3D with orbital controls. The character models were in a proprietary format, so, to convert them to a web compatible format, Python was used to control Blender and automate more than 300 exports. Three.js, React.js and Sass were used for the front-end while Node.js and Postgres were used in the back-end.

## Database Population
I needed to populate the database with information about every character skin, so, I scraped the [SAMP Wiki All Skins page](https://wiki.sa-mp.com/wiki/Skins:All) and automated extracting the model name, skin name/type and the gender. For the images I found a SAMP forum post that had them all compressed for download, so I extracted them, ran a script to rename them based on the skins ids, uploaded them to my cloudinary CDN and then ran an update script to populate the image url column in the database.

![Database populated from scrape](/client/public/assets/database-populated-from-scrape.jpg)

## Extracting 3D Models from GTA San Andreas
I used an img tool to extract all of the .txd and .dff files from the gta3.img file. It would take forever to get the model name, search for the .txd, extract it, search for the .dff, extract it and repeat that 300 times in a buggy tool. So I exported everything to a single folder and since I had the model names in a database I was able to filter the files needed.

## Converting The Models To A Web Friendly Format
Three.js is a popular library for doing 3D on the web. After a lot of experimentation with the file formats Three.js supported I settled on .glb which is GLTF but in binary format, the advantages were that it was a single file (it didn't need another texture bitmap file to accompany it) and it was exportable from Blender.

Now that I settled on a file format I needed to find a way to import .DFFs and .TXDs to Blender. Thankfully, there was a Blender addon that the GTA modding community create that allowed importing TXDs and DFFs.

![GTA SA Skin Imported To Blender](/client/public/assets/blender-gta-import.jpg)

So all that was left was to import the character models and export them to .glb one by one. Which I was able to automate using python, specifically the bpy package that allows you to control blender using python. The code looked something like this:

```
models = [ "an", "array", "with", "all", "the", "model", "names", "from", "the", "database"]

path = "C:/path/to/SkinConverter/Models"

import bpy
import os

for root, dirs, files in os.walk(path):
	for file in files:
		fileName, fileExtension = file.split(".")
		if (fileName in models and fileExtension == "dff"):
			bpy.ops.object.select_all(action='TOGGLE')
			bpy.ops.object.delete(use_global=False)
			importPath = "C:\\path\\to\\SkinConverter\\Models\\" + fileName + ".dff"
			bpy.ops.import_dff.import_dff(filepath=importPath)
			exportPath = "C:\\path\\to\\SkinConverter\\Exported\\" + fileName + ".glb"
			bpy.ops.export_scene.glb(filepath=exportPath)
			print(file)
```

The exported files:

![The exported glb files](/client/public/assets/exported-models.jpg)


## Upload To CDN
I uploaded all the .glb files to my cloudinary CDN. I then used the Cloudinary resource API to list all the files. Next, I wrote a Node script to update the database with all the model urls.

![Database rows with model urls](/client/public/assets/database-populated-with-model-urls.jpg)

## The Web App
The web app is a React application that uses the Three.js GLTF loader to render the 3D models. It has a selection menu, next and previous buttons and different lighting intensity for different models that I set manually one by one. I also made sure to make the routes load different characters for sharing purposes.

![GTA SA 3D Skins Web App](/client/public/assets/web-app.gif)