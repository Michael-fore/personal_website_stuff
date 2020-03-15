import torchvision.models as models
import torch
import torchvision.transforms as transform
import json
from PIL import Image

googlenet = models.googlenet(pretrained=True)
googlenet.eval()

loader = transform.Compose([    #transform.Resize((400,400)),
                                transform.ToTensor(),
                                transform.Normalize(mean=[0.485, 0.456, 0.406],
                                                    std=[0.229, 0.224, 0.225])])


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

def img_load(img):
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

    return final_results
    








def google_classify(image_path, top_k = None):
    img = img_load(image_path)
    output = googlenet(img)

    return results(output, top_k)

#print(google_classify('./imgs/cat.jpg'))