(function ($){
    let newReviewForm = $('#new-review'),
        ratingInput = $('#rating'),
        reviewInput = $('#review'),
        reviewArea = $('#review-area');

    newReviewForm.submit(function (event){
        event.preventDefault();
        let rating = ratingInput.val();
        let review = reviewInput.val();
             
        if(rating && review){
            let requestConfig = {
                method: "POST",
                url: window.location.pathname,
                contentType: 'application/json',
                data: JSON.stringify({
                    rating: rating,
                    review: review
                })
            };

            $.ajax(requestConfig).then(function (responseMessage) {
                let newElement = $(responseMessage);

                reviewArea.append(newElement);
            });
            document.getElementById("new-review").reset();
        }
    });
    
})(window.jQuery);

