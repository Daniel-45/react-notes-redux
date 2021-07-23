import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, date, url }) => {

    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(
            activeNote(id, {
                title, body, date, url
            })
        );
    }

    return (
        <div
            className="journal__entry cursor-pointer animate__animated animate__fadeIn"
            onClick={handleEntryClick}
        >
            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`,
                        backgroundPosition: 'center center'
                    }}
                >
                </div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date">
                <span>{noteDate.format('dddd')}</span>
                <p>{noteDate.format('Do')}</p>
            </div>
        </div>
    )
}
