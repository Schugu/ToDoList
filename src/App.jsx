// Importaciones.
import { useState } from 'react';
import './App.css'

// Funcion principal.
function App() {
  // Declaro los useState.
  const [inputValue, setInputValue] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Manejo del evento click en el boton (+), 
    // Si no hay texto: no agrega nada.
    // Si hay texto, se agrega la nueva 
      //tarea mediante setTasks, con las propiedades declaradas.
  const handleClick = (e) => {
    if (inputValue.trim() == '') {
      alert('Introduzca algo');
    } else {
      setTasks([...tasks, { text: inputValue, completed: false, contentEditable: false }]);
      setInputValue(''); // Limpiar el input.
      e.preventDefault(); // Prevenir que al darle a enviar o usar Enter, se actualice la página.
    }
  }
  
  // Manejo del evento keyDown en el input para lanzar la funcion handleClick
    // si aprietan la tecla Enter.
  const handleKey = (e) => {
    if (e.key == 'Enter') {
      handleClick(e);
    }
  }

  // Manejo del evento Change del input, si hay un cambio se setea 
    // input value con el setInputValue.
  const onChange = (e) => {
    setInputValue(e.target.value);
  }

  // Elimina el elemento del array tasks utilizando filter, filtrandolo por su index.
    // Luego setea el array tasks con el nuevo array creado por filter. 
  const borrarItem = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  // Crea un nuevo array apartir de tasks, edita el valor del elemento del nuevo array
    // ubicado por el index y le cambia el valor de completed a su contrario, y luego
    // setea el valor con el setTasks.
  const tacharItem = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed; // true o false 
    setTasks(newTasks);
  }

  // Crea un nuevo array apartir de tasks, edita el valor del elemento del nuevo array
    // ubicado por el index y le cambia el valor de contentEditable a su contrario, y luego
    // setea el valor con el setTasks.
  const editarItem = (index) => {
    const newTasks = [...tasks];
    newTasks[index].contentEditable = !newTasks[index].contentEditable; // true o false 
    setTasks(newTasks);
  };

  // Crea un nuevo array apartir de tasks, edita el valor del elemento del nuevo array
    // ubicado por el index y le cambia el texto con el text por el nuevo texto ingresado 
    // como argumento, luego hace que la propiedad contentEditable sea false, y por ultimo
    // setea el valor con el setTasks.
  const guardarCambios = (index, newText) => {
    const newTasks = [...tasks];
    newTasks[index].text = newText;
    newTasks[index].contentEditable = false; // Establecer contentEditable en false después de guardar los cambios
    setTasks(newTasks);
  };
  // Manejo del evento Blur (evento que ocurre cuando se dejan de enfocar en el), dispara la función
    // guardarCambios y le pasa como parametro la posicion (el index = el elemento) y el texto nuevo.
  const handleBlur = (index, newText) => {
    guardarCambios(index, newText);
  };

  // Crea un nuevo array apartir de tasks, edita el valor del elemento del nuevo array
    // ubicado por el index y le cambia las posiciones de los elementos, luego los setea
    // utilizando el setTasks.
  function moveTaskUp(index) {
    if (index > 0 && index < tasks.length) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = 
      [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }
  
  // Crea un nuevo array apartir de tasks, edita el valor del elemento del nuevo array
    // ubicado por el index y le cambia las posiciones de los elementos, luego los setea
    // utilizando el setTasks.
  function moveTaskDown(index) {
    if (index >= 0 && index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = 
      [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  // Creacion del item en base al input. 
  const Item = () => {
    // Mapea los elementos del array tasks y devuelve el elemento html. 
    return tasks.map((task, index) => (
      <div 
        className='elemento'
        key={index}
      >
        <span
          className='textElement'
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            cursor: task.contentEditable ? 'pointer' : 'none',
            backgroundColor: task.contentEditable ? '#ff977164': 'none'
          }}
          contentEditable={task.contentEditable ? true : false}
          onBlur={(e) => handleBlur(index, e.target.textContent)} // Agrega un evento onBlur para manejar la edición del texto
          suppressContentEditableWarning // Suprime la advertencia de React sobre contentEditable
        >{task.text}</span>
        <section className='botones'>
          <button
            className='botonElem botonTachar'
            onClick={() => tacharItem(index)}
          >✅</button>
          <button
            className='botonElem botonEditar'
            onClick={() => editarItem(index)}
          >✏️</button>
          <button
            className='botonElem botonBorrar'
            onClick={() => borrarItem(index)}
          >❌</button>
          <button
            className='botonElem botonUp'
            onClick={() => moveTaskUp(index)}
          >⬆️</button>
          <button
            className='botonElem botonDown'
            onClick={() => moveTaskDown(index)}
          >⬇️</button>
        </section>
      </div>
    ));
  }

  // Return de la funcion App (Principal).
  return (
    <main className='main'>
      <h1 className='titulo'>Lista de tareas</h1>
      <section className='containerList'>
        <article className='articleInput'>
          <input
            className='input'
            type="text"
            value={inputValue}
            onChange={onChange}
            autoComplete="off"
            placeholder="Agregar un nuevo elemento"
            onKeyDown={handleKey}
          />
          <button
            className='boton'
            onClick={handleClick}
          >+</button>
        </article>

        <article className="elementos" id="elementos">
          <Item />
        </article>
      </section>
    </main>
  )
}

export default App