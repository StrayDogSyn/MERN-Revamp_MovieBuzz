function MovieBlock({ movie }) {
  // TODO: Students will add onDelete and onEdit props
  // TODO: Students will add handleDelete function with confirmation dialog
  // TODO: Students will add handleEdit function

  return (
    <div className="movie-block">
      <div className="movie-poster">
        <img 
          src={movie.poster || '/images/movie-placeholder.png'} 
          alt={`${movie.name} poster`}
          loading="lazy"
        />
      </div>
      <div className="movie-content">
        <div className="movie-header">
          <h3>{movie.name}</h3>
        </div>
        <div className="movie-info">
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Length:</strong> {movie.length}</p>
        </div>
        <div className="movie-description">
          <p>{movie.description}</p>
        </div>
        <div className="movie-details">
          <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Stars:</strong> {movie.stars.join(', ')}</p>
        </div>
        
        {/* TODO: Students will add movie actions section with Edit and Delete buttons */}
      </div>
    </div>
  );
}

export default MovieBlock;