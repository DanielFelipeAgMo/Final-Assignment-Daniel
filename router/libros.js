const express = require('express');
const router = express.Router();
const axios = require('axios').default;

var libros = {
    "978483462052": {"title":"Vivir para contarla","author":"Gabriel García","language":"Español","editorial":"Debolsillo","year":"2017","review":"esto es un ejemplo"},
    "9789587231670":{"title":"La Marquesa de Yolombó","author":"Tomás Carrasquilla","language":"Español","editorial":"Valencia Quintero","year":"1928","review":"esto es un ejemplo"},
    "9789587231939":{"title":"María","author":"Jorge Isaacs","language":"Español","editorial":"Valencia Quintero","year":"1867","review":"esto es un ejemplo"}
};

// GET para obtener todos los libros.
router.get("/", (req,res)=>{
    req = axios.get(libros);
    req.then(res=>{
        res.send(JSON.stringify(libros,null,4));
    })
    .catch(err =>{
        res.send(JSON.stringify(err));
    })
    
});

//GET para obtener un libro por un valor específico
router.get("/:ISBN",(req,res)=>{
    req  = axios.get(libros)
    const ISBN = req.params.ISBN;
    req.then(res=>{
        res.send(libros[ISBN]);
    })
    .catch(err =>{
        res.send(JSON.stringify(err));
    })
    
});

//GET para obtener un libro por un valor específico
router.get("/:author",(req,res)=>{
    req  = axios.get(libros)
    const author = req.params.author;
    req.then(res=>{
        res.send(libros[author]);
    })
    .catch(err =>{
        res.send(JSON.stringify(err));
    })
    
});

//GET para obtener un libro por un valor específico
router.get("/:title",(req,res)=>{
    const title = req.params.title;
    res.send(libros[title]);
});

//GET para obtener un libro por un valor específico
router.get("/:review",(req,res)=>{
    const review = req.params.review;
    res.send(libros[review]);
});

//POST para agregar un nuevo libro
router.post("/libros",(req,res)=>{
    if (req.body.ISBN){
        libros[req.body.ISBN] = {
            "title":req.body.title,
            "author":req.body.author,
            "language":req.body.language,
            "editorial":req.body.editorial,
            "year":req.body.year,
            "review":req.body.review
        }
    }
    res.send("El libro" + (' ')+ (req.body.title) + " fue agregado con éxito!");
}); 


//PUT para obtener un libro y actualizarlon a partir de un valor específico
router.put("/:ISBN",(req,res)=>{
    const ISBN = req.params.ISBN;
    let libro = libros[ISBN]
    if (libro) { //Comprueba si el libro existe
        let author = req.body.author;
        let title = req.body.title;
        let language = req.body.language;
        let editorial = req.body.editorial; 
        let review = req.body.review;       
        //confirma si alguno de los parametros existe y efectúa dicha acción.
        if(author) {
            libro["author"] = author
        }
        if(title) {
            libro["title"] = title
        }
        if(language) {
            libro["language"] = language
        }
        if(editorial) {
            libro["language"] = language
        }
        if(year) {
            libro["year"] = year
        }
        if(review) {
            libro["review"] = review
        }
        
        libros[ISBN]=libro;
        res.send(`El libro con el ISBN  ${ISBN} fue actualizado.`);
    }
    else{
        res.send("No se encuentra el libro!");
    }
});

//DELETE para eliminar un libro a partir de un valor específico
router.delete("/:ISBN", (req, res) => {
    const ISBN = req.params.ISBN;
    if (ISBN){
        delete libros[ISBN]
    }
    res.send(`El libro con el ISBN  ${ISBN} fue eliminado.`);
});


module.exports=router;