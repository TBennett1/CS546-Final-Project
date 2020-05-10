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
    

    // editForm.submit(function (event){
    //     event.preventDefault();
    //     alert('editing');
        
        
    //     let newName = newNameInput.val();
    //     let newEmail = newEmailInput.val();
    //     let newPass = newPassInput.val();

    //     console.log(newName);
    //     console.log(newEmail);
    //     console.log(newPass);

    //     let firstName = newName.split(' ')[0];
    //     let lastName = newName.split(' ')[1];


    //     if(newName || newEmail || newPass){
    //         let requestConfig = {
    //             method: 'POST',
    //             url: '/users/'+$(this).data('id'),
    //             contentType: 'application/json',
    //             data: JSON.stringify({
    //                 firstName: firstName,
    //                 lastName: lastName,
    //                 email: currEmail,
    //                 newEmail: newEmail,
    //                 pass: newPass
    //             })
    //         };

    //         $.ajax(requestConfig).then(function (responseMessage) {
    //             console.log(responseMessage);
    //         });

    //     }
    // });


})(window.jQuery);