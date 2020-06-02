import torchvision.models as models
import torch
import torchvision.transforms as transform
import json
import pandas as pd
from dash.exceptions import PreventUpdate
from PIL import Image
import PIL


googlenet = models.googlenet(pretrained=True)
googlenet.eval()

loader = transform.Compose([    transform.Resize((500,500)),
                                transform.ToTensor(),
                                transform.Normalize(mean=[0.485, 0.456, 0.406],
                                                    std=[0.229, 0.224, 0.225])])
combine_loader = transform.Compose([ transform.Resize((500,500)),
                                    transform.ToTensor()])                                             

normalize = transform.Normalize(mean=[0.485, 0.456, 0.406],std=[0.229, 0.224, 0.225])
                                                    
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

def img_load(img):
       
    if isinstance(img,Image.Image) == True:
        img = loader(img).unsqueeze(0)
        return img.to(device, torch.float)

    if isinstance(img, torch.Tensor) == True:
        return img

    img = Image.open(img)
    img = loader(img).unsqueeze(0) # since only one, not batck have to add fake dim
    return img.to(device, torch.float)


def results(network_output, top_k = None):
    results = []
    a = open('class_index/imagenet_class_index.json','r')

    class_idx = json.load(a)
    
    if top_k == None: #return top 5 unless otherwise noted
        top_k = 5
    
    value, indices = torch.topk(network_output, top_k)
    value = value.tolist()
    
    google_result = indices.tolist()
    
    #print(google_result)
    for category in google_result[0]:
        results.append(class_idx.get(str(category))[1])

    final_results = []
    for final, result in zip(results, value[0]):
        final_results.append((final, result))


    return pd.DataFrame(zip(results,value[0]), 
                        index = results, 
                        columns = ['Category','Confidence Prediciton'])
    

def combine(im1, im2):
    im1 = combine_loader(im1)
    im2 = combine_loader(im2)
    output_image = im1 + im2

    return normalize(output_image).unsqueeze(0)


def google_classify(image_path, top_k = None):
    img = img_load(image_path)
    
    output = googlenet(img)
    print(results(output, top_k))
    return pd.DataFrame(results(output, top_k))
#print(google_classify('./imgs/cat.jpg'))
