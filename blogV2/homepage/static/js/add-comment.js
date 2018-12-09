var req;
var monthNames = ["JAN.", "FEB.", "MAR.", "APR.", "MAY.", "JUN.",
  "JUL.", "AUG.", "SEP.", "OCT.", "NOV.", "DEC."];

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function display_new_comment(data){
    console.log(data)
    author = data[0].fields.author
    comment = data[0].fields.content
    date = data[0].fields.date
    time = data[0].fields.time

    var $new_comment = $('<div class="alert alert-success" role="alert"></div>')
        .append('<p> <b>' + author + '</b>' + time + ', ' + date + '</p><p>' + comment + '</p>')
    $('#list-comment-0').append($new_comment)
};

$( document ).ready(function() {
  // Handler for .ready() called.
    $('#comment-hey').on('click touch', '[id^="post-comment-"]', function(event){

         console.log('well: ', event.target.nodeName)
        comment_input_field = $(this).prev().children();
        var content_comment = comment_input_field.val();
        var author_comment = $(this).prev().prev().children().val();
        var csrftoken = getCookie('csrftoken');

        post_id = this.id;
        post_id = post_id.split('-')[2]
        $.post('add_comment',
                {
                    content: content_comment,
                    post_id: post_id,
                    author: author_comment,
                    csrfmiddlewaretoken: csrftoken
                },
                function(data){
                    console.log('Comment posted.')
                }).done(function(data){

                    display_new_comment(data)
                    comment_input_field.val('');
                    console.log('cleared');
                })
    })
});