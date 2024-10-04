import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

function PhotoGrid({ term, searchPhotos }) {
    const { searchTerm } = useParams();
    const finalTerm = searchTerm || term;

    const memoizedSearchPhotos = useCallback(() => {
        searchPhotos(finalTerm);
    }, [searchPhotos, finalTerm]);

    useEffect(() => {
        memoizedSearchPhotos();
    }, [memoizedSearchPhotos]);

    return <h2 className="text-2xl text-center mb-4">Fotos de {finalTerm}</h2>;
}

export default PhotoGrid;