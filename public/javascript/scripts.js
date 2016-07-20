function onLinkAdd() {
    var element = $('.linkInput');
    $('.addedLinks').append("<div class='row p-b-2'><div class='col-lg-8 input-group'> <input readonly='readonly' class='form-control' name='links[]' value='" + element.find('input').val() + "'></input>" +
        "<span class='input-group-btn'> " +
    "<button class='btn btn-default' onClick='onLinkDelete(this)' type='button'>-</button> " +
       +" </span></div></div>");
    element.find('input').val('');
    var clone = element.clone();
    clone.appendTo('.links');
    element.remove();
}

function onLinkDelete(element) {
    $(element).parent().parent().parent().remove();
}