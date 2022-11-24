//ofline data

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBUYrR23eSc2tyZDJQROBo3ZRd3Qd7dblE",
        authDomain: "notarios-2eff8.firebaseapp.com",
        databaseURL: "https://notarios-2eff8.firebaseio.com",
        projectId: "notarios-2eff8",
        storageBucket: "notarios-2eff8.appspot.com",
        messagingSenderId: "949546437729",
        appId: "1:949546437729:web:f29d2c202a859677082e20"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
 
    const database = firebase.firestore();
    database.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
          // probably multible tabs open at once
          console.log('persistance failed');
        } else if (err.code == 'unimplemented') {
          // lack of browser support for the feature
          console.log('persistance not available');
        }
      });

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
    
    function getImage(url, id) {
    storage.ref(url).getDownloadURL().then(function(url) {
        var img = document.getElementById(id);
        img.src = url;
    }).catch(function(error) { 
    });
    }
     
    const tableNotarios = document.getElementById('table-notarios');
     
    var notariosArray = [];
    var alcaldiasArray = [];

     const getNotarioSearch = (search,condition,field) => notariosCollection.where(search, condition, field).get();

    //Delegaciones

    window.addEventListener('DOMContentLoaded', async (e) => {
 
    
        onGetAnuncios((querySnapShot)=> {
            var cards = ""; 
        
            querySnapShot.forEach(doc => {
            
    
            const anuncios =  doc.data();
    
            anuncios.id = doc.id


            var img = ' <img id="' +anuncios.id +'anuncio" src="..." class="card-img-top" alt="...">';

            //anunciosArray.push(anuncios.data());
            var card =  '<div class="card text-white bg-primary mb-3" style="">'
                + img
                + '<div class="card-header">'+ anuncios.date + '</div>'
                + '<div class="card-body">'
                    + '<h5 class="card-title">'+ anuncios.title +'</h5>'
                    + '<p class="card-text">'+ anuncios.anuncio +'</p>'
               + ' </div>'
           +  '</div>';

           cards= cards + card;
           const urlImage = `imagen_anuncios/${anuncios.id}.png`;
           const idImagen = anuncios.id + "anuncio"; 

           getImage(urlImage, idImagen); 


        });


        $('#anunciosData').html(cards);
    
        
        });
    });

     //Delegaciones

    window.addEventListener('DOMContentLoaded', async (e) => {
 
  
    onGetDelegaciones((querySnapShot)=> {
       
      querySnapShot.forEach(doc => {
         
  
        const delegacion =  doc.data();
  
        delegacion.id = doc.id

        alcaldiasArray.push(delegacion);
   
        
      });
  
     
    });
  });
  
    window.addEventListener('DOMContentLoaded', async (e) => { 

        onGetNotarios((querySnapShot)=> { 
          
            
            querySnapShot.forEach(doc => { 

             
            const notario =  doc.data(); 
            notario.id = doc.id
 
            notariosArray.push(notario);
             
 
            });
 

        }); 

       

    });

    //Ocultar botones al tocal uno 

    var menuOptions = ["Nombre" , "Numero", "Horario" ,"Ubicación y Contacto", "Sitio Web y Servicios" ,"Servicios" , "Comunicados" , "Sobre Nosotros","alcadia"];
    var searchOptions = ["name" , "number", "time" ,"location", "web" ,"Servicios" , "Comunicados" , "Sobre Nosotros" , "alcadia"];
    var searchSelection = ""
    var searchOptionsExample = ["  " , "  ", " por ejemplo: Lunes 7:00 Viernes 16:00" ," ", " " ," " , " " , " " , ""];
   

    $('.resultsDiv').hide("slow");

    $('.search-form').hide("slow");
    $("#irAinicio").hide('slow');

    $('.btn-search').on('click',function(){
        $("#irAinicio").show('slow');
        $('#anunciosData').hide('slow'); 
        $('.search-options').hide("slow");
        var search = $(this).data("search");
        var searchName = menuOptions[search];
        $('#searchName').html("Buscar Por " + searchName);
        searchSelection = searchOptions[search];
        $('.resultsDiv').show("slow");
        $('.search-form').show("slow");
        $('#searchInput').attr('placeholder', "Buscar" + searchOptionsExample[search]);


        if (searchSelection == "location") { 
            getAlcadias("all");
        } else if (searchSelection == "web"){
            console.log(searchSelection);
            getResultsFields(".",searchSelection);
        }
         
    });

    $('.btn-anuncios').on('click',function(){
        $("#irAinicio").show('slow');
        $('.search-options').hide("slow");
        var search = $(this).data("search");
        var searchName = menuOptions[search];
        $('#searchName').html(searchName);
        searchSelection = searchOptions[search];  
        $('#anunciosData').show('slow'); 
         
    });

    $('#irAinicio').on('click', function(){
      
        $("#irAinicio").hide('slow');
        $('.search-form').hide("slow");
        $('.search-options').show("slow");
        $('.resultsDiv').hide("slow");
        $('#searchName').html("Notarios CDMX");
        $('#notarioData').hide("slow"); 
        $('#anunciosData').hide('slow'); 
    });


    $('#searchInput').on('change click keyup', function(){
 
        var value = $(this).val();  

        if (searchSelection == "location") {

            getAlcadias(value);

        } else {  
                getResultsFields(value,searchSelection);
        }

    });


    function compare( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }

      function compareNotarios( a, b ) {
        a = parseInt(a.number);
        b = parseInt(b.number)

        if ( a <  b){
          return -1;
        }
        if ( a > b ){
          return 1;
        }
        return 0;
      }
       

    async function getAlcadias(search){
        var cards = "";
        alcaldiasArray.sort(compare);
        alcaldiasArray.forEach(doc => { 
            const alcadia = doc
            const ImgFoto = `<img id="${alcadia.id}FotoAlcadia" class="img-fluid rounded" src="" alt="" width="50em" height="50em">`;
           if (search == "all"){

            var card = '<div class="card card-alcadia text-white bg-dark mb-3" data-id='+alcadia.id+'>'
                + '<div class="card-header" > '+ ImgFoto +' ' +  alcadia.name 
            
                +'</div>'
               
                + '</div>';
         
                cards = cards + card; 

                const urlImage = `escudos_alcadias/${alcadia.id}.png`;
                const idImagen = alcadia.id + "FotoAlcadia";
   
                getImage(urlImage, idImagen); 

           } else if ((alcadia.name.toLowerCase()).includes(search.toLowerCase())){ 

                var card = '<div class="card card-alcadia text-white bg-dark mb-3" data-id='+alcadia.id+'>'
                + '<div class="card-header" > '+ ImgFoto +' ' +  alcadia.name 
            
                +'</div>'
               
                + '</div>';
         
                cards = cards + card; 

                const urlImage = `escudos_alcadias/${alcadia.id}.png`;
                const idImagen = alcadia.id + "FotoAlcadia";
   
                getImage(urlImage, idImagen); 
           
            }
        

        });

        $('#resultsDivs').html(cards);
    }

    async function getResultsFields(search, searchField){

        
        var cards = "";
        notariosArray.sort(compareNotarios);
      
        notariosArray.forEach(doc => { 
                const notario = doc //doc.data(); 

                const ImgFoto = `<img id="${notario.id}Foto" class="img-fluid rounded" src="" alt="" width="50em" height="50em">`;
            
                var horarios = "";

                var horariosBusqueda = "";
                
                
                if (notario.monday) {
                    horariosBusqueda += "Lunes " + notario.monInitHour + ":" +  notario.monInitMin + " a " + notario.monFinalHour + ":" +  notario.monFinalMin + " " ;
                }
    
                if (notario.tuesday) {
                    horariosBusqueda += "Martes " + notario.tuesInitHour + ":" +  notario.tuesInitMin + " a " + notario.tuesFinalHour + ":" +  notario.tuesFinalMin + " " ;
                }
    
                if (notario.wednesday) {
                    horariosBusqueda += "Miercoles " +notario.wedInitHour + ":" +  notario.wedInitMin + " a " + notario.wedFinalHour + ":" +  notario.wedFinalMin + " " ;
                }
    
                if (notario.thursday) {
                    horariosBusqueda += "Jueves " + notario.thursInitHour + ":" +  notario.thursInitMin + " a " + notario.thursFinalHour + ":" +  notario.thursFinalMin + " " ;
                }
 

                if (notario.friday) {
                    horariosBusqueda += "Viernes " + notario.friInitHour + ":" +  notario.friInitMin + " a " + notario.friFinalHour + ":" +  notario.friFinalMin + " " ;
                }


                
                let horarioJueves =  notario.thursInitHour + ":" +  notario.thursInitMin + " a " + notario.thursFinalHour + ":" +  notario.thursFinalMin;

                let horarioViernes =   notario.friInitHour + ":" +  notario.friInitMin + " a " + notario.friFinalHour + ":" +  notario.friFinalMin;

                if (horarioJueves ==  horarioViernes) {
                     horarios = "Lunes a Viernes de " + notario.monInitHour + ":" +  notario.monInitMin + " a " + notario.monFinalHour + ":" +  notario.monFinalMin + " "
                } else {
                     horarios = "Lunes a Jueves de " + notario.monInitHour + ":" +  notario.monInitMin + " a " + notario.monFinalHour + ":" +  notario.monFinalMin + " <br>"
                     horarios += "Viernes " + notario.friInitHour + ":" +  notario.friInitMin + " a " + notario.friFinalHour + ":" +  notario.friFinalMin + " " ;
                } 
            

                let webAndServices = notario.web + " " + notario.servicios

                var toSearch; 
               
                if (searchField == "name") {
                    toSearch = notario.name.toLowerCase() + " " + notario.lastName.toLowerCase();
                } else if (searchField == "number") {
                    toSearch = notario.number.toLowerCase();
                } else if (searchField == "time") {
                    toSearch = horariosBusqueda.toLowerCase();
                } else if (searchField == "idNotario") {
                    toSearch = notario.delegacionSelect.toLowerCase();
                } else if (searchField == "web"){
                    toSearch = webAndServices.toLowerCase();
                }
                
                var searchEvaluation = (toSearch).includes(search.toLowerCase())

                if (searchField == "number") {
                    searchEvaluation = (toSearch) == (search.toLowerCase())
                }

                const showDetails = `<button type="button" data-id="${notario.id}" class="btn btn-lg btn-edit btn-info"><i class="fas fa-eye"></i> Ver detalles</button>`;

                if (searchEvaluation){ 
 
                    if (notario.name  == "VACANTE" || notario.name  == "LICENCIA" ) {

                        var card = '<div class="card card-notario text-white bg-dark mb-3" data-id="">'
                        + '<div class="card-header ">' + notario.name 
                        + '<button type="button" class="float-right btn btn-primary">'
                        + 'Notaria <span class="badge badge-light">' +  notario.number +'</span>'
                        +'</button>'
                        +'</div>' 
                        + '</div>';

                    } else {
                        var card = '<div class="card card-notario text-white bg-dark mb-3" data-id="'+notario.id+'">'
                        + '<div class="card-header "> '+ ImgFoto +' ' +  notario.name + ' ' +  notario.lastName 
                        + '<button type="button" class="float-right btn btn-primary">'
                        + 'Notaria <span class="badge badge-light">' +  notario.number +'</span>'
                        +'</button>'
                        +'</div>'
                        + '<div class="card-body">'
                        + '  <h5 class="card-title">Horario</h5>'
                        + ' <p class="card-text">'+horarios+'</p>'
                        + showDetails
                        + '</div>'
                        + '</div>';
                    }


                    cards = cards + card; 

                const urlImage = `fotos_notarios/${notario.id}.jpg`;
                const idImagen = notario.id + "Foto";
       
                getImage(urlImage, idImagen); 


                

                }

                

                //notario.id = //doc.id

                
            });
 
 
        
            
        $('#resultsDivs').html(cards);
         
        const viewDetailsButtons = document.querySelectorAll('.card-notario');
                viewDetailsButtons.forEach(btn =>{
                btn.addEventListener('click', async (e)=>{
                   
                const notario = await getNotario(e.target.dataset.id);   
                const urlDetalle = `fotos_notarios/${notario.id}.jpg`;
                const idImageDetalle = "imageDetalle";
       
                getImage(urlDetalle, idImageDetalle); 
                 
             

                $('#notarioData').show("slow");
                $('#resultsDiv').hide("slow");
                $('#notarioName').html(notario.data().name + " " + notario.data().lastName );
                $('#notariaNumberData').html(notario.data().number);
                
                var today = new Date();
                var olday = new Date(notario.data().date);
               

                var years = dateDiffInYears(olday, today);
 
                var now = new Date();
                
                var fechaConFomrato =  olday.format("dd mmmm yyyy");
                
                $('#dateNotario').html("Notario desde "+ fechaConFomrato);    

                $('#oldNotario').html(years + " Años de experiencia");
                
                var horarios = "";
                    /*
                if (notario.data().monday) {
                    horarios += "Lunes " + notario.data().monInitHour + ":" +  notario.data().monInitMin + " a " + notario.data().monFinalHour + ":" +  notario.data().monFinalMin + " <br>" ;
                }
    
                if (notario.data().tuesday) {
                    horarios += "Martes " + notario.data().tuesInitHour + ":" +  notario.data().tuesInitMin + " a " + notario.data().tuesFinalHour + ":" +  notario.data().tuesFinalMin + " <br>" ;
                }
    
                if (notario.data().wednesday) {
                    horarios += "Miercoles " +notario.data().wedInitHour + ":" +  notario.data().wedInitMin + " a " + notario.data().wedFinalHour + ":" +  notario.data().wedFinalMin + " <br>" ;
                }
    
                if (notario.data().thursday) {
                    horarios += "Jueves " + notario.data().thursInitHour + ":" +  notario.data().thursInitMin + " a " + notario.data().thursFinalHour + ":" +  notario.data().thursFinalMin + "<br> " ;
                }
    
                if (notario.data().friday) {
                    horarios += "Viernes " + notario.data().friInitHour + ":" +  notario.data().friInitMin + " a " + notario.data().friFinalHour + ":" +  notario.data().friFinalMin + " <br>" ;
                }*/
                
                let horarioJueves =  notario.data().thursInitHour + ":" +  notario.data().thursInitMin + " a " + notario.data().thursFinalHour + ":" +  notario.data().thursFinalMin;

                let horarioViernes =   notario.data().friInitHour + ":" +  notario.data().friInitMin + " a " + notario.data().friFinalHour + ":" +  notario.data().friFinalMin;

                if (horarioJueves ==  horarioViernes) {
                     horarios = "Lunes a Viernes de " + notario.data().monInitHour + ":" +  notario.data().monInitMin + " a " + notario.data().monFinalHour + ":" +  notario.data().monFinalMin + " "
                } else {
                     horarios = "Lunes a Jueves de " + notario.data().monInitHour + ":" +  notario.data().monInitMin + " a " + notario.data().monFinalHour + ":" +  notario.data().monFinalMin + " <br>"
                     horarios += "Viernes " + notario.data().friInitHour + ":" +  notario.data().friInitMin + " a " + notario.data().friFinalHour + ":" +  notario.data().friFinalMin + " " ;
                }

                $('#HorarioNotario').html(horarios);
                if (notario.data().servicios == ""){

                  $('#notarioServicios').html(" ");

                } else{

                    $('#notarioServicios').html("Servicios <br>" + notario.data().servicios );
                }

                //var direction = '<a ="#" target="_blank" rel="noopener noreferrer">Link</a>';
                $('#DirectionNotario').html(notario.data().location);

                var direction = ' <a class="btn btn-success btn-block" target="_blank" href="https://maps.google.com/maps?q='+ notario.data().location +'" > <i class="fas fa-map-marked-alt"></i> Abrir en Mapas</a >';
               
                var tel1 =  "";
               
                var contactoData = "";

                var tel2 = "";

                if (notario.data().phone != ""){
                    var tel1 =  ' <a class="btn btn-success btn-block" target="_blank" href="tel:'+ notario.data().phone +'" > <i class="fas fa-phone-alt"></i> '+notario.data().phone+'</a >';
                    contactoData =  contactoData + '<i class="fas fa-phone-alt"></i> ' + notario.data().phone;
                }


                if (notario.data().phone2 != ""){
                    tel2 = ' <a class="btn btn-success btn-block" target="_blank" href="tel:'+ notario.data().phone2 +'" > <i class="fas fa-phone-alt"></i> '+notario.data().phone2+'</a >';
                    contactoData =  contactoData + ' <i class="fas fa-phone-alt"></i> ' + notario.data().phone2;
                }

                var tel3 = "";
                if (notario.data().phone3 != ""){
                    tel3 = ' <a class="btn btn-success btn-block" target="_blank" href="tel:'+ notario.data().phone3 +'" > <i class="fas fa-phone-alt"></i> '+notario.data().phone3+'</a >';
                    contactoData =  contactoData + ' <i class="fas fa-phone-alt"></i> ' + notario.data().phone3;
                }


                var fax = "";
                if (notario.data().fax != ""){
                    fax = ' <a class="btn btn-info btn-block" target="_blank" href="tel:'+ notario.data().fax +'" > <i class="fas fa-fax"></i> '+notario.data().fax+'</a >';
                    contactoData =  contactoData + ' <i class="fas fa-fax"></i> ' + notario.data().fax;
                }

                var mail = "";
                if (notario.data().mail != ""){
                    //mail = ' <a class="btn btn-info" target="_blank" href="mailto:'+ notario.data().mail +'" > <i class="fas fa-envelope"></i> '+notario.data().mail+'</a >';
                    mail = ' <a class="btn btn-info btn-block" target="_blank" href="mailto:'+ notario.data().mail +'" > <i class="fas fa-envelope"></i> Enviar correo </a >';
                    contactoData =  contactoData + ' <i class="fas fa-envelope"></i> ' + notario.data().mail;
                
                }

                var web = "";
                if (notario.data().web != ""){
                    //web = ' <a class="btn btn-info" target="_blank" href="'+ notario.data().web +'" > <i class="fab fa-safari"></i> '+notario.data().web+'</a >';
                    web = ' <a class="btn btn-info btn-block" target="_blank" href="'+ notario.data().web +'" > <i class="fab fa-safari"></i> Ir a sitio web</a >';
                    contactoData =  contactoData + ' <i class="fab fa-safari"></i> ' + notario.data().web;
                }

                
                $('#contactoData').html(contactoData);
                $('#notarioButtons').html(direction + tel1 + tel2+ tel3+ fax+ mail+ web +"<br><br>");
 
       
                       });
                   });

    }


    $("#resultsDivs").on('click','.card-alcadia', function(){
        
        var id = $(this).data('id');

        
        getResultsFields(id,"idNotario");

    });

    $('#notarioData').hide("slow");
    $('#anunciosData').hide('slow'); 

    function dateDiffInYears(dateold, datenew) { 
        var ynew = datenew.getFullYear();
        var mnew = datenew.getMonth();
        var dnew = datenew.getDate();
        var yold = dateold.getFullYear();
        var mold = dateold.getMonth();
        var dold = dateold.getDate();
        var diff = ynew - yold;
        if (mold > mnew) diff--;
        else {
            if (mold == mnew) {
                if (dold > dnew) diff--;
            }
        }
        return diff;
    }