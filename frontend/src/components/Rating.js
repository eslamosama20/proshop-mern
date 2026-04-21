import React from 'react'

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating' style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
      <div style={{ display: 'flex', gap: '0.2rem' }}>
        <span>
          <i
            style={{ color }}
            className={
              value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color }}
            className={
              value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      </div>
      {text && (
        <span style={{ fontSize: '0.9rem', color: '#6b7280', marginLeft: '0.3rem' }}>
          {text}
        </span>
      )}
    </div>
  )
}

Rating.defaultProps = {
  color: '#fbbf24',
}

export default Rating
