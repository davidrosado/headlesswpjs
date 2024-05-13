const d = document,
$site = d.querySelector("#site"),
$posts = d.querySelector("#posts"),
$loader = d.querySelector(".loader"),
$template = d.querySelector("#post-template").content,
$fragment = d.createDocumentFragment();

var 
DOMAIN = '',
SITE = '',
API_WP = '',
POSTS = '',
PAGES = '',
CATEGORIES = '';

/*FUNCIÓN OBTENER INFO DEL SITE*/
function getSiteData() {
    fetch(SITE)
    .then(res => res.ok?res.json():Promise.reject(res))
    .then(json => {
        console.log(json);
        $site.innerHTML = `
            <h3>Sitio Web</h3>
            <h2>
                <a href="${json.url}" target="_blank">${json.url}</a>
            </h2>
            <p>${json.description}</p>
            <p>${json.timezone_string}</p>
        `;
        $posts.innerHTML = "";    
    })
    .catch(err => {
        console.log(err);
        let message = err.statusText || "Ocurrió un error"
        $site.innerHTML = `<p>Error: ${err.status}:${message}</p>`
    })
}

/*FUNCIÓN OBTENER POSTS DEL SITE*/
function getPosts() {
    $loader.style.display="block"      

    fetch(POSTS)
    .then(res => res.ok?res.json():Promise.reject(res))
    .then(json => {
        console.log(json);
        json.forEach( el => {
            let categories = "",
            tags = "",
            thumbnail = el._embedded["wp:featuredmedia"][0].source_url;

            /*Cargar categorias y tags en listado*/
            el._embedded["wp:term"][0].forEach(el => categories += `<li>${el.name}</li>`);
            el._embedded["wp:term"][1].forEach(el => tags += `<li>${el.name}</li>`);

            if (thumbnail) {
                $template.querySelector(".post-image").src = el._embedded["wp:featuredmedia"][0].source_url;
                $template.querySelector(".post-image").alt = el.title.rendered;
            }

            $template.querySelector(".post-title").innerHTML = el.title.rendered;
            $template.querySelector(".post-date").innerHTML = new Date(el.date).toLocaleDateString();
            $template.querySelector(".post-link").href = el.link;
            $template.querySelector(".post-excerpt").innerHTML = el.excerpt.rendered;

            $template.querySelector(".post-categories").innerHTML = `
                <p><strong>Categorías:</strong></p>
                <ul>${categories}</ul>
            `;

            $template.querySelector(".post-tags").innerHTML = `
                <p><strong>Etiquetas:</strong></p>
                <ul>${tags}</ul>
            `;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);                
        });
        $posts.appendChild($fragment);
        $loader.style.display="none"
    })
    
    .catch(err => {
        console.log(err);
        let message = err.statusText || "Ocurrió un error"
        $posts.innerHTML = `<p>Error: ${err.status}:${message}</p>`
        $loader.style.display="none";
    })
}

function changeWeb() {
    DOMAIN = document.getElementById("webSelector").value;
    SITE = `${DOMAIN}/wp-json`,
    API_WP = `${SITE}/wp/v2`,
    POSTS = `${API_WP}/posts?_embed`,
    PAGES = `${API_WP}/pages?_embed`,
    CATEGORIES = `${API_WP}/categories`;    


    console.log(DOMAIN)
    console.log(SITE)
    console.log(API_WP)
    console.log(POSTS)
    console.log(POSTS)
    console.log(CATEGORIES)      

        getSiteData();
        getPosts();

}

/*
d.addEventListener("DOMContentLoaded",e => {
    getSiteData();
    getPosts();
});   
*/