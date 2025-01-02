// Searchbar.js
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Searchbar = ({ initialData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(initialData);
    const [filteredData, setFilteredData] = useState(initialData);

    useEffect(() => {
        setData(initialData);
        setFilteredData(initialData);
    }, [initialData]);

    const handleSearch = debounce((term) => {
        setSearchTerm(term);
        const filtered = data.filter(
            (user) =>
                (user.nomModule && user.nomModule.toLowerCase().includes(term.toLowerCase())) ||
                (user.title && user.title.toLowerCase().includes(term.toLowerCase())) ||
                (user.semester && user.semester.toLowerCase().includes(term.toLowerCase())) ||
                (user.description && user.description.toLowerCase().includes(term.toLowerCase())) ||
                (user.date && user.date.toLowerCase().includes(term.toLowerCase())) ||
                (user.codeClassroom && user.codeClassroom.toLowerCase().includes(term.toLowerCase()))
        );
        setFilteredData(filtered);
    }, 500);

    return {
        searchComponent: (
            <div className="input-group" style={{
                width: '400px',
                marginRight: '1rem',
                marginTop: '28px'  // Ajout de cette ligne pour descendre la barre
            }}>
                <div className="input-group-prepend">
                    <span className="input-group-text bg-primary text-white" style={{
                        height: '38px',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px'
                    }}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{
                                fontSize: '20px'
                            }}
                        />
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control border-primary"
                    placeholder="Rechercher..."
                    aria-label="Rechercher"
                    aria-describedby="basic-addon1"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{
                        height: '38px'
                    }}
                />
            </div>
        ),
        filteredData
    };
};

export default Searchbar;