from skimage import draw, morphology
import PIL

class ImageHandler:

    def __init__(self, path):
        self.path = path

    def path_indices(self, path):
        '''https://github.com/plotly/dash-canvas/blob/master/dash_canvas/utils/parse_json.py
        
        Used dash canvas pmethod
        '''
        rr, cc = [], []
        for (Q1, Q2) in zip(path[:-2], path[1:-1]):
            # int(round()) is for Python 2 compatibility
            inds = draw.bezier_curve(int(round(Q1[-1] / scale)), 
                                    int(round(Q1[-2] / scale)), 
                                    int(round(Q2[2] / scale)), 
                                    int(round(Q2[1] / scale)), 
                                    int(round(Q2[4] / scale)), 
                                    int(round(Q2[3] / scale)), 1)
            rr += list(inds[0])
            cc += list(inds[1])
        return rr, cc

    def parse_json(self, json):
        pass

    def find_rectangle(self, path):
        p
    