import React from 'react';
import Bin from '../../../images/Bin.png';
import Save from '../../../images/SaveFlag.png';

const BinSave = (props) => {
  const { deleteThisPost, savePost, id } = props;
  return (
    <div className="delete-save-container">
      <button onClick={() => deleteThisPost(id)}>
        <img style={{ width: '30px' }} src={Bin} alt="delete" />
      </button>
      <button onClick={() => savePost(id)}>
        <img style={{ width: '50px' }} src={Save} alt="Save" />
      </button>
    </div>
  );
};

export default BinSave;
