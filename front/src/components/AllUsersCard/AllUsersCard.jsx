import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsersAsync } from '../../store/thunks/userThunks';

const AllUsersCard = () => {
  const { items } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(fetchUsersAsync());
    })();
  }, [dispatch]);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='w-[90%] sm:w-[40%] xl:w-[20%] m-2 flex flex-col justify-center items-center bg-pearl-bush-200 rounded-md shadow-md'>
      <div className='w-full flex justify-between items-center p-2'>
        <div className='flex flex-col text-start text-tuscany-950'>
          <h4>{items?.length}</h4>
          <span className='opacity-70 text-[.8em] md:text-[.9em]'>Total de Usuarios</span>
        </div>
        <FaUser className='text-[2.3em] md:text-[2.5em] text-tuscany-500 bg-pearl-bush-100 rounded-lg p-2' />
      </div>
      <div
        className='w-full flex justify-between items-center p-2 bg-pearl-bush-100 cursor-pointer'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          navigate('/admin/users');
        }}>
        <span
          className={`text-[.8em] md:text-[.9em] ${hovered ? 'text-tuscany-600' : 'text-tuscany-400'} `}>
          Ver todos los usuarios
        </span>
        <FaArrowAltCircleRight
          className={`text-[.9em] md:text-[1em] ${hovered ? 'text-pearl-bush-400' : 'text-pearl-bush-300'}`}
        />
      </div>
    </div>
  );
};

export default AllUsersCard;
