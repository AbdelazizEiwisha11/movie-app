'use strict'
/* MAin Function That Get Api */
async function getMovies(movies){
    let response = await fetch(`https://api.themoviedb.org/3/${movies}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0LIKQGOth4SqSU4KOBkFi7GG003LZRkRhTQZYjPV37q-Seq3J-sr4cA-0`);
    let searchCurrentMoviesContainer;
    if(response.status == 200){
        searchCurrentMoviesContainer = await response.json();
        displayMovies(searchCurrentMoviesContainer.results);
        /* On type to Search in Current Movies */
        $('#word').on('input',()=>{
            serchInCurrentMovies(searchCurrentMoviesContainer.results);
        });
    }
}

/* Call Get Movies Function */
(async function(){
    await getMovies("movie/now_playing");
})();

/* Search in All Movies Function */
async function allMoviesSearch(value){
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${value}`);
    let searchAllMoviesContainer;
    if(response.status == 200){
        searchAllMoviesContainer = await response.json();
        let serchResalt = [];
        for(let i=0; i<searchAllMoviesContainer.results.length; i++){
            if(searchAllMoviesContainer.results[i].title.toLowerCase().includes(value)){
                serchResalt.push(searchAllMoviesContainer.results[i]);
                displayMovies(serchResalt);
            }
        }
    }
}
/* On type to Search in All Movies */
document.getElementById('allMovies').addEventListener('input',(e)=>{
    allMoviesSearch(e.target.value.toLowerCase());
});

/* Search in Current Movies Function */
function serchInCurrentMovies(array){
    let inputValue =  document.getElementById('word').value ;
    let serchResalt = [];
    for(let i=0; i<array.length; i++){
        if(array[i].title.toLowerCase().includes(inputValue)){
            serchResalt.push(array[i]);
            displayMovies(serchResalt);
        }
    }
}

/* on Click Logo */
$('.logo').click(()=>{
    $(window).scrollTop(0)
});
/* On Click Now playing*/
$('.one').click(()=>{
    getMovies('movie/now_playing');
    colseNav();
});
/* On Click Now Popular*/
$('.two').click(()=>{
    getMovies('movie/popular');
    colseNav();
});
/* On Click Top Rated */
$('.three').click(()=>{
    getMovies('movie/top_rated');
    colseNav();
});
/* On Click Trending*/
$('.four').click(()=>{
    getMovies('trending/all/day');
    colseNav();
});
/* On Click Upcoming*/
$('.five').click(()=>{
    getMovies('movie/upcoming');
    colseNav();
});

/* Display Movies Function */
function displayMovies(arry){
    let container = ``;
    for(let i=0; i < arry.length; i++){
        container += `
        <div class="col-md-6 col-lg-4">
        <div class="movie position-relative overflow-hidden">
            <div class="post">
                <img src="https://image.tmdb.org/t/p/w500${arry[i].poster_path}" class="img-fluid rounded w-100">
            </div>
            <div class="layer">
                <div class="info">
                    <div class="info p-0">
                        <h2>${arry[i].title}</h2>
                        <p>${arry[i].overview}</p>
                        <p>rate: ${arry[i].vote_average}</p>
                        <p>${arry[i].release_date}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }
    document.getElementById('rowData').innerHTML= container;
}

/* Start Open Nav  */
function openNav(){
    if($('.nav-slide').width() == "240"){
        colseNav()
    }else{
        $('.nav-slide').width("240px");
        $('.nav-bar').css('left', '240px');
        $('ul li').addClass( "animate__fadeInUpBig");
        $('.toggleI').css('display', 'none');
        $('.close').css('display','block');
        $('.nav-social').css('margin-left','0px')
    }
}
/* End Open Nav  */

/* Start Close Nav  */
function colseNav(){
    $('.nav-slide').width("0px");
    $('.nav-bar').css('left', '0');
    $('ul li').removeClass( "animate__fadeInUpBig");
    $('.toggleI').css('display', 'block');
    $('.close').css('display','none');
    $('.nav-social').css('margin-left','-240px')
}
/* End Close Nav  */

/* On Click to Open Nav */
$('.toggle-icon').click(()=>{
    openNav()
});

/* On Click to close Nav */
$('.close').click(()=>{
    colseNav()
});

/* Start Validate Name */
const validateName = (name) => {
    return name.match(/[0-9 `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
}
const validateNam = () => {
    const name = $('#name').val();
    const result = $('#nameValidate');
    if(validateName(name) || name == ""){
        result.css('display', 'block');
        result.text("Your Name is not valid");
    }else{
        result.css('display', 'none');
    }
}
$('#name').on('input',()=>{
    validateNam();
});
/* End Validate Name */

/* Start validate Email */
const validateEmail = (email) => {
    return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
const validateEma = () => {
    const email = $('#email').val();
    const result = $('#emailValidate');
    result.text('');
    if (validateEmail(email)) {
        result.css('display', 'none');
    } else {
        result.css('display', 'block');
        result.text("Enter valid Email");
    }
    return false;
}
$('#email').on('input',()=>{
    validateEma();
});
/* End validate Email */

/* Start Validate Number */
const validatePhone = (phone) => {
    return phone.match( /^01[0125][0-9]{8}$/    );
}
const validatepho = () => {
    const phone = $('#phone').val();
    const result = $('#phoneValidate');
    result.text('');
    if (validatePhone(phone)) {
        result.css('display', 'none');
    } else {
        result.css('display', 'block');
        result.text("Enter valid Phone");
    }
    return false;
}
$('#phone').on('input',()=>{
    validatepho();
});
/* End Validate Number */

/* Start Validate Age */
const validateAge = ()=>{
    const pass = $('#age').val();
    const result = $('#ageValidate');
    result.text('');
    if(pass <= 100){
        result.css('display', 'none');
    } else {
        result.css('display', 'block');
        result.text("Enter valid Age");
    }
    return false;
}
$('#age').on('input',()=>{
    validateAge();
} );
/* Start Validate Age */

/* Start validate Password */
const validatePassword = (pass) => {
    return pass.match(
        /^(?=.*\d)(?=.*[a-z])[a-zA-Z0-9]{8,}$/
    );
}
const validatePass = () => {
    const result = $('#passValidate');
    const pass = $('#pass').val();
    result.text('');
    if (validatePassword(pass)) {
        result.css('display', 'none');
    } else {
        result.css('display', 'block');
        result.text("Enter valid Password");
    }
    return false;
}
$('#pass').on('input',()=>{
    validatePass();
});
/* End validate Password */

/* Start Validate RePassword */
const validateRepassword = ()=>{
    const pass = $('#pass').val();
    const rePass = $('#RePass').val();
    const result = $('#RePassValidate');
    result.text('');
    if(pass == rePass){
        result.css('display', 'none');
    } else {
        result.css('display', 'block');
        result.text("Enter valid Password");
    }
    return false;
}
$('#RePass').on('input',()=>{
    validateRepassword();
});
/* End Validate RePassword */