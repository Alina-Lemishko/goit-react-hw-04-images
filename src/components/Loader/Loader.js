import { Circles } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.container}>
      <Circles color="#00BFFF" height={100} width={100} ariaLabel="loading" />
    </div>
  );
};

export default Loader;
