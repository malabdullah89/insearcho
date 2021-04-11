const mongoose = require('mongoose')

const ProudectSchema = new mongoose.Schema({
    
    proudectName : {
        type: String,
        required: true
    },

    barcodeNumber : {
        type: String,
        required: true

    },

    proudectDetials: {
        type: String,
        required: true

    },

    proudectProudection: {
        type: String,
        required: true

    },

    proudectImage : {
        type: Buffer,
        required: true

    },

    proudectRefUrl : {
        type: String,
        required: true

    },

    proudectImageType : {
        type: String,
        required: true

    },

    proudectPdf : {
        type: Buffer,
        required: true

    },

    proudectPdfType : {
        type: String,
        required: true

    },

    tags : {
        type: String,
        required: true

    },

})

ProudectSchema.virtual('proudectImagePath').get(function() {
    if (this.proudectImage != null && this.proudectImageType != null) {
      return `data:${this.proudectImageType};charset=utf-8;base64,${this.proudectImage.toString('base64')}`
    }
  })



module.exports = mongoose.model('Proudect', ProudectSchema)