var articles = document.querySelector('.articles');
var publish = document.querySelector('#create-form');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if (user) {
    var acc = document.querySelector('.account-details')
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    const html = `<div>Logged in as ${user.email}</div>`;
    console.log(user.email)
acc.innerHTML = html;
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

var setupArticles = function(data){
    var d = document.getElementById('login');
    if(data.length){
    var dom ="";
    var i = 0;
    var keys = Object.keys(data)
    for(i=0; i< keys.length; i++){
        var k = keys[i]
        var li = `<li class="flex-item"><h5>${data[k].title}</h5><img ${data[k].urlToImage}</li>`;
        dom+= li
    }
  articles.innerHTML = dom;  
}   else{
    articles.innerHTML = '<div class=""> Welcome to the admin page Login</div>'
}
}
document.addEventListener('DOMContentLoaded', function(){
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
    
    var items = document.querySelectorAll('collapsible');
    M.Collapsible.init(items);

}) 

publish.addEventListener('submit', function(e){
    e.preventDefault();
    var key = db.push.key()
    db.ref('articles/articles').child(key).set({
       author: publish['author'].value,
       content: publish['content'].value,
       publishedAt: publish['publishedAt'].value,
        title: publish['title'].value,
        urlToImage: publish['image'].value,

    }).then(function(){
        console.log('Successfully written to Database')
    })
    .catch(function(err){
        console.log('Error', err)
    })
    const modal = document.querySelector('#modal-create')
    M.Modal.getInstance(modal).close();
    publish.reset();
})
/** 
var file = new Blob('../img/lights.jpeg')
var metadata = {
    contentType: 'image/jpeg'
  };
var storageRef = storage.ref();
  var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
  
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
  
      case 'storage/canceled':
        // User canceled the upload
        break;
  case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, function() {
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
    });
  });*/