#!/usr/bin/python3

from PIL import Image
import os
from pprint import pprint
from tqdm import tqdm 
path = r"/home/matthew/Coding/IdeaProjects/KingmakerMap/kingmaker_map_react/imgTest/"
files = [f for f in os.listdir(path) if (os.path.isfile(path+f) and f[-4:] != '.zip')]

def getBuildingSize(width, height):
  return (2 if width>800 else 1, 2 if height>800 else 1)
  

def mapper(f):
  image = Image.open(path+f)
  width, height = image.size
  buildingWidth, buildingHeight =getBuildingSize(width, height)
  return {
    "image":image,
    "name": f,
    "dimensions": (width,height),
    "buildingDim":(buildingWidth,buildingHeight)
    
  }

data = map(mapper, files)
def cutImg(image, name, dimensions, buildingDim):
  bWidth, bHeight = buildingDim
  image = image.resize((100*bWidth, 100*bHeight))
  if(bWidth>1 or bHeight>1):
    for y in range(bHeight):
      for x in range(bWidth):
        newName = name[:-4]+"_"+str(y*2+x)+name[-4:]
        cutImg = image.crop((100*x, 100*y, 100*x+100, 100*y+100))
        cutImg.save(path+"/out/"+newName)
  image.save(path+"/out/"+name)
    

for d in tqdm(data):
  cutImg(**d)
  
