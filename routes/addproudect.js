const { request } = require('express')
const express = require('express')
const router = express.Router()
const Proudect = require('../models/proudect')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const fileMimeTypes = ['application/pdf']

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
        proudectRefUrl: req.body.proudectRefUrl,
        proudectDetials: req.body.proudectDetials,
        proudectProudection: req.body.proudectProudection,
        tags: req.body.tags

    })
    saveCover(proudect, req.body.cover)
    saveFile(proudect, req.body.file)
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

  function saveFile(proudect, fileEncoded) {
    if (fileEncoded == null) return
    const file = JSON.parse(fileEncoded)
    if (file != null && fileMimeTypes.includes(file.type)) {
      proudect.proudectPdf = new Buffer.from(file.data, 'base64')
      proudect.proudectPdfType = file.type
    }
  }

  
module.exports = router


