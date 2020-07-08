const send = require("../../utils/email");
const puppeteer = require("puppeteer");
var cloudinary = require('cloudinary').v2;

const uploadOptions = {};
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });


module.exports = {



     emailDetails: async (req,res,next) =>{


        var email = req.body.email;

         req.email = email;
    
        next();





     },


     generatePdf:async (req,res,next) =>{
         

        try {

            
            (async () => {
                const browser = await puppeteer.launch({headless:true},
                                                        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
                                                      );
                const page = await browser.newPage();
                await page.setDefaultNavigationTimeout(0);
                await page.setViewport({width:500,height:700});
                await page.goto("https://gordonnchy.github.io/fyp-email-template/index.html",{waitUntil :"networkidle2"}).catch(function() {
                    console.log('Error while loading up the url.');
                });;
               const d =  await page.pdf(
                    {encoding: "binary" , format: "Letter" ,                   
                    printBackground: true,
                }
                    
                    
                    );
    
    
                    cloudinary.uploader.upload_stream(uploadOptions, 
                    function(error, result) {
                        console.log(result.url, error); 

                        req.url = result.url;
                    
        send('kijadanford@gmail.com'," The University of Dar es Salaam is a public university in Dar es Salaam, Tanzania. It was established in 1961 as an affiliate college of the University of London. The university became an affiliate of the University of East Africa in 1963, shortly after Tanzania gained its independence from the United Kingdom. ",req.url);

                    
                    }).end(d);
                await browser.close();
              })();
        } catch (error) {
         
            console.log(error);
        }

        await  next();
     },


     sendEmail: async (req,res,next) =>{

  console.log("to email");


   next();




     }








}
