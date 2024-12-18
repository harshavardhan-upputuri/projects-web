const showall = document.querySelector('.plus1');
const hiddenfig = document.querySelectorAll('.album.hidden');

showall.addEventListener('click', () => {
    if(hiddenfig[0].classList.contains('active')){
        
        showall.textContent ="show all"
        
        hiddenfig.forEach(album =>{
            album.style.display= 'none';
            album.classList.remove('active');
        })
    }else{
        hiddenfig.forEach(album => {
            album.style.display = 'block';
            album.classList.add('active');
        });
        showall.textContent ="show less"
        

    }

});