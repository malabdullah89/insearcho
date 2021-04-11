FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginPdfPreview,
  )
  
  FilePond.setOptions({
    stylePanelAspectRatio: 130 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 130,
    allowPdfPreview: true,
    pdfPreviewHeight: 320,
    pdfComponentExtraParams: 'toolbar=0&view=fit&page=1'  
  })
  
  FilePond.parse(document.body);