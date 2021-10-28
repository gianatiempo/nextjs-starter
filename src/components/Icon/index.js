import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Icon.module.scss';

const Icon = ({ name, small, large }) => {
  return <FontAwesomeIcon className={`${styles.Icon} ${small ? '--small' : large ? '--large' : ''}`} icon={name} />;
};

export default Icon;
