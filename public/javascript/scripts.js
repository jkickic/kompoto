function onLinkAdd() {
    var element = $('.linkInput');
    $('.addedLinks').append("<div>" + element.find('input').val() + "</div>")
    element.find('input').val('');
    var clone = element.clone();
    clone.appendTo('.links');
    element.remove();
}