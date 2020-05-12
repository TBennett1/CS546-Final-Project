(function ($){
    
    let profile = $('#edit');


    function bindEventsToEdit(edit){
        edit.find('.edit').on('click', function (event){
            event.preventDefault();
            let currentLink = $(this);
            let currentId = currentLink.data('id');

            let requestConfig = {
                method: 'POST',
                url: '/user/'+currentId+"/edit"
            };

            $.ajax(requestConfig).then(function (responseMessage){
                var newElement = $(responseMessage);
                bindEventsToEdit(newElement);
                edit.replaceWith(newElement);
            });
        });
    }

    bindEventsToEdit(profile);
})(window.jQuery);