import { useState } from 'react';
import studentIcon from '../util/student_white.png';
import managerIcon from '../util/manager_white.png';
import instructorIcon from '../util/instructor_white.png';
import logoImg from '../util/dstj_logo_init.png';
import './FirstPage.css';

const CORE_CONCEPTS = [
  {
    image: studentIcon,
    title: 'Students',
    description:
      'provide optimal grade solutions for students.',
    link: 'student'
  },
  {
    image: instructorIcon,
    title: 'Instructor',
    description:
      'offer various features to smartly manage your students.',
    link: 'instructor'
  },
  {
    image: managerIcon,
    title: 'Manager',
    description:
      'deliver efficiency in the overall business flow and risk management.',
    link: 'manager'
  },
];

function CoreConcept({ image, title, description, link, onClick }) {
  return (
    <li>
      <a href="#" onClick={() => onClick(link)}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </a>
    </li>
  );
}

function CoreConcepts({ onClick }) {
  return (
    <section id="core-concepts">
      <h2>Choose the Type of User</h2>
      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem} onClick={onClick} />
        ))}
      </ul>
    </section>
  );
}

export default function SelectUser() {
  const [selectedUser, setSelectedUser] = useState(null);

  const renderLoginPage = () => {
    switch (selectedUser) {
      case 'student':
        return <div>Student Login</div>;
      case 'instructor':
        return <div>Instructor Login</div>;
      case 'manager':
        return <div>Manager Login</div>;
      default:
        return <CoreConcepts onClick={setSelectedUser} />;
    }
  };

  return (
    <div>d
      <header>
        <img src={logoImg} alt="logoimg" />
        <h1>DSTJ Solutions</h1>
        <p>
          DSTJ Solutions offers efficient management for customers and employees.
        </p>
      </header>
      <main>
        {renderLoginPage()}
      </main>
    </div>
  );
}
