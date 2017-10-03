from html.parser import HTMLParser
from lxml import html
import ntpath
import urllib.request

class MyHTMLParser(HTMLParser):

    def __init__(self):
        super().__init__()
        self.lista = list()


    def handle_starttag(self, tag, attrs):
        # Only parse the 'anchor' tag.
        if tag == "a":
           # Check the list of defined attributes.
           for name, value in attrs:
               # If href is defined, print it.
               if name == "href":
                   self.lista.append(value)



def download_file(download_url):
    try:
        response = urllib.request.urlopen(download_url)
        file = open(ntpath.basename(download_url[28:]), 'wb')
        file.write(response.read())
        file.close()
        print("Completed")
    except:
        print(download_url)

parser = MyHTMLParser()
with open("e-financebook.htm", "r+") as f:
    for i, line in enumerate(f.readlines()):
        parser.feed(line)

for link in parser.lista:
    if len(link) > 15:
        download_file(link)


