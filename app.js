function ItunesController(){
  var itunesService = new ItunesService()
  //Do Not Modify the getMusic function
  this.getMusic = function getMusic(e){
    e.preventDefault();
    var artist = e.target.artist.value;
    itunesService.getMusicByArtist(artist).then(drawSongs);
    var link = document.getElementById('loader');
    link.style.visibility = 'visible';
    link.style.display  = 'inline-flex';
  }

  function percentCalculation(a, b){
    var c = (parseFloat(a)/parseFloat(b))*100;
    return parseFloat(c);
}
  var audioElement = document.createElement('audio')
  this.adElem = audioElement
  var audioPlayingBut = false
  var lastPlaying
  var playingBar
  function playPreview(id){
        if (!songsList[id]){
            Materialize.toast('Song not found!', 3000, 'rounded')
            return
        }
        var song = songsList[id]
        if (audioPlayingBut) {
            audioPlayingBut.innerHTML = '<i class="material-icons">play_arrow</i>' 
            playingBar.parentNode.className += " shidden"
        }

        if (lastPlaying === song.preview) {
            audioElement.pause();
            lastPlaying = null
            return
        }
        audioElement.pause();
        audioElement.setAttribute('src', song.preview);
        audioElement.play();
        
        audioElement.addEventListener('ended', function() {
             if (audioPlayingBut) {
                audioPlayingBut.innerHTML = '<i class="material-icons">play_arrow</i>' 
                 playingBar.parentNode.className += " shidden"
            }
        }, false);   

        audioElement.addEventListener("timeupdate",function(){
            var percent = percentCalculation(audioElement.currentTime,audioElement.duration).toFixed(3)
             console.log(audioElement.duration)
             console.log(audioElement.currentTime)
            console.log(String(percent) +"%")
            playingBar.style.width = String(percent) +"%"
        });
        var but = document.getElementById(id)
        but.innerHTML = '<i class="material-icons">pause</i>' 
        audioPlayingBut = but
        lastPlaying = song.preview
        Materialize.toast('Now Previewing: '+ song.title, 3000, 'rounded')
        playingBar = document.getElementById("bar_"+id)
        playingBar.style.width = "0%"
        playingBar.parentNode.className = playingBar.parentNode.className.replace( /(?:^|\s)shidden(?!\S)/g , '' )
  }
  this.playSong = playPreview
  var songsList
  function drawSongs(songList){
    songsList = songList
    console.log(songList);
    // This is where you task begins
    var songhelper = document.getElementById("songs")  
    var link = document.getElementById('loader');
    link.style.visibility = 'hidden'
    link.style.display  = 'none';
    if (songList.length === 0 ){
        document.getElementById("helpertext").innerHTML = "No Songs Found!"
        return
    }
    var songHTML = ''
    var count = 0
    for (var song of songList) {
        var id = count

       // console.log(song.preview)
        songHTML += `<li class="collection-item avatar"><span class="badge">$ ${song.price} <br><a class="btn-floating btn-small waves-effect waves-light red tooltipped" data-position="bottom" data-delay="50" data-tooltip="Preview Song!" id="${id}" onclick="itunesCtrl.playSong('${id}')"><i class="material-icons">play_arrow</i></a> <div class="progress shidden"><div class="determinate" id="bar_${id}" style="width: 0%"></div></div></span> <img src="${song.albumArt}" alt="" class="circle responsive-img"> <p class="flow-text"><i class="material-icons">grade</i> Title: ${song.title}<br><i class="material-icons">
person</i> Artist: ${song.artist} <br><i class="material-icons">library_music</i>Album: ${song.collection}</p> </li>`
        count++
    }
    songhelper.innerHTML = songHTML
    document.getElementById("helpertext").innerHTML = "Displaying the top "+ songList.length+ " songs related to your search!"
  }
  
}

var itunesCtrl = new ItunesController()
