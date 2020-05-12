(function ($){
    let updatePostStats = {
        upvote: function (postID){
            document.querySelector('#likes-count-'+postID).textContent++;
        },
        downvote: function (postID){
            document.querySelector('#dislikes-count-'+postID).textContent++;
        }
    };

    let actOnPost = function (event) {
        let postID = event.target.dataset.postId;
        let action = event.target.textContent.trim();
        updatePostStats[action](postID);
        $.post(window.location.pathname+'/'+action,{rid:postID}, function (success){
            console.log('Did it work?' + success);
        });
    }
})(window.jQuery);