import React from 'react';
import './SearchResultModal.css';

import * as FaIcons from 'react-icons/fa';

const SearchResultModal = ({ d: pd }) => {
  if (!pd) {
    return null;
  }

  return (
    <>
      <div className='modal-content'>
        <div className='modal-info-primary'>
          <div className='modal-info-primary-primary'>
            <h3>
              {pd.first_name} {pd.last_name}
              <span>
                <img
                  className='profilePic-communityModal'
                  alt='user avatar'
                  src={pd.avatar}
                />
              </span>
            </h3>
            <p>{pd.city}</p>
            <p>{pd.username}</p>
            <strong className='modal-city'>
              <FaIcons.FaGlobe />
              &nbsp;
              {pd.city}
            </strong>

              <span>
              <strong className='modal-username'>{pd.username} </strong>
              <strong className='modal-username'><i> ({pd.points}pts)</i></strong>
            </span>

          </div>
          <div className='modal-info-primary-secondary'>
            <div>
              <span>Cohort no: {pd.cohort_number}</span>
            </div>
            <div>
              <span>Role: {pd.role}</span>
            </div>
          </div>
        </div>
        <div className='modal-info-secondary'>
          <div className='modal-skills'>
            <p>
              <strong>Top skills:</strong>
            </p>
            <ul>
              <li>{pd.skill_1}</li>
              <li>{pd.skill_2}</li>
              <li>{pd.skill_3}</li>
            </ul>
          </div>
          <div className='modal-contact'>
            <p>
              <strong>Get in touch:</strong>
            </p>
            <p>
              <a href={`mailto:${pd.email}`}>{pd.email}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultModal;