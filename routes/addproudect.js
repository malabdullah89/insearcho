const { request } = require('express')
const express = require('express')
const router = express.Router()
const Proudect = require('../models/proudect')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']



router.get('/',  async (req , res)=>{

    try {
        const proudects = new Proudect()
        res.render('addproudect', {
            proudects: proudects
           
         }) 
         
    } catch {
        
        res.redirect('errpage')
    }
  })
    


router.post('/', async(req, res) => {
    const proudect =  await new Proudect({
        proudectName: req.body.proudectName,
        barcodeNumber: req.body.barcodeNumber,
        proudectRefUrl: req.body.proudectRefUrl
    })
    saveCover(proudect, req.body.cover)
    try {
        const newProudect = await proudect.save()
        res.redirect(`/`)

    } catch(e) {
        console.log(e)
        res.render('errpage', {
            proudect: proudect,
             errorMessage: 'Error creating Proudect'
        })

    }
})

function saveCover(proudect, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
      proudect.proudectImage = new Buffer.from(cover.data, 'base64')
      proudect.proudectImageType = cover.type
    }
  }


  
module.exports = router


