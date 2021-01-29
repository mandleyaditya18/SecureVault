import sys
import json
import os

data = {
    'dest': sys.argv[1],
    'filename': sys.argv[2]
}

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, data['dest'] + '/' + data['filename'])

temp = list(filename)
temp[1] = '/'
filename = ''.join(temp)

data['path'] = filename
data['filesize'] = os.stat(filename).st_size

CHUNK_SIZE = int((100+data['filesize'])//3)
file_number = 1
with open(data['path'], 'rb') as f:
    chunk = f.read(CHUNK_SIZE)
    while chunk:
        with open(data['dest'] + '/part_' + str(file_number), 'wb') as chunk_file:
            chunk_file.write(chunk)
        file_number += 1
        chunk = f.read(CHUNK_SIZE)

os.remove(data['path'])

print(json.dumps(data))
sys.stdout.flush()