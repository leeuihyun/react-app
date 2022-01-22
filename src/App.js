import './App.css';
import {useState, useEffect} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Parser from 'html-react-parser'
function App() {
  const [movieContent, setMovieContent] =useState ({
    title : '',
    content :''
  })
  const getValue = e => { 
    const {name,value} = e.target;
    setMovieContent({
      ...movieContent,
      [name] : value
    })
    console.log(movieContent);
  }
  const [viewContent, setViewContent] = useState([]);
  
  return (
    <div className="App">
      <h1>Review</h1>          
      <div className="movie-container">
        {viewContent.map(element=>
          <div>
            <h2>{element.title}</h2>
            <div>{Parser(element.content)}</div>
          </div>
        )}
      </div>
      
      <div className="form-wrapper">
        <input name = "title" className = "title-input" type="text" placeholder = "Title" onChange = {getValue}/>
        <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        setMovieContent({
                          ...movieContent,
                          content : data
                        })
                        console.log(movieContent);
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
      </div>
      <button className = "submit-button" onClick = {()=>{
        setViewContent(viewContent.concat({...movieContent}));
      }}>Submit</button>
    </div>
  );
}

export default App;
