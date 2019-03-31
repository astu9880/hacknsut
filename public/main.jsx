



console.log('working')


document.getElementById('beats').style.visibility='hidden'

document.getElementById('analyse').addEventListener('click',function(){
    // restart animation
    bpmdict={'YMCA':'120bpm', 'Where are you now':'230bpm', 'Chandelier':'100bpm', 'We will rock you':'160bpm'}
    document.getElementById('beats').style.visibility='visible'

    document.getElementById('text').innerHTML='Loading...'
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
        var e=document.getElementById("elementId")
        document.getElementById('text').innerHTML=bpmdict[e.options[e.selectedIndex].text]
        bpm=document.getElementById('text').innerHTML
        bpm=bpm.substring(0,bpm.length-3)
        bpm=(Number)(bpm)
        bpm=60000/bpm
        bpm=Math.round(bpm)
        console.log(bpm)
        document.getElementById("beats").style.animationDuration = bpm.toString()+"ms";
    },3500)
});


  
  // Credit: https://css-tricks.com/jquery-magicline-navigation
  