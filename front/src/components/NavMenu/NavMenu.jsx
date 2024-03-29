import { Link } from 'react-router-dom';
import style from './NavMenu.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function NavMenu({ menuOpen, toggleMenu }) {
  const [render, setRender] = useState(false);
  const { rol } = useSelector((state) => state.auth);
  let animationTimeout = null;

  useEffect(() => {
    if (menuOpen) {
      setRender(true);
      clearTimeout(animationTimeout); // Limpiar el timeout si estaba previamente configurado
    } else {
      animationTimeout = setTimeout(() => {
        setRender(false);
      }, 300);
    }
    return () => clearTimeout(animationTimeout); // Limpiar el timeout al desmontar el componente
  }, [menuOpen]);

  function waitAndToggle() {
    toggleMenu();
    clearTimeout(animationTimeout); // Limpiar el timeout si se hace click antes de que se complete la animación
    animationTimeout = setTimeout(() => {
      setRender(false);
    }, 300);
  }

  return (
    render && (
      <div
        className={`fixed h-screen inset-0 bg-pearl-bush-100 flex items-center justify-center z-[9] xsm:flex lg:hidden ${menuOpen ? style.showMenu : style.hideMenu}`}>
        <header className='bg-pearl-bush-100 flex h-12 w-full fixed items-center justify-between top-0 left-0 shadow-md'>
          <button
            className='custom-transparent-bg border-none p-1 cursor-pointer top-0 left-0'
            onClick={waitAndToggle}>
            <svg
              className='h-6 w-6 text-cabbage-pont-400 hover:text-cabbage-pont-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </header>

        <ul className='flex flex-col items-center mt-6 space-y-4 w-full px-5 font-bold'>
          <li>
            <Link
              to='/'
              onClick={waitAndToggle}
              className='text-tuscany-900 text-3xl hover:text-tuscany-950 transition'>
              Inicio
            </Link>
          </li>

          <div className='max-w-[600px] w-full h-[1px] bg-tuscany-950 opacity-30'></div>
          {rol === 'proveedor' ? (
            <>
              <li>
                <Link
                  to='/store'
                  onClick={waitAndToggle}
                  className='text-tuscany-800 text-3xl hover:text-tuscany-950 transition'>
                  Proveedor
                </Link>
              </li>
              <div className='max-w-[600px] w-full h-[1px] bg-tuscany-950 opacity-30'></div>
            </>
          ) : rol === 'admin' ? (
            <li>
              <Link
                to='/admin'
                className='text-tuscany-800 text-3xl hover:text-tuscany-950 transition'>
                <li>Admin</li>
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to='/store'
                  onClick={waitAndToggle}
                  className='text-tuscany-900 text-3xl hover:text-tuscany-950 transition'>
                  Tienda
                </Link>
              </li>

              <div className='max-w-[600px] w-full h-[1px] bg-tuscany-950 opacity-30'></div>

              <li>
                <Link
                  to='/contact'
                  onClick={waitAndToggle}
                  className='text-tuscany-900 text-3xl hover:text-tuscany-950 transition'>
                  Contacto
                </Link>
              </li>

              <div className='max-w-[600px] w-full h-[1px] bg-tuscany-950 opacity-30'></div>

              <li>
                <Link
                  to='/profile/favorites'
                  onClick={waitAndToggle}
                  className='text-tuscany-900 text-3xl hover:text-tuscany-950 transition'>
                  Favoritos
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    )
  );
}
