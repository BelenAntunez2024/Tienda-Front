import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import './VolverAtras.css'

interface VolverAtrasProps {
  hasNavbar?: boolean;
}


const VolverAtras: React.FC<VolverAtrasProps> = ({ hasNavbar = false }) => {
  const navigate = useNavigate();

  const handlevolverAtras = () => {
    navigate(-1);
  };

  return (
    <button className={`boton-atras ${hasNavbar ? 'with-navbar' : ''}`} onClick={handlevolverAtras} title="Volver atrás">
      <IoArrowBack size={24} />
    </button>
  );
};

export default VolverAtras;