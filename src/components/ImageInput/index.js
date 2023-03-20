import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const Input = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Label = styled.label`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const ImageInput = ({ onChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    onChange(file);
  };

  return (
    <Container>
      {previewUrl ? <Image src={previewUrl} alt="Preview" /> : null}
      <Input type="file" onChange={handleImageChange} />
      <Label htmlFor="image-input">
        {previewUrl ? "Trocar imagem" : "Adicionar imagem"}
      </Label>
    </Container>
  );
};

export default ImageInput;