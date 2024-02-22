import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { TiHeartOutline } from 'react-icons/ti';
import { TiHeartFullOutline } from 'react-icons/ti';
import { TiStarFullOutline } from 'react-icons/ti';
import CustomButton from '../../components/CustomButton/CustomButton';

const Detail = () => {
  const [isFav, setIsFav] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const producto = {
    name: 'Manzana',
    proveedor: 'Proveedor',
    rating: '4.5',
    ratings: '100',
    price: '100',
    stock: '100',
    description:
      'Esta es una descripcion de mas de 100 caracteres, solo se van a mostrar 100, y en caso de clickear "leer mas" se mostrara la descricpion completa, y el boton pasara a llamarse leer menos para revertir el cambio. En caso de que esta descricpion dea de menos de 100 caracteres, el boton no se rendderizara. ',
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className='max-w-[1024px] mx-auto mt-5'>
      <header className='flex h-auto w-full fixed text-[#2F2D2C] bg-pearl-bush-100 bg-opacity-70 items-center justify-between shadow-md top-0 left-0 z-10'>
        <IoIosArrowBack className='ml-4 w-[1.2em] h-[1.2em]' />
        <h3 className='text-xl'>Detalle</h3>
        {isFav ? (
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className=' mr-4 w-[1.2em] h-[1.2em]'>
            <TiHeartFullOutline className='w-full h-full cursor-pointer' />
          </div>
        ) : (
          <div
            onClick={() => {
              setIsFav(!isFav);
            }}
            className=' mr-4 w-[1.2em] h-[1.2em]'>
            <TiHeartOutline className='w-full h-full cursor-pointer' />
          </div>
        )}
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8'>
        <div className='h-full w-full p-5 md:pl-0 relative rounded-md'>
          <img
            className='h-full w-full object-contain'
            src='https://www.pngkey.com/png/full/932-9328480_apples-png-image-red-apple-fruit.png'
            alt='product-image'
          />
        </div>
        <div className='text-start'>
          <div className='flex justify-between'>
            <div>
              <ul className='text-start'>
                <li className='text-[#2F2D2C] font-bold text-lg'>{producto.name}</li>
                <li className='text-cabbage-pont-400 font-medium'>{producto.proveedor}</li>
                <li className='text-cabbage-pont-400 text-[.8em] font-medium'>
                  Stock: {producto.stock}
                </li>
              </ul>
            </div>
            <div className='flex justify-center'>
              <TiStarFullOutline className='h-[1.2em] w-[1.2em] text-[#ffe87f]' />
              <span className='text-[#2F2D2C] text-lg font-semibold'>{producto.rating}</span>
              <span className='text-cabbage-pont-700 text-[0.9em] font-medium md:hidden'>{`(${producto.ratings})`}</span>
            </div>
          </div>
          <hr className='border-[#EEE3D6] mt-2 mb-2' />
          <h4 className='text-[#2F2D2C] text-start text-lg'>Descripción</h4>
          <p
            className={`text-[#2F2D2C] text-[0.8em] md:text-base ${
              showFullDescription ? 'whitespace-pre-line' : 'line-clamp-3'
            } w-full`}>
            {producto.description}
          </p>
          {producto.description.length > 100 && (
            <button
              onClick={toggleDescription}
              className='text-tuscany-600 border-none custom-transparent-bg text-[0.8em] md:text-base font-bold cursor-pointer underline'>
              {showFullDescription ? 'Leer menos' : 'Leer más'}
            </button>
          )}
          <div className='flex justify-between mt-3'>
            <ul className='flex flex-col text-start'>
              <li className='text-cabbage-pont-400 text-[0.8em] md:text-base font-bold'>Precio</li>
              <li className='text-tuscany-600 text-[1em] md:text-lg font-semibold'>
                ${producto.price}
              </li>
            </ul>
            <CustomButton text='Comprar' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
