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
    username = data[1].fields.username
    comment_id = data[0].pk
    post_id = data[0].fields.belong_to_post
    user_id = data[0].fields.author
    date = data[0].fields.date
    time = data[0].fields.time
    content = data[0].fields.content

    date_split = date.split('-');
    year = date_split[0];
    month = monthNames[date_split[1]-1];
    day = date_split[2];

    time_split = time.split(/\D/);
    if(time_split[0]>12){
        hour = time_split[0]-12;
        mark = 'P.M.'
    }
    else {
        hour = time_split[0];
        mark = 'A.M.'
    }
    minute = time_split[1];

    time = hour + ':' + minute + ' ' + mark + ' ';
    date = month + ' ' + day + ', ' + year;

    var $new_comment = $('<div class="card-action"></div>')
        .append('<div class="row" id="r1-'+comment_id+'"></div>')
        .append('<div class="row" id="r2-'+comment_id+'"></div>')
    $('#list-comment-'+post_id).append($new_comment)

    $('#r1-'+comment_id).append(content)
    $('#r2-'+comment_id).append('<div class="input-field col s9" id="r2-d1-'+comment_id+'"></div>')
    $('#r2-'+comment_id).append('<div class="input-field col s3" id="r2-d2-'+comment_id+'"></div>')


    var $tmp_form = $('<form></form>')
                .attr('action','profile.html')
                .attr('method', 'get')
                .attr('name', 'findProfile')
                .append('<a class="grey-text text-darken-1"><i class="tiny material-icons">face</i><input type="submit" name="username" value='+username+'></a><br>');

    $('#r2-d1-'+comment_id).append($tmp_form)
    $('#r2-d1-'+comment_id).append('<a class="grey-text text-darken-1"><i class="tiny material-icons">access_time</i>'+time+date+'</a>')
    $('#r2-d2-'+comment_id).append('<img class="circle" src="photo/'+user_id+'/" width=20>')

};

$( document ).ready(function() {
  // Handler for .ready() called.
    $('#page').on('click', '[id^="post-comment-"]', function(event){

         console.log('well: ', event.target.nodeName)
        var content_comment = $(this).prev().children().val();
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
                    // console.log('cleared');
                    display_new_comment(data)
                    comment_input_field.val('');
                })
    })
});