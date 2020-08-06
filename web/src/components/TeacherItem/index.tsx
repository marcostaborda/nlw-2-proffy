import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem: React.FC = () => {
  return (
  <article className="teacher-item">
    <header>
      <img src="https://avatars2.githubusercontent.com/u/15224426?s=460&u=b4111459e61d191e7b2aad2404b69be157bc6baf&v=4" alt="Marcos Taborda"/>
      <div>
        <strong>Marcos Taborda</strong>
        <span>Química</span>
      </div>
    </header>
    <p>
      Entusiasta das melhores tecnologias de química avançada.
      <br/> <br/>
      Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências.
    </p>
    <footer>
      <p>
        Preço/hora
        <strong>
          R$ 80,00
        </strong>
      </p>
      <button type="button">
        <img src={whatsAppIcon} alt="Whats App"/>
        Entrar em contato
      </button>
    </footer>
  </article>
);
}

export default TeacherItem;