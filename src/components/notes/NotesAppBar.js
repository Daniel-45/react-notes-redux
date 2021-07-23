import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploadImage } from '../../actions/notes';

export const NotesAppBar = () => {

    const date = new Date().toLocaleDateString();

    const dispatch = useDispatch();

    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote(active));
    }

    const handleUpdateImage = () => {
        document.querySelector('#file-selector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startUploadImage(file));
        }
    }

    return (
        <div className="notes__appbar">
            <span>{date}</span>

            <input 
            id="file-selector"
            type="file"
            name="file"
            style={{display: 'none'}} 
            onChange={handleFileChange}
            />

            <div>
                <button 
                className="btn"
                onClick={handleUpdateImage}
                >
                    Imagen
                </button>
                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Guardar
                </button>
            </div>
        </div>
    )
}
