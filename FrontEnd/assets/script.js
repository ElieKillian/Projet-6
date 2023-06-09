// Page d'accueil - Présentation des projets

if (document.getElementById("index")){

async function generateAllProjects() {

    const reponse = await fetch ("http://localhost:5678/api/works"); 
    const project = await reponse.json();  

    for (let i=0; i < project.length ;i++){

        const gallery = document.querySelector(".gallery");
        const spaceProject = document.createElement("figure");
        gallery.appendChild(spaceProject);

        const imageProject = document.createElement("img");
        imageProject.src = project[i].imageUrl;
        spaceProject.appendChild(imageProject);

        const titleProject = document.createElement("figcaption");
        titleProject.innerHTML = project[i].title;
        spaceProject.appendChild(titleProject);
    };
};

generateAllProjects();

// Présence d'un token de connexion ?

let token = localStorage.getItem('token');
console.log(token);

// Génération du bouton Login dans le menu et des filtres pour les projets si pas de token

if(token === null){
    const listLogin = document.querySelector(".login_element");
    const linkLogin = document.createElement("a");
    linkLogin.innerHTML = 'Login';
    listLogin.appendChild(linkLogin);

    // Accès à la page de connexion

    linkLogin.addEventListener('click',function(){
    document.location.href="http://127.0.0.1:5500/FrontEnd/log_page.html"; 
    });

    // Génération des boutons de tri au dessus des projets

    async function genererbouttons(){
        const reponse = await fetch ("http://localhost:5678/api/categories"); 
        const categorie = await reponse.json(); 
    
        const buttons = document.querySelector(".buttons");
        const button = document.createElement("button");
        button.setAttribute("id", "btn");
        button.innerHTML = 'Tous';
        buttons.appendChild(button);
        
        document.getElementById("btn").addEventListener('click', function(){
            console.log(0+ 'ok');
            document.querySelector(".gallery").innerHTML='';
            generateAllProjects();
        });
    
    for (i=0; i < categorie.length; i++){
        const button = document.createElement("button");
        button.setAttribute("id","btn" + categorie[i].id);
        button.innerHTML = categorie[i].name;
        buttons.appendChild(button);
    
        console.log("categorie :", categorie[i]);
        console.log(document.getElementById("btn" + categorie[i].id));
    
        document.getElementById("btn" + categorie[i].id).addEventListener('click', function(event){
            console.log("event:",event);
            document.querySelector(".gallery").innerHTML='';
            generateProjectFilter(event.target.id.slice(3));
        });
    
    };
    };
    
    genererbouttons();

    // Fonction de tri dans les projets

    async function generateProjectFilter(projectId){

        console.log("projectid :", projectId);
    
        // récupération des données dans le backend :
    
        const works = await fetch ("http://localhost:5678/api/works"); 
        const projects = await works.json();  
    
        const reponse = await fetch ("http://localhost:5678/api/categories"); 
        const categories = await reponse.json();  
    
        // jonction backend - frontend pour catégoriser les projets
    
        const categoryId = categories[projectId-1].id;
    
        console.log("categoryId :",categoryId);
    
        // générer la page en filtrant les éléments :
    
        let projectsFilter = projects.filter(function(element){
            if (element.categoryId === categoryId){
                return true;            
            }
        })
    
        console.log("projectsFilter =", projectsFilter);
    
        // boucle pour générer la page en utilisant la variable de tri :
    
        for (let i=0; i < projectsFilter.length ;i++){
            const gallery = document.querySelector(".gallery");
            const spaceProject = document.createElement("figure");
            gallery.appendChild(spaceProject);
    
            const imageProject = document.createElement("img");
            imageProject.src = projectsFilter[i].imageUrl;
            spaceProject.appendChild(imageProject);
    
            const titleProject = document.createElement("figcaption");
            titleProject.innerHTML = projectsFilter[i].title;
            spaceProject.appendChild(titleProject);
        }
    }
}

// Génération de la page édition si présence token

if(token !== null){

    // Bouton déconnexion

    function loginbutton(){
    // changer l'élément login en haut de page

    const listLogout = document.querySelector(".login_element");
    listLogout.innerHTML = '';
    const linkLogout = document.createElement("a");
    linkLogout.innerHTML = 'Logout';
    listLogout.appendChild(linkLogout);

    // Déconnexion en cas d'appui sur le bouton logout, suppression du token

    linkLogout.addEventListener('click',function(){
    localStorage.removeItem('token');
    document.location.href="http://127.0.0.1:5500/FrontEnd/index.html"; 
    });   
    };

    loginbutton();

    // Ajout de la barre en haut de page

    function editbar(){
    // ajout de la barre mode édition

    const selectBody = document.querySelector("#index");
    const editBar = document.createElement("div");
    editBar.classList.add("edit_bar"); 
    selectBody.appendChild(editBar);
    selectBody.insertBefore(editBar, selectBody.firstChild);

    const titleBar =document.createElement("div");
    titleBar.innerHTML = 
    '<i class="fa-regular fa-pen-to-square"></i>' +
    '<p>Mode édition</p>' +
    '<button class="publishbutton">publier les changements</button>';
    titleBar.classList.add("title_bar");
    editBar.appendChild(titleBar);
    }

    editbar();

    // Ajout des boutons modifier 
    // PREVOIR UN PARAMETRE POUR CETTE FONCTION !!!!

    function addModifyButton(){

        // bouton pour le portrait
        const selectFigure = document.querySelector("figure");
        const editFigure = document.createElement("div");
        editFigure.setAttribute("id","modify_figure");
        editFigure.innerHTML = 
        '<i class="fa-regular fa-pen-to-square"></i>' +
        '<p>modifier</p>';
        selectFigure.appendChild(editFigure);

        // bouton pour les projets
        const selectProject = document.querySelector("#portfolio");
        const titlePortfolio = selectProject.querySelector("h2") ;
        titlePortfolio.remove();
        editProject = document.createElement("div");
        editProject.classList.add("header_projects");
        selectProject.appendChild(editProject);
        selectProject.insertBefore(editProject, selectProject.firstChild);
        editProject.innerHTML = '<h2>Mes projets</h2>' 
        + '<div id=modify_projects>' 
        + '<i class="fa-regular fa-pen-to-square"></i>' 
        + '<p>modifier</p>'
        + '</div>'; 
    }

    addModifyButton();

    // ajout de la modale

    document.getElementById("modify_projects").addEventListener('click', async function modale(){
    
        // définition des variables
        const targetIndex = document.getElementById("index");
        const clickOnModale = document.getElementsByClassName("modify_projects");

        // création d'un fond pour la modale
        const createBackModale = document.createElement("div");
        createBackModale.classList.add("back_modale");
        targetIndex.appendChild(createBackModale);

        // création de la modale
        const createModale = document.createElement("div");
        createModale.classList.add("modale");
        createBackModale.appendChild(createModale);

        // contenu de la modale
        createModale.innerHTML = 
        '<i class="fa-solid fa-xmark"></i>' +
        '<h3>Galerie photo</h3>' +
        '<div class="modale_gallery">' + '</div>' +
        '<div class="line">' + '</div>' +
        '<button class="add_picture">' + '<p>Ajouter une photo</p>' + '</button>' +
        '<a href="#" class=remove_gallery>' + '<p>Supprimer la galerie</p>' + '</a>';

        // génération des projets dans la modale  et suppression de projets
 
        async function GalleryInModale(){
            const reponse = await fetch ("http://localhost:5678/api/works"); 
            const project = await reponse.json();  
        
            for (let i=0; i < project.length ;i++){
                const modaleGallery = document.querySelector(".modale_gallery");
                const spaceProject = document.createElement("figure");
                spaceProject.classList.add("figure_edit");
                modaleGallery.appendChild(spaceProject);
        
                const imageProject = document.createElement("img");
                imageProject.classList.add("image_modale");
                imageProject.src = project[i].imageUrl;
                spaceProject.appendChild(imageProject);

                const trash = document.createElement("div");
                trash.classList.add("trash","trashproject" + project[i].id);
                trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                spaceProject.appendChild(trash);

                console.log("trash :",trash);

                const arrows = document.createElement("div");
                arrows.classList.add("arrows");
                arrows.innerHTML = ' <i class="fa-solid fa-arrows-up-down-left-right"></i>';
                spaceProject.appendChild(arrows);
        
                const titleProject = document.createElement("figcaption");;
                titleProject.innerHTML = '<p class="edit">éditer</p>';
                spaceProject.appendChild(titleProject);

                // Supprimer une photo

                trash.addEventListener('click', async function (){

                    let deleteProject = await fetch(`http://localhost:5678/api/works/${project[i].id}`, {
                        method: 'DELETE',
                        headers : {
                            'Authorization' : `Bearer ${token}` 
                        }
                    });
                    if (deleteProject.status === 200){
                        spaceProject.remove();
                    } else {
                        console.error("erreur lors de la suppression du projet");
                    }
                })

            };
        }

        GalleryInModale();

        // configuration du bouton pour fermer la modale

        const closeButton = document.querySelector('.fa-xmark');
        closeButton.addEventListener('click', function(){
            createBackModale.remove();
        })
        document.addEventListener("mouseup", function(event) {
            if (!createModale.contains(event.target)) {
                createBackModale.remove();
            }
        });

        // Ajouter une photo

        const addPicture = document.querySelector('.add_picture');
        addPicture.addEventListener('click', async function picture(){

            const selectModale = document.querySelector(".modale");
            // entête section
            selectModale.innerHTML=      
            '<i class="fa-solid fa-arrow-left"></i>' +   
            '<i class="fa-solid fa-xmark"></i>' +
            '<h3>Ajout photo</h3>';

            // espace import photos
            const pictureBox = document.createElement("form");
            pictureBox.classList.add("import_pictures")
            selectModale.appendChild(pictureBox);
            pictureBox.innerHTML=
            '<div class="visualize_image">' +
            '<i class="fa-regular fa-image"></i>' + 
            '<label id="import_picture">' + 
            '<input type="file" accept=".jpg, .png" size="4194304" />' +
            '+ Ajouter photo' + '</label>' +
            '<p class="limit_size">jpg, png : 4mo max</p>' + 
            '</div>' +
            '<label>Titre</label>' + '<input type="text" id="title_picture" />' + 
            '<label>Catégorie</label>' + '<select id="category_picture"></select>' + 
            '<div class="line"></div>' +
            '<label for="submit_project">' + '<input id="submit_project" type="submit" value="Valider" action="#" />' + '</label>';

            // définition de l'élément select 
            async function select(){
            const selectCategory = document.getElementById('category_picture');
            
            const reponse = await fetch ("http://localhost:5678/api/categories"); 
            const categorie = await reponse.json(); 

            for (let i=0; i < categorie.length; i++){
                const createValue = document.createElement("option");
                createValue.setAttribute("value", categorie[i].id);
                selectCategory.appendChild(createValue);
                createValue.innerHTML = categorie[i].name;
            }
            }

            select();

            //prévisualisation de l'image avant envoi
            const inputImage = document.querySelector('input[type="file"]');
            const preview = document.querySelector(".visualize_image");

            let blob = '';
            let fileName = '';

            inputImage.addEventListener('change', function changepicture(){
                const readFile = new FileReader();
                preview.innerHTML='';

                readFile.addEventListener('load', function load() {
                        preview.style.backgroundImage = `url(${readFile.result})`;
                        preview.style.margin = "0px 145px 30px";
                        preview.style.width = "129px";
                        preview.style.backgroundSize = "contain";
                        preview.style.backgroundRepeat = "no-repeat";

                        const file = inputImage.files[0];
                        fileName = inputImage.files[0].name;
                    
                        const fileType = inputImage.files[0].type;
                        console.log("filetype :", fileType);

                        const fileSize = inputImage.files[0].size;
                        console.log("filesize :", fileSize);

                        if((fileType === "image/png" && fileSize < 4194304) || (fileType === "image/jpeg" && fileSize < 4194304) || (fileType === "image/jpg" && fileSize < 4194304)){
                        blob = new Blob([file], {type : fileType});
                        console.log("blob :",blob);
                        } else {
                        alert("Type de fichier non valide");
                        picture();
                        }
                });
                readFile.readAsDataURL(inputImage.files[0]);
            });


            // envoi du nouveau projet
            pictureBox.addEventListener('submit', async function send(event) {
                event.preventDefault();
              
                let newProject = new FormData();
                newProject.append("title", document.getElementById("title_picture").value);
                newProject.append("image", blob, fileName);                
                newProject.append("category", document.getElementById("category_picture").value);

                // envoi des données vers le backend

                let sendData = await fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    body: newProject,
                    headers : {
                        'Authorization' : `Bearer ${token}` 
                    }
                });
              
                let result = await sendData.json();
            });

            // retour page édition
            const backButton = document.querySelector('.fa-arrow-left');
            backButton.addEventListener('click', function(){
                modale();
            })

            // fermeture de la modale
            const closeButton = document.querySelector('.fa-xmark');
            closeButton.addEventListener('click', function(){
                createBackModale.remove();
            })
        })

    })

}
}

// Page identification

else if (document.getElementById("login_page")){

document.getElementById('form_login').addEventListener('submit', async function(event) {
        event.preventDefault();

    // variable utilisant les données rentrées par l'utilisateur

    let user ={
        "email" : document.getElementById("email").value,
        "password" : document.getElementById("pass").value
    };

    console.log("user:",user);

    // envoi des données vers le backend

    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    console.log("response:",response);

    // stockage des données renvoyées par le backend
        
    let result = await response.json();

    console.log("result:",result)

    // communication des résultats à l'utilisateur
    // stockage du token et redirection si connexion réussie

    const errorMain = document.getElementById("form_login");

    if (result.error) {
        //alert('Saisie invalide');
        const resultError = document.getElementById("pass");
        resultError.style.border = "2px solid red";
        const errorPass = document.createElement("p");
        errorPass.classList.add("error_pass");
        errorPass.innerHTML = 'Mot de passe invalide !';
        errorMain.appendChild(errorPass);
        errorMain.insertBefore(errorPass, resultError);
        };
    if (result.message) {
        //alert ('Utilisateur non trouvé');
        const resultMessage = document.getElementById("email");
        resultMessage.style.border = "2px solid red";
        const errorMail = document.createElement("p");
        errorMail.classList.add("error_email");
        errorMail.innerHTML = 'Email invalide !';
        errorMain.appendChild(errorMail);
        errorMain.insertBefore(errorMail, resultMessage);
        };
    if (result.userId) {
        //alert ('Connexion réalisée avec succès, vous allez être redirigé vers la page d\'accueil');
        localStorage.setItem('token', result.token);
        document.location.href="http://127.0.0.1:5500/FrontEnd/index.html"; 
    };
});

}
