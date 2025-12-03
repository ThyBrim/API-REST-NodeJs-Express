const express = require('express');

const app = express();
app.use(express.json());
const PORT = 3000; 


app.get('/', (req, res) => { // req: request, res: response
    res.send("Hola")
});
 
app.get('/saludo', (req, res) => {
    res.json({ 
        mensaje: "Hola",
        autor: "Fernando",
        fecha: new Date()
    });
});

// Mock de datos
const usuarios = [
    { id: 1, nombre: "Juan", edad: 28 },
    { id: 2, nombre: "María", edad: 34 },
    { id: 3, nombre: "Pedro", edad: 45 }
];

app.get('/user', (req, res) => {
    res.json({
        usuarios: usuarios
    })
});

app.post('/user', (req, res) => {

    const cuerpo = req.body;

    const usuario = { 
        id: usuarios.length + 1, 
        nombre: cuerpo.nombre, 
        edad: cuerpo.edad 
    } 

    usuarios.push(usuario);
    
    res.json({
        mensaje: "Usuario agregado exitosamente",
        nuevo_usuario: usuario,
        usuarios_actualizdos: usuarios
    });
});


app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cuerpo = req.body;
    
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios[usuarioIndex].nombre = cuerpo.nombre || usuarios[usuarioIndex].nombre;
    usuarios[usuarioIndex].edad = cuerpo.edad || usuarios[usuarioIndex].edad;
    
    res.json({
        mensaje: "Usuario actualizado exitosamente",
        usuario_actualizado: usuarios[usuarioIndex],
        usuarios_actualizdos: usuarios
    });
});

app.delete('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    
    const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
    
    res.json({
        mensaje: "Usuario eliminado exitosamente",
        usuario_eliminado: usuarioEliminado[0],
        usuarios_actualizdos: usuarios
    });
});


app.listen(PORT, () => {
    console.log('Servidor corriendo exitosamente en http://localhost:' + PORT);    
});
