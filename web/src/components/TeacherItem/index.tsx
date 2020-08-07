import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';
import { api } from '../../services/api';
export interface Teacher {
  id: string;
  user_id: string;
  subject: string;
  cost: string;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}
interface TeacherItemProps {
  teacher : Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {user_id: teacher.user_id})
  }
  return (
  <article className="teacher-item">
    <header>
      <img src={teacher.avatar} alt="Marcos Taborda"/>
      <div>
        <strong>{teacher.name}</strong>
        <span>{teacher.subject}</span>
      </div>
    </header>
    <p>
      {teacher.bio}
    </p>
    <footer>
      <p>
        Preço/hora
        <strong>
          R$ {teacher.cost}
        </strong>
      </p>
      <a onClick={createNewConnection} href={`http://wa.me/${teacher.whatsapp}`} rel="noopener noreferrer" target="_blank">
        <img src={whatsAppIcon} alt="Whats App"/>
        Entrar em contato
      </a>
    </footer>
  </article>
);
}

export default TeacherItem;