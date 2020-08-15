import React from 'react';

const Uploads = ({ uploadImage, uploadVideo, loading }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <label className="upload" htmlFor="imgPath">
          <input id="imgPath" type="file" name="imgPath" onChange={uploadImage} />
          Upload Image
        </label>
        <label className="upload" htmlFor="videoPath">
          <input
            id="videoPath"
            style={{ marginBottom: '1.9rem' }}
            type="file"
            name="videoPath"
            onChange={uploadVideo}
          />
          Upload Video
        </label>
      </div>
      {loading === 'loading' ? <div className="donut"></div> : loading === 'finished' ? <h4>Finished</h4> : <> </>}
    </div>
  );
};

export default Uploads;
