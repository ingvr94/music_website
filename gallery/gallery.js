$('.gallery__list').magnificPopup({
    delegate: 'a',
    type:'image',
    gallery:{
        enabled:true
    },
    callbacks: {
        resize: changeImgSize,
        imageLoadComplete:changeImgSize,
        change:changeImgSize
    }
})
function changeImgSize(){
    var img = this.content.find('img');
    img.css('max-height', '100%');
    img.css('width', 'auto');
    img.css('max-width', 'auto');
}