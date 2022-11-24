
  $(document).ready(function() { 

    $("img").bind("error",function(){
      // Set the default image
      $(this).attr("src","Imagenes/defaultUser.png");
    });

    $('#notario-mon-init-hour').on('change', function(){
      var value = $(this).val(); 
      $('.hourInit').val(value); 
    });

    $('#notario-mon-init-min').on('change', function(){
      var value = $(this).val(); 
      $('.minInit').val(value); 
    });

    $('#notario-mon-final-hour').on('change', function(){
      var value = $(this).val(); 
      $('.hourFin').val(value); 
    });

    $('#notario-mon-final-min').on('change', function(){
      var value = $(this).val(); 
      $('.minFin').val(value); 
    });

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("user_page").style.display = "block";
            document.getElementById("login_div").style.display = "none";
            $('body').show('slow');
            $('.pre-loader').hide('slow'); 
        } else {
          document.getElementById("user_page").style.display = "none";
          document.getElementById("login_div").style.display = "block";
          $('body').show('slow');
          $('.pre-loader').hide('slow'); 
        }
      }); 
   });

   $('#mondayCheck').click(function() {
      $('#mondayDiv')[this.checked ? "show" : "hide"]();
    });

    $('#tuesdayCheck').click(function() {
      $('#tuesdayDiv')[this.checked ? "show" : "hide"]();
    });

    $('#WednesdayCheck').click(function() {
      $('#WednesdayDiv')[this.checked ? "show" : "hide"]();
    });

    $('#ThursdayCheck').click(function() {
      $('#ThursdayDiv')[this.checked ? "show" : "hide"]();
    });

    $('#FridayCheck').click(function() {
      $('#FridayDiv')[this.checked ? "show" : "hide"]();
    });
  


function login(){

    var userEmail = document.getElementById("inputEmail").value;
    var userPassword = document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
        // Handle Errors here.
        //var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage)
      });
}

function logOut(){
    firebase.auth().signOut() 
}


var editMode = false
var editModeDelegaciones = false

 

function editModeTrueDelegaciones(){
  editModeDelegaciones = false
  delegacionesForm.reset();
  delegacionesForm['delegacion-save-btn'].innerText = "Guardar";

}

function editModeTrue(){
  editMode = false
  notariosForm.reset();
  notariosForm['notario-save-btn'].innerText = "Guardar";

}

let id = "";
const database = firebase.firestore();

const storage = firebase.storage();
 

const notariosCollection = database.collection('Notarios');
const delegacionesCollection = database.collection('Delegaciones');
const anunciosColection = database.collection('Anuncios');


const getAnuncios = () => anunciosColection.get();
const getNotarios = () => notariosCollection.get();
const getDelegaciones = () => delegacionesCollection.get();

const onGetAnuncios= (callback) =>   anunciosColection.onSnapshot(callback)
const onGetNotarios = (callback) =>   notariosCollection.onSnapshot(callback)
const onGetDelegaciones = (callback) =>   delegacionesCollection.onSnapshot(callback)


const deleteAnuncio = id => anunciosColection.doc(id).delete();
const deleteNotario = id => notariosCollection.doc(id).delete();
const deleteDelegacion = id => delegacionesCollection.doc(id).delete();

const getNotario = (id)=> notariosCollection.doc(id).get();
const getDelegacion = (id)=> delegacionesCollection.doc(id).get();

const updateNotario =  (id, updatedNotario) => notariosCollection.doc(id).update(updatedNotario);
const updateDelegacion =  (id, updatedDelegacion) => delegacionesCollection.doc(id).update(updatedDelegacion);


const notariosForm = document.getElementById('notarios-form');
const delegacionesForm = document.getElementById('delegacion-form');
const anunciosForm = document.getElementById('anuncios-form');


anunciosForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  const title = anunciosForm['anuncio-title'].value;
  const anuncio = anunciosForm['anuncio-cuerpo'].value;

  var today = new Date();
  var fechaConFomrato =  today.format("dd mmmm yyyy");
                

    const response = await anunciosColection.doc().set({
      title: title,
      anuncio: anuncio,
      date : fechaConFomrato,
    });
  
  await getAnuncios();
  $('#modalAnuncios').modal('hide')

});


delegacionesForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  const name = delegacionesForm['delegacion-name'].value;
  console.log(name);
  if (!editModeDelegaciones) {

    const response = await delegacionesCollection.doc().set({
      name: name
    });

  } else {
    await updateDelegacion(idDelegacion, {
      name: name
    });
    editModeTrueDelegaciones();
  }
 
  ReloadPhotosAlcadias();

  await getDelegaciones();
  $('#modalDelegacion').modal('hide')

});

notariosForm.addEventListener('submit', async(e) => {
  e.preventDefault();
  
  const name = notariosForm['notario-name'].value;
  const lastName = notariosForm['notario-lastName'].value;
  const date = notariosForm['notario-date'].value;
  const phone = notariosForm['notario-phone'].value;
  const phone2 = notariosForm['notario-phone2'].value;
  const phone3 = notariosForm['notario-phone3'].value;
  const fax = notariosForm['notario-fax'].value;
  const mail = notariosForm['notario-mail'].value;
  const web = notariosForm['notario-web'].value;
  const location = notariosForm['notario-location'].value;
  const servicios = notariosForm['notario-servicios'].value;
  const number = notariosForm['notario-number'].value;
  

  const monday = notariosForm['mondayCheck'].value;
  const monInitHour = notariosForm['notario-mon-init-hour'].value;
  const monInitMin = notariosForm['notario-mon-init-min'].value;
  const monFinalHour = notariosForm['notario-mon-final-hour'].value;
  const monFinalMin = notariosForm['notario-mon-final-min'].value;

  const tuesday = notariosForm['tuesdayCheck'].value;
  const tuesInitHour = notariosForm['notario-tues-init-hour'].value;
  const tuesInitMin = notariosForm['notario-tues-init-min'].value;
  const tuesFinalHour = notariosForm['notario-tues-final-hour'].value;
  const tuesFinalMin = notariosForm['notario-tues-final-min'].value;
 
  const wednesday = notariosForm['WednesdayCheck'].value;
  const wedInitHour = notariosForm['notario-wed-init-hour'].value;
  const wedInitMin = notariosForm['notario-wed-init-min'].value;
  const wedFinalHour = notariosForm['notario-wed-final-hour'].value;
  const wedFinalMin = notariosForm['notario-wed-final-min'].value;
 
  const thursday = notariosForm['ThursdayCheck'].value;
  const thursInitHour = notariosForm['notario-thurs-init-hour'].value;
  const thursInitMin = notariosForm['notario-thurs-init-min'].value;
  const thursFinalHour = notariosForm['notario-thurs-final-hour'].value;
  const thursFinalMin = notariosForm['notario-thurs-final-min'].value;

  const friday = notariosForm['FridayCheck'].value;
  const friInitHour = notariosForm['notario-fri-init-hour'].value;
  const friInitMin = notariosForm['notario-fri-init-min'].value;
  const friFinalHour = notariosForm['notario-fri-final-hour'].value;
  const friFinalMin = notariosForm['notario-fri-final-min'].value;
  const delegacionSelect = notariosForm['delegacionSelect'].value;
   

  if (!editMode) {
    const response = await notariosCollection.doc().set({
      number: number,
      name: name,
      lastName: lastName,
      date : date,
      monday : monday,
      monInitHour : monInitHour,
      monInitMin : monInitMin,
      monFinalHour: monFinalHour,
      monFinalMin : monFinalMin,
      tuesday: tuesday,
      tuesInitHour : tuesInitHour,
      tuesInitMin : tuesInitMin,
      tuesFinalHour : tuesFinalHour,
      tuesFinalMin : tuesFinalMin,
      wednesday: wednesday,
      wedInitHour : wedInitHour,
      wedInitMin : wedInitMin,
      wedFinalHour : wedFinalHour,
      wedFinalMin : wedFinalMin,
      thursday : thursday,
      thursInitHour : thursInitHour,
      thursInitMin : thursInitMin,
      thursFinalHour : thursFinalHour,
      thursFinalMin : thursFinalMin,
      friday : friday,
      friInitHour : friInitHour,
      friInitMin : friInitMin,
      friFinalHour : friFinalHour,
      friFinalMin : friFinalMin,
      delegacionSelect: delegacionSelect,
      location : location,
      servicios : servicios,
      phone : phone,
      phone2 : phone2,
      phone3 : phone3,
      fax : fax,
      mail : mail,
      web: web
    });
    notariosForm.reset(); 
  } else {
    await updateNotario(id, {
      number: number,
      name: name,
      lastName: lastName,
      date : date,  
      monday : monday,
      monInitHour : monInitHour,
      monInitMin : monInitMin,
      monFinalHour: monFinalHour,
      monFinalMin : monFinalMin,
      tuesday: tuesday,
      tuesInitHour : tuesInitHour,
      tuesInitMin : tuesInitMin,
      tuesFinalHour : tuesFinalHour,
      tuesFinalMin : tuesFinalMin,
      wednesday: wednesday,
      wedInitHour : wedInitHour,
      wedInitMin : wedInitMin,
      wedFinalHour : wedFinalHour,
      wedFinalMin : wedFinalMin,
      thursday : thursday,
      thursInitHour : thursInitHour,
      thursInitMin : thursInitMin,
      thursFinalHour : thursFinalHour,
      thursFinalMin : thursFinalMin,
      friday : friday,
      friInitHour : friInitHour,
      friInitMin : friInitMin,
      friFinalHour : friFinalHour,
      friFinalMin : friFinalMin,
      delegacionSelect : delegacionSelect,
      location : location,
      servicios: servicios,
      phone : phone, 
      phone2 : phone2,
      phone3 : phone3,
      fax : fax,
      mail : mail,
      web: web
    });
    editModeTrue(); 
  }
 

  await getNotarios();
  $('#modalNotario').modal('hide')

})
  
const tableNotarios = document.getElementById('table-notarios');
const tableDelegaciones = document.getElementById('table-delegaciones');
const tableAnuncios = document.getElementById('table-anuncios');

//Anuncios
window.addEventListener('DOMContentLoaded', async (e) => {
  
  onGetAnuncios((querySnapShot)=> {
    tableAnuncios.innerHTML = ''; 
    querySnapShot.forEach(doc => {
      var row = tableAnuncios.insertRow(0);
      
      var image = row.insertCell(0);  
      var title = row.insertCell(1);   
      var mensaje = row.insertCell(2);    
      var actions = row.insertCell(3); 
      const anuncio = doc.data();

      anuncio.id = doc.id

      const urlImage = `imagen_anuncios/${anuncio.id}.png`;
      const idImagen = anuncio.id + "anuncio";
      const ImgFoto = `<img id="${anuncio.id}anuncio" class="img-fluid" src="" alt="" width="50em" height="50em">`;
      
      const uploadPhotoButton = `<button type="button" data-id="${anuncio.id}" class="btn btn-sm btn-uploadPhoto-anuncios btn-info">Subir Foto</button>`;
      const deleteButton = `<button type="button" data-id="${anuncio.id}" class="btn btn-sm btn-anuncio-del btn-danger">Borrar</button>`; 
      

      image.innerHTML =  ImgFoto;


      title.innerHTML =  doc.data().title; 
      mensaje.innerHTML = doc.data().anuncio;
     
      actions.innerHTML =  deleteButton + uploadPhotoButton;
      
      const uploadPhotoButtons = document.querySelectorAll('.btn-uploadPhoto-anuncios');

      uploadPhotoButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          $('#AnuncioImageBar').attr('style' , 'width: ' + String(0) +'%');
       
          const id =  e.target.dataset.id;  
          $('#AnuncioImageId').val(id);  
          $('#modalAnuncioLogo').modal('show');

        });
      });
      

      const deleteButtons = document.querySelectorAll('.btn-anuncio-del');
      deleteButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          await deleteAnuncio(e.target.dataset.id);
        });
      });

      getImage(urlImage, idImagen);

      $("img").bind("error",function(){
        // Set the default image
        $(this).attr("src","Imagenes/defaultUser.png");
      });
        
      
    });

   
  });
});


//Delegaciones

window.addEventListener('DOMContentLoaded', async (e) => {

  var select = document.getElementById("delegacionSelect");

  onGetDelegaciones((querySnapShot)=> {
    tableDelegaciones.innerHTML = '';
    select.innerHTML = '';
    querySnapShot.forEach(doc => {
      var row = tableDelegaciones.insertRow(0);
      
      var image = row.insertCell(0);   
      var name = row.insertCell(1);   
      var actions = row.insertCell(2);

      const delegacion =  doc.data();

      delegacion.id = doc.id

      const urlImage = `escudos_alcadias/${delegacion.id}.png`;
      const idImagen = delegacion.id + "Foto";

      const ImgFoto = `<img id="${delegacion.id}Foto" class="img-fluid" src="" alt="" width="50em" height="50em">`;
      
      const deleteButton = `<button type="button" data-id="${delegacion.id}" class="btn btn-sm btn-delete-del btn-danger">Borrar</button>`;
      const editeButton = `<button type="button" data-id="${delegacion.id}" class="btn btn-sm btn-edit-del btn-primary">Editar</button>`;
      const uploadPhotoButton = `<button type="button" data-id="${delegacion.id}" class="btn btn-sm btn-uploadPhoto-del btn-info">Subir Foto</button>`;
     
      image.innerHTML =  ImgFoto;
      name.innerHTML =  doc.data().name; 
      actions.innerHTML =  deleteButton +  editeButton + uploadPhotoButton;

      const uploadPhotoButtons = document.querySelectorAll('.btn-uploadPhoto-del');

      uploadPhotoButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          $('#DelegacionImageBar').attr('style' , 'width: ' + String(0) +'%');
       
          const id =  e.target.dataset.id;  
          $('#DelegacionImageId').val(id);  
          $('#modalDelegacionLogo').modal('show');

        });
      });

      const editeButtons = document.querySelectorAll('.btn-edit-del');
      editeButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          const delegacion = await getDelegacion(e.target.dataset.id);
          //notariosForm['notario-number'].value = delegacion.data().name;
          delegacionesForm['delegacion-name'].value = delegacion.data().name;

          $('#modalDelegacion').modal('show'); 
          editModeDelegaciones = true
          delegacionesForm['delegacion-save-btn'].innerText = "Actualizar";
          idDelegacion = delegacion.id;
          
        });
      });

      const deleteButtons = document.querySelectorAll('.btn-delete-del');
      deleteButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          await deleteDelegacion(e.target.dataset.id);
        });
      });

      var option = document.createElement("option");
      option.text = doc.data().name; 
      option.value = delegacion.id;
      select.appendChild(option);

      getImage(urlImage, idImagen);

      $("img").bind("error",function(){
        // Set the default image
        $(this).attr("src","Imagenes/defaultUser.png");
      });

      
    });

    

   
  });


});


function getImage(url, id) {
  storage.ref(url).getDownloadURL().then(function(url) {
    var img = document.getElementById(id);
    img.src = url;
  }).catch(function(error) { 
  });
}

function ReloadPhotos(){
  onGetNotarios((querySnapShot)=> {
    querySnapShot.forEach(doc => { 
      const notario =  doc.data();
      notario.id = doc.id

      const urlImage = `fotos_notarios/${notario.id}.jpg`;
      const idImagen = notario.id + "Foto";
      getImage(urlImage, idImagen);
    });
    
  });
};

function ReloadPhotosAlcadias(){
  onGetDelegaciones((querySnapShot)=> {
    querySnapShot.forEach(doc => { 
      const notario =  doc.data();
      notario.id = doc.id

      const urlImage = `escudos_alcadias/${notario.id}.png`;
      const idImagen = notario.id + "Foto";
      getImage(urlImage, idImagen);
    });
    
  });
};
 

function ReloadPhotosAnuncios(){
  onGetAnuncios((querySnapShot)=> {
    querySnapShot.forEach(doc => { 
      const notario =  doc.data();
      notario.id = doc.id

      const urlImage = `imagen_anuncios/${notario.id}.png`;
      const idImagen = notario.id + "Foto";
      getImage(urlImage, idImagen);
    });
    
  });
};

//Notarios
window.addEventListener('DOMContentLoaded', async (e) => {
  //const querySnapShot = await getNotarios();
  onGetNotarios((querySnapShot)=> {
    tableNotarios.innerHTML = '';
 
    querySnapShot.forEach(doc => { 
   
      var row = tableNotarios.insertRow(0);

      var number = row.insertCell(0);
      var foto = row.insertCell(1);
      var name = row.insertCell(2);
      var lastName = row.insertCell(3);
      var old = row.insertCell(4); 
      var location =  row.insertCell(5);
      var actions = row.insertCell(6);
      
      const notario =  doc.data();
      notario.id = doc.id

      const urlImage = `fotos_notarios/${notario.id}.jpg`;
      const idImagen = notario.id + "Foto";

     
      const ImgFoto = `<img id="${notario.id}Foto" class="img-fluid" src="" alt="" width="50em" height="50em">`;

      const deleteButton = `<button type="button" data-id="${notario.id}" class="btn btn-sm btn-delete btn-danger">Borrar</button>`;
      const editeButton = `<button type="button" data-id="${notario.id}" class="btn btn-sm btn-edit btn-primary">Editar</button>`;
      const uploadPhotoButton = `<button type="button" data-id="${notario.id}" class="btn btn-sm btn-uploadPhoto btn-info">Subir Foto</button>`;
     
      foto.innerHTML =  ImgFoto;
      number.innerHTML = doc.data().number;
      name.innerHTML =  doc.data().name;
      lastName.innerHTML = doc.data().lastName;
      old.innerHTML = doc.data().date;
      location.innerHTML = doc.data().location;
      actions.innerHTML =  deleteButton +  editeButton + uploadPhotoButton;


      const deleteButtons = document.querySelectorAll('.btn-delete');
      deleteButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          await deleteNotario(e.target.dataset.id);
        });
      });
     
      const editeButtons = document.querySelectorAll('.btn-edit');
      editeButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          const notario = await getNotario(e.target.dataset.id);   

          notariosForm['notario-number'].value = notario.data().number;
          notariosForm['notario-name'].value = notario.data().name;
          notariosForm['notario-lastName'].value = notario.data().lastName;
          notariosForm['notario-date'].value = notario.data().date;
          notariosForm['notario-phone'].value = notario.data().phone;
          notariosForm['notario-phone2'].value = notario.data().phone2;
          notariosForm['notario-phone3'].value = notario.data().phone3;
          notariosForm['notario-fax'].value = notario.data().fax;
          notariosForm['notario-mail'].value = notario.data().mail;
          notariosForm['notario-web'].value = notario.data().web;
          notariosForm['notario-location'].value = notario.data().location;
          notariosForm['notario-servicios'].value = notario.data().servicios;
          notariosForm['notario-number'].value = notario.data().number;
          var value = String(notario.data().delegacionSelect);
 
          $("#delegacionSelect").val(value);

          notariosForm['mondayCheck'].value = notario.data().monday;
          notariosForm['notario-mon-init-hour'].value = notario.data().monInitHour;
          notariosForm['notario-mon-init-min'].value = notario.data().monInitMin;
          notariosForm['notario-mon-final-hour'].value = notario.data().monFinalHour;
          notariosForm['notario-mon-final-min'].value = notario.data().monFinalMin;
          
          notariosForm['tuesdayCheck'].value = notario.data().tuesday;
          notariosForm['notario-tues-init-hour'].value = notario.data().thursInitHour;
          notariosForm['notario-tues-init-min'].value = notario.data().thursInitMin;
          notariosForm['notario-tues-final-hour'].value = notario.data().thursFinalHour;
          notariosForm['notario-tues-final-min'].value = notario.data().thursFinalMin;
          
          notariosForm['WednesdayCheck'].value = notario.data().wednesday;
          notariosForm['notario-wed-init-hour'].value = notario.data().wedInitHour;
          notariosForm['notario-wed-init-min'].value = notario.data().wedInitMin;
          notariosForm['notario-wed-final-hour'].value = notario.data().wedFinalHour;
          notariosForm['notario-wed-final-min'].value = notario.data().wedFinalMin;
          
          notariosForm['ThursdayCheck'].value = notario.data().thursday;
          notariosForm['notario-thurs-init-hour'].value = notario.data().wedInitHour;
          notariosForm['notario-thurs-init-min'].value = notario.data().wedInitMin;
          notariosForm['notario-thurs-final-hour'].value = notario.data().wedFinalHour;
          notariosForm['notario-thurs-final-min'].value = notario.data().wedFinalMin;
          
          notariosForm['FridayCheck'].value = notario.data().friday;
          notariosForm['notario-fri-init-hour'].value = notario.data().friInitHour;
          notariosForm['notario-fri-init-min'].value = notario.data().friInitMin;
          notariosForm['notario-fri-final-hour'].value = notario.data().friFinalHour;
          notariosForm['notario-fri-final-min'].value = notario.data().friFinalMin;
          
          $('#modalNotario').modal('show');
          editMode = true
          notariosForm['notario-save-btn'].innerText = "Actualizar";
          id = notario.id;

        });
      });

      const uploadPhotoButtons = document.querySelectorAll('.btn-uploadPhoto'); 

      uploadPhotoButtons.forEach(btn =>{
        btn.addEventListener('click', async (e)=>{
          $('#progressBarPhoto').attr('style' , 'width: ' + String(0) +'%');
       
          const idNotario =  e.target.dataset.id;  
          $('#PhotoidNotario').val(idNotario);  
          $('#modalFotoNotario').modal('show');

        });
      });


      getImage(urlImage, idImagen);

      $("img").bind("error",function(){
        // Set the default image
        $(this).attr("src","Imagenes/defaultUser.png");
      });

    });
     
  $('.table-notarios').DataTable({responsive: true});
  });
  


  function getFileExtension(filename)
  {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  //Obtener elemtnos para subir foto
  var buttonUploader = document.getElementById('photoUploadFile'); 
  var buttonUploaderDelegacion = document.getElementById('DelegacionImageFile'); 
  var buttonUploaderAnuncios = document.getElementById('AnuncioImageIdFile'); 

  //Detectar que se selecciono un archivo 
  buttonUploaderDelegacion.addEventListener('change',function(e){
    //Obtener el archivo
    var file = e.target.files[0];
    var id = $('#DelegacionImageId').val();
    var extencion = getFileExtension(file.name);

    //Guardar la referencia 
    var storageRef = firebase.storage().ref('escudos_alcadias/' +  id +'.'+ extencion);

    //Subir el archivo
    var task = storageRef.put(file);
    //actulizar la barra de progreso
    task.on('state_changed', 

      function progress(snapshot){
        var percentage =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        $('#DelegacionImageBar').attr('style' , 'width: ' + String(percentage) +'%');
        if (percentage >= 100){
          $('#modalDelegacionLogo').modal('hide');
          ReloadPhotosAlcadias()
        }
        

      },

      function error(err){

      },

      function complete(){

      }

    );

  });


  //Detectar que se selecciono un archivo 
  buttonUploader.addEventListener('change',function(e){
    //Obtener el archivo
    var file = e.target.files[0];
    var id = $('#PhotoidNotario').val();
    var extencion = getFileExtension(file.name);
 
    //Guardar la referencia 
    var storageRef = firebase.storage().ref('fotos_notarios/' +  id +'.'+ extencion);

    //Subir el archivo
    var task = storageRef.put(file);
    //actulizar la barra de progreso
    task.on('state_changed', 

      function progress(snapshot){
        var percentage =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
 
        $('#progressBarPhoto').attr('style' , 'width: ' + String(percentage) +'%');
        if (percentage >= 100){
          $('#modalFotoNotario').modal('hide');
          ReloadPhotos();
        }
        

      },

      function error(err){

      },

      function complete(){

      }

    );

  });

    //Detectar que se selecciono un archivo 
    buttonUploaderAnuncios.addEventListener('change',function(e){
      //Obtener el archivo
      var file = e.target.files[0];
      var id = $('#AnuncioImageId').val();
      var extencion = getFileExtension(file.name);
   
      //Guardar la referencia 
      var storageRef = firebase.storage().ref('imagen_anuncios/' +  id +'.'+ extencion);
  
      //Subir el archivo
      var task = storageRef.put(file);
      //actulizar la barra de progreso
      task.on('state_changed', 
  
        function progress(snapshot){
          var percentage =  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   
          $('#AnuncioImageBar').attr('style' , 'width: ' + String(percentage) +'%');
          if (percentage >= 100){
            $('#modalAnuncioLogo').modal('hide');
            ReloadPhotos();
          }
          
  
        },
  
        function error(err){
  
        },
  
        function complete(){
  
        }
  
      );
  
    }); 
 
  ReloadPhotos();
  ReloadPhotosAlcadias();
  ReloadPhotosAnuncios();
});




