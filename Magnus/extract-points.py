import tabula as tb
from pdf2image import convert_from_path
import re
file='points.pdf'

# data=tb.read_pdf(file, area=(0,0,100,1400), pages=[2,3,4,5])
# print(data)
# Store Pdf with convert_from_path function
images = convert_from_path(file)
names = set()
name=''
for i in range(len(images)):
    data=tb.read_pdf(file, area=(0,0,100,1400), pages=[i+1])
    if len(data) > 0 and len(data[0].columns) > 0 and len(data[0].columns) < 2:
        name = data[0].columns[0] + ' POINTS'
    nameNum = 0
    while name in names:
        nameNum += 1
        if re.search('.*\([0-9]\)', name):
            name = name[0:-3] + '(' + str(nameNum) + ')'
        else:
            name = name + '(' + str(nameNum) + ')'
    print('adding ' + name)
    names.add(name)
    images[i].save('datasheets/' + name +'.png', 'PNG')
  # Save pages as images in the pdf
