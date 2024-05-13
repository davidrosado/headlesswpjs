<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Headless WP</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" 
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>
<body>
    <section id="contenido">
        <div class="container">
            <div class="row">
                <div class="col text-center my-5">
                    <h2>Listado de posts</h2>
                    <article id="site" class="site"></article>
                    <select name="webSelector" id="webSelector" class="my-3" onchange="changeWeb()">                 
                        <option value="">Seleccione web</option>
                        <option value="https://ayudawp.com">Ayuda WP</option>
                        <option value="https://malvestida.com">Mal vestida Mx</option>
                        <option value="https://www.test.86interactive.com">86 Interactive</option>
                    </select>
                    <section id="posts" class="posts row justify-content-between"></section>
                    <p class="loader">Cargando contenido ...</p>
                </div>
            </div>
            <div id="listadoPosts" class="px-3">
                <template id="post-template">
                    <article class="post col-md-6 mb-5 card">
                        <img src="" alt="" class="post-image">
                        <aside>
                            <h4 class="post-title"></h4>
                            <figure class="post-author"></figure>
                            <small class="post-date"></small>
                            <p><a href="" class="post-link" target="_blank">Ver publicación original</a></p>
                            <p class="post-excerpt"></p>
                            <div class="post-categories d-flex flex-wrap"></div>
                            <div class="post-tags d-flex flex-wrap"></div>
                        </aside>
                    </article>
                </template>

            </div>
        </div>
    </section>

    <style>
        .loader {display: none; margin: 2rem auto}
        img {max-width: 100%}
        .post-categories ul, .post-tags ul {list-style: none;}
        .post-categories ul, .post-tags ul {display:flex; flex-wrap: wrap}
        .post-categories ul li, .post-tags ul li {margin-right: 20px}
    </style>

    <script src="script.js"></script>
</body>
</html>