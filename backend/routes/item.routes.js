import { Router } from "express";
const upload = require("../config/multer-config");
const router = Router();

router.post("/create" , upload.single("image") ,  async function(req,res){
  try{
    let { name,
        image, 
        price,
        discount, 
        bgcolor,
        panelcolor, 
        textcolor} = req.body;  
        const createdAt = new Date();  

        let product = await productModel.create({
            image : req.file.buffer, 
            name,
            price,
            discount, 
            bgcolor,
            panelcolor, 
            textcolor,
            createdAt
           });
        req.flash("success" , "Product created succesfully...");
        res.redirect("/owners/admin");
    } 
   catch(err){
    res.send(err.message);
   }
});

export default router;