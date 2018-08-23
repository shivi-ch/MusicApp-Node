$(document).ready(function () {

    $('.remove').on('click', function () {   //on form submit //add item click
        // console.log('button clicked');
       // var itemId = $('#add');
        var namess = $('#names')

        //var citem = { item: itemId.val() };//custom object stores value from text box
        console.log(namess.text());
        //
        $.ajax({

            type: 'DELETE',    //http verb
            url: '/store/cart/item/user/' + $(this).val() + '/' + namess.text(),   //route to post to                    
            success: function (data) {
                //add code to insert the item in record
                location.reload();
            }
        });
        return false;
    });
});