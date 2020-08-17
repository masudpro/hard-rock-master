document.getElementById("searchButton").addEventListener('click', function(){
    const searchInput = document.getElementById('search');
    fetch(`https://api.lyrics.ovh/suggest/${search.value}`)
        .then(res => res.json())
        .then(data => {
            const lyric = document.getElementById('lyric');
            const posts = data.data;
            const tenPosts = posts.slice(0,10)
            var template ="";
            for (let i = 0; i < tenPosts.length; i++) {
                const songTitle = tenPosts[i].title;
                const artist = tenPosts[i].artist.name;
                const li = `<div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                    <h3 class="lyrics-name">${songTitle}</h3>
                    <p class="author lead">Album by <span>${artist}</span></p>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick="lyrics('${artist}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                </div>
            </div>`
                template += li;             
            }
            lyric.innerHTML = template; 
        })

        document.getElementById("lyric").style.display = "block"; 
        document.getElementById("fullLyrics").style.display = "none";
      
})
//For getting Lyrics;
function lyrics(songTitle, artist) {
    fetch(`https://api.lyrics.ovh/v1/${songTitle}/${artist}`)
    .then(res => res.json())
    .then(data => {
        
        document.getElementById("lyric").style.display = "none"; 
        document.getElementById("fullLyrics").style.display = "block";
       document.getElementById("lyrics").innerHTML = data.lyrics;
       document.getElementById('lyricsTitle').innerText = artist;
       document.getElementById('lyricsName').innerText = songTitle;
    })
}