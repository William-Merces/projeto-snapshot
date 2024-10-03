import React, { useEffect, useCallback } from 'react';

function PhotoGrid({ term, searchPhotos }) {
    const memoizedSearchPhotos = useCallback(() => {
        searchPhotos(term);
    }, [searchPhotos, term]);

    useEffect(() => {
        memoizedSearchPhotos();
    }, [memoizedSearchPhotos]);

    return <h2 className="text-2xl text-center mb-4">Fotos de {term}</h2>;
}

export default PhotoGrid;