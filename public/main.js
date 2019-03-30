


$(function() {

    var $el,
      leftPos,
      newWidth,
      $mainNav = $(".navbar-na");
  
    var $magicLine = $("#magic-line");
  
    $magicLine
      .width($(".active").width())
      .css("left", $(".active").position().left)
      .data("origLeft", $magicLine.position().left)
      .data("origWidth", $magicLine.width());
  
    $(".navbar-na div").hover(
      function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $magicLine.data("origWidth");
        $magicLine.stop().animate({
          left: leftPos,
          width: newWidth
        });
      },
      function() {
        $magicLine.stop().animate({
          left: $magicLine.data("origLeft"),
          width: $magicLine.data("origWidth")
        });
      }
    );
    
    $('#beats').hide()

    bpmdict={'YMCA':'120bpm', 'Where are you now':'230bpm', 'Chandelier':'100bpm', 'We will rock you':'160bpm'}

    $('#analyse').click(function(){
        // restart animation
        $('#beats').show()
        console.log($('#sel1').val())
        $('#text').html('Loading...')
        var s1 = document.getElementById('s1')
        var s2 = document.getElementById('s2')
        var beats = document.getElementById('beats')
        
        s1.style.webkitAnimation = 'none';
        s2.style.webkitAnimation = 'none';
        beats.style.webkitAnimation = 'none';
        
        setTimeout(function() {
            s1.style.webkitAnimation = '';
            s2.style.webkitAnimation = '';
            beats.style.webkitAnimation = '';
        }, 10);

        setTimeout(function(){
            $('#text').html(bpmdict[$('#sel1').val()])
            bpm=bpmdict[$('#sel1').val()]
            bpm=bpm.substring(0,bpm.length-3)
            bpm=(Number)(bpm)
            bpm=60000/bpm
            bpm=Math.round(bpm)
            console.log(bpm)
            document.getElementById("beats").style.animationDuration = bpm.toString()+"ms";
        },3500)
    });
    $('.slides').hide()
    $(".nav-element").click(function(){
        console.log(this)
        $('.active').removeClass("active");
        $(this).addClass("active");
        $magicLine
        .width($(".active").width())
        .css("left", $(".active").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
    });
    $('#n1').click(function(){
        $('.slides').eq(0).show();
        $('.slides').eq(1).hide();
        $('.slides').eq(2).hide();
    })
    $('#n2').click(function(){
        $('.slides').eq(1).show();
        $('.slides').eq(0).hide();
        $('.slides').eq(2).hide();
    })
    $('#n3').click(function(){
        $('.slides').eq(2).show();
        $('.slides').eq(1).hide();
        $('.slides').eq(0).hide();
    })

});
  
  // Credit: https://css-tricks.com/jquery-magicline-navigation
  