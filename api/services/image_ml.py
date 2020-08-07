import face_recognition
import uuid
import os
import pickle
import numpy

from api.config import FACE_IMAGE_FOLDER, FACE_ENCODING_FILE, ALLOWED_EXTENSIONS, ML_TOLERANCE
        
def train_face(file):
    id = ""

    if file and allowed_image(file.filename):
        id = uuid.uuid4().hex

        face_encodings = load_dataset()

        #start encoding image
        uploaded_image = face_recognition.load_image_file(file)
        try:
            face_encodings[id] = face_recognition.face_encodings(uploaded_image)[0]

            #save uploaded image to folder
            full_filename = os.path.join(FACE_IMAGE_FOLDER, id + '.' + get_image_extension(file.filename))
            file.save(full_filename)
        except IndexError:
            return ""

        #save enconding to folder
        with open(FACE_ENCODING_FILE, 'wb') as f:
            pickle.dump(face_encodings, f)

    return id

def detect_face_in_image(file_stream):
    dataset = load_dataset()
    dataset_ids = list(dataset.keys())
    known_face_encoding = numpy.array(list(dataset.values()))

    #encode uploaded image
    image = face_recognition.load_image_file(file_stream)
    face_locations = face_recognition.face_locations(image)
    image_encodings = face_recognition.face_encodings(image, face_locations)

    is_face_found = False
    ids = []

    #compare face with dataset, if found get the id
    for image_encoding in image_encodings:
        results = face_recognition.compare_faces(known_face_encoding, image_encoding, ML_TOLERANCE)
        if True in results:
            mapped_result = list(zip(dataset_ids, results))
            correct_results = list(filter(lambda x: x[1] == True, mapped_result))
            ids.append(correct_results[0][0])
            is_face_found = True

    return (ids, is_face_found)

def load_dataset():
    dataset = {}
    
    if os.path.isfile(FACE_ENCODING_FILE):
        with open(FACE_ENCODING_FILE, 'rb') as f:
            dataset = pickle.load(f)
    else:
        with open(FACE_ENCODING_FILE, 'w'): pass
    
    return dataset

def allowed_image(image):
    return '.' in image and \
        get_image_extension(image) in ALLOWED_EXTENSIONS

def get_image_extension(image):
    return image.rsplit('.', 1)[1].lower()
