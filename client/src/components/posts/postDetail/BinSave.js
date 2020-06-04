import React from 'react';
import Bin from '../../../images/Bin.png';
import Save from '../../../images/SaveFlag.png';
import { Popup } from 'semantic-ui-react';

const BinSave = (props) => {
  const { deleteThisPost, savePost, id } = props;
  return (
    <div className="delete-save-container">
      <button onClick={() => deleteThisPost(id)}>
        <img className="bin" src={Bin} alt="delete" />
      </button>
      <Popup
        style={{ color: 'var(--gray)', fontSize: '0.8rem' }}
        content="SAVE"
        trigger={
          <button onClick={() => savePost(id)}>
            <img className="save" src={Save} alt="Save" />
          </button>
        }
      />
    </div>
  );
};

export default BinSave;
