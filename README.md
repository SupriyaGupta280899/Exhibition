Art Gallery
Please follow the following steps to run the app
Step 1 : Please create a docker image for each folder placed in server folder. 
         For Customer please specify option as -p 4001:4001
         For Customer-Painting relation please specify option as -p 4002:4002
         For Painting please specify option as -p 4003:4003 
Step 2 : Please create a docker image for Web placed in web/ExhibitionView folder with option -p 4200:80
Step 3 : Run roost-worker:4200 on your browser
