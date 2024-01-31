import React, { useState, useRef, ChangeEvent } from 'react';
import Cropper, { ReactCropperElement } from "react-cropper";
import 'cropperjs/dist/cropper.css';

interface ImageUploaderProps {
  canvasId: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ canvasId }) => {
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState('');
  const cropperRef = useRef<ReactCropperElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files?.[0];
    reader.onload = () => {
      setImage(reader.result as any);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
            <div>
              <Cropper
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                ref={cropperRef}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                checkOrientation={false}
              />
              <button className="btn btn-primary mt-2" onClick={handleCrop}>
                Crop Image
              </button>
            </div>
          {cropData &&
            <img style={ { width: "100%" } } src={ cropData } alt="cropped"/>
          }
        </div>
        <div className="col-md-6">
          <div className="img-preview" style={{ width: '100%', height: 200, overflow: 'hidden' }} />
        </div>
      </div>
    </div>
  );

};

export default ImageUploader;
