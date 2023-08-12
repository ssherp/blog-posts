const button = document.getElementById('new-post')
button.addEventListener('click', function(event){
    console.log('button hit')
    window.location.href = '/dashboard/post'
})