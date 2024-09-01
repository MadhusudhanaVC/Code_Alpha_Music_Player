// Sample song data
const songs = [
    { title: 'Song One', artist: 'Artist One', src: 'assets/songs/song1.mp3', img: 'assets/images/album1.jpg' },
    { title: 'Song Two', artist: 'Artist Two', src: 'assets/songs/song2.mp3', img: 'assets/images/album2.jpg' },
    { title: 'Song Three', artist: 'Artist Three', src: 'assets/songs/song3.mp3', img: 'assets/images/album3.jpg' }
];

let currentIndex = 0;
let isPlaying = false;
const audio = new Audio(songs[currentIndex].src);

// Update playlist in HTML
const playlistElement = document.getElementById('playlist');
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => loadSong(index);
    playlistElement.appendChild(li);
});

document.getElementById('play-pause').onclick = () => playPause();
document.getElementById('next').onclick = () => nextSong();
document.getElementById('prev').onclick = () => prevSong();
document.getElementById('volume').oninput = (e) => audio.volume = e.target.value;

// Function to load a song
function loadSong(index) {
    currentIndex = index;
    audio.src = songs[currentIndex].src;
    document.getElementById('track-title').textContent = songs[currentIndex].title;
    document.getElementById('track-artist').textContent = songs[currentIndex].artist;
    document.getElementById('album-art').src = songs[currentIndex].img;
    playSong();
}

// Play/Pause functionality
function playSong() {
    audio.play();
    isPlaying = true;
    document.getElementById('play-pause').textContent = 'Pause';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    document.getElementById('play-pause').textContent = 'Play';
}

function playPause() {
    if (isPlaying) pauseSong();
    else playSong();
}

// Next/Previous functionality
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
}

// Search functionality
document.getElementById('search').oninput = (e) => {
    const query = e.target.value.toLowerCase();
    playlistElement.innerHTML = '';
    songs
        .filter(song => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query))
        .forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.onclick = () => loadSong(index);
            playlistElement.appendChild(li);
        });
};

// Handle file uploads
document.getElementById('file-upload').onchange = (event) => {
    const files = event.target.files;
    Array.from(files).forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const newSong = {
            title: file.name,
            artist: 'Local File',
            src: url,
            img: 'assets/images/default-album.png'  // Placeholder for local songs
        };
        songs.push(newSong);
        
        // Update playlist dynamically
        const li = document.createElement('li');
        li.textContent = `${newSong.title} - ${newSong.artist}`;
        li.onclick = () => loadSong(songs.length - 1);
        playlistElement.appendChild(li);
    });
};

// Initial song load
loadSong(currentIndex);
