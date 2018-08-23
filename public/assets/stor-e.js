$(document).ready(function(){

    $('.add').on('click', function () {   //on form submit //add item click
       // console.log('button clicked');
        var itemId = $('#add');
        var namet = $('#name')
       
        var citem = { item: itemId.val()};//custom object stores value from text box
        console.log(namet.val());
    //
         $.ajax({
            
             type: 'POST',    //http verb
             url: '/store/' + $(this).val() +'/' + namet.val(),   //route to post to                    
             success: function (data) {
                 //add code to insert the item in record
                location.reload();
             }
         });
         return false;
    });

    
});

