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
