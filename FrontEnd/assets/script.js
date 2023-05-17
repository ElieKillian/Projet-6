async function genererprojets() {

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

genererprojets();